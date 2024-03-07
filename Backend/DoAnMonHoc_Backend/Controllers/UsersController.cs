using AutoMapper;
using DoAnMonHoc_Backend.Dto;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;

namespace DoAnMonHoc_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public UsersController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin(RegisterModel registerModel)
        {
            return await _uow.UserRepositoty.RegisterAdmin(registerModel);
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterModel registerModel)
        {
            return await _uow.UserRepositoty.Register(registerModel);
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginModel account)
        {
            return await _uow.UserRepositoty.Login(account);
        }
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IEnumerable<UserDto>> GetUsers()
        {
            return await _uow.UserRepositoty.GetUsers();
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _uow.UserRepositoty.GetUser(id);
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateUser(string id, UserDto userDto)
        {
            return await _uow.UserRepositoty.UpdateUser(id,userDto);
        }
        [HttpPut]
        [Route("ChangePassword/{id}")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(string id, ChangePasswordModel changePasswordModel)
        {
            return await _uow.UserRepositoty.ChangePassword(id, changePasswordModel);
        }
        [HttpPost]
        [Route("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgetPasswordModel forgetPasswordModel)
        {
            Console.WriteLine("Email: " + forgetPasswordModel);
            if (string.IsNullOrEmpty(forgetPasswordModel.Email))
            {
                return NotFound();
            }
            return await _uow.UserRepositoty.ForgetPassword(forgetPasswordModel);
        }
        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                return await _uow.UserRepositoty.ResetPassword(model);
            }
            return BadRequest("Some properties are not valid");
        }
    }
}
