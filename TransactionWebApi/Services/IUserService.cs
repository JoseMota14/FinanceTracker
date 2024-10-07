using TransactionWebApi.DTO;
using TransactionWebApi.Models;

namespace TransactionWebApi.Services
{
    public interface IUserService
    {
        Task<User> GetUserById(int userId);

        Task<IEnumerable<User>> GetAllUsers();

        Task<UserDto> CreateUser(CreateUserDto user);

        Task<User> GetUserByEmail(string email);

    }
}
