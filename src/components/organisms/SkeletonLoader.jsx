import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 3, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-xl p-4 shadow-elevation border border-gray-100"
        >
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse flex-shrink-0 mt-0.5" />
            
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
                <div className="flex gap-2 ml-4">
                  <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
                <div className="h-6 bg-gray-200 rounded-full animate-pulse w-12" />
                <div className="h-6 bg-gray-200 rounded-full animate-pulse w-14" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;