import { motion } from 'framer-motion';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import Checkbox from '@/components/atoms/Checkbox';
import Badge from '@/components/atoms/Badge';
import PriorityDot from '@/components/atoms/PriorityDot';
import ApperIcon from '@/components/ApperIcon';

const TaskCard = ({ 
  task, 
  category,
  onToggleComplete, 
  onEdit,
  onDelete,
  className = '' 
}) => {
  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  const isDueSoon = task.dueDate && !task.completed;
  const isOverdue = task.dueDate && !task.completed && isPast(new Date(task.dueDate));
  const dueText = formatDueDate(task.dueDate);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
      className={`bg-white rounded-xl p-4 shadow-elevation border border-gray-100 transition-all duration-200 ${
        task.completed ? 'opacity-75' : ''
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task)}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className={`font-medium text-gray-900 break-words ${
              task.completed ? 'line-through text-gray-500' : ''
            }`}>
              {task.title}
            </h3>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              <PriorityDot 
                priority={task.priority} 
                isOverdue={isOverdue}
              />
              <button
                onClick={() => onEdit(task)}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ApperIcon name="Edit2" size={14} />
              </button>
              <button
                onClick={() => onDelete(task)}
                className="p-1 text-gray-400 hover:text-error transition-colors"
              >
                <ApperIcon name="Trash2" size={14} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {category && (
              <Badge 
                variant="custom"
                style={{ 
                  backgroundColor: `${category.color}15`,
                  color: category.color 
                }}
              >
                {category.name}
              </Badge>
            )}
            
            <Badge variant="default" size="xs" className="capitalize">
              {task.priority}
            </Badge>
            
            {dueText && (
              <Badge 
                variant={isOverdue ? 'secondary' : 'default'}
                size="xs"
                className="flex items-center gap-1"
              >
                <ApperIcon name="Calendar" size={10} />
                {dueText}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;