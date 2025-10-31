using Backend.DTOs;

namespace Backend.Services
{
    public interface ITaskService
    {
        Task<TaskDto?> CreateTaskAsync(int projectId, CreateTaskDto createTaskDto, int userId);
        Task<TaskDto?> UpdateTaskAsync(int taskId, CreateTaskDto updateTaskDto, int userId);
        Task<bool> DeleteTaskAsync(int taskId, int userId);
        Task<TaskDto?> ToggleTaskCompletionAsync(int taskId, int userId);
    }
}