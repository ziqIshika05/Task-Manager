using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class ProjectTask
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        public DateTime? DueDate { get; set; }
        
        public bool IsCompleted { get; set; } = false;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Foreign key: Which project this task belongs to
        public int ProjectId { get; set; }
        
        // Navigation property: Reference to the parent project
        public Project Project { get; set; } = null!;
    }
}