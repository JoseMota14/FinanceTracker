using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace TransactionWebApi.Infra.Health
{
    public class HealthCheckResponseWriter
    {
        public static Task WriteResponse(HttpContext context, HealthReport report)
        {
            context.Response.ContentType = "application/json";

            var response = new
            {
                Status = report.Status.ToString(),
                Duration = report.TotalDuration,
                Info = report.Entries.Select(e => new
                {
                    Key = e.Key,
                    Status = e.Value.Status.ToString(),
                    Description = e.Value.Description,
                    Duration = e.Value.Duration
                })
            };

            return context.Response.WriteAsJsonAsync(response);
        }
    }
}
