using Microsoft.EntityFrameworkCore;
using TransactionWebApi.Context;
using TransactionWebApi.Events;
using TransactionWebApi.Models;

namespace TransactionWebApi.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly FinanceDbContext _context;

        public UserRepository(FinanceDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }


        public async Task<User> GetUserByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await GetUserByIdAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
            }
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public void AddUserTransaction(TransactionAddedEvent e)
        {
            var user = _context.Users.Include(u => u.Transactions).SingleOrDefault(x => x.Email == e.Transaction.UserEmail);

            if (user != null)
            {
                user.Transactions.Add(e.Transaction);
                _context.SaveChanges();
            }
        }
    }
}
