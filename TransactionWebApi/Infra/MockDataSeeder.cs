using System;
using TransactionWebApi.Context;
using TransactionWebApi.Models;

namespace TransactionWebApi.Infra
{
    public static class MockDataSeeder
    {
        public static void Seed(FinanceDbContext context)
        {
            // Check if the DB is already seeded
            if (!context.Transactions.Any())
            {
                var mockUsers = new List<User>
                {
                    new User
                    {
                        Email = "jose.mota@gmail.com",
                        PasswordSalt = new byte[] {},
                        PasswordHash= new byte[] {}
                    }
                };

                context.Users.AddRange(mockUsers);
                context.SaveChanges();


                var mockTransactions = new List<Transaction>
                {
                    new Transaction
                    {
                        TransactionId = Guid.NewGuid(),
                        Type = "income",
                        PurchaseDate = DateTime.Now.AddDays(-10),
                        Value = 500,
                        Description = "Freelance Work",
                        UserEmail = "jose.mota@gmail.com"
                    },
                    new Transaction
                    {
                        TransactionId = Guid.NewGuid(),
                        Type = "expense",
                        PurchaseDate = DateTime.Now.AddDays(-5),
                        Value = 100,
                        Description = "Groceries",
                        UserEmail = "jose.mota@gmail.com"
                    },
                    new Transaction
                    {
                        TransactionId = Guid.NewGuid(),
                        Type = "expense",
                        PurchaseDate = DateTime.Now.AddDays(-11),
                        Value = 111,
                        Description = "Groceries",
                        UserEmail = "jose.mota@gmail.com"
                    },
                    new Transaction
                    {
                        TransactionId = Guid.NewGuid(),
                        Type = "expense",
                        PurchaseDate = DateTime.Now.AddDays(-11),
                        Value = 111,
                        Description = "Clothes",
                        UserEmail = "jose.mota@gmail.com"
                    },
                    new Transaction
                    {
                        TransactionId = Guid.NewGuid(),
                        Type = "expense",
                        PurchaseDate = DateTime.Now.AddDays(-6),
                        Value = 1100,
                        Description = "Groceries",
                        UserEmail = "jose.mota@gmail.com"
                    }
                };

                context.Transactions.AddRange(mockTransactions);
                context.SaveChanges();
            }
        }
    }
}
