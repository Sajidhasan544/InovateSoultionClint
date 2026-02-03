// ClintRow.jsx - Updated with new status system
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Phone, Mail, Globe, Linkedin, Facebook, TrendingUp } from 'lucide-react';

const ClintRow = ({ client, index, view = 'desktop', getStatusColor }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        if (client._id) {
            navigate(`/client-details/${client._id}`);
        }
    };

    const parseSuccessRate = (rate) => {
        if (!rate) return 0;
        const num = parseInt(rate.toString().replace('%', ''));
        return isNaN(num) ? 0 : num;
    };

    const successRate = parseSuccessRate(client.successRate);
    const status = getStatusColor(client);

    // Desktop View
    if (view === 'desktop') {
        return (
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold shadow-sm">
                            {index + 1}
                        </div>
                    </div>
                </td>
                
                <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 dark:text-white text-base">
                        {client.Company_Name || 'N/A'}
                    </div>
                    {(client.websiteExists === true || (client.websiteExists && client.websiteExists.toString().toLowerCase() === 'yes')) && (
                        <div className="flex items-center text-sm text-amber-600 dark:text-amber-400 font-medium mt-1">
                            <Globe className="w-4 h-4 mr-1.5" />
                            Has Website
                        </div>
                    )}
                </td>
                
                <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                        {client.Contact_Person || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-400">
                        {client.Support_Person || '—'}
                    </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                    {client.Contact_Number ? (
                        <a
                            href={`tel:${client.Contact_Number}`}
                            className="flex items-center font-medium text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors hover:underline"
                        >
                            <Phone className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-500" />
                            <span className="truncate max-w-[140px]">{client.Contact_Number}</span>
                        </a>
                    ) : (
                        <span className="text-gray-500 dark:text-gray-400">—</span>
                    )}
                </td>
                
                <td className="px-6 py-4">
                    {client.Mail ? (
                        <a
                            href={`mailto:${client.Mail}`}
                            className="flex items-center font-medium text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors hover:underline"
                        >
                            <Mail className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-500" />
                            <span className="truncate max-w-[200px]">{client.Mail}</span>
                        </a>
                    ) : (
                        <span className="text-gray-500 dark:text-gray-400">—</span>
                    )}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold ${status.bg} ${status.text} shadow-sm`}>
                        {status.label.split('(')[0].trim()}
                    </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        {successRate > 0 ? (
                            <>
                                <TrendingUp className={`w-4 h-4 mr-2 ${
                                    successRate >= 70 ? 'text-emerald-500' : 
                                    successRate >= 30 ? 'text-amber-500' : 'text-blue-500'
                                }`} />
                                <span className={`font-bold ${
                                    successRate >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 
                                    successRate >= 30 ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'
                                }`}>
                                    {client.successRate}
                                </span>
                            </>
                        ) : (
                            <span className="text-gray-400 text-sm">—</span>
                        )}
                    </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleViewDetails}
                            className="p-2 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/40 rounded-lg transition-colors border border-amber-200 dark:border-amber-800"
                            title="View Details"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        
                        {client.linkedin && !['n/a', 'na', 'none', '-', ''].includes(client.linkedin.trim().toLowerCase()) && (
                            <a
                                href={client.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-lg transition-colors border border-blue-200 dark:border-blue-800"
                                title="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                        )}
                        
                        {client.facebookPage && !['n/a', 'na', 'none', '-', ''].includes(client.facebookPage.trim().toLowerCase()) && (
                            <a
                                href={client.facebookPage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-blue-800 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-lg transition-colors border border-blue-200 dark:border-blue-800"
                                title="Facebook"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </td>
            </tr>
        );
    }

    // Tablet View
    if (view === 'tablet') {
        return (
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-colors duration-200">
                <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white font-bold text-sm">
                            {index + 1}
                        </div>
                    </div>
                </td>
                
                <td className="px-4 py-3">
                    <div className="font-bold text-gray-900 dark:text-white truncate max-w-[160px]">
                        {client.Company_Name || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-400 truncate max-w-[160px]">
                        {client.Contact_Person || 'N/A'}
                    </div>
                </td>
                
                <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px]">
                        {client.Support_Person || '—'}
                    </div>
                </td>
                
                <td className="px-4 py-3 whitespace-nowrap">
                    {client.Contact_Number ? (
                        <a
                            href={`tel:${client.Contact_Number}`}
                            className="flex items-center text-sm font-medium text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
                        >
                            <Phone className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
                            <span className="truncate max-w-[120px]">{client.Contact_Number}</span>
                        </a>
                    ) : (
                        <span className="text-sm text-gray-500">—</span>
                    )}
                </td>
                
                <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${status.bg} ${status.text}`}>
                        {status.label.includes('Analysed') ? '✓' : status.label.includes('Edited') ? '✓' : ''} {status.label.split('(')[0].trim()}
                    </span>
                </td>
                
                <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-1.5">
                        <button
                            onClick={handleViewDetails}
                            className="p-1.5 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/40 rounded-lg transition-colors"
                            title="View Details"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                    </div>
                </td>
            </tr>
        );
    }

    return null;
};

export default ClintRow;