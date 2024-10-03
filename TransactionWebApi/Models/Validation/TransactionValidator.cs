using FluentValidation;

namespace TransactionWebApi.Models.Validation
{
    public class TransactionValidator : AbstractValidator<Transaction>
    {
        public TransactionValidator()
        {
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.Value).GreaterThan(0);
            RuleFor(x => x.PurchaseDate).NotEmpty();
            RuleFor(x => x.Type).NotEmpty().Must(type => type == "income" || type == "expense");
        }
    }
}
