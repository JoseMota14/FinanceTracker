using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Event
{
    public class TransactionCreatedEvent : BaseEvent
    {
        public decimal Amount { get; set; }
        public string Category { get; set; }
        public DateTime TransactionDate { get; set; }
    }
}
