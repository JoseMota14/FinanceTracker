﻿namespace TransactionWebApi.DTO
{
    public class TransactionDto
    {
        public Guid TransactionId { get; set; }
        public string Category { get; set; }
        public DateTime PurchaseDate { get; set; }
        public decimal Value { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
    }

}
