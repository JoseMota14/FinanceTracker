using ServiceWorker.Utils;
using Shared.Bus;
using Shared.Event;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Services
{
    public class Service : IService
    {
        private readonly ILogger<Service> _logger;
        private readonly IEventBus _eventBus;

        public Service(ILogger<Service> logger, IEventBus eventBus)
        {
            _logger = logger;
            _eventBus = eventBus;
        }



        public async Task AnalyzeSpendingPatterns()
        {
            _logger.LogInformation("Analyzing spending patterns");
        }

        public async Task GenerateReports()
        {
            _logger.LogInformation("Analyzing spending patterns");
        }

        public async Task ProcessNewTransaction(TransactionCreatedEvent @event)
        {
            _logger.LogInformation("Analyzing spending patterns");
            await SendEmail(@event.UserId, "New transaction added", $"Transaction with the value {@event.Amount}");
        }

        private async Task SendEmail(string toEmail, string subject, string body)
        {
            await Email.SendEmail(toEmail, subject, body);
        }
    }
}
