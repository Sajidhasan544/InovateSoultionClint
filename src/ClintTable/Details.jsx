// Details.jsx - Complete Fixed Code
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { 
  ArrowLeft, 
  Edit, 
  Save, 
  Trash2, 
  Copy, 
  X, 
  Globe, 
  Facebook, 
  Linkedin, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  User,
  Building,
  ExternalLink,
  Share2,
  Briefcase
} from "lucide-react";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const [form, setForm] = useState({
    Company_Name: "",
    Contact_Person: "",
    Support_Person: "",
    Contact_Number: "",
    Mail: "",
    Address: "",
    facebookPage: "",
    facebookFollowers: "",
    linkedin: "",
    successRate: "",
    problems: "",
    solutions: "",
    websiteExists: false
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://clint-site.vercel.app/data/${id}`);
      
      if (response.data.success) {
        const data = response.data.data;
        setInfo(data);
        
        // API থেকে পাওয়া ডাটা সেট করুন
        setForm({
          Company_Name: data.Company_Name || "",
          Contact_Person: data.Contact_Person || "",
          Support_Person: data.Support_Person || "",
          Contact_Number: data.Contact_Number || "",
          Mail: data.Mail || "",
          Address: data.Address || "",
          facebookPage: data.facebookPage || "",
          facebookFollowers: data.facebookFollowers || "",
          linkedin: data.linkedin || "",
          successRate: data.successRate || "",
          problems: Array.isArray(data.problems) ? data.problems.join(", ") : (data.problems || ""),
          solutions: Array.isArray(data.solutions) ? data.solutions.join(", ") : (data.solutions || ""),
          websiteExists: data.websiteExists || false
        });
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to load client details.",
        icon: "error",
        background: '#1f2937',
        color: '#fff',
        confirmButtonColor: "#f59e0b"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'select-one' ? value === 'true' : value)
    }));
  };

  const handleSave = () => {
    // API structure অনুযায়ী ডাটা প্রস্তুত করুন
    const updateData = {
      Company_Name: form.Company_Name || "",
      Contact_Person: form.Contact_Person || "",
      Support_Person: form.Support_Person || "",
      Contact_Number: form.Contact_Number || "",
      Mail: form.Mail || "",
      Address: form.Address || "",
      facebookPage: form.facebookPage || "",
      facebookFollowers: form.facebookFollowers || "0",
      linkedin: form.linkedin || "",
      successRate: form.successRate || "0",
      problems: form.problems ? form.problems.split(',').map(p => p.trim()).filter(p => p) : [],
      solutions: form.solutions ? form.solutions.split(',').map(s => s.trim()).filter(s => s) : [],
      websiteExists: form.websiteExists
    };

    // সংখ্যায় কনভার্ট করুন
    if (updateData.facebookFollowers) {
      updateData.facebookFollowers = parseInt(updateData.facebookFollowers) || 0;
    }
    if (updateData.successRate) {
      updateData.successRate = parseInt(updateData.successRate) || 0;
    }

    Swal.fire({
      title: 'Updating...',
      text: 'Please wait while we update the client data.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    axios.put(`https://clint-site.vercel.app/data/${id}`, updateData)
      .then(response => {
        if (response.data.success) {
          Swal.close();
          Swal.fire({
            title: "Success!",
            text: "Client data updated successfully.",
            icon: "success",
            background: '#1f2937',
            color: '#fff',
            confirmButtonColor: "#10b981",
            timer: 1500
          });
          setEditMode(false);
          fetchData(); // Refresh data
        } else {
          Swal.close();
          Swal.fire({
            title: "Error!",
            text: response.data.error || "Failed to update data.",
            icon: "error",
            background: '#1f2937',
            color: '#fff',
            confirmButtonColor: "#f59e0b"
          });
        }
      })
      .catch(err => {
        Swal.close();
        console.error("Update error:", err);
        Swal.fire({
          title: "Error!",
          text: err.response?.data?.error || "Failed to update. Please try again.",
          icon: "error",
          background: '#1f2937',
          color: '#fff',
          confirmButtonColor: "#f59e0b"
        });
      });
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Delete Client?',
      text: "Are you sure you want to delete this client? This action cannot be undone.",
      icon: 'warning',
      background: '#1f2937',
      color: '#fff',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleting...',
          text: 'Please wait while we delete the client.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        axios.delete(`https://clint-site.vercel.app/data/${id}`)
          .then(response => {
            if (response.data.success) {
              Swal.close();
              Swal.fire({
                title: "Deleted!",
                text: "Client has been deleted successfully.",
                icon: "success",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: "#10b981",
                timer: 1500
              });
              navigate("/all-clients");
            } else {
              Swal.close();
              Swal.fire({
                title: "Error!",
                text: response.data.error || "Failed to delete client.",
                icon: "error",
                background: '#1f2937',
                color: '#fff',
                confirmButtonColor: "#f59e0b"
              });
            }
          })
          .catch(err => {
            Swal.close();
            console.error("Delete error:", err);
            Swal.fire({
              title: "Error!",
              text: err.response?.data?.error || "Failed to delete client. Please try again.",
              icon: "error",
              background: '#1f2937',
              color: '#fff',
              confirmButtonColor: "#f59e0b"
            });
          });
      }
    });
  };

  const copyCompanyName = () => {
    if (info?.Company_Name) {
      navigator.clipboard.writeText(info.Company_Name)
        .then(() => {
          Swal.fire({
            title: "Copied!",
            text: `"${info.Company_Name}" copied to clipboard.`,
            icon: "success",
            background: '#1f2937',
            color: '#fff',
            timer: 1500,
            showConfirmButton: false
          });
        })
        .catch(() => {
          Swal.fire({
            title: "Failed!",
            text: "Could not copy the name.",
            icon: "error",
            background: '#1f2937',
            color: '#fff',
            confirmButtonColor: "#f59e0b"
          });
        });
    }
  };

  const shareClient = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: info?.Company_Name,
        text: `Check out ${info?.Company_Name} client details`,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      Swal.fire({
        title: "Link Copied!",
        text: "Client link copied to clipboard.",
        icon: "success",
        background: '#1f2937',
        color: '#fff',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  const parseSuccessRate = (rate) => {
    if (!rate && rate !== 0) return 0;
    try {
      const strRate = rate.toString();
      const cleaned = strRate.replace(/[^0-9.]/g, '');
      const num = parseFloat(cleaned);
      return isNaN(num) ? 0 : Math.min(100, Math.max(0, num));
    } catch (err) {
      return 0;
    }
  };

  // Loading Skeleton Components
  const SkeletonHeader = () => (
    <div className="animate-pulse">
      <div className="h-6 w-32 bg-gray-700 rounded mb-4"></div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gray-700 rounded-xl"></div>
        <div className="space-y-2">
          <div className="h-8 w-64 bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );

  const SkeletonStats = () => (
    <div className="animate-pulse grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-gray-800/50 rounded-xl p-5">
          <div className="h-4 w-24 bg-gray-700 rounded mb-3"></div>
          <div className="h-8 w-16 bg-gray-700 rounded mb-2"></div>
          <div className="h-3 w-32 bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );

  const SkeletonTabs = () => (
    <div className="animate-pulse flex space-x-4 mb-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-10 w-24 bg-gray-700 rounded-lg"></div>
      ))}
    </div>
  );

  const SkeletonContent = () => (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-800/50 p-4 rounded-xl">
              <div className="h-4 w-32 bg-gray-700 rounded mb-3"></div>
              <div className="h-6 w-48 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-800/50 p-4 rounded-xl">
              <div className="h-4 w-32 bg-gray-700 rounded mb-3"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 w-full bg-gray-700 rounded"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SkeletonHeader />
          <SkeletonStats />
          <SkeletonTabs />
          <SkeletonContent />
        </div>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Client Not Found</h2>
          <p className="text-gray-400 mb-6">The requested client data could not be loaded.</p>
          <button
            onClick={() => navigate("/all-clients")}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Clients
          </button>
        </div>
      </div>
    );
  }

  const successRate = parseSuccessRate(info.successRate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <button
              onClick={() => navigate("/all-clients")}
              className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Clients
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                  {info.Company_Name}
                </h1>
                <p className="text-gray-400">
                  Client ID: {info._id ? info._id.substring(0, 8) : "N/A"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={copyCompanyName}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center gap-2 transition-colors border border-gray-700"
              title="Copy Company Name"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copy</span>
            </button>
            <button
              onClick={shareClient}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center gap-2 transition-colors border border-gray-700"
              title="Share Client"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={() => setEditMode(!editMode)}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors ${
                editMode 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
              }`}
            >
              {editMode ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              <span className="hidden sm:inline">{editMode ? "Cancel" : "Edit"}</span>
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl flex items-center gap-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Success Rate</h3>
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold mb-1">{successRate}%</p>
            <div className="w-full bg-amber-900/50 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full"
                style={{ width: `${successRate}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Followers</h3>
              <Users className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold mb-1">{info.facebookFollowers || "0"}</p>
            <p className="text-sm opacity-90">Facebook Followers</p>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Status</h3>
              <CheckCircle className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold mb-1">
              {info.websiteExists ? "Active" : "Basic"}
            </p>
            <p className="text-sm opacity-90">Website {info.websiteExists ? "✅" : "❌"}</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Analysis</h3>
              <AlertCircle className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold mb-1">
              {Array.isArray(info.problems) ? info.problems.length : "0"}
            </p>
            <p className="text-sm opacity-90">Issues Identified</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'overview' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white' 
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'contact' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white' 
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
          >
            Contact Info
          </button>
          <button
            onClick={() => setActiveTab('digital')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'digital' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white' 
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
          >
            Digital Presence
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'analysis' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white' 
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
            }`}
          >
            Analysis
          </button>
        </div>

        {/* Edit Form */}
        {editMode ? (
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Client Information
            </h2>
            
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-900/30 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                    <input
                      type="text"
                      name="Company_Name"
                      value={form.Company_Name}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Contact Person</label>
                    <input
                      type="text"
                      name="Contact_Person"
                      value={form.Contact_Person}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Support Person</label>
                    <input
                      type="text"
                      name="Support_Person"
                      value={form.Support_Person}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="Contact_Number"
                      value={form.Contact_Number}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="Mail"
                      value={form.Mail}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                    <input
                      type="text"
                      name="Address"
                      value={form.Address}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Digital Information */}
              <div className="bg-gray-900/30 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Digital Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Facebook Page URL</label>
                    <input
                      type="url"
                      name="facebookPage"
                      value={form.facebookPage}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Facebook Followers</label>
                    <input
                      type="number"
                      name="facebookFollowers"
                      value={form.facebookFollowers}
                      onChange={handleChange}
                      min="0"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn URL</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={form.linkedin}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="https://linkedin.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Success Rate (%)</label>
                    <input
                      type="number"
                      name="successRate"
                      value={form.successRate}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Website Exists</label>
                    <select
                      name="websiteExists"
                      value={form.websiteExists}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Analysis */}
              <div className="bg-gray-900/30 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Analysis & Solutions</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Problems (comma separated)</label>
                    <textarea
                      name="problems"
                      value={form.problems}
                      onChange={handleChange}
                      rows="3"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter problems separated by commas"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Solutions (comma separated)</label>
                    <textarea
                      name="solutions"
                      value={form.solutions}
                      onChange={handleChange}
                      rows="3"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter solutions separated by commas"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-700">
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          /* Display Mode */
          <div className="space-y-6">
            
            {activeTab === 'overview' && (
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-2 text-gray-300 mb-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium">Contact Person</span>
                      </div>
                      <p className="text-xl font-semibold">{info.Contact_Person || "N/A"}</p>
                    </div>
                    
                    <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-2 text-gray-300 mb-2">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">Support Person</span>
                      </div>
                      <p className="text-xl font-semibold">{info.Support_Person || "N/A"}</p>
                    </div>
                    
                    <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-2 text-gray-300 mb-2">
                        <Phone className="w-4 h-4" />
                        <span className="font-medium">Phone Number</span>
                      </div>
                      <a 
                        href={`tel:${info.Contact_Number}`}
                        className="text-xl font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        {info.Contact_Number || "N/A"}
                      </a>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-2 text-gray-300 mb-2">
                        <Mail className="w-4 h-4" />
                        <span className="font-medium">Email Address</span>
                      </div>
                      <a 
                        href={`mailto:${info.Mail}`}
                        className="text-xl font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        {info.Mail || "N/A"}
                      </a>
                    </div>
                    
                    <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-2 text-gray-300 mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">Address</span>
                      </div>
                      <p className="text-xl font-semibold">{info.Address || "N/A"}</p>
                    </div>
                    
                    <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-2 text-gray-300 mb-2">
                        <Globe className="w-4 h-4" />
                        <span className="font-medium">Website Status</span>
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                        info.websiteExists 
                          ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-700' 
                          : 'bg-gray-700 text-gray-400 border border-gray-600'
                      }`}>
                        {info.websiteExists ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Website Active
                          </>
                        ) : (
                          "No Website"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'digital' && (
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Facebook className="w-4 h-4" />
                          <span className="font-medium">Facebook Page</span>
                        </div>
                        {info.facebookPage && (
                          <a 
                            href={info.facebookPage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-400 hover:text-amber-300 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      {info.facebookPage ? (
                        <a 
                          href={info.facebookPage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-medium text-amber-400 hover:text-amber-300 transition-colors break-all"
                        >
                          {info.facebookPage}
                        </a>
                      ) : (
                        <p className="text-lg font-medium text-gray-400">Not Available</p>
                      )}
                    </div>
                    
                    <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-2 text-gray-300 mb-2">
                        <Linkedin className="w-4 h-4" />
                        <span className="font-medium">LinkedIn Profile</span>
                      </div>
                      {info.linkedin ? (
                        <a 
                          href={info.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-medium text-amber-400 hover:text-amber-300 transition-colors break-all"
                        >
                          {info.linkedin}
                        </a>
                      ) : (
                        <p className="text-lg font-medium text-gray-400">Not Available</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">Social Followers</span>
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-amber-400">
                        {info.facebookFollowers || "0"}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">Facebook Followers</p>
                    </div>
                    
                    <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-gray-300">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-medium">Success Rate</span>
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-amber-400">{successRate}%</p>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${
                            successRate >= 70 ? 'bg-emerald-500' : 
                            successRate >= 40 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${successRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analysis' && (
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        Identified Problems
                      </h3>
                      {Array.isArray(info.problems) && info.problems.length > 0 ? (
                        <ul className="space-y-2">
                          {info.problems.map((problem, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-300">{problem}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400">No problems identified yet.</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        Proposed Solutions
                      </h3>
                      {Array.isArray(info.solutions) && info.solutions.length > 0 ? (
                        <ul className="space-y-2">
                          {info.solutions.map((solution, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-300">{solution}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400">No solutions provided yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Rate Visualization */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Success Rate Analysis</h3>
              <div className="bg-gray-900/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Current Success Rate</p>
                    <p className="text-3xl font-bold text-amber-400">{successRate}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Progress</p>
                    <p className={`text-lg font-semibold ${
                      successRate >= 70 ? 'text-emerald-400' : 
                      successRate >= 40 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {successRate >= 70 ? "Excellent" : 
                       successRate >= 40 ? "Good" : 
                       successRate >= 20 ? "Fair" : "Needs Improvement"}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      successRate >= 70 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 
                      successRate >= 40 ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 
                      'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${successRate}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Last Updated */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Last updated: {info.updatedAt ? new Date(info.updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) : "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;