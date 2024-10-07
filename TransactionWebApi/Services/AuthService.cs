using System.Security.Claims;
using TransactionWebApi.DTO;
using TransactionWebApi.Exceptions;
using TransactionWebApi.Models;
using TransactionWebApi.Repository;
using TransactionWebApi.Utils;

namespace TransactionWebApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly TokenUtils _tokenUtils;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, TokenUtils tokenUtils, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _tokenUtils = tokenUtils;
            _configuration = configuration;
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public bool VerifyPassword(string password, byte[] storedHash, byte[] storedSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(storedHash);
            }
        }

        public async Task<(string Token, string RefreshToken)> Login(LoginDto loginDto)
        {
            var user = await _userRepository.GetUserByEmail(loginDto.Email);
            if (user == null || !VerifyPassword(loginDto.Password, user.PasswordHash, user.PasswordSalt))
            {
                throw new UnauthorizedException("Invalid email or password");
            }

            var token = _tokenUtils.GenerateJwtToken(user.Email);
            var refreshToken = _tokenUtils.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _userRepository.UpdateUserAsync(user);
            await _userRepository.SaveChangesAsync();

            return (Token: token, RefreshToken: refreshToken);
        }

        public async Task Register(RegisterDto model)
        {
            if (await _userRepository.GetUserByEmail(model.Email) != null)
            {
                throw new ApplicationException("User already exists");
            }

            CreatePasswordHash(model.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var user = new User
            {
                Email = model.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            await _userRepository.AddUserAsync(user);
            await _userRepository.SaveChangesAsync();
        }

        public async Task<(string Token, string RefreshToken)> RefreshToken(RefreshToken model)
        {
            var principal = _tokenUtils.GetPrincipalFromExpiredToken(model.Token);
            var email = principal.FindFirst(ClaimTypes.Email)?.Value;

            var user = await _userRepository.GetUserByEmail(email);
            if (user == null || user.RefreshToken != model.RefreshTokenValue || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                throw new UnauthorizedException("Invalid refresh token");
            }

            var newToken = _tokenUtils.GenerateJwtToken(email);
            var newRefreshToken = _tokenUtils.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;

            await _userRepository.UpdateUserAsync(user);
            await _userRepository.SaveChangesAsync();

            return (Token : newToken, RefreshToken : newRefreshToken );
        }
    }
}
