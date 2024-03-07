using System.ComponentModel.DataAnnotations;

namespace DoAnMonHoc_Backend.Models
{
    public class ResetPasswordModel
    {
        [Required]
        public string Token { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string NewPassword { get; set; }
        [Required]
        public string ConfirmPassword { get; set; }
    }
}
