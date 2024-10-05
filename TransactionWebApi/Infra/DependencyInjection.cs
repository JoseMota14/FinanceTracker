using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using TransactionWebApi.Context;
using TransactionWebApi.CQRS;
using TransactionWebApi.CQRS.Commands;
using TransactionWebApi.CQRS.Dispatchers;
using TransactionWebApi.CQRS.Handlers;
using TransactionWebApi.CQRS.Queries;
using TransactionWebApi.DTO;
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
               options.UseInMemoryDatabase(databaseName: "InMemoryDatabase"))
                ;

            

            services.AddScoped<ITransactionService, TransactionService>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();

            services.AddScoped<IQueryHandler<GetAllTransactionsQuery, IEnumerable<TransactionDto>>, TransactionQueryHandler>();

            services.AddScoped<ICommandHandler<CreateTransactionCommand, TransactionDto>, TransactionCommandHandler>();

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
