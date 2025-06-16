import tasksData from '../mockData/tasks.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let tasks = [...tasksData];

const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.id === id);
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay(400);
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      completed: false,
      categoryId: taskData.categoryId || 'personal',
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updateData) {
    await delay(300);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    
    const updatedTask = {
      ...tasks[index],
      ...updateData,
      completedAt: updateData.completed && !tasks[index].completed 
        ? new Date().toISOString() 
        : tasks[index].completedAt
    };
    
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },

  async delete(id) {
    await delay(250);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    const deletedTask = { ...tasks[index] };
    tasks.splice(index, 1);
    return deletedTask;
  },

  async getByCategory(categoryId) {
    await delay(300);
    return tasks.filter(t => t.categoryId === categoryId).map(t => ({ ...t }));
  },

  async search(query) {
    await delay(200);
    if (!query) return [...tasks];
    const lowerQuery = query.toLowerCase();
    return tasks
      .filter(t => t.title.toLowerCase().includes(lowerQuery))
      .map(t => ({ ...t }));
  },

  async getOverdue() {
    await delay(200);
    const now = new Date();
    return tasks
      .filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < now)
      .map(t => ({ ...t }));
  },

  async getStats() {
    await delay(250);
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const overdue = tasks.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length;
    
    return {
      total,
      completed,
      pending: total - completed,
      overdue,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }
};

export default taskService;