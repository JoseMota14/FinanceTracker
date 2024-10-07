using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TransactionWebApi.DTO;
using TransactionWebApi.Services;

namespace TransactionWebApi.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    //public class UserController : ControllerBase
    //{
    //    private readonly IUserService _userService;

    //    public UserController(IUserService userService)
    //    {
    //        _userService = userService;
    //    }

    //    [HttpGet("{id}")]
    //    public async Task<IActionResult> GetUserById(int id)
    //    {
    //        var user = await _userService.GetUserById(id);
    //        if (user == null)
    //        {
    //            return NotFound();
    //        }
    //        return Ok(user);
    //    }

    //    [HttpGet]
    //    public async Task<IActionResult> GetAllUsers()
    //    {
    //        var users = await _userService.GetAllUsers();
            
    //        return Ok(users);
    //    }

    //    [HttpPost]
    //    public async Task<IActionResult> CreateUser([FromBody] CreateUserDto userDto )
    //    {
    //        var newUser = await _userService.CreateUser(userDto);
    //        return CreatedAtAction(nameof(CreateUser), new { name = "Sucess" }, userDto);
    //    }
    //}
}
