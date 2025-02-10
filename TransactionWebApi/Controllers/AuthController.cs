using Microsoft.AspNetCore.Mvc;
using TransactionWebApi.DTO;
using TransactionWebApi.Services;
using TransactionWebApi.Models;
using System.Security.Claims;
using TransactionWebApi.Exceptions;
using TransactionWebApi.Data;
using Microsoft.AspNetCore.Authorization;
using TransactionWebApi.Utils;

namespace TransactionWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ILogger<AuthController> _logger;
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            try
            {
                var ret = await _authService.Login(model);
                _logger.LogInformation($"Log for username: {model.Email} with sucess");
                return Ok(new { Token = ret.Token, RefreshToken = ret.RefreshToken });
            }
            catch (UnauthorizedException)
            {
                _logger.LogError($"Log for username: {model.Email} with invalid email or password");
                return Unauthorized("Invalid email or password");
            }
            catch (Exception)
            {
                _logger.LogError($"Log for username: {model.Email} with unexpected error");
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
                _logger.LogInformation($"Sign up for username: {model.Email} with sucess");
                return Ok("New user created");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Sign up for username: {model.Email} with error : {ex.Message}");
                return BadRequest("Unexpected error");
            }


        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshToken model)
        {
            try
            {
                var lang = Request.Headers.CultureAddOn();
                var ret = await _authService.RefreshToken(model, lang);
                _logger.LogInformation($"Refresh token with sucess");
                return Ok(new { Token = ret.Token, RefreshToken = ret.RefreshToken });
            }
            catch (UnauthorizedException ex)
            {
                _logger.LogError($"Refresh token with error");
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Refresh token with error {ex.Message}");
                return BadRequest("Unexpected error");
            }
        }

        [HttpGet("logout/{user}")]
        public async Task<IActionResult> Logout(string user)
        {
            try
            {
                await _authService.Logout(user);
                return Ok("Logout ok");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Refresh token with error {ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }
}
