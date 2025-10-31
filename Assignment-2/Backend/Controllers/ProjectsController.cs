using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Backend.DTOs;
using Backend.Services;
using System.Security.Claims;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Requires JWT authentication
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;
        
        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }
        
        // Helper method to get current user ID from JWT token
        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(userIdClaim ?? "0");
        }
        
        // GET: api/projects
        [HttpGet]
        public async Task<ActionResult<List<ProjectDto>>> GetAllProjects()
        {
            int userId = GetCurrentUserId();
            var projects = await _projectService.GetUserProjectsAsync(userId);
            return Ok(projects);
        }
        
        // GET: api/projects/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDetailDto>> GetProjectById(int id)
        {
            int userId = GetCurrentUserId();
            var project = await _projectService.GetProjectByIdAsync(id, userId);
            
            if (project == null)
            {
                return NotFound(new { message = "Project not found" });
            }
            
            return Ok(project);
        }
        
        // POST: api/projects
        [HttpPost]
        public async Task<ActionResult<ProjectDto>> CreateProject([FromBody] CreateProjectDto createProjectDto)
        {
            int userId = GetCurrentUserId();
            var project = await _projectService.CreateProjectAsync(createProjectDto, userId);
            
            if (project == null)
            {
                return BadRequest(new { message = "Failed to create project" });
            }
            
            return CreatedAtAction(nameof(GetProjectById), new { id = project.Id }, project);
        }
        
        // DELETE: api/projects/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(int id)
        {
            int userId = GetCurrentUserId();
            var result = await _projectService.DeleteProjectAsync(id, userId);
            
            if (!result)
            {
                return NotFound(new { message = "Project not found" });
            }
            
            return NoContent();
        }
    }
}