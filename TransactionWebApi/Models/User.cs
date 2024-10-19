using System.ComponentModel.DataAnnotations;

namespace TransactionWebApi.Models
{
    public class User
    {
        [Key]
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }

        public ICollection<Transaction>? Transactions { get; set; } = new List<Transaction>();
    }
}
