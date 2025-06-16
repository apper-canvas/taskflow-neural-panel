import categoriesData from '../mockData/categories.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let categories = [...categoriesData];

const categoryService = {
  async getAll() {
    await delay(200);
    return [...categories].sort((a, b) => a.position - b.position);
  },

  async getById(id) {
    await delay(150);
    const category = categories.find(c => c.id === id);
    return category ? { ...category } : null;
  },

  async create(categoryData) {
    await delay(300);
    const newCategory = {
      id: Date.now().toString(),
      name: categoryData.name,
      color: categoryData.color || '#5B4CFF',
      taskCount: 0,
      position: categories.length + 1
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, updateData) {
    await delay(250);
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }
    categories[index] = { ...categories[index], ...updateData };
    return { ...categories[index] };
  },

  async delete(id) {
    await delay(200);
    const index = categories.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Category not found');
    }
    const deletedCategory = { ...categories[index] };
    categories.splice(index, 1);
    return deletedCategory;
  },

  async updateTaskCounts(tasksByCategory) {
    await delay(100);
    categories = categories.map(category => ({
      ...category,
      taskCount: tasksByCategory[category.id] || 0
    }));
    return [...categories];
  }
};

export default categoryService;