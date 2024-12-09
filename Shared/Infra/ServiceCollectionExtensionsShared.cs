using Microsoft.Extensions.DependencyInjection;
using Shared.Bus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Infra
{
    public static class ServiceCollectionExtensionsShared
    {
        public static IServiceCollection AddRabbitMQEventBus(this IServiceCollection services, Action<RabbitMQSettings> configure)
        {
            var settings = new RabbitMQSettings();
            configure(settings);

            services.AddSingleton(settings);
            services.AddSingleton<IEventBus, RabbitMQEventBus>();

            return services;
        }
    }
}
