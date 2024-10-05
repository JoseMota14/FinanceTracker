namespace TransactionWebApi.CQRS.Queries
{
    public class GetTransactionByIdQuery
    {
        public Guid TransactionId { get; set; }

        public GetTransactionByIdQuery(Guid transactionId)
        {
            TransactionId = transactionId;
        }
    }
}
