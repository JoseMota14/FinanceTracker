using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using TransactionWebApi.Context;
using TransactionWebApi.Models.Validation;
using TransactionWebApi.Repository;
using TransactionWebApi.Services;

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


            services.AddDbContext<FinanceDbContext>(options =>
               options.UseInMemoryDatabase(databaseName: "InMemoryDatabase"));

            services.AddScoped<ITransactionRepository, TransactionRepository>();
            services.AddScoped<TransactionService>();

            services.AddControllers();
            
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<TransactionValidator>();  

            services.AddSwaggerGen();

            return services;
        }
    }
}
