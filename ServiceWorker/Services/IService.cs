using Shared.Event;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Services
{
    internal interface IService
    {
        Task AnalyzeSpendingPatterns();
        Task GenerateReports();
        Task ProcessNewTransaction(TransactionCreatedEvent @event);
    }
}
