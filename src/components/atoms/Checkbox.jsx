import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = ({ 
  checked = false, 
  onChange, 
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      className={`task-checkbox ${checked ? 'completed' : ''} ${className}`}
      onClick={onChange}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="animate-spring"
        >
          <ApperIcon name="Check" size={14} className="text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default Checkbox;