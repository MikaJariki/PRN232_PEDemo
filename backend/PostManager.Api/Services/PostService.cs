using PostManager.Api.Dtos;
using PostManager.Api.Models;
using PostManager.Api.Repositories;

namespace PostManager.Api.Services;

public class PostService(IPostRepository repository) : IPostService
{
    private readonly IPostRepository _repository = repository;

    public async Task<IEnumerable<PostDto>> GetPostsAsync(PostQueryDto query)
    {
        var posts = await _repository.GetPostsAsync(query.Search, query.SortDirection);
        return posts.Select(MapToDto);
    }

    public async Task<PostDto?> GetPostAsync(int id)
    {
        var post = await _repository.GetByIdAsync(id);
        return post is null ? null : MapToDto(post);
    }

    public async Task<PostDto> CreatePostAsync(CreatePostDto dto)
    {
        var post = new Post
        {
            Name = dto.Name,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl
        };

        var created = await _repository.AddAsync(post);
        return MapToDto(created);
    }

    public async Task<PostDto?> UpdatePostAsync(int id, UpdatePostDto dto)
    {
        var post = await _repository.GetByIdAsync(id);
        if (post is null)
        {
            return null;
        }

        post.Name = dto.Name;
        post.Description = dto.Description;
        post.ImageUrl = dto.ImageUrl;

        var updated = await _repository.UpdateAsync(post);
        return MapToDto(updated);
    }

    public async Task<bool> DeletePostAsync(int id)
    {
        var post = await _repository.GetByIdAsync(id);
        if (post is null)
        {
            return false;
        }

        await _repository.DeleteAsync(post);
        return true;
    }

    private static PostDto MapToDto(Post post) => new()
    {
        Id = post.Id,
        Name = post.Name,
        Description = post.Description,
        ImageUrl = post.ImageUrl
    };
}
