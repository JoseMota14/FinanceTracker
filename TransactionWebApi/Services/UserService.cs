﻿using AutoMapper;
using System.Transactions;
using TransactionWebApi.CQRS.Dispatchers;
using TransactionWebApi.DTO;
using TransactionWebApi.Models;
using TransactionWebApi.Repository;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace TransactionWebApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
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
    }
}