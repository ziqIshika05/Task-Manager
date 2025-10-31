using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ProjectService : IProjectService
    {
        private readonly AppDbContext _context;
        
        public ProjectService(AppDbContext context)
        {
            _context = context;
        }
        
        public async Task<List<ProjectDto>> GetUserProjectsAsync(int userId)
        {
            var projects = await _context.Projects
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedAt)
                .Select(p => new ProjectDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    CreatedAt = p.CreatedAt,
                    TaskCount = p.Tasks.Count
                })
                .ToListAsync();
            
            return projects;
        }
        
        public async Task<ProjectDetailDto?> GetProjectByIdAsync(int projectId, int userId)
        {
            var project = await _context.Projects
                .Include(p => p.Tasks)
                .Where(p => p.Id == projectId && p.UserId == userId)
                .Select(p => new ProjectDetailDto
                {
                    Id = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    CreatedAt = p.CreatedAt,
                    Tasks = p.Tasks.Select(t => new TaskDto
                    {
                        Id = t.Id,
                        Title = t.Title,
                        DueDate = t.DueDate,
                        IsCompleted = t.IsCompleted,
                        CreatedAt = t.CreatedAt,
                        ProjectId = t.ProjectId
                    }).ToList()
                })
                .FirstOrDefaultAsync();
            
            return project;
        }
        
        public async Task<ProjectDto?> CreateProjectAsync(CreateProjectDto createProjectDto, int userId)
        {
            var project = new Project
            {
                Title = createProjectDto.Title,
                Description = createProjectDto.Description,
                UserId = userId,
                CreatedAt = DateTime.UtcNow
            };
            
            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            
            return new ProjectDto
            {
                Id = project.Id,
                Title = project.Title,
                Description = project.Description,
                CreatedAt = project.CreatedAt,
                TaskCount = 0
            };
        }
        
        public async Task<bool> DeleteProjectAsync(int projectId, int userId)
        {
            var project = await _context.Projects
                .FirstOrDefaultAsync(p => p.Id == projectId && p.UserId == userId);
            
            if (project == null)
            {
                return false; // Project not found or doesn't belong to user
            }
            
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            
            return true;
        }
    }
}