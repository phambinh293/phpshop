using System.ComponentModel.DataAnnotations;

namespace DoAnMonHoc_Backend.Models
{
    public class RegisterModel
    {
        [Required]
        public string  Username { get; set; }
        [Required]
        public string  Password { get; set; }
        [Required]
        public string  Repassword { get; set; }
        [Required]
        public string  Email { get; set; }
    }
}
