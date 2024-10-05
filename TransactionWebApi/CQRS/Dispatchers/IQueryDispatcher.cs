namespace TransactionWebApi.CQRS.Dispatchers
{
    public interface IQueryDispatcher
    {
        Task<TResult> Dispatch<TQuery, TResult>(TQuery query);

    }
}
