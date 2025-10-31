using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Backend.DTOs;
using Backend.Services;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/projects/{projectId}/tasks")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;
        
        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }
        
        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(userIdClaim ?? "0");
        }
        
        // POST: api/projects/{projectId}/tasks
        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTask(int projectId, [FromBody] CreateTaskDto createTaskDto)
        {
            int userId = GetCurrentUserId();
            var task = await _taskService.CreateTaskAsync(projectId, createTaskDto, userId);
            
            if (task == null)
            {
                return NotFound(new { message = "Project not found" });
            }
            
            return CreatedAtAction(nameof(GetTaskById), new { projectId = projectId, taskId = task.Id }, task);
        }
        
        // PUT: api/projects/{projectId}/tasks/{taskId}
        [HttpPut("{taskId}")]
        public async Task<ActionResult<TaskDto>> UpdateTask(int projectId, int taskId, [FromBody] CreateTaskDto updateTaskDto)
        {
            int userId = GetCurrentUserId();
            var task = await _taskService.UpdateTaskAsync(taskId, updateTaskDto, userId);
            
            if (task == null)
            {
                return NotFound(new { message = "Task not found" });
            }
            
            return Ok(task);
        }
        
        // DELETE: api/projects/{projectId}/tasks/{taskId}
        [HttpDelete("{taskId}")]
        public async Task<ActionResult> DeleteTask(int projectId, int taskId)
        {
            int userId = GetCurrentUserId();
            var result = await _taskService.DeleteTaskAsync(taskId, userId);
            
            if (!result)
            {
                return NotFound(new { message = "Task not found" });
            }
            
            return NoContent();
        }
        
        // PATCH: api/projects/{projectId}/tasks/{taskId}/toggle
        [HttpPatch("{taskId}/toggle")]
        public async Task<ActionResult<TaskDto>> ToggleTaskCompletion(int projectId, int taskId)
        {
            int userId = GetCurrentUserId();
            var task = await _taskService.ToggleTaskCompletionAsync(taskId, userId);
            
            if (task == null)
            {
                return NotFound(new { message = "Task not found" });
            }
            
            return Ok(task);
        }
        
        // Helper endpoint for CreatedAtAction
        [HttpGet("{taskId}", Name = nameof(GetTaskById))]
        public async Task<ActionResult<TaskDto>> GetTaskById(int projectId, int taskId)
        {
            int userId = GetCurrentUserId();
            // This would need to be implemented in TaskService
            // For now, just return NotFound as we don't need this endpoint for the assignment
            return NotFound();
        }
    }
}