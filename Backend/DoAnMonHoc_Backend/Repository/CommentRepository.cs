using DoAnMonHoc_Backend.Data;
using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DoAnMonHoc_Backend.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly CSDLContext _context;
        public CommentRepository(CSDLContext context)
        {
            _context = context;
        }
        public async Task<bool> CommentExist(int id)
        {
            return await _context.Comments.AnyAsync(b => b.Id == id);
        }

        public async Task CreateComment(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
        }

        public async Task DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment != null)
            {
                _context.Comments.Remove(comment);
            }
        }

        public async Task<Comment> GetComment(int id)
        {
            return await _context.Comments.Include(i => i.User)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Comment>> GetComments(int productId)
        {
            return await _context.Comments.Include(i => i.User)
                .Include(c => c.ChildComments)
                .Where(c => c.ProductId == productId && c.ParentComment == null)
                .ToListAsync();
        }

        public async Task<IActionResult> UpdateComment(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (!await CommentExist(comment.Id))
                {
                    return new NotFoundResult();
                }
                else
                {
                    throw;
                }
            }
            return new OkResult();
        }
    }
}
