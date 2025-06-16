import { motion } from 'framer-motion';
import CategoryItem from '@/components/molecules/CategoryItem';
import ApperIcon from '@/components/ApperIcon';

const CategorySidebar = ({ 
  categories = [], 
  activeCategory = null,
  onCategorySelect,
  onAddCategory,
  className = '' 
}) => {
const allTasksCount = categories.reduce((sum, cat) => sum + cat.task_count, 0);

  return (
    <div className={`bg-white rounded-xl shadow-elevation border border-gray-100 p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <ApperIcon name="Folder" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-gray-900 font-display">
          Categories
        </h2>
      </div>

      <div className="space-y-1">
        {/* All Tasks */}
<CategoryItem
          category={{
            Id: null,
            Name: 'All Tasks',
            color: '#5B4CFF',
            task_count: allTasksCount
          }}
          isActive={activeCategory === null}
          onClick={() => onCategorySelect(null)}
        />

        {/* Individual Categories */}
        {categories.map((category, index) => (
          <motion.div
            key={category.Id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CategoryItem
              category={category}
              isActive={activeCategory === category.Id}
              onClick={() => onCategorySelect(category.Id)}
            />
          </motion.div>
        ))}
      </div>
{/* Divider */}
      <div className="border-t border-gray-100 mt-4 pt-4">
        {/* Add Category Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddCategory}
          className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary hover:text-primary transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ApperIcon name="Plus" size={16} />
          <span className="text-sm font-medium">Add Category</span>
        </motion.button>
      </div>
    </div>
  );
};

export default CategorySidebar;