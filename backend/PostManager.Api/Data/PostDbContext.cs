using Microsoft.EntityFrameworkCore;
using PostManager.Api.Models;

namespace PostManager.Api.Data;

public class PostDbContext(DbContextOptions<PostDbContext> options) : DbContext(options)
{
    public DbSet<Post> Posts => Set<Post>();
}
