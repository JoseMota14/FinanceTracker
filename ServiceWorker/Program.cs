using ServiceManager;
using Shared.Infra;
using ServiceManager.Services;
using Quartz;
using Serilog;
using ServiceWorker.Utils;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((hostContext,services) =>
    {
        services.AddRabbitMQEventBus(options =>
        {
            options.HostName = hostContext.Configuration["RabbitMQ:HostName"];
            options.UserName = hostContext.Configuration["RabbitMQ:UserName"];
            options.Password = hostContext.Configuration["RabbitMQ:Password"];
        });

        services.AddScoped<IService, Service>();

        services.AddLogging(builder =>
        {
            builder.AddConsole();
            builder.AddDebug();
        });

        services.AddHostedService<Worker>();

        services.AddQuartz(q =>
        {
            var jobKey = new JobKey("AfterHours");
            q.AddJob<Job>(opts => opts.WithIdentity(jobKey));

            q.AddTrigger(opts => opts
                .ForJob(jobKey)
                .WithIdentity("AfterHoursTrigger")
                .WithSchedule(CronScheduleBuilder.DailyAtHourAndMinute(0, 0)) // Runs at 00:00
            );
        });

        LoggsExtension.ConfigureLogging(new LogsDefinition() { Path = "worker"});
        services.AddSerilogLogging();

        services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);
    })
    .UseSerilog()
    .Build();

var logger = host.Services.GetRequiredService<ILogger<Program>>();
logger.LogInformation("Service started successfully!");

Initialize.DoJob();

await host.RunAsync();
