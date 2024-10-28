using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TransactionWebApi.Models;
using TransactionWebApi.Repository;
using TransactionWebApi.Services;
using Xunit;

namespace UnitTests
{
    public class UserServiceTests
    {
        private readonly Mock<IUserRepository> _mockRepo;
        private readonly IUserService _service;

        public UserServiceTests()
        {
            _mockRepo = new Mock<IUserRepository>();
            _service = new UserService(_mockRepo.Object);
        }

        [Fact]
        public async Task GetUserById_ExistingUser_ReturnsUser()
        {
            // Arrange
            var userId = "jose.mota@gmail.com";
            var user = new User { Email = userId };
            _mockRepo.Setup(repo => repo.GetUserByEmail(userId))
                .ReturnsAsync(user);

            // Act
            var result = await _service.GetUserByEmail(userId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(userId, result.Email);
        }
    }
}
