using DoAnMonHoc_Backend.Dto;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace DoAnMonHoc_Backend.Interfaces
{
    public interface IUserRepositoty
    {
        Task<IActionResult> RegisterAdmin(RegisterModel registerModel);
        Task<IActionResult> Register(RegisterModel registerModel);
        Task<IActionResult> Login([Bind("Username,Password")] LoginModel account);
        Task<IActionResult> UpdateUser(string id, UserDto userDto);
        Task<IActionResult> ChangePassword(string id, ChangePasswordModel changePasswordModel);
        Task<IEnumerable<UserDto>> GetUsers();
        Task<User> GetUser(string id);
        Task<User> GetUserByEmail(string email);
        Task<bool> UserExist(string id);
        Task<IActionResult> ForgetPassword(ForgetPasswordModel forgetPasswordModel);
        Task<IActionResult> ResetPassword(ResetPasswordModel model);

    }
}
