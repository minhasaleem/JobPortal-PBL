import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { backendUrl } = useContext(AppContext);
    const [stats, setStats] = useState({ totalJobs: 0, totalApplications: 0, totalUsers: 0 });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminStats = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/admin/stats`);
                if (data.success) {
                    setStats(data.stats);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error('Failed to fetch admin stats');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminStats();
    }, [backendUrl]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 font-sans text-gray-800">
            {/* Top Navigation */}
            <div className="shadow-lg py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
                    <img
                        onClick={() => navigate('/')}
                        className="cursor-pointer max-sm:w-32 transition-transform hover:scale-105"
                        src={assets.logo}
                        alt="logo"
                    />
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-wide">
                            Admin Portal
                        </span>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 sm:px-8 py-12 md:py-20 lg:py-24">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 mb-4 tracking-tight">
                        Platform Overview
                    </h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                        Real-time insights and comprehensive metrics to help you monitor and manage the entire ecosystem effectively.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-48">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 shadow-xl"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        
                        {/* Users Card */}
                        <div className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition duration-300 ease-out overflow-hidden cursor-default">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-24 h-24 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 uppercase tracking-wider text-sm mb-2 opacity-80 mt-4 group-hover:text-indigo-600 transition-colors">Total Users</h3>
                                <p className="text-5xl font-black text-gray-900 tracking-tight">{stats.totalUsers.toLocaleString()}</p>
                                <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                     <div className="bg-indigo-500 h-1.5 rounded-full" style={{width: '75%'}}></div>
                                </div>
                            </div>
                        </div>

                        {/* Jobs Card */}
                        <div className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition duration-300 ease-out overflow-hidden cursor-default">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-24 h-24 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                </svg>
                            </div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 uppercase tracking-wider text-sm mb-2 opacity-80 mt-4 group-hover:text-purple-600 transition-colors">Jobs Posted</h3>
                                <p className="text-5xl font-black text-gray-900 tracking-tight">{stats.totalJobs.toLocaleString()}</p>
                                <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                     <div className="bg-purple-500 h-1.5 rounded-full" style={{width: '60%'}}></div>
                                </div>
                            </div>
                        </div>

                        {/* Applications Card */}
                        <div className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition duration-300 ease-out overflow-hidden cursor-default">
                             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-24 h-24 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-700 uppercase tracking-wider text-sm mb-2 opacity-80 mt-4 group-hover:text-pink-600 transition-colors">Applications</h3>
                                <p className="text-5xl font-black text-gray-900 tracking-tight">{stats.totalApplications.toLocaleString()}</p>
                                <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                     <div className="bg-pink-500 h-1.5 rounded-full" style={{width: '90%'}}></div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </main>
            
            {/* Adding basic keyframe for animations in standard Tailwind config missing plugins */}
            <style jsx="true">{`
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
