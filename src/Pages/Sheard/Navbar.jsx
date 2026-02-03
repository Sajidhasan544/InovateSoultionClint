import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Moon,
  Sun,
  Users,
  UserPlus,
  Home,
  Menu,
  X,
  MessageSquare,
  Settings,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Mail,
  Phone,
  HelpCircle,
  FileText,
  BarChart3
} from 'lucide-react';
import { AuthContext } from '../../Provider/AuthContext';

const Navbar = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown') && !event.target.closest('.profile-button')) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navigationItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/all-clients', icon: Users, label: 'Clients' },
    { path: '/add-client', icon: UserPlus, label: 'Add Client' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/communications', icon: MessageSquare, label: 'Messages' },
    // { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    logout();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-800/50' 
          : 'bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* Left: Logo & Mobile Menu */}
            <div className="flex items-center flex-1">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 mr-2 sm:mr-3 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
              </button>
              
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg sm:rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-md sm:shadow-lg">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg sm:rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                </div>
                <div className="hidden xs:block">
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-500 dark:to-amber-300 bg-clip-text text-transparent">
                    Innovate Solution
                  </h1>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Client Management</p>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center mx-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group mx-1 ${
                      isActive
                        ? 'text-amber-700 dark:text-amber-300'
                        : 'text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400'
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    <span className="hidden sm:inline">{item.label}</span>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                    )}
                    
                    {/* Hover Effect */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10 transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></div>
                  </Link>
                );
              })}
            </div>

            {/* Right: Search, Notifications, Theme, Logout */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
              
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Search"
              >
                <Search size={20} className="sm:w-5 sm:h-5" />
              </button>

              {/* Desktop Search */}
              <div className="hidden lg:block relative min-w-[200px]">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X size={16} />
                    </button>
                  )}
                </form>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  className="p-1.5 sm:p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                  aria-label="Notifications"
                >
                  <Bell size={20} className="sm:w-5 sm:h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
                aria-label="Toggle theme"
              >
                <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                  <Sun className={`w-4 h-4 sm:w-5 sm:h-5 text-amber-600 absolute inset-0 transition-all duration-300 transform ${
                    theme === 'dark' ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                  }`} />
                  <Moon className={`w-4 h-4 sm:w-5 sm:h-5 text-blue-500 absolute inset-0 transition-all duration-300 transform ${
                    theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                  }`} />
                </div>
              </button>

              {/* Logout Button (Desktop) */}
              <div className="relative">
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200 shadow-sm hover:shadow-md"
                  aria-label="Logout"
                >
                  <LogOut size={18} className="sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden py-3 border-t border-gray-200 dark:border-gray-800">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search clients, messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X size={16} />
                  </button>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 sm:w-72 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300">
              <div className="h-full flex flex-col">
                {/* Menu Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <Link 
                      to="/" 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h1 className="text-lg font-bold bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-500 dark:to-amber-300 bg-clip-text text-transparent">
                          Innovate Solution
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Client Management</p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto py-4">
                  <div className="space-y-1 px-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center px-3 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                            isActive
                              ? 'text-amber-700 dark:text-amber-300 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20'
                              : 'text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                          }`}
                        >
                          <Icon size={20} className="mr-3" />
                          {item.label}
                          {isActive && (
                            <div className="ml-auto w-2 h-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Menu Footer */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="space-y-3">
                    {/* Theme Toggle */}
                    <button
                      onClick={() => {
                        toggleTheme();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 shadow-sm"
                    >
                      <div className="flex items-center">
                        {theme === 'dark' ? (
                          <Moon className="w-5 h-5 text-blue-500 mr-3" />
                        ) : (
                          <Sun className="w-5 h-5 text-amber-600 mr-3" />
                        )}
                        <span className="text-gray-700 dark:text-gray-300">Theme</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {theme === 'dark' ? 'Dark' : 'Light'}
                      </span>
                    </button>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </button>

                    {/* Status */}
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>All systems operational</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-14 sm:h-16"></div>
    </>
  );
};

export default Navbar;