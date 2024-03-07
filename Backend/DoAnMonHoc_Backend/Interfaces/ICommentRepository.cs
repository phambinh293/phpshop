using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace DoAnMonHoc_Backend.Interfaces
{
    public interface ICommentRepository
    {
        Task CreateComment(Comment comment);
        Task<IEnumerable<Comment>> GetComments(int productId);
        Task<Comment> GetComment(int id);
        Task<bool> CommentExist(int id);
        Task<IActionResult> UpdateComment(Comment comment);
        Task DeleteComment(int id);
    }
}
