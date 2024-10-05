using TransactionWebApi.DTO;
using TransactionWebApi.Models;

namespace TransactionWebApi.Services
{
    public interface IUserService
    {
        Task<User> GetUserById(int userId);

        Task<UserDto> CreateUser(CreateUserDto user);
    }
}
