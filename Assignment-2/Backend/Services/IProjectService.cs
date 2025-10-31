using Backend.DTOs;

namespace Backend.Services
{
    public interface IProjectService
    {
        Task<List<ProjectDto>> GetUserProjectsAsync(int userId);
        Task<ProjectDetailDto?> GetProjectByIdAsync(int projectId, int userId);
        Task<ProjectDto?> CreateProjectAsync(CreateProjectDto createProjectDto, int userId);
        Task<bool> DeleteProjectAsync(int projectId, int userId);
    }
}