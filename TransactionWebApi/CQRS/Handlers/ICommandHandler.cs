namespace TransactionWebApi.CQRS.Handlers
{
    public interface ICommandHandler<TCommand, TResult>
    {
        Task<TResult> Handle(TCommand command);
    }
}
