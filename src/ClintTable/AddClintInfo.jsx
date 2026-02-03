import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { 
  Building2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Plus,
  Loader2,
  Sparkles
} from "lucide-react";

const AddClientInfo = () => {
  const [formData, setFormData] = useState({
    Company_Name: "",
    Contact_Person: "",
    Contact_Number: "",
    Mail: "",
    Address: ""
  });

  const [loading, setLoading] = useState(false);

  const API_URL = "https://clint-site.vercel.app";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.Company_Name.trim()) {
      Swal.fire({
        title: "⚠️ Required Field",
        text: "Please enter company name",
        icon: "warning",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    setLoading(true);

    const payload = {
      Company_Name: formData.Company_Name.trim(),
      facebookPage: "",
      linkedin: "",
      websiteExists: false,
      successRate: 0,
      problems: [],
      solutions: []
    };

    // Add optional fields only when provided
    if (formData.Contact_Person?.trim()) {
      payload.Contact_Person = formData.Contact_Person.trim();
    }
    if (formData.Contact_Number?.trim()) {
      payload.Contact_Number = formData.Contact_Number.trim();
    }
    if (formData.Mail?.trim()) {
      payload.Mail = formData.Mail.trim();
    }
    if (formData.Address?.trim()) {
      payload.Address = formData.Address.trim();
    }

    try {
      const response = await axios.post(`${API_URL}/data`, payload);

      Swal.fire({
        title: "🎉 Success!",
        text: "Company added successfully!",
        icon: "success",
        confirmButtonColor: "#10b981",
        timer: 2000,
        showConfirmButton: false,
        background: '#1f2937',
        color: 'white',
      });

      // Clear form
      setFormData({
        Company_Name: "",
        Contact_Person: "",
        Contact_Number: "",
        Mail: "",
        Address: ""
      });
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);

      Swal.fire({
        title: "❌ Error!",
        text: err.response?.data?.error || "Failed to add company. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: '#1f2937',
        color: 'white',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4 md:p-8 pt-20 md:pt-24">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-amber-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header Card */}
        <div className="mb-8 transform transition-all duration-500 hover:scale-[1.02]">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-5 blur-xl"></div>
            
            <div className="relative p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Building2 className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30"></div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      Add New Company
                    </h1>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">
                    Fill in the company details below to add a new client to your management system
                  </p>
                </div>
                
                <div className="hidden md:block">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                      <Sparkles className="w-10 h-10 text-white animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="relative">
          {/* Floating Card Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-10 transform translate-y-4"></div>
          
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl overflow-hidden">
            {/* Form Header */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      Company Information
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      All fields are required for successful submission
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Company Name */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Building2 className="w-4 h-4 text-blue-500" />
                    Company Name *
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                    <input
                      type="text"
                      name="Company_Name"
                      value={formData.Company_Name}
                      onChange={handleChange}
                      placeholder="e.g., Tech Innovations Inc."
                      className="relative w-full px-4 py-3.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Contact Person */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <User className="w-4 h-4 text-green-500" />
                    Contact Person
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                    <input
                      type="text"
                      name="Contact_Person"
                      value={formData.Contact_Person}
                      onChange={handleChange}
                      placeholder="e.g., John Smith"
                      className="relative w-full px-4 py-3.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Phone className="w-4 h-4 text-orange-500" />
                    Phone Number
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                    <input
                      type="tel"
                      name="Contact_Number"
                      value={formData.Contact_Number}
                      onChange={handleChange}
                      placeholder="e.g., +1 (555) 123-4567"
                      className="relative w-full px-4 py-3.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Mail className="w-4 h-4 text-purple-500" />
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                    <input
                      type="email"
                      name="Mail"
                      value={formData.Mail}
                      onChange={handleChange}
                      placeholder="e.g., contact@company.com"
                      className="relative w-full px-4 py-3.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Address - Full Width */}
                <div className="md:col-span-2 space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <MapPin className="w-4 h-4 text-red-500" />
                    Company Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                    <textarea
                      name="Address"
                      value={formData.Address}
                      onChange={handleChange}
                      placeholder="e.g., 123 Business St, Suite 100, New York, NY 10001"
                      rows="3"
                      className="relative w-full px-4 py-3.5 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button Section */}
              <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      All information is securely stored
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || !formData.Company_Name.trim()}
                    className={`
                      relative group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg 
                      transition-all duration-500 transform hover:scale-[1.02] min-w-[200px]
                      ${loading || !formData.Company_Name.trim()
                        ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-2xl hover:shadow-purple-500/30 text-white"
                      }
                    `}
                  >
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
                    
                    {/* Button Content */}
                    <div className="relative flex items-center gap-3">
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                          Add Company
                        </>
                      )}
                    </div>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </div>
                
                {/* Progress Indicator */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span>Form Completion</span>
                    <span>{formData.Company_Name.trim() ? "Ready to submit" : "Required field missing"}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        formData.Company_Name.trim() 
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 w-full" 
                          : "bg-gradient-to-r from-red-500 to-orange-500 w-1/2"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">150+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Companies Added</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">98%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/20 border border-pink-200 dark:border-pink-800/30 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">24/7</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Data Protection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ⚡ All data is encrypted and stored securely. You can edit company details anytime from the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddClientInfo;