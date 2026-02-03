import React, { useContext, useState } from 'react';

import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  LogIn, 
  Shield,
  Building,
  User
} from 'lucide-react';
import { AuthContext } from '../../Provider/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const email = form.email.value.trim();
        const password = form.password.value;

        try {
            const success = await login(email, password);

            if (success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome Back!',
                    text: 'Login successful. Redirecting to dashboard...',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#1f2937',
                    color: '#fff',
                    iconColor: '#10b981'
                });
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid email or password. Please try again.',
                    confirmButtonColor: '#f59e0b',
                    background: '#1f2937',
                    color: '#fff',
                    iconColor: '#ef4444'
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Connection Error',
                text: 'Unable to connect to server. Please check your connection.',
                confirmButtonColor: '#f59e0b',
                background: '#1f2937',
                color: '#fff'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md">
                
                {/* Logo & Brand Header */}
                <div className="text-center mb-8 sm:mb-10">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg">
                            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                                Innovate Solution
                            </h1>
                            <p className="text-sm text-gray-400">Client Management Portal</p>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base">
                        Sign in to access your dashboard
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 p-6 sm:p-8">
                    
                    {/* Card Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            Secure Login
                        </h2>
                        <p className="text-gray-400">Enter your credentials to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-gray-500" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="admin@innovatesolution.com"
                                    required
                                    className="w-full pl-11 pr-4 py-3.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-sm text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                                >
                                    {showPassword ? (
                                        <>
                                            <EyeOff className="w-4 h-4" />
                                            Hide
                                        </>
                                    ) : (
                                        <>
                                            <Eye className="w-4 h-4" />
                                            Show
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="w-5 h-5 text-gray-500" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    className="w-full pl-11 pr-12 py-3.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-5 w-5 bg-gray-900 border-2 border-gray-600 rounded focus:ring-amber-500 focus:ring-offset-gray-900 text-amber-500"
                                />
                                <label htmlFor="remember" className="ml-3 text-sm text-gray-400">
                                    Remember this device
                                </label>
                            </div>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    Swal.fire({
                                        title: 'Forgot Password?',
                                        html: `
                                            <div class="text-left text-gray-300">
                                                <p class="mb-3">Please contact your system administrator:</p>
                                                <div class="space-y-2">
                                                    <div class="flex items-center gap-2">
                                                        <span>📧</span>
                                                        <span>admin@innovatesolution.com</span>
                                                    </div>
                                                    <div class="flex items-center gap-2">
                                                        <span>📞</span>
                                                        <span>+880 1712 345 678</span>
                                                    </div>
                                                </div>
                                            </div>
                                        `,
                                        icon: 'info',
                                        background: '#1f2937',
                                        color: '#fff',
                                        confirmButtonColor: '#f59e0b',
                                        confirmButtonText: 'OK'
                                    });
                                }}
                                className="text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden group
                                ${loading
                                    ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white hover:shadow-2xl hover:shadow-amber-900/30 transform hover:-translate-y-0.5'
                                }
                            `}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                                    Authenticating...
                                </div>
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    <span className="relative flex items-center justify-center">
                                        <LogIn className="w-5 h-5 mr-3" />
                                        Sign In
                                    </span>
                                </>
                            )}
                        </button>

                    </form>

                    {/* Additional Info */}
                    <div className="mt-8 pt-6 border-t border-gray-700">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-3 text-gray-400">
                                <Building className="w-4 h-4" />
                                <span>Company Management</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <User className="w-4 h-4" />
                                <span>Secure Access Only</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 sm:mt-8">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Innovate Solution. All rights reserved.
                    </p>
                    
                </div>

            </div>
        </div>
    );
};

export default Login;