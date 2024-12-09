using ServiceManager.Services;
using Shared.Bus;
using Shared.Event;

namespace ServiceManager
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IEventBus _eventBus;
        private readonly IServiceProvider _serviceProvider;

        public Worker(ILogger<Worker> logger, IEventBus eventBus, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _eventBus = eventBus;
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Transaction Analytics Worker starting at: {time}", DateTimeOffset.Now);

            // Subscrever aos eventos relevantes
            await SubscribeToEvents();

            while (!stoppingToken.IsCancellationRequested)
            {
                // Executar análises periódicas
                await PerformPeriodicAnalysis();
                await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
            }
        }

        private async Task SubscribeToEvents()
        {
            await _eventBus.SubscribeAsync<TransactionCreatedEvent>(HandleTransactionCreated);
            // Subscrever a outros eventos conforme necessário
        }

        private async Task HandleTransactionCreated(TransactionCreatedEvent @event)
        {
            using var scope = _serviceProvider.CreateScope();
            var analyticsService = scope.ServiceProvider.GetRequiredService<IService>();

            try
            {
                await analyticsService.ProcessNewTransaction(@event);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing transaction event");
            }
        }

        private async Task PerformPeriodicAnalysis()
        {
            using var scope = _serviceProvider.CreateScope();
            var analyticsService = scope.ServiceProvider.GetRequiredService<IService>();

            try
            {
                await analyticsService.AnalyzeSpendingPatterns();
                await analyticsService.GenerateReports();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error performing periodic analysis");
            }
        }
    }

}