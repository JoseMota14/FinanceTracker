using TransactionWebApi.Models;

namespace TransactionWebApi.Events
{
    public class EventPublisher
    {
        public event EventHandler<TransactionAddedEvent> TransactionAdded;

        public void PublishAddedTransaction(Transaction transaction)
        {
            TransactionAdded?.Invoke(this, new TransactionAddedEvent(transaction));
        }
    }

    public partial class TransactionAddedEvent
    {
        public Transaction Transaction { get; }

        public TransactionAddedEvent(Transaction transaction)
        {
            Transaction = transaction;
        }
    }
}
