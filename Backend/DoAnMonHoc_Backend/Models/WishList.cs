using System.ComponentModel.DataAnnotations.Schema;

namespace DoAnMonHoc_Backend.Models
{
    public class WishList
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public int PhoneId { get; set; }
        [ForeignKey("PhoneId")]
        public Phone Phone { get; set; }
    }
}
