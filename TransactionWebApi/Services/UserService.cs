using AutoMapper;
using System.Transactions;
using TransactionWebApi.CQRS.Dispatchers;
using TransactionWebApi.DTO;
using TransactionWebApi.Events;
using TransactionWebApi.Models;
using TransactionWebApi.Repository;

namespace TransactionWebApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public UserService(IUserRepository userRepository, IMapper mapper, EventPublisher eventPublisher)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            eventPublisher.TransactionAdded += OnTransactionAdded;
        }


        private void OnTransactionAdded(object? sender, TransactionAddedEvent transaction)
        {
            _userRepository.AddUserTransaction(transaction);
        }

        public async Task<UserDto> CreateUser(CreateUserDto userDto)
        {
            var user = _mapper.Map<User>(userDto);

            await _userRepository.AddUserAsync(user);
            await _userRepository.SaveChangesAsync();

            return _mapper.Map<UserDto>(user);
        }

        public async Task<User> GetUserById(int userId)
        {
            var user = await _userRepository.GetUserByIdAsync(userId);
            return user;
        }

        public async Task<User> GetUserByEmail(string email)
        {
            var user = await _userRepository.GetUserByEmail(email);
            return user;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _userRepository.GetAllUsersAsync();
        }

    }
}
