using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using Serilog.Formatting.Compact;
using System;

namespace Shared.Infra
{
    public static class LoggsExtension
    {

        public static void ConfigureLogging(LogsDefinition logsDefinition)
        {
            Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Information()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
            .MinimumLevel.Override("System", LogEventLevel.Warning)
            .Enrich.FromLogContext()
            .Enrich.WithEnvironmentName()
            .Enrich.WithMachineName()
            .WriteTo.Console()
            .WriteTo.File(new CompactJsonFormatter(),
                path: $"{logsDefinition.Path}/log-.txt",
                rollingInterval: RollingInterval.Day,
                retainedFileCountLimit: 30)
            .CreateLogger();
        }

        public static void AddSerilogLogging(this IServiceCollection services)
        {
            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.ClearProviders(); 
                loggingBuilder.AddSerilog();
            });
        }
    }

    public class LogsDefinition
    {
        public string Path { get; set;}
    }
}
