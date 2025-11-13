using PostManager.Api.Models;

namespace PostManager.Api.Repositories;

public interface IPostRepository
{
    Task<List<Post>> GetPostsAsync(string? search, string? sortDirection);
    Task<Post?> GetByIdAsync(int id);
    Task<Post> AddAsync(Post post);
    Task<Post> UpdateAsync(Post post);
    Task DeleteAsync(Post post);
}
