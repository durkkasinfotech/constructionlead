import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Plus, LogOut, LayoutDashboard, Database, Search, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = ({ user, onLogout, onNewLead, onView }) => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchLeads();
    }, [user]);

    const fetchLeads = async () => {
        setLoading(true);
        let query = supabase
            .from('leads')
            .select(`
                *,
                project_information (*),
                customer_contact_details (*),
                stakeholder_details (*),
                door_specifications (*),
                payment_details (*)
            `)
            .order('created_at', { ascending: false });

        // Admin sees all; User sees only their own (filtered by submitted_by email)
        if (user.role === 'user') {
            query = query.eq('submitted_by', user.email);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching leads:', error);
        } else {
            setLeads(data || []);
        }
        setLoading(false);
    };

    const filteredLeads = leads.filter(lead =>
        lead.lead_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.customer_contact_details?.[0]?.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.project_information?.[0]?.project_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                            <LayoutDashboard size={20} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 font-display">Dashboard</h1>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {user.role === 'admin' ? 'Administrator' : 'Fos User'} • {user.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                        title="Sign Out"
                    >
                        <LogOut size={20} strokeWidth={2} />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 py-8">
                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8">
                    <div className="relative flex-1 w-full sm:max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                        <input
                            type="text"
                            placeholder="Search projects, customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-slate-700 focus:ring-4 focus:ring-slate-100 focus:border-emerald-500 outline-none transition-all placeholder:font-medium placeholder:text-slate-400 shadow-sm"
                        />
                    </div>

                    <button
                        onClick={onNewLead}
                        className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all group"
                    >
                        <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                        <span>New Lead</span>
                    </button>
                </div>

                {/* Leads List */}
                {loading ? (
                    <div className="grid gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white h-32 rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : filteredLeads.length > 0 ? (
                    <div className="grid gap-4">
                        {filteredLeads.map((lead) => (
                            <motion.div
                                key={lead.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white border border-slate-100 p-5 sm:p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-xl hover:shadow-slate-200/50 hover:border-emerald-100 transition-all group cursor-pointer relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-slate-100 group-hover:bg-emerald-500 transition-colors"></div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg uppercase tracking-wider">{lead.lead_number}</span>
                                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${lead.status === 'New' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                                            }`}>
                                            {lead.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 font-display tracking-tight group-hover:text-emerald-900 transition-colors">
                                        {lead.project_information?.[0]?.project_name || 'Project Name Not Set'}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-500 font-medium text-sm">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                            {lead.customer_contact_details?.[0]?.customer_name || 'Unknown Customer'}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                            {new Date(lead.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-50">
                                    <div className="text-left sm:text-right">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Doors</p>
                                        <p className="font-black text-slate-900 text-xl font-display">
                                            {lead.project_information?.[0]?.estimated_total_door_count || 0}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => onView && onView(lead)}
                                        className="px-5 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-500 hover:text-white transition-all active:scale-95"
                                    >
                                        <Eye size={18} />
                                        <span>View</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-slate-400">
                        <Database size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="font-bold">No leads found</p>
                        <p className="text-sm mt-1">Start by creating a new lead entry.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
