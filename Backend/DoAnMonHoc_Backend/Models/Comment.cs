using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DoAnMonHoc_Backend.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime NgayDang { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        public int ProductId { get; set; }
        [JsonIgnore]
        public Product Product { get; set; }
        public int? CommentId { get; set; }
        [ForeignKey("CommentId")]
        public Comment ParentComment { get; set; }

        public ICollection<Comment> ChildComments { get; set; }
    }
}
