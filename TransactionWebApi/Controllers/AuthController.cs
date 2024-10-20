using Microsoft.AspNetCore.Mvc;
using TransactionWebApi.DTO;
using TransactionWebApi.Services;
using TransactionWebApi.Models;
using System.Security.Claims;
using TransactionWebApi.Exceptions;
using TransactionWebApi.Data;
using Microsoft.AspNetCore.Authorization;

namespace TransactionWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            try
            {
                var ret = await _authService.Login(model);
                return Ok(new { Token = ret.Token, RefreshToken = ret.RefreshToken });
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized("Invalid email or password");
            }
            catch (Exception ex)
            {
                return BadRequest("Unexpected error");
            }


        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            try
            {
                await _authService.Register(model);
                return Ok("New user created");
            }
            catch (Exception ex)
            {
                return BadRequest("Unexpected error");
            }


        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshToken model)
        {
            try
            {
                var ret = await _authService.RefreshToken(model);
                return Ok(new { Token = ret.Token, RefreshToken = ret.RefreshToken });
            }
            catch (UnauthorizedException ex)
            {
                return Unauthorized("Logout to obtain new refresh token");
            }
            catch (Exception ex)
            {
                return BadRequest("Unexpected error");
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] RefreshToken model)
        {
            throw new NotImplementedException();
        }
    }
}
