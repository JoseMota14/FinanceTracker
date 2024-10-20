namespace TransactionWebApi.CQRS.Queries
{
    public class GetAllTransactionsQuery
    {
        public string User { get; set; }
        public GetAllTransactionsQuery(string user)
        {
            User = user;
        }
    }
}
