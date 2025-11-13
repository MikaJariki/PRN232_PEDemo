using System.ComponentModel.DataAnnotations;

namespace PostManager.Api.Models;

public class Post
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public required string Name { get; set; }

    [Required]
    [MaxLength(1000)]
    public required string Description { get; set; }

    [Url]
    public string? ImageUrl { get; set; }
}
