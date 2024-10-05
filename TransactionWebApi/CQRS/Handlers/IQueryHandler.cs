using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace TransactionWebApi.CQRS.Handlers
{
    public interface IQueryHandler<TQuery, TResult>
    {
        Task<TResult> Handle(TQuery query);
    }
}
