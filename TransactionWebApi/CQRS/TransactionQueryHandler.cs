using AutoMapper;
using TransactionWebApi.CQRS.Handlers;
using TransactionWebApi.CQRS.Queries;
using TransactionWebApi.DTO;
using TransactionWebApi.Repository;

namespace TransactionWebApi.CQRS
{
    public class TransactionQueryHandler : IQueryHandler<GetTransactionByIdQuery, TransactionDto>, IQueryHandler<GetAllTransactionsQuery, IEnumerable<TransactionDto>>
    {
        private readonly ITransactionRepository _repository;
        private readonly IMapper _mapper;

        public TransactionQueryHandler(ITransactionRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<TransactionDto> Handle(GetTransactionByIdQuery query)
        {
            var transaction = await _repository.GetTransactionByIdAsync(query.TransactionId);
            return _mapper.Map<TransactionDto>(transaction);
        }

        public async Task<IEnumerable<TransactionDto>> Handle(GetAllTransactionsQuery query)
        {
            var transactions = await _repository.GetAllTransactionsAsync(query.User);
            return _mapper.Map<IEnumerable<TransactionDto>>(transactions);  
        }

    }
}
