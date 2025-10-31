using Assignment_1.Models;

namespace Assignment_1.Services
{
    public class TaskService : ITaskService
    {
        private readonly List<TaskItem> _tasks = new();

        public TaskService()
        {
            // Seed with some initial data for testing
            _tasks.Add(new TaskItem
            {
                Id = Guid.NewGuid(),
                Description = "Complete the backend API",
                IsCompleted = false
            });
            _tasks.Add(new TaskItem
            {
                Id = Guid.NewGuid(),
                Description = "Build the React frontend",
                IsCompleted = false
            });
        }

        public List<TaskItem> GetAllTasks()
        {
            return _tasks;
        }

        public TaskItem? GetTaskById(Guid id)
        {
            return _tasks.FirstOrDefault(t => t.Id == id);
        }

        public TaskItem CreateTask(TaskItem task)
        {
            task.Id = Guid.NewGuid();
            _tasks.Add(task);
            return task;
        }

        public TaskItem? UpdateTask(Guid id, TaskItem task)
        {
            var existingTask = _tasks.FirstOrDefault(t => t.Id == id);
            if (existingTask == null)
                return null;

            existingTask.Description = task.Description;
            existingTask.IsCompleted = task.IsCompleted;
            return existingTask;
        }

        public bool DeleteTask(Guid id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
                return false;

            _tasks.Remove(task);
            return true;
        }
    }
}