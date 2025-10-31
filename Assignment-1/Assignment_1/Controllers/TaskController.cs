using Assignment_1.Models;
using Assignment_1.Services;
using Microsoft.AspNetCore.Mvc;

namespace Assignment_1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public ActionResult<List<TaskItem>> GetAll()
        {
            return _taskService.GetAllTasks();
        }

        [HttpGet("{id}")]
        public ActionResult<TaskItem> GetById(Guid id)
        {
            var task = _taskService.GetTaskById(id);
            if (task == null) return NotFound();
            return task;
        }

        [HttpPost]
        public ActionResult<TaskItem> Create(TaskItem task)
        {
            var newTask = _taskService.CreateTask(task);
            return CreatedAtAction(nameof(GetById), new { id = newTask.Id }, newTask);
        }

        [HttpPut("{id}")]
        public ActionResult<TaskItem> Update(Guid id, TaskItem task)
        {
            var updated = _taskService.UpdateTask(id, task);
            if (updated == null) return NotFound();
            return updated;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var deleted = _taskService.DeleteTask(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
