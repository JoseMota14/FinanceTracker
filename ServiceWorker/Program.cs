using ServiceManager;
using Shared.Infra;
using ServiceManager.Services;

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
    })
    .Build();

await host.RunAsync();
