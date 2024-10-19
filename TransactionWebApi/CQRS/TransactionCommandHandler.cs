using AutoMapper;
using TransactionWebApi.CQRS.Commands;
using TransactionWebApi.CQRS.Handlers;
using TransactionWebApi.DTO;
using TransactionWebApi.Events;
using TransactionWebApi.Models;
using TransactionWebApi.Repository;

namespace TransactionWebApi.CQRS
{
    public class TransactionCommandHandler: ICommandHandler<CreateTransactionCommand, TransactionDto>, ICommandHandler<UpdateTransactionCommand, TransactionDto>
    {
        private readonly EventPublisher _eventPublisher;

        private readonly ITransactionRepository _repository;
        private readonly IMapper _mapper;

        public TransactionCommandHandler(ITransactionRepository repository, IMapper mapper, EventPublisher eventPublisher)
        {
            _repository = repository;
            _mapper = mapper;
            _eventPublisher = eventPublisher;
        }

        public async Task<TransactionDto> Handle(CreateTransactionCommand command)
        {
            var transaction = TransactionFactory.Create(command);

            await transaction.OnAddingAsync();

            await _repository.AddTransactionAsync(transaction);
            await _repository.SaveChangesAsync();

            _eventPublisher.PublishAddedTransaction(transaction);

            return _mapper.Map<TransactionDto>(transaction);
        }

        public async Task<TransactionDto> Handle(UpdateTransactionCommand command)
        {
            var transaction = _mapper.Map<Transaction>(command.Transaction);
            await _repository.UpdateTransactionAsync(transaction);
            await _repository.SaveChangesAsync();
            return _mapper.Map<TransactionDto>(transaction);
        }
    }
}
