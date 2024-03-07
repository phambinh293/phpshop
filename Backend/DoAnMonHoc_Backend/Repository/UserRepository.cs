using AutoMapper;
using DoAnMonHoc_Backend.Data;
using DoAnMonHoc_Backend.Dto;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DoAnMonHoc_Backend.Repository
{
    public class UserRepository : IUserRepositoty
    {
        private readonly CSDLContext _context;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public UserRepository(CSDLContext context, 
            UserManager<User> userManager, RoleManager<IdentityRole> roleManager,
            IConfiguration configuration, IMapper mapper, IEmailService emailService)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _mapper = mapper;
            _emailService = emailService;
        }

        public async Task<IEnumerable<UserDto>> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var usersDto = _mapper.Map<IEnumerable<UserDto>>(users);
            return usersDto;
        }

        public async Task<IActionResult> Login(LoginModel account)
        {
            var user = await _userManager.FindByNameAsync(account.Username);
            if (user == null)
            {
                return new UnauthorizedResult();
            }
            if(await _userManager.CheckPasswordAsync(user, account.Password) == false)
            {
                return new UnauthorizedResult();
            }
            var userRoles = await _userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
            user.Token = new JwtSecurityTokenHandler().WriteToken(token);
            user.Expiration = token.ValidTo;
            await _context.SaveChangesAsync();
            var userDto = _mapper.Map<UserDto>(user);
            return new OkObjectResult(new
            {
                userDto,
                //token = new JwtSecurityTokenHandler().WriteToken(token),
                //expiration = token.ValidTo
            });
        }

        public async Task<IActionResult> Register(RegisterModel registerModel)
        {
            if(registerModel.Password != registerModel.Repassword)
            {
                return new BadRequestObjectResult("Password must be matched with Repassword!");
            }
            var userExist = await _userManager.FindByNameAsync(registerModel.Username);
            if(userExist != null)
            {
                var errorResponse = new { Message = "User already exists" };
                return new BadRequestObjectResult(errorResponse);
            }
            var checkEmail = await _userManager.FindByEmailAsync(registerModel.Email);
            if (checkEmail != null)
            {
                var errorResponse = new { Message = "Email already exists" };
                return new BadRequestObjectResult(errorResponse);
            }
            User user = new User()
            {
                UserName = registerModel.Username,
                SecurityStamp = Guid.NewGuid().ToString(),
                Email = registerModel.Email
            };
            var result = await _userManager.CreateAsync(user, registerModel.Password);
            if (!result.Succeeded)
            {
                var errorResponse = new { Message = "Something went wrong!" };
                return new BadRequestObjectResult(errorResponse);
            }
            if (await _roleManager.RoleExistsAsync("User"))
            {
                await _userManager.AddToRoleAsync(user, "User");
            }
            return new OkResult();

        }

        public async Task<IActionResult> RegisterAdmin(RegisterModel registerModel)
        {
            if (registerModel.Password != registerModel.Repassword)
            {
                return new BadRequestObjectResult("Password must be matched with Repassword!");
            }
            var userExist = await _userManager.FindByNameAsync(registerModel.Username);
            if (userExist != null)
            {
                var errorResponse = new { Message = "User already exists" };
                return new BadRequestObjectResult(errorResponse);
            }
            var checkEmail = await _userManager.FindByEmailAsync(registerModel.Email);
            if (checkEmail != null)
            {
                var errorResponse = new { Message = "Email already exists" };
                return new BadRequestObjectResult(errorResponse);
            }
            User user = new User()
            {
                Email = registerModel.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerModel.Username
            };
            var result = await _userManager.CreateAsync(user, registerModel.Password);
            if (!result.Succeeded)
            {
                var errorResponse = new { Message = "Something went wrong!" };
                return new BadRequestObjectResult(errorResponse);
            }

            if (!await _roleManager.RoleExistsAsync("Admin"))
                await _roleManager.CreateAsync(new IdentityRole("Admin"));
            if (!await _roleManager.RoleExistsAsync("User"))
                await _roleManager.CreateAsync(new IdentityRole("User"));

            if (await _roleManager.RoleExistsAsync("Admin"))
            {
                await _userManager.AddToRoleAsync(user, "Admin");
            }
            return new OkResult();
        }

        public async Task<IActionResult> UpdateUser(string id, UserDto userDto)
        {
            var userDB = await _userManager.FindByIdAsync(id);
            if (userDB == null)
            {
                return new NotFoundResult();
            }
            _mapper.Map(userDto, userDB);

            // Thực hiện cập nhật thông tin người dùng trong cơ sở dữ liệu
            var result = await _userManager.UpdateAsync(userDB);
            //var user = _mapper.Map<UserDto>(userDB);
            _mapper.Map(userDB, userDto);
            if (result.Succeeded)
            {
                return new OkObjectResult(new
                {
                    userDto
                });
            }

            return new BadRequestObjectResult(result.Errors);
        }

        public async Task<bool> UserExist(string id)
        {
            return await _context.Users.AnyAsync(b => b.Id == id);
        }

        public async Task<User> GetUser(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<IActionResult> ChangePassword(string id,ChangePasswordModel changePasswordModel)
        {
            var user = await GetUser(id);

            if (user == null)
            {
                return new BadRequestObjectResult("Invalid user");
            }

            var changePasswordResult = await _userManager
                .ChangePasswordAsync(user, 
                changePasswordModel.CurrentPassword,
                changePasswordModel.NewPassword);

            if (!changePasswordResult.Succeeded)
            {
                return new BadRequestObjectResult(changePasswordResult.Errors);
            }

            return new OkObjectResult("Password changed successfully");
        }

        public async Task<IActionResult> ForgetPassword(ForgetPasswordModel forgetPasswordModel)
        {
            var user = await _userManager.FindByEmailAsync(forgetPasswordModel.Email);
            if(user == null)
            {
                return new NotFoundObjectResult("Not Found This Email!!!");
            }
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = Encoding.UTF8.GetBytes(token);
            var validToken = WebEncoders.Base64UrlEncode(encodedToken);
            string url = $"{_configuration["AppUrl"]}/{validToken}";

            var body = new EmailModel
            {
                To = forgetPasswordModel.Email,
                Subject = "Link Reset Password",
                Body = $"<h1>Follow this url to reset your password <a href={url}>click here</a></h1>",
            };
            await _emailService.SendEmail(body);

            return new OkObjectResult("Reset Password Link Has Been Sent");
        }

        public async Task<IActionResult> ResetPassword(ResetPasswordModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return new NotFoundObjectResult("Not Found This Email!!!");
            }
            if(model.NewPassword != model.ConfirmPassword)
            {
                return new BadRequestObjectResult("Password doesn't match its confirmation!!!");
            }
            var decodedToken = WebEncoders.Base64UrlDecode(model.Token);
            var token = Encoding.UTF8.GetString(decodedToken);

            var result = await _userManager.ResetPasswordAsync(user, token, model.NewPassword);
            if (result.Succeeded)
            {
                return new OkObjectResult("Password has been reset successfully!!!");
            }
            return new BadRequestObjectResult(result.Errors);
        }
    }
}
