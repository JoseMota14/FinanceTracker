using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TransactionWebApi.Context;
using TransactionWebApi.CQRS;
using TransactionWebApi.CQRS.Commands;
using TransactionWebApi.CQRS.Dispatchers;
using TransactionWebApi.CQRS.Handlers;
using TransactionWebApi.CQRS.Queries;
using TransactionWebApi.Data;
using TransactionWebApi.DTO;
using TransactionWebApi.Models.Validation;
using TransactionWebApi.Repository;
using TransactionWebApi.Services;
using TransactionWebApi.Utils;

namespace TransactionWebApi.Infra
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastucture(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddHealthChecks();

            string[] urls = configuration["AllowedUrl"].Split(";");
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(urls)
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
                        ValidIssuer = configuration["Jwt:Issuer"],
                        ValidAudience = configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]))
                    };
                });

            services.AddDbContext<FinanceDbContext>(options =>
               options.UseInMemoryDatabase(databaseName: "InMemoryDatabase"));

            services.AddSingleton<RefreshTokens>();
            services.AddScoped<TokenUtils>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<IAuthService, AuthService>();

            services.AddScoped<ITransactionService, TransactionService>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();

            

            services.AddScoped<IQueryHandler<GetAllTransactionsQuery, IEnumerable<TransactionDto>>, TransactionQueryHandler>();
            services.AddScoped<IQueryHandler<GetTransactionByIdQuery, TransactionDto>, TransactionQueryHandler>();

            services.AddScoped<ICommandHandler<CreateTransactionCommand, TransactionDto>, TransactionCommandHandler>();
            services.AddScoped<ICommandHandler<UpdateTransactionCommand, TransactionDto>, TransactionCommandHandler>();

            services.AddScoped<ICommandDispatcher, CommandDispatcher>();
            services.AddScoped<IQueryDispatcher, QueryDispatcher>();

            services.AddControllers();

            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<TransactionValidator>();

            services.AddSwaggerGen();

            return services;
        }
    }
}
