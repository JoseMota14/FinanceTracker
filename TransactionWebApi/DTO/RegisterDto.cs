using System.ComponentModel.DataAnnotations;

namespace TransactionWebApi.DTO
{
    public class RegisterDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
