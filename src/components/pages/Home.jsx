import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { categoryService, taskService } from "@/services";
import CategorySidebar from "@/components/organisms/CategorySidebar";
import ErrorState from "@/components/organisms/ErrorState";
import SkeletonLoader from "@/components/organisms/SkeletonLoader";
import TaskList from "@/components/organisms/TaskList";
import ProgressWidget from "@/components/molecules/ProgressWidget";
import SearchBar from "@/components/molecules/SearchBar";
import FilterToolbar from "@/components/molecules/FilterToolbar";
import AddTaskForm from "@/components/molecules/AddTaskForm";
import AddCategoryForm from "@/components/molecules/AddCategoryForm";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Home = () => {
  // State management
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
    completionRate: 0
  });

  // UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [tasksData, categoriesData, statsData] = await Promise.all([
          taskService.getAll(),
          categoryService.getAll(),
          taskService.getStats()
        ]);
        
        setTasks(tasksData);
        setCategories(categoriesData);
        setStats(statsData);
      } catch (err) {
        setError(err.message || 'Failed to load data');
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Update category task counts when tasks change
useEffect(() => {
    const updateCategoryCounts = async () => {
      const tasksByCategory = tasks.reduce((acc, task) => {
        acc[task.category_id] = (acc[task.category_id] || 0) + 1;
        return acc;
      }, {});
      
      try {
        const updatedCategories = await categoryService.updateTaskCounts(tasksByCategory);
        setCategories(updatedCategories);
      } catch (err) {
        console.error('Failed to update category counts:', err);
      }
    };

    if (tasks.length > 0) {
      updateCategoryCounts();
    }
  }, [tasks]);

  // Listen for add task event
  useEffect(() => {
    const handleAddTask = () => setShowAddForm(true);
    window.addEventListener('add-task', handleAddTask);
    return () => window.removeEventListener('add-task', handleAddTask);
  }, []);

  // Task operations
  const handleToggleComplete = async (task) => {
    const optimisticUpdate = { ...task, completed: !task.completed };
    setTasks(prev => prev.map(t => t.id === task.id ? optimisticUpdate : t));
    
    try {
      const updatedTask = await taskService.update(task.id, { completed: !task.completed });
      setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
      
      const newStats = await taskService.getStats();
      setStats(newStats);
      
      toast.success(updatedTask.completed ? 'Task completed! 🎉' : 'Task marked as pending');
    } catch (err) {
      // Revert optimistic update
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
      toast.error('Failed to update task');
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      setShowAddForm(false);
      
      const newStats = await taskService.getStats();
      setStats(newStats);
      
      toast.success('Task added successfully!');
    } catch (err) {
      toast.error('Failed to add task');
    }
  };

  const handleEditTask = async (taskData) => {
    try {
      const updatedTask = await taskService.update(editingTask.id, taskData);
      setTasks(prev => prev.map(t => t.id === editingTask.id ? updatedTask : t));
      setEditingTask(null);
      
      const newStats = await taskService.getStats();
      setStats(newStats);
      
      toast.success('Task updated successfully!');
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (task) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    setTasks(prev => prev.filter(t => t.id !== task.id));
    
    try {
      await taskService.delete(task.id);
      
      const newStats = await taskService.getStats();
      setStats(newStats);
      
      toast.success('Task deleted successfully');
    } catch (err) {
      // Revert optimistic update
      setTasks(prev => [...prev, task].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      toast.error('Failed to delete task');
    }
  };

  // Filter operations
  const handleFilterChange = (type, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    setActiveCategory(null);
    setSearchQuery('');
};

  // Category operations
  const handleAddCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.create(categoryData);
      if (newCategory) {
        setCategories(prev => [...prev, newCategory]);
        setShowAddCategoryForm(false);
        toast.success('Category created successfully!');
      }
    } catch (err) {
      toast.error('Failed to create category');
    }
  };

  const handleCancelAddCategory = () => {
    setShowAddCategoryForm(false);
  };

const displayTasks = useMemo(() => {
    if (activeCategory === null) return tasks;
    return tasks.filter(task => task.category_id === activeCategory);
  }, [tasks, activeCategory]);

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex overflow-hidden bg-surface">
    <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                {/* Sidebar skeleton */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl p-4 shadow-elevation">
                        <div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />
                        <div className="space-y-3">
                            {[...Array(4)].map(
                                (_, i) => <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
                            )}
                        </div>
                    </div>
                </div>
                {/* Main content skeleton */}
                <div className="lg:col-span-2">
                    <div className="space-y-6">
                        <div className="h-12 bg-gray-200 rounded animate-pulse" />
                        <SkeletonLoader count={5} />
                    </div>
                </div>
                {/* Progress widget skeleton */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl p-6 shadow-elevation">
                        <div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />
                        <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse mx-auto mb-4" />
                        <div className="grid grid-cols-2 gap-4">
                            {[...Array(4)].map(
                                (_, i) => <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-surface">
        <ErrorState 
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-surface">
    <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-display">BhushanTasks
                                                              </h1>
                    <p className="text-gray-600 mt-1">Organize your day, accomplish your goals
                                                              </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="lg:hidden">
                        <ApperIcon name="Filter" size={16} />
                    </Button>
                    <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
                        <ApperIcon name="Plus" size={16} />
                        <span className="hidden sm:inline">Add Task</span>
                    </Button>
                </div>
            </div>
            {/* Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Category Sidebar */}
                <div className="lg:col-span-1 order-2 lg:order-1">
                    <div className="space-y-4">
                        <CategorySidebar
                            categories={categories}
                            activeCategory={activeCategory}
                            onCategorySelect={setActiveCategory}
                            onAddCategory={() => setShowAddCategoryForm(true)} />
                        {/* Mobile Filters */}
                        <AnimatePresence>
                            {(showMobileFilters || window.innerWidth >= 1024) && <motion.div
                                initial={{
                                    opacity: 0,
                                    height: 0
                                }}
                                animate={{
                                    opacity: 1,
                                    height: "auto"
                                }}
                                exit={{
                                    opacity: 0,
                                    height: 0
                                }}
                                className="lg:block">
                                <FilterToolbar
                                    activeFilters={activeFilters}
                                    onFilterChange={handleFilterChange}
                                    onClearFilters={handleClearFilters} />
                            </motion.div>}
                        </AnimatePresence>
                    </div>
                </div>
                {/* Task List */}
                <div className="lg:col-span-2 order-1 lg:order-2">
                    <div className="space-y-4">
                        {/* Search Bar */}
                        <SearchBar onSearch={setSearchQuery} placeholder="Search tasks..." />
                        {/* Add Category Form */}
                        <AnimatePresence>
                            {showAddCategoryForm && <AddCategoryForm onSubmit={handleAddCategory} onCancel={handleCancelAddCategory} />}
                        </AnimatePresence>
                        {/* Add Task Form */}
                        <AnimatePresence>
                            {(showAddForm || editingTask) && <AddTaskForm
                                categories={categories}
                                onSubmit={editingTask ? handleEditTask : handleAddTask}
                                onCancel={() => {
                                    setShowAddForm(false);
                                    setEditingTask(null);
                                }}
                                initialData={editingTask} />}
                        </AnimatePresence>
                        {/* Task List */}
                        <TaskList
                            tasks={displayTasks}
                            categories={categories}
                            onToggleComplete={handleToggleComplete}
                            onEditTask={setEditingTask}
                            onDeleteTask={handleDeleteTask}
                            searchQuery={searchQuery}
                            activeFilters={activeFilters} />
                    </div>
                </div>
                {/* Progress Widget */}
                <div className="lg:col-span-1 order-3">
                    <ProgressWidget stats={stats} />
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default Home;