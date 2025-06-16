import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { isPast } from "date-fns";
import TaskCard from "@/components/molecules/TaskCard";
import EmptyState from "@/components/organisms/EmptyState";

const TaskList = ({ 
  tasks = [], 
  categories = [],
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  searchQuery = '',
  activeFilters = {},
  className = '' 
}) => {
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query)
      );
    }

    // Priority filter
    if (activeFilters.priority) {
      filtered = filtered.filter(task => 
        task.priority === activeFilters.priority
      );
    }

    // Status filter
    if (activeFilters.status) {
      switch (activeFilters.status) {
        case 'completed':
          filtered = filtered.filter(task => task.completed);
          break;
        case 'pending':
          filtered = filtered.filter(task => !task.completed);
          break;
        case 'overdue':
          filtered = filtered.filter(task => 
            !task.completed && task.dueDate && isPast(new Date(task.dueDate))
          );
          break;
      }
    }

    // Sort by priority, then by due date
    return filtered.sort((a, b) => {
      // Completed tasks go to bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      // Sort by priority
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;

      // Sort by due date (overdue first, then closest due date)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (a.dueDate && !b.dueDate) return -1;
      if (!a.dueDate && b.dueDate) return 1;

      // Finally, sort by creation date (newest first)
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [tasks, searchQuery, activeFilters]);

const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id === categoryId);
  };

  if (filteredTasks.length === 0) {
    if (searchQuery || Object.values(activeFilters).some(Boolean)) {
      return (
        <EmptyState
          icon="Search"
          title="No tasks found"
          description="Try adjusting your search or filters"
        />
      );
    }
    
    return (
      <EmptyState
        icon="CheckSquare"
title="No tasks yet"
        description="Create your first task to get started with TaskFlow"
        actionLabel="Add Task"
        onAction={() => {
          if (typeof window !== 'undefined' && window.CustomEvent) {
            window.dispatchEvent(new CustomEvent('add-task'));
          }
        }}
      />
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ 
              delay: index * 0.05,
              duration: 0.2
            }}
          >
<TaskCard
              task={task}
              category={getCategoryById(task.category_id)}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;