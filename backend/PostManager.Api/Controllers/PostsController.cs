using Microsoft.AspNetCore.Mvc;
using PostManager.Api.Dtos;
using PostManager.Api.Services;

namespace PostManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController(IPostService postService) : ControllerBase
{
    private readonly IPostService _postService = postService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PostDto>>> GetPosts([FromQuery] PostQueryDto query)
    {
        var posts = await _postService.GetPostsAsync(query);
        return Ok(posts);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PostDto>> GetPost(int id)
    {
        var post = await _postService.GetPostAsync(id);
        return post is null ? NotFound() : Ok(post);
    }

    [HttpPost]
    public async Task<ActionResult<PostDto>> CreatePost([FromBody] CreatePostDto dto)
    {
        var created = await _postService.CreatePostAsync(dto);
        return CreatedAtAction(nameof(GetPost), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<PostDto>> UpdatePost(int id, [FromBody] UpdatePostDto dto)
    {
        var updated = await _postService.UpdatePostAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeletePost(int id)
    {
        var deleted = await _postService.DeletePostAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
