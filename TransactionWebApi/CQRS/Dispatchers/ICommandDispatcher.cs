namespace TransactionWebApi.CQRS.Dispatchers
{
    public interface ICommandDispatcher
    {
        Task<TResult> Dispatch<TCommand, TResult>(TCommand command);
    }
}
