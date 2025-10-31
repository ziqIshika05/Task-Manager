using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Project
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Title { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Foreign key: Which user owns this project
        public int UserId { get; set; }
        
        // Navigation property: Reference to the owner
        public User User { get; set; } = null!;
        
        // Navigation property: One project has many tasks
        public ICollection<ProjectTask> Tasks { get; set; } = new List<ProjectTask>();
    }
}