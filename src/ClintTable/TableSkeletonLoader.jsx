import React from 'react';

const TableSkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      {/* Table Header Skeleton */}
      <div className="hidden lg:block">
        {/* Desktop Table Skeleton */}
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 px-6 py-4 rounded-t-xl">
            <div className="grid grid-cols-7 gap-4">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Table Body */}
          <div className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {[...Array(8)].map((_, rowIndex) => (
              <div key={rowIndex} className="px-6 py-4">
                <div className="grid grid-cols-7 gap-4">
                  {[...Array(7)].map((_, colIndex) => (
                    <div 
                      key={colIndex} 
                      className={`h-10 rounded-lg ${
                        colIndex === 0 
                          ? 'bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 w-10'
                          : 'bg-gray-100 dark:bg-gray-700'
                      } ${colIndex === 6 ? 'w-32' : 'w-full'}`}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet View Skeleton */}
      <div className="hidden md:block lg:hidden">
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 px-4 py-3 rounded-t-xl">
            <div className="grid grid-cols-6 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-5 bg-gray-300 dark:bg-gray-600 rounded"></div>
              ))}
            </div>
          </div>

          {/* Table Body */}
          <div className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {[...Array(6)].map((_, rowIndex) => (
              <div key={rowIndex} className="px-4 py-3">
                <div className="grid grid-cols-6 gap-3">
                  {[...Array(6)].map((_, colIndex) => (
                    <div 
                      key={colIndex} 
                      className={`h-8 rounded ${
                        colIndex === 0 
                          ? 'bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 w-8'
                          : 'bg-gray-100 dark:bg-gray-700'
                      } ${colIndex === 5 ? 'w-20' : 'w-full'}`}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View Skeleton */}
      <div className="md:hidden space-y-4">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700"
          >
            {/* Card Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full mr-3"></div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>

            {/* Card Body */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-8 w-20 bg-amber-200 dark:bg-amber-900/30 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {[...Array(4)].map((_, index) => (
          <div 
            key={index} 
            className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 md:p-5 shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="h-5 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="h-8 md:h-10 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>

      {/* Search Bar Skeleton */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
        <div className="flex-1">
          <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-sm"></div>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <div className="h-12 w-20 md:w-24 bg-gray-100 dark:bg-gray-700 rounded-xl shadow-sm"></div>
          <div className="h-12 w-32 md:w-40 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeletonLoader;