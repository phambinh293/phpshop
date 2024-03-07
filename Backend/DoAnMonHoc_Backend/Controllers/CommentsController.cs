using DoAnMonHoc_Backend.Interfaces;
using DoAnMonHoc_Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace DoAnMonHoc_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public CommentsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet("GetComments/{prodId}")]
        public async Task<IActionResult> GetComments(int prodId)
        {
            var comments = await _uow.CommentRepository.GetComments(prodId);
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                MaxDepth = 100 // Tăng độ sâu tối đa của đối tượng nếu cần thiết
            };

            string json = JsonSerializer.Serialize(comments, options);
            return Ok(json);
        }
        [HttpGet]
        [Route("GetComment/{id}")]
        public async Task<IActionResult> GetComment(int id)
        {
            var comment = await _uow.CommentRepository.GetComment(id);
            return Ok(comment);
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateComment(Comment comment)
        {
            var checkComment = await _uow.CommentRepository.CommentExist(comment.Id);
            if (checkComment == true)
            {
                return BadRequest();
            }
            _uow.CommentRepository.CreateComment(comment);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }
            return await _uow.CommentRepository.UpdateComment(comment);
        }
        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteComment(int id)
        {
            await _uow.CommentRepository.DeleteComment(id);
            var result = await _uow.SaveAsync();
            if(result == false)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
