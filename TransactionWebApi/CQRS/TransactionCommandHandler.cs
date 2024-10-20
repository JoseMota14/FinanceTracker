using AutoMapper;
using TransactionWebApi.CQRS.Commands;
using TransactionWebApi.CQRS.Handlers;
using TransactionWebApi.DTO;
using TransactionWebApi.Events;
using TransactionWebApi.Models;
using TransactionWebApi.Repository;

namespace TransactionWebApi.CQRS
{
    public class TransactionCommandHandler : ICommandHandler<CreateTransactionCommand, TransactionDto>, ICommandHandler<UpdateTransactionCommand, TransactionDto>, ICommandHandler<DeleteTransactionCommand, bool>
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
            var existingTransaction = await _repository.GetTransactionByIdAsync(command.Id);
            if (existingTransaction == null)
            {
                throw new ArgumentNullException("No transaction  with that ID");
            }

            existingTransaction.Description = command.Transaction.Description;
            existingTransaction.Value = command.Transaction.Value;
            existingTransaction.Category = command.Transaction.Category;
            existingTransaction.PurchaseDate = command.Transaction.PurchaseDate;

            await _repository.UpdateTransactionAsync(existingTransaction);
            await _repository.SaveChangesAsync();
            return _mapper.Map<TransactionDto>(existingTransaction);
        }

        public async Task<bool> Handle(DeleteTransactionCommand command)
        {
            await _repository.DeleteTransactionAsync(command.Id);
            await _repository.SaveChangesAsync();
            return true;
        }
    }
}
