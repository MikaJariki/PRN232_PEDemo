using System.ComponentModel.DataAnnotations;

namespace PostManager.Api.Dtos;

public class PostDto
{
    public int Id { get; init; }

    public required string Name { get; init; }

    public required string Description { get; init; }

    public string? ImageUrl { get; init; }
}

public class CreatePostDto
{
    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, MaxLength(1000)]
    public string Description { get; set; } = string.Empty;

    [Url]
    public string? ImageUrl { get; set; }
}

public class UpdatePostDto
{
    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, MaxLength(1000)]
    public string Description { get; set; } = string.Empty;

    [Url]
    public string? ImageUrl { get; set; }
}
