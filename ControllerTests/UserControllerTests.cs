using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TransactionWebApi.DTO;
using Xunit;

namespace ControllerTests
{
    public class UserControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;
        private readonly HttpClient _client;

        public UserControllerTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetUser_ExistingUser_ReturnsOk()
        {
            // Arrange
            var userId = "jose.mota@gmail.com";

            // Act
            var response = await _client.GetAsync($"/api/users/{userId}");

            // Assert
            response.EnsureSuccessStatusCode();
            //var user = await response.Content.ReadFromJsonAsync<UserDto>();
            //Assert.NotNull(user);
            //Assert.Equal(userId, user.Id);
        }
    }
}
