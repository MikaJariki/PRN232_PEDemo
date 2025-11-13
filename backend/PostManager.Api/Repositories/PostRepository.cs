using Microsoft.EntityFrameworkCore;
using PostManager.Api.Data;
using PostManager.Api.Models;

namespace PostManager.Api.Repositories;

public class PostRepository(PostDbContext context) : IPostRepository
{
    private readonly PostDbContext _context = context;

    public async Task<List<Post>> GetPostsAsync(string? search, string? sortDirection)
    {
        IQueryable<Post> query = _context.Posts.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim();
            query = query.Where(p => EF.Functions.ILike(p.Name, $"%{term}%"));
        }

        query = sortDirection?.Equals("desc", StringComparison.OrdinalIgnoreCase) == true
            ? query.OrderByDescending(p => p.Name)
            : query.OrderBy(p => p.Name);

        return await query.ToListAsync();
    }

    public Task<Post?> GetByIdAsync(int id) => _context.Posts.FindAsync(id).AsTask();

    public async Task<Post> AddAsync(Post post)
    {
        _context.Posts.Add(post);
        await _context.SaveChangesAsync();
        return post;
    }

    public async Task<Post> UpdateAsync(Post post)
    {
        _context.Posts.Update(post);
        await _context.SaveChangesAsync();
        return post;
    }

    public async Task DeleteAsync(Post post)
    {
        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();
    }
}
