// Clints.jsx - Updated wrapper
import React, { useState } from 'react';
import ClintTable from './ClintTable';
import { Search, Filter, Download, Plus } from 'lucide-react';

const Clints = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="p-4 md:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    All Clients
                </h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    Manage and view all client information in one place
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
                {/* <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search clients..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div> */}
                
                <div className="flex items-center gap-2">
                    {/* <button className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        <span className="hidden md:inline">Filter</span>
                    </button> */}
                    
                    <button className="px-4 py-2.5 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        <span className="hidden md:inline">Add Client</span>
                        <span className="md:hidden">Add</span>
                    </button>
                </div>
            </div>
            <ClintTable />
        </div>
    );
};

export default Clints;