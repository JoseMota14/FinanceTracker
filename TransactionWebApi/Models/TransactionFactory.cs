using TransactionWebApi.CQRS.Commands;
using TransactionWebApi.Models.Sub;

namespace TransactionWebApi.Models
{
    public static class TransactionFactory
    {
        public static Transaction Create(CreateTransactionCommand command)
        {
            return command.Transaction.Type switch
            {
                "income" => new IncomeTransaction
                {
                    TransactionId = Guid.NewGuid(),
                    Category = command.Transaction.Category,
                    PurchaseDate = command.Transaction.PurchaseDate,
                    Value = command.Transaction.Value,
                    Description = command.Transaction.Description
                },
                "expense" => new ExpenseTransaction
                {
                    TransactionId = Guid.NewGuid(),
                    Category = command.Transaction.Category,
                    PurchaseDate = command.Transaction.PurchaseDate,
                    Value = command.Transaction.Value,
                    Description = command.Transaction.Description
                },
                _ => throw new ArgumentException("Invalid transaction type")
            };
        }
    }
}
