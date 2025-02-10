using ServiceWorker.Utils;
using Shared.Bus;
using Shared.Event;
using Shared;
using ServiceWorker.Variables;

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
            //Long duration task run at night when the processor its more free

            _logger.LogInformation("Analyzing spending patterns");
        }

        public async Task ProcessNewTransaction(TransactionCreatedEvent @event)
        {
            _logger.LogInformation("Analyzing spending patterns");
            ProcessQueue(@event);
            await SendEmail(@event.UserId, "New transaction added", $"Transaction with the value {@event.Amount}");
        }

        private void ProcessQueue(BaseEvent @event)
        {
            ContextVariables.Queue.Enqueue((DateTime.Now, @event));
        }


        private async Task SendEmail(string toEmail, string subject, string body)
        {
            await Email.SendEmail(toEmail, subject, body);
        }
    }
}
