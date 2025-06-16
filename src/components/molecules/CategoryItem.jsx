import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import React from "react";

const CategoryItem = ({ 
  category, 
  isActive = false, 
  onClick,
  className = '' 
}) => {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(category)}
      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
        isActive 
          ? 'bg-primary/10 text-primary border-l-4 border-primary' 
          : 'hover:bg-gray-50 text-gray-700'
      } ${className}`}
    >
<div className="flex items-center gap-3">
        <div 
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: category.color }}
        />
        <span className="font-medium">{category.Name}</span>
      </div>
      
{category.task_count > 0 && (
        <Badge 
          variant={isActive ? 'primary' : 'default'}
          size="xs"
        >
          {category.task_count}
        </Badge>
      )}
    </motion.button>
  );
};

export default CategoryItem;