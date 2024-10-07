using Microsoft.AspNetCore.Mvc;
using TransactionWebApi.DTO;
using TransactionWebApi.Models;

namespace TransactionWebApi.Services
{
    public interface IAuthService
    {
        Task<(string Token, string RefreshToken)> Login(LoginDto loginDto);

        Task Register(RegisterDto model);

        Task<(string Token, string RefreshToken)> RefreshToken(RefreshToken model);
    }
}
