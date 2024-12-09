using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.IdentityModel.Tokens;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Serilog;
using Serilog.Events;
using Serilog.Formatting.Compact;
using System;
using System.Text;
using TransactionWebApi.Context;
using TransactionWebApi.DTO;
using TransactionWebApi.Infra;
using TransactionWebApi.Infra.Health;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddInfrastucture(builder.Configuration);

builder.Services.AddAutoMapper(typeof(MappingProfile));


Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
    .MinimumLevel.Override("System", LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .Enrich.WithEnvironmentName()
    .Enrich.WithMachineName()
    .WriteTo.Console()
    .WriteTo.File(new CompactJsonFormatter(),
        path: "logs/log-.txt",
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 30)
    //.WriteTo.Seq("http://localhost:5341")
    .CreateLogger();

builder.Host.UseSerilog();

//builder.Services.AddOpenTelemetry()
//    .WithTracing(tracerProviderBuilder =>
//        tracerProviderBuilder
//            .AddSource(builder.Environment.ApplicationName)
//            .SetResourceBuilder(ResourceBuilder
//                .CreateDefault()
//                .AddService(builder.Environment.ApplicationName))
//            .AddAspNetCoreInstrumentation()
//            .AddHttpClientInstrumentation()
//            .AddSeqExporter(options =>
//            {
//                options.ServerUrl = "http://localhost:5341";
//                options.ApiKey = "your-api-key"; // Optional
//            }));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<FinanceDbContext>();
        MockDataSeeder.Seed(context); 
    }

    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "FinanceTrackerApi v1"));
}

app.UseAuthentication();

app.UseCors();
app.UseHttpsRedirection();
app.MapControllers();
app.UseRouting();
app.UseAuthorization();
app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

app.UseResponseCaching();

app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = HealthCheckResponseWriter.WriteResponse
});

try
{
    Log.Information("Starting web application");
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
