using PostManager.Api.Dtos;

namespace PostManager.Api.Services;

public interface IPostService
{
    Task<IEnumerable<PostDto>> GetPostsAsync(PostQueryDto query);
    Task<PostDto?> GetPostAsync(int id);
    Task<PostDto> CreatePostAsync(CreatePostDto dto);
    Task<PostDto?> UpdatePostAsync(int id, UpdatePostDto dto);
    Task<bool> DeletePostAsync(int id);
}
