namespace TransactionWebApi.CQRS.Commands
{
    public class DeleteTransactionCommand
    {
        public Guid Id { get; set; }

        public DeleteTransactionCommand(Guid id)
        {
            Id = id;
        }

    }
}
