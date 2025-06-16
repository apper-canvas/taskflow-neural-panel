import { motion } from 'framer-motion';

const PriorityDot = ({ priority, isOverdue = false }) => {
  const priorityColors = {
    high: '#FF6B6B',
    medium: '#FFD93D', 
    low: '#339AF0'
  };

  const color = priorityColors[priority] || priorityColors.medium;

  return (
    <motion.div
      className="w-2 h-2 rounded-full"
      style={{ backgroundColor: color }}
      animate={isOverdue && priority === 'high' ? { 
        scale: [1, 1.2, 1],
        opacity: [1, 0.7, 1]
      } : {}}
      transition={{
        duration: 2,
        repeat: isOverdue && priority === 'high' ? Infinity : 0,
        ease: "easeInOut"
      }}
    />
  );
};

export default PriorityDot;