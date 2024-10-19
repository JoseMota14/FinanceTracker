namespace TransactionWebApi.DTO
{
    public class CreateTransactionDto
    {
        public string Category { get; set; }
        public DateTime PurchaseDate { get; set; }
        public decimal Value { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }

        public string? UserId { get; set; }
    }
}
