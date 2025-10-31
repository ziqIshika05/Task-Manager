using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs
{
    // Data sent when creating/updating project
    public class CreateProjectDto
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Title { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Description { get; set; }
    }
    
    // Data returned when getting project (without tasks)
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public int TaskCount { get; set; }
    }
    
    // Data returned when getting project details (with tasks)
    public class ProjectDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<TaskDto> Tasks { get; set; } = new();
    }
}