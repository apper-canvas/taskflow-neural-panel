import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const FilterToolbar = ({ 
  activeFilters, 
  onFilterChange,
  onClearFilters,
  className = '' 
}) => {
  const priorityFilters = [
    { key: 'high', label: 'High Priority', color: '#FF6B6B' },
    { key: 'medium', label: 'Medium Priority', color: '#FFD93D' },
    { key: 'low', label: 'Low Priority', color: '#339AF0' }
  ];

  const statusFilters = [
    { key: 'pending', label: 'Pending', icon: 'Clock' },
    { key: 'completed', label: 'Completed', icon: 'CheckCircle' },
    { key: 'overdue', label: 'Overdue', icon: 'AlertCircle' }
  ];

  const hasActiveFilters = Object.values(activeFilters).some(Boolean);

  return (
    <div className={`bg-white rounded-lg p-4 shadow-elevation border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700">Filter Tasks</h4>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Priority</p>
          <div className="flex flex-wrap gap-2">
            {priorityFilters.map(filter => (
              <motion.button
                key={filter.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onFilterChange('priority', filter.key)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeFilters.priority === filter.key
                    ? 'text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={activeFilters.priority === filter.key ? {
                  backgroundColor: filter.color
                } : {}}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: filter.color }}
                />
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Status</p>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map(filter => (
              <motion.button
                key={filter.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onFilterChange('status', filter.key)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeFilters.status === filter.key
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ApperIcon name={filter.icon} size={12} />
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;