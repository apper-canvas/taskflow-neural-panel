import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';

const AddCategoryForm = ({ 
  onSubmit, 
  onCancel,
  className = '' 
}) => {
  const [formData, setFormData] = useState({
    Name: '',
    color: '#5B4CFF'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predefinedColors = [
    '#5B4CFF', '#FF6B6B', '#4ECDC4', '#45B7D1', 
    '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Name.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-xl p-6 shadow-elevation border border-gray-100 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 font-display">
          Add New Category
        </h3>
        <button
          onClick={onCancel}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ApperIcon name="X" size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Category Name"
          value={formData.Name}
          onChange={(e) => handleChange('Name', e.target.value)}
          placeholder="Enter category name"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <div className="grid grid-cols-6 gap-2">
            {predefinedColors.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => handleChange('color', color)}
                className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 ${
                  formData.color === color 
                    ? 'border-gray-800 scale-110' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="mt-2">
            <input
              type="color"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            disabled={!formData.Name.trim() || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Creating...' : 'Create Category'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddCategoryForm;