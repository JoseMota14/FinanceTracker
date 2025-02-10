using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using System.Net;
using TransactionWebApi.Infra;
using TransactionWebApi.Models;

namespace TransactionWebApi.Utils
{
    public class RateLimitingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly int _maxRequests;
        private readonly TimeSpan _timeWindow;
        private static readonly ConcurrentDictionary<string, Queue<DateTime>> _requestQueue = new();
        private static readonly Timer _cleanupTimer;

        static RateLimitingMiddleware()
        {
            // Run cleanup every 60 seconds
            _cleanupTimer = new Timer(CleanupExpiredRequests, null, TimeSpan.Zero, TimeSpan.FromMinutes(1));
        }

        public RateLimitingMiddleware(RequestDelegate next, IOptions<RateLimitingOptions> options)
        {
            _next = next;
            _maxRequests = options.Value.MaxRequests;
            _timeWindow = options.Value.TimeWindow;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            string ipAddress = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";

            // Apply rate limiting only for /api/auth
            if (!context.Request.Path.StartsWithSegments("/api/auth", StringComparison.OrdinalIgnoreCase))
            {
                await _next(context);
                return;
            }

            if (!_requestQueue.ContainsKey(ipAddress))
                _requestQueue[ipAddress] = new Queue<DateTime>();

            var requestQueue = _requestQueue[ipAddress];

            bool lockTaken = false;
            try
            {
                Monitor.Enter(requestQueue, ref lockTaken); // Safely lock the queue

                // Remove expired requests
                while (requestQueue.Count > 0 && (DateTime.UtcNow - requestQueue.Peek()) > _timeWindow)
                {
                    requestQueue.Dequeue();
                }

                if (requestQueue.Count >= _maxRequests)
                {
                    context.Response.StatusCode = (int)HttpStatusCode.TooManyRequests;
                    context.Response.Headers["Retry-After"] = _timeWindow.TotalSeconds.ToString();
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync("{\"error\":\"Too many requests. Please try again later.\"}");
                    return;
                }

                // Add current request timestamp
                requestQueue.Enqueue(DateTime.UtcNow);
            }
            finally
            {
                if (lockTaken)
                {
                    Monitor.Exit(requestQueue); // Always release the lock
                }
            }

            await _next(context);
        }

        private static void CleanupExpiredRequests(object? state)
        {
            foreach (var key in _requestQueue.Keys)
            {
                if (_requestQueue.TryGetValue(key, out var requestQueue))
                {
                    lock (requestQueue)
                    {
                        while (requestQueue.Count > 0 && (DateTime.UtcNow - requestQueue.Peek()) > TimeSpan.FromMinutes(ConfigLoader.Config.RateLimiting.TimeWindow))
                        {
                            requestQueue.Dequeue();
                        }

                        if (requestQueue.Count == 0)
                        {
                            _requestQueue.TryRemove(key, out _);
                        }
                    }
                }
            }
        }
    }

    public class RateLimitingOptions
    {
        public int MaxRequests { get; set; } = 5; // Default: 5 requests
        private int _timeWindowIn = 60; // Default: 60 seconds

        public int TimeWindowIn
        {
            get => _timeWindowIn;
            set
            {
                _timeWindowIn = value;
                TimeWindow = TimeSpan.FromMinutes(value); // Convert to TimeSpan automatically
            }
        }

        public TimeSpan TimeWindow { get; private set; } = TimeSpan.FromSeconds(60);
    }


}
