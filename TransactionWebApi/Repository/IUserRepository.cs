using TransactionWebApi.Models;

namespace TransactionWebApi.Repository
{
    public interface IUserRepository
    {
        Task<User> GetUserByIdAsync(int id);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task DeleteUserAsync(int id);
        Task SaveChangesAsync();
    }
}
