import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ProgressWidget = ({ stats, className = '' }) => {
  const { total, completed, pending, overdue, completionRate } = stats;

  const progressItems = [
    {
      label: 'Total Tasks',
      value: total,
      icon: 'List',
      color: '#5B4CFF'
    },
    {
      label: 'Completed',
      value: completed,
      icon: 'CheckCircle',
      color: '#51CF66'
    },
    {
      label: 'Pending',
      value: pending,
      icon: 'Clock',
      color: '#FFD93D'
    },
    {
      label: 'Overdue',
      value: overdue,
      icon: 'AlertCircle',
      color: '#FF6B6B'
    }
  ];

  return (
    <div className={`bg-white rounded-xl p-6 shadow-elevation border border-gray-100 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 font-display">
          Progress Overview
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary font-display">
            {completionRate}%
          </div>
          <div className="text-xs text-gray-500">Complete</div>
        </div>
      </div>

      {/* Progress Ring */}
      <div className="flex justify-center mb-6">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#F1F5F9"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="#4ECDC4"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
              animate={{ 
                strokeDashoffset: 2 * Math.PI * 40 * (1 - completionRate / 100)
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {progressItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-3 rounded-lg bg-gray-50"
          >
            <div className="flex justify-center mb-2">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <ApperIcon 
                  name={item.icon} 
                  size={16} 
                  style={{ color: item.color }}
                />
              </div>
            </div>
            <div className="text-xl font-bold text-gray-900 font-display">
              {item.value}
            </div>
            <div className="text-xs text-gray-500">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressWidget;