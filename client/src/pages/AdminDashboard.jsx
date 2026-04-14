import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { backendUrl, adminToken, setAdminToken } = useContext(AppContext);

    const [stats, setStats] = useState({
        totalJobs: 0,
        totalApplications: 0,
        totalUsers: 0
    });

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(null);
    const [listData, setListData] = useState([]);
    const [listLoading, setListLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!adminToken) {
            navigate('/');
            return;
        }

        const fetchAdminStats = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/admin/stats`, {
                    headers: { admin_token: adminToken }
                });

                if (data.success) {
                    setStats(data.stats);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error('Failed to fetch admin stats');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminStats();
    }, [backendUrl, adminToken, navigate]);

    const handleCardClick = async (type) => {
        if (activeTab === type) {
            setActiveTab(null);
            setListData([]);
            return;
        }

        setActiveTab(type);
        setListLoading(true);

        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/${type}`, {
                headers: { admin_token: adminToken }
            });

            if (data.success) {
                setListData(data[type]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(`Failed to fetch ${type}`);
        } finally {
            setListLoading(false);
        }
    };

    const renderTableHeaders = () => {
        if (activeTab === 'users') {
            return (
                <>
                    <th className="px-6 py-3 text-left">User</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Clerk ID</th>
                </>
            );
        }

        if (activeTab === 'jobs') {
            return (
                <>
                    <th className="px-6 py-3 text-left">Job Title</th>
                    <th className="px-6 py-3 text-left">Company</th>
                    <th className="px-6 py-3 text-left">Location</th>
                    <th className="px-6 py-3 text-left">Salary</th>
                </>
            );
        }

        if (activeTab === 'applications') {
            return (
                <>
                    <th className="px-6 py-3 text-left">Applicant</th>
                    <th className="px-6 py-3 text-left">Job</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Date</th>
                </>
            );
        }
    };

    const renderTableRows = () => {
        if (listData.length === 0) {
            return (
                <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                        No data found
                    </td>
                </tr>
            );
        }

        return listData.map((item, index) => {
            if (activeTab === 'users') {
                return (
                    <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 flex items-center gap-3">
                            <img
                                src={item.image || `https://ui-avatars.com/api/?name=${item.name}`}
                                alt="profile"
                                className="w-10 h-10 rounded-full object-cover border"
                            />
                            <span className="font-medium">{item.name}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{item.email}</td>
                        <td className="px-6 py-4 text-gray-400 text-sm">{item._id}</td>
                    </tr>
                );
            }

            if (activeTab === 'jobs') {
                return (
                    <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">{item.title}</td>
                        <td className="px-6 py-4">{item.companyId?.name}</td>
                        <td className="px-6 py-4">{item.location}</td>
                        <td className="px-6 py-4 font-semibold">${item.salary}</td>
                    </tr>
                );
            }

            if (activeTab === 'applications') {
                return (
                    <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 flex items-center gap-3">
                            <img
                                src={item.userId?.image || `https://ui-avatars.com/api/?name=${item.userId?.name}`}
                                alt="profile"
                                className="w-10 h-10 rounded-full object-cover border"
                            />
                            <div>
                                <p className="font-medium">{item.userId?.name}</p>
                                <p className="text-xs text-gray-400">{item.userId?.email}</p>
                            </div>
                        </td>

                        <td className="px-6 py-4">{item.jobId?.title}</td>

                        <td className="px-6 py-4">
                            <span className={`px-3 py-1 text-xs rounded-full font-semibold
                                ${item.status === 'Accepted' ? 'bg-green-100 text-green-600' :
                                    item.status === 'Rejected' ? 'bg-red-100 text-red-600' :
                                        'bg-yellow-100 text-yellow-600'}`}>
                                {item.status}
                            </span>
                        </td>

                        <td className="px-6 py-4 text-gray-500">
                            {new Date(item.date).toLocaleDateString()}
                        </td>
                    </tr>
                );
            }
        });
    };

    return (
        <div className="min-h-screen bg-linear-to-r from-indigo-50 via-white to-purple-50">

            {/* Navbar */}
            <div className="bg-white/80 backdrop-blur-md shadow-md py-4 sticky top-0 z-50">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <img
                        src={assets.logo}
                        className="h-8 cursor-pointer"
                        onClick={() => navigate('/')}
                    />

                    <button
                        onClick={() => {
                            setAdminToken(null);
                            localStorage.removeItem('adminToken');
                            navigate('/');
                        }}
                        className="bg-linear-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-full shadow hover:scale-105 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">

                {/* Heading */}
                <div className="text-center mb-14">
                    <h1 className="text-4xl font-extrabold text-purple-600">
                        Platform Overview
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Real-time insights and comprehensive metrics. Click any card to unravel deeper platform data.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-10">

                    {/* USERS */}
                    <div onClick={() => handleCardClick('users')}
                        className={`group relative p-10 rounded-3xl cursor-pointer transition-all duration-300
                        ${activeTab === 'users' ? 'border-2 border-indigo-400 shadow-xl' : 'border border-gray-200'}
                        bg-white/70 backdrop-blur-lg hover:shadow-2xl hover:-translate-y-2`}>

                        <div className="absolute right-6 top-6 opacity-10 text-indigo-500 text-7xl">👤</div>

                        <p className="text-gray-500 text-sm">TOTAL USERS</p>
                        <h2 className="text-5xl font-black mt-3">{stats.totalUsers}</h2>
                    </div>

                    {/* JOBS */}
                    <div onClick={() => handleCardClick('jobs')}
                        className={`group relative p-10 rounded-3xl cursor-pointer transition-all duration-300
                        ${activeTab === 'jobs' ? 'border-2 border-purple-400 shadow-xl' : 'border border-gray-200'}
                        bg-white/70 backdrop-blur-lg hover:shadow-2xl hover:-translate-y-2`}>

                        <div className="absolute right-6 top-6 opacity-10 text-purple-500 text-7xl">💼</div>

                        <p className="text-gray-500 text-sm">JOBS POSTED</p>
                        <h2 className="text-5xl font-black mt-3">{stats.totalJobs}</h2>
                    </div>

                    {/* APPLICATIONS */}
                    <div onClick={() => handleCardClick('applications')}
                        className={`group relative p-10 rounded-3xl cursor-pointer transition-all duration-300
                        ${activeTab === 'applications' ? 'border-2 border-pink-400 shadow-xl' : 'border border-gray-200'}
                        bg-white/70 backdrop-blur-lg hover:shadow-2xl hover:-translate-y-2`}>

                        <div className="absolute right-6 top-6 opacity-10 text-pink-500 text-7xl">📄</div>

                        <p className="text-gray-500 text-sm">APPLICATIONS</p>
                        <h2 className="text-5xl font-black mt-3">{stats.totalApplications}</h2>
                    </div>

                </div>

                {/* TABLE */}
                {activeTab && (
                    <div className="mt-14 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

                        <div className="flex justify-between items-center px-6 py-5 border-b">
                            <h2 className="font-bold text-lg capitalize">
                                Detailed {activeTab}
                            </h2>
                            <button onClick={() => setActiveTab(null)} className="text-gray-400 hover:text-black text-xl">
                                ✕
                            </button>
                        </div>

                        {listLoading ? (
                            <div className="p-10 text-center">Loading...</div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                    <tr>{renderTableHeaders()}</tr>
                                </thead>
                                <tbody className="divide-y">
                                    {renderTableRows()}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;
