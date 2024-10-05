namespace TransactionWebApi.Models.Sub
{
    public class ExpenseTransaction : Transaction
    {
        public ExpenseTransaction()
        {
            Type = "expense";
        }
        public override async Task OnAddingAsync()
        {
            await SendExpenseNotificationEmail();
        }

        private Task SendExpenseNotificationEmail()
        {
            Console.WriteLine("Sending notification email for expense transaction...");
            return Task.CompletedTask;
        }
    }
}
