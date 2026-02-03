// ClintTable.jsx - Modified Code
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import ClintRow from './ClintRow';
import TableSkeletonLoader from './TableSkeletonLoader';
import { Filter, Search, X, ChevronDown, TrendingUp } from 'lucide-react';

const ClintTable = () => {
    const API = "https://clint-site.vercel.app/data";
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [successRateFilter, setSuccessRateFilter] = useState('all');
    const [activeFilter, setActiveFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchClients();
    }, []);

    useEffect(() => {
        filterClients();
    }, [clients, searchTerm, statusFilter, successRateFilter, activeFilter]);

    const fetchClients = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API);
            
            if (response.data?.success) {
                setClients(response.data.data || []);
            } else if (Array.isArray(response.data)) {
                setClients(response.data);
            } else {
                setClients([]);
            }
        } catch (err) {
            console.error("Error fetching clients:", err);
            setError("Failed to fetch clients data");
            setClients([]);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to safely check string values
    const isMeaningfulString = (value) => {
        if (!value && value !== 0 && value !== false) return false;
        
        // Convert to string if it's a number or boolean
        const strValue = value.toString().trim().toLowerCase();
        
        const emptyValues = ["", "n/a", "na", "none", "null", "undefined", "-", "not available", "no"];
        return !emptyValues.includes(strValue) && strValue.length > 1;
    };

    // Helper function to parse success rate safely
    const parseSuccessRate = (rate) => {
        if (!rate && rate !== 0) return 0;
        
        try {
            // Convert to string first
            const strRate = rate.toString();
            // Remove percentage sign and any non-numeric characters (except decimal point)
            const cleaned = strRate.replace(/[^0-9.]/g, '');
            const num = parseFloat(cleaned);
            return isNaN(num) ? 0 : Math.min(100, Math.max(0, num));
        } catch (err) {
            console.warn('Error parsing success rate:', rate, err);
            return 0;
        }
    };

    // Updated: Simplified isClientEdited function - now only checks success rate
    const isClientAnalyzed = (client) => {
        if (!client) return false;
        // Check if client has a meaningful success rate
        const successRate = parseSuccessRate(client.successRate);
        return successRate > 0;
    };

    const checkIfActive = (client) => {
        if (!client) return false;
        
        const successRate = parseSuccessRate(client.successRate);
        const hasAnalysis = isClientAnalyzed(client);
        
        return successRate > 50 || hasAnalysis;
    };

    const filterClients = () => {
        let result = [...clients];

        // Search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(client => {
                if (!client) return false;
                
                const companyName = client.Company_Name ? client.Company_Name.toString().toLowerCase() : '';
                const contactPerson = client.Contact_Person ? client.Contact_Person.toString().toLowerCase() : '';
                const mail = client.Mail ? client.Mail.toString().toLowerCase() : '';
                const contactNumber = client.Contact_Number ? client.Contact_Number.toString() : '';
                
                return companyName.includes(term) || 
                       contactPerson.includes(term) || 
                       mail.includes(term) || 
                       contactNumber.includes(term);
            });
        }

        // Status filter (Analyzed/Basic)
        if (statusFilter !== 'all') {
            result = result.filter(client => {
                const isAnalyzed = isClientAnalyzed(client);
                return statusFilter === 'analyzed' ? isAnalyzed : !isAnalyzed;
            });
        }

        // Success rate filter
        if (successRateFilter !== 'all') {
            result = result.filter(client => {
                const rate = parseSuccessRate(client?.successRate);
                
                switch(successRateFilter) {
                    case '0-30':
                        return rate >= 0 && rate <= 30;
                    case '31-70':
                        return rate >= 31 && rate <= 70;
                    case '71-100':
                        return rate >= 71 && rate <= 100;
                    default:
                        return true;
                }
            });
        }

        // Active filter
        if (activeFilter !== 'all') {
            result = result.filter(client => {
                const isActive = checkIfActive(client);
                return activeFilter === 'active' ? isActive : !isActive;
            });
        }

        setFilteredClients(result);
    };

    const getStatusColor = (client) => {
        if (!client) {
            return { 
                bg: 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600', 
                text: 'text-gray-800 dark:text-gray-300',
                label: 'Unknown' 
            };
        }

        const isAnalyzed = isClientAnalyzed(client);
        const successRate = parseSuccessRate(client.successRate);
        
        if (isAnalyzed) {
            if (successRate >= 70) {
                return { 
                    bg: 'bg-gradient-to-r from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800', 
                    text: 'text-emerald-800 dark:text-emerald-300',
                    label: `✓ Analyzed (${successRate}%)` 
                };
            } else if (successRate >= 30) {
                return { 
                    bg: 'bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800', 
                    text: 'text-amber-800 dark:text-amber-300',
                    label: `✓ Analyzed (${successRate}%)` 
                };
            } else {
                return { 
                    bg: 'bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800', 
                    text: 'text-blue-800 dark:text-blue-300',
                    label: `✓ Analyzed (${successRate}%)` 
                };
            }
        } else {
            return { 
                bg: 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600', 
                text: 'text-gray-800 dark:text-gray-300',
                label: 'Basic' 
            };
        }
    };

    const getStats = useMemo(() => {
        const total = clients.length;
        const analyzed = clients.filter(isClientAnalyzed).length;
        const basic = total - analyzed;
        
        const successRates = clients
            .map(c => parseSuccessRate(c?.successRate))
            .filter(r => r > 0);
        
        const avgSuccessRate = successRates.length > 0 
            ? Math.round(successRates.reduce((a, b) => a + b, 0) / successRates.length)
            : 0;
        
        const active = clients.filter(checkIfActive).length;
        
        return { total, analyzed, basic, avgSuccessRate, active };
    }, [clients]);

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('all');
        setSuccessRateFilter('all');
        setActiveFilter('all');
    };

    if (loading) {
        return <TableSkeletonLoader />;
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <div className="text-red-600 font-medium mb-4">⚠️ {error}</div>
                <button 
                    onClick={fetchClients}
                    className="px-5 py-2.5 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors shadow-md"
                >
                    Retry Connection
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Total Clients</h3>
                        <span className="text-2xl">👥</span>
                    </div>
                    <p className="text-3xl font-bold mt-2">{getStats.total}</p>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Analyzed</h3>
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <p className="text-3xl font-bold mt-2">{getStats.analyzed}</p>
                    <p className="text-sm opacity-90 mt-1">{getStats.avgSuccessRate}% avg success rate</p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Basic</h3>
                        <span className="text-2xl">📝</span>
                    </div>
                    <p className="text-3xl font-bold mt-2">{getStats.basic}</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Active</h3>
                        <span className="text-2xl">✅</span>
                    </div>
                    <p className="text-3xl font-bold mt-2">{getStats.active}</p>
                    <p className="text-sm opacity-90 mt-1">
                        {getStats.total > 0 ? Math.round((getStats.active / getStats.total) * 100) : 0}% of total
                    </p>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {(searchTerm || statusFilter !== 'all' || successRateFilter !== 'all' || activeFilter !== 'all') && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Clear Filters
                            </button>
                        )}
                    </div>
                    
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by company, contact, email, phone..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {showFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Analysis Status
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { value: 'all', label: 'All', color: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300' },
                                    { value: 'analyzed', label: 'Analyzed', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300' },
                                    { value: 'basic', label: 'Basic', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' }
                                ].map(filter => (
                                    <button
                                        key={filter.value}
                                        onClick={() => setStatusFilter(filter.value)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter.color} ${statusFilter === filter.value ? 'ring-2 ring-amber-500' : ''}`}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Success Rate Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Success Rate
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { value: 'all', label: 'All', color: 'bg-gray-100 dark:bg-gray-700' },
                                    { value: '0-30', label: '0-30%', color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' },
                                    { value: '31-70', label: '31-70%', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' },
                                    { value: '71-100', label: '71-100%', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300' }
                                ].map(filter => (
                                    <button
                                        key={filter.value}
                                        onClick={() => setSuccessRateFilter(filter.value)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter.color} ${successRateFilter === filter.value ? 'ring-2 ring-amber-500' : ''}`}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Active Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Activity Status
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { value: 'all', label: 'All', color: 'bg-gray-100 dark:bg-gray-700' },
                                    { value: 'active', label: 'Active', color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' },
                                    { value: 'inactive', label: 'Inactive', color: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300' }
                                ].map(filter => (
                                    <button
                                        key={filter.value}
                                        onClick={() => setActiveFilter(filter.value)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter.color} ${activeFilter === filter.value ? 'ring-2 ring-amber-500' : ''}`}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Active Filters Display */}
                {(searchTerm || statusFilter !== 'all' || successRateFilter !== 'all' || activeFilter !== 'all') && (
                    <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-amber-700 dark:text-amber-300 font-medium">Active Filters:</span>
                                {searchTerm && (
                                    <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-amber-600 dark:text-amber-400">
                                        Search: "{searchTerm}"
                                    </span>
                                )}
                                {statusFilter !== 'all' && (
                                    <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-amber-600 dark:text-amber-400">
                                        Status: {statusFilter === 'analyzed' ? 'Analyzed' : 'Basic'}
                                    </span>
                                )}
                                {successRateFilter !== 'all' && (
                                    <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-amber-600 dark:text-amber-400">
                                        Success Rate: {successRateFilter}
                                    </span>
                                )}
                                {activeFilter !== 'all' && (
                                    <span className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-amber-600 dark:text-amber-400">
                                        Activity: {activeFilter === 'active' ? 'Active' : 'Inactive'}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-medium"
                            >
                                Clear all
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
                <div className="text-gray-700 dark:text-gray-300">
                    Showing <span className="font-bold text-amber-600 dark:text-amber-400">{filteredClients.length}</span> of{" "}
                    <span className="font-bold">{clients.length}</span> clients
                </div>
                
                {filteredClients.length === 0 && clients.length > 0 && (
                    <div className="text-amber-600 dark:text-amber-400">
                        No results found. Try different filters.
                    </div>
                )}
            </div>

            {/* Table Content */}
            {filteredClients.length === 0 && clients.length > 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No Matching Clients</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        No clients match your current filters. Try adjusting your search criteria.
                    </p>
                    <button 
                        onClick={clearFilters}
                        className="px-5 py-2.5 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors shadow-md"
                    >
                        Clear All Filters
                    </button>
                </div>
            ) : clients.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <div className="text-4xl mb-4">📭</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No Clients Found</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">The database is currently empty.</p>
                    <button 
                        onClick={fetchClients}
                        className="px-5 py-2.5 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors shadow-md"
                    >
                        Refresh List
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gradient-to-r from-amber-600 to-amber-800">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                                        Company
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                                        Analysis Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                                        Success Rate
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredClients.map((client, index) => (
                                    <ClintRow 
                                        key={client._id || index} 
                                        client={client} 
                                        index={index} 
                                        view="desktop"
                                        getStatusColor={getStatusColor}
                                        parseSuccessRate={parseSuccessRate}
                                        isClientAnalyzed={isClientAnalyzed}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Tablet View */}
                    <div className="hidden md:block lg:hidden">
                        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gradient-to-r from-amber-600 to-amber-800">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
                                            #
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
                                            Company
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
                                            Contact
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
                                            Phone
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-bold text-white uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredClients.map((client, index) => (
                                        <ClintRow 
                                            key={client._id || index} 
                                            client={client} 
                                            index={index} 
                                            view="tablet"
                                            getStatusColor={getStatusColor}
                                            parseSuccessRate={parseSuccessRate}
                                            isClientAnalyzed={isClientAnalyzed}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile View - Cards */}
                    <div className="md:hidden space-y-3">
                        {filteredClients.map((client, index) => {
                            const isAnalyzed = isClientAnalyzed(client);
                            const successRate = parseSuccessRate(client.successRate);
                            const status = getStatusColor(client);
                            
                            return (
                                <div 
                                    key={client._id || index}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold mr-3">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white">
                                                    {client.Company_Name || 'N/A'}
                                                </h3>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                    {client.Contact_Person || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${status.bg} ${status.text}`}>
                                                {status.label.includes('(') ? status.label.split('(')[0].trim() : status.label}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">Phone</p>
                                            {client.Contact_Number ? (
                                                <a 
                                                    href={`tel:${client.Contact_Number}`}
                                                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
                                                >
                                                    <span className="mr-2">📞</span>
                                                    <span className="truncate">{client.Contact_Number}</span>
                                                </a>
                                            ) : (
                                                <span className="text-sm text-gray-500">N/A</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">Email</p>
                                            {client.Mail ? (
                                                <a 
                                                    href={`mailto:${client.Mail}`}
                                                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
                                                >
                                                    <span className="mr-2">✉️</span>
                                                    <span className="truncate">{client.Mail}</span>
                                                </a>
                                            ) : (
                                                <span className="text-sm text-gray-500">N/A</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Success Rate Display - Only show for analyzed clients */}
                                    {isAnalyzed && successRate > 0 && (
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Success Rate</span>
                                                <span className={`text-sm font-bold ${
                                                    successRate >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 
                                                    successRate >= 30 ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'
                                                }`}>
                                                    {successRate}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full ${
                                                        successRate >= 70 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 
                                                        successRate >= 30 ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 
                                                        'bg-gradient-to-r from-blue-500 to-blue-600'
                                                    }`}
                                                    style={{ width: `${successRate}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex space-x-2">
                                            {isAnalyzed && (
                                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">
                                                    ✓ Analyzed
                                                </span>
                                            )}
                                            {!isAnalyzed && (
                                                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                    📝 Basic
                                                </span>
                                            )}
                                        </div>
                                        <button className="text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg transition-colors">
                                            View →
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClintTable;