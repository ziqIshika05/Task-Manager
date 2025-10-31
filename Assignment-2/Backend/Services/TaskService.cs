using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;
        
        public TaskService(AppDbContext context)
        {
            _context = context;
        }
        
        public async Task<TaskDto?> CreateTaskAsync(int projectId, CreateTaskDto createTaskDto, int userId)
        {
            // Verify project exists and belongs to user
            var projectExists = await _context.Projects
                .AnyAsync(p => p.Id == projectId && p.UserId == userId);
            
            if (!projectExists)
            {
                return null; // Project not found or doesn't belong to user
            }
            
            var task = new ProjectTask
            {
                Title = createTaskDto.Title,
                DueDate = createTaskDto.DueDate,
                IsCompleted = createTaskDto.IsCompleted,
                ProjectId = projectId,
                CreatedAt = DateTime.UtcNow
            };
            
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            
            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                DueDate = task.DueDate,
                IsCompleted = task.IsCompleted,
                CreatedAt = task.CreatedAt,
                ProjectId = task.ProjectId
            };
        }
        
        public async Task<TaskDto?> UpdateTaskAsync(int taskId, CreateTaskDto updateTaskDto, int userId)
        {
            // Find task and verify user owns the parent project
            var task = await _context.Tasks
                .Include(t => t.Project)
                .FirstOrDefaultAsync(t => t.Id == taskId && t.Project.UserId == userId);
            
            if (task == null)
            {
                return null; // Task not found or user doesn't own it
            }
            
            // Update task properties
            task.Title = updateTaskDto.Title;
            task.DueDate = updateTaskDto.DueDate;
            task.IsCompleted = updateTaskDto.IsCompleted;
            
            await _context.SaveChangesAsync();
            
            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                DueDate = task.DueDate,
                IsCompleted = task.IsCompleted,
                CreatedAt = task.CreatedAt,
                ProjectId = task.ProjectId
            };
        }
        
        public async Task<bool> DeleteTaskAsync(int taskId, int userId)
        {
            // Find task and verify user owns the parent project
            var task = await _context.Tasks
                .Include(t => t.Project)
                .FirstOrDefaultAsync(t => t.Id == taskId && t.Project.UserId == userId);
            
            if (task == null)
            {
                return false; // Task not found or user doesn't own it
            }
            
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            
            return true;
        }
        
        public async Task<TaskDto?> ToggleTaskCompletionAsync(int taskId, int userId)
        {
            // Find task and verify user owns the parent project
            var task = await _context.Tasks
                .Include(t => t.Project)
                .FirstOrDefaultAsync(t => t.Id == taskId && t.Project.UserId == userId);
            
            if (task == null)
            {
                return null; // Task not found or user doesn't own it
            }
            
            // Toggle completion status
            task.IsCompleted = !task.IsCompleted;
            
            await _context.SaveChangesAsync();
            
            return new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                DueDate = task.DueDate,
                IsCompleted = task.IsCompleted,
                CreatedAt = task.CreatedAt,
                ProjectId = task.ProjectId
            };
        }
    }
}