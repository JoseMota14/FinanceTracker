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
                CreatePasswordHash("string", out byte[] passwordHash, out byte[] passwordSalt);
                var mockUsers = new List<User>
                {
                    new User
                    {
                        Email = "jose.mota@gmail.com",
                        PasswordSalt = passwordSalt,
                        PasswordHash= passwordHash
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
        public static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }

   
}
