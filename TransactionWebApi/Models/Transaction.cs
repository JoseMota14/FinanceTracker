namespace TransactionWebApi.Models
{
    public class Transaction
    {
        public Guid TransactionId { get; set; }
        public string Category { get; set; }
        public DateTime PurchaseDate { get; set; }
        public decimal Value { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }

        public virtual Task OnAddingAsync()
        {
            return Task.CompletedTask;
        }
    }
}
