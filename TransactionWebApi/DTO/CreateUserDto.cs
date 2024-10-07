using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TransactionWebApi.DTO
{
    public class CreateUserDto
    {
        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public string PasswordSalt { get; set; }
    }
}
