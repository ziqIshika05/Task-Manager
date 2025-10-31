using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Assignment_1.Models;

namespace Assignment_1.Services
{
    public interface ITaskService
    {
        List<TaskItem> GetAllTasks();
        TaskItem? GetTaskById(Guid id);
        TaskItem CreateTask(TaskItem task);
        TaskItem? UpdateTask(Guid id, TaskItem task);
        bool DeleteTask(Guid id);
    }
}