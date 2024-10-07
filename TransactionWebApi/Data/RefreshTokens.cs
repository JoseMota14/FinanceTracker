using TransactionWebApi.Models;

namespace TransactionWebApi.Data
{
    public class RefreshTokens
    {
        private static RefreshTokens Instance = instance.Value;

        private static readonly Lazy<RefreshTokens> instance = new(new RefreshTokens());

        private Dictionary<string, RefreshToken> _refreshTokens;
        public RefreshTokens()
        {
            _refreshTokens = new Dictionary<string, RefreshToken>();
        }

    }
}
