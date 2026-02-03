// HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  UserPlus, 
  Users, 
  UserCheck, 
  CalendarCheck, 
  BarChart3,
  Settings,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      {/* <header className="py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
              <span className="font-bold text-xl">IS</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">
                Innovate Solution
              </h1>
              <p className="text-gray-400 text-sm">Client Management Portal</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-amber-200">All Systems Operational</span>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-12 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Elevate Client Relationships
            </span>
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl mb-8 leading-relaxed">
            Transform your client management with our intelligent platform. 
            <span className="text-amber-300 font-medium"> Streamline, analyze, and grow</span> your business relationships.
          </p>
          <div className="flex items-center justify-center space-x-4 text-gray-400">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Secure</span>
            </div>
            <div className="h-4 w-px bg-gray-600"></div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span>Efficient</span>
            </div>
            <div className="h-4 w-px bg-gray-600"></div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
              <span>Intuitive</span>
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl w-full">
          {/* Add Client */}
          <Link to="/add-client">
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-xl flex items-center justify-center mb-6 border border-amber-500/30">
                <UserPlus className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Add New Client</h3>
              <p className="text-gray-400 mb-4">Register new clients with detailed profiles and preferences</p>
              <div className="flex items-center text-amber-400 text-sm">
                <span>Get Started</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* All Clients */}
          <Link to="/all-clients">
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-xl flex items-center justify-center mb-6 border border-amber-500/30">
                <Users className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">All Clients</h3>
              <p className="text-gray-400 mb-4">View and manage complete client database with advanced filters</p>
              <div className="flex items-center text-amber-400 text-sm">
                <span>Browse Database</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Active Clients */}
          <Link to="/active-clients">
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-xl flex items-center justify-center mb-6 border border-amber-500/30">
                <UserCheck className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Active Clients</h3>
              <p className="text-gray-400 mb-4">Monitor currently engaged clients and ongoing projects</p>
              <div className="flex items-center text-amber-400 text-sm">
                <span>View Active</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Visited Clients */}
          <Link to="/visited-clients">
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-xl flex items-center justify-center mb-6 border border-amber-500/30">
                <CalendarCheck className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Visited Clients</h3>
              <p className="text-gray-400 mb-4">Track client visit history and engagement patterns</p>
              <div className="flex items-center text-amber-400 text-sm">
                <span>Check History</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Analytics */}
          <Link to="/analytics">
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-xl flex items-center justify-center mb-6 border border-amber-500/30">
                <BarChart3 className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Analytics</h3>
              <p className="text-gray-400 mb-4">Comprehensive insights and performance metrics</p>
              <div className="flex items-center text-amber-400 text-sm">
                <span>View Insights</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Communications */}
          <Link to="/communications">
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-xl flex items-center justify-center mb-6 border border-amber-500/30">
                <MessageSquare className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Communications</h3>
              <p className="text-gray-400 mb-4">Manage client interactions and messaging history</p>
              <div className="flex items-center text-amber-400 text-sm">
                <span>Open Inbox</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Security & Compliance */}
          <Link to="/security">
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-xl flex items-center justify-center mb-6 border border-amber-500/30">
                <ShieldCheck className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Security & Compliance</h3>
              <p className="text-gray-400 mb-4">Data protection and regulatory compliance settings</p>
              <div className="flex items-center text-amber-400 text-sm">
                <span>Configure Settings</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* System Settings */}
          <Link to="/settings">
            <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-900/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-amber-600/20 to-amber-800/20 rounded-xl flex items-center justify-center mb-6 border border-amber-500/30">
                <Settings className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">System Settings</h3>
              <p className="text-gray-400 mb-4">Customize platform preferences and configurations</p>
              <div className="flex items-center text-amber-400 text-sm">
                <span>Adjust Settings</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-gray-500 text-sm max-w-2xl">
          <p className="mb-2">
            <span className="text-amber-400 font-medium">Innovate Solution</span> - Revolutionizing client management through cutting-edge technology and intuitive design
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent mx-auto my-3"></div>
          <p>Your trusted partner in digital transformation and business growth</p>
        </div>
      </main>
    </div>
  );
};

export default Home;