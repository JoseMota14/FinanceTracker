using Microsoft.EntityFrameworkCore;
using TransactionWebApi.Events;
using TransactionWebApi.Models;

namespace TransactionWebApi.Repository
{
    public interface IUserRepository
    {
        Task<User> GetUserByIdAsync(int id);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int id);
        Task<User> GetUserByEmail(string email);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task SaveChangesAsync();
        void AddUserTransaction(TransactionAddedEvent e);
    }
}
