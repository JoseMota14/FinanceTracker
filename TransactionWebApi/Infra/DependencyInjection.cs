using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Shared.Infra;
using System.Text;
using TransactionWebApi.Context;
using TransactionWebApi.CQRS;
using TransactionWebApi.CQRS.Commands;
using TransactionWebApi.CQRS.Dispatchers;
using TransactionWebApi.CQRS.Handlers;
using TransactionWebApi.CQRS.Queries;
using TransactionWebApi.Data;
using TransactionWebApi.DTO;
using TransactionWebApi.Events;
using TransactionWebApi.Infra.Health;
using TransactionWebApi.Models.Validation;
using TransactionWebApi.Repository;
using TransactionWebApi.Services;
using TransactionWebApi.Utils;

namespace TransactionWebApi.Infra
{
    public static class DependencyInjection
    {
        // Culture
        public static readonly string[] SupportedCultures = new string[] { "pt-PT", "en-US" };
        private static readonly string ResourcePath = "Resources";

        public static IServiceCollection AddInfrastucture(this IServiceCollection services, IConfiguration configuration)
        {
            ConfigLoader.Load();

            services.AddHealthChecks();

            services.Configure<RateLimitingOptions>(option =>
            {
                option.MaxRequests = ConfigLoader.Config.RateLimiting.MaxRequests;
                option.TimeWindowIn = ConfigLoader.Config.RateLimiting.TimeWindow;
            });

            // Configure culture and language
            ConfigureLocalization(services);

            ConfigureAuth(services);

            services.AddRabbitMQEventBus(options =>
               configuration.GetSection("RabbitMQSettings").Bind(options));

            services.AddDbContext<FinanceDbContext>(options =>
               options.UseInMemoryDatabase(databaseName: "InMemoryDatabase"));

            // Configure Scopes
            ConfigureScopes(services);

            services.AddControllers();

            services.AddHealthChecks()
                    .AddCheck("DiskSpace", new DiskSpaceHealthCheck());

            //once is using a prodution database is a good approach
            services.AddResponseCaching();
            services.AddMemoryCache();

            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<TransactionValidator>();

            services.AddSwaggerGen();

            LoggsExtension.ConfigureLogging(new LogsDefinition() { Path = Environment.CurrentDirectory + "\\logs" });
            services.AddSerilogLogging();

            return services;
        }
        private static void ConfigureLocalization(IServiceCollection services)
        {
            services.AddLocalization(options => options.ResourcesPath = ResourcePath);

            services.Configure<RequestLocalizationOptions>(options =>
            {
                options.SetDefaultCulture(SupportedCultures[0])
                    .AddSupportedCultures(SupportedCultures)
                    .AddSupportedUICultures(SupportedCultures);
            });
        }

        private static void ConfigureScopes(IServiceCollection services)
        {

            services.AddSingleton<RefreshTokens>();
            services.AddScoped<TokenUtils>();
            services.AddScoped<EventPublisher>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<IAuthService, AuthService>();

            services.AddScoped<ITransactionService, TransactionService>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();

            services.AddScoped<IQueryHandler<GetAllTransactionsQuery, IEnumerable<TransactionDto>>, TransactionQueryHandler>();
            services.AddScoped<IQueryHandler<GetTransactionByIdQuery, TransactionDto>, TransactionQueryHandler>();

            services.AddScoped<ICommandHandler<CreateTransactionCommand, TransactionDto>, TransactionCommandHandler>();
            services.AddScoped<ICommandHandler<UpdateTransactionCommand, TransactionDto>, TransactionCommandHandler>();
            services.AddScoped<ICommandHandler<DeleteTransactionCommand, bool>, TransactionCommandHandler>();

            services.AddScoped<ICommandDispatcher, CommandDispatcher>();
            services.AddScoped<IQueryDispatcher, QueryDispatcher>();
        }

        private static void ConfigureAuth(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(ConfigLoader.Config.AllowedUrl)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = ConfigLoader.Config.Jwt.Issuer,
                        ValidAudience = ConfigLoader.Config.Jwt.Audience, 
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigLoader.Config.Jwt.Secret))
                    };
                });
        }
    }
}


