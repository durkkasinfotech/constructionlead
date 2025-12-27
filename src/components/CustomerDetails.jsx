import React from 'react';
import { User, Phone, Mail, MapPin, Users, FileText } from 'lucide-react';
import ErrorMessage from './ErrorMessage';
import { sanitizeName, sanitizeMobile, sanitizeEmail, sanitizeAddress } from '../logic/validation';

const CustomerDetails = ({ data, update, errors = {} }) => {
    const handleChange = (field, value) => {
        update({ ...data, [field]: value });
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-slate-900 font-display mb-2">Customer Contact Details</h2>
                <p className="text-slate-500 font-medium">Primary customer information</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">
                        Customer / Owner Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => handleChange('name', sanitizeName(e.target.value))}
                            placeholder="e.g. Rajesh Kumar"
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium"
                        />
                    </div>
                    <ErrorMessage error={errors.name} />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">
                        Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="tel"
                            value={data.mobile}
                            onChange={(e) => handleChange('mobile', sanitizeMobile(e.target.value))}
                            placeholder="98765 43210"
                            required
                            maxLength={10}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium tracking-widest"
                        />
                    </div>
                    <ErrorMessage error={errors.mobile} />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">Email Address <span className="text-slate-400 normal-case">(Optional)</span></label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => handleChange('email', sanitizeEmail(e.target.value))}
                            placeholder="john@example.com"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">
                        Address / Site Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <MapPin className="absolute left-4 top-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <textarea
                            value={data.address}
                            onChange={(e) => handleChange('address', sanitizeAddress(e.target.value))}
                            placeholder="Plot No, Street Name, Area..."
                            rows="3"
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium resize-none"
                        />
                    </div>
                    <ErrorMessage error={errors.address} />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">Alternate Contact Person <span className="text-slate-400 normal-case">(Optional)</span></label>
                    <div className="relative group">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="text"
                            value={data.alternateContact}
                            onChange={(e) => handleChange('alternateContact', sanitizeName(e.target.value))}
                            placeholder="e.g. Suresh Kumar"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">Alternate Number <span className="text-slate-400 normal-case">(Optional)</span></label>
                    <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="tel"
                            value={data.alternateNumber}
                            onChange={(e) => handleChange('alternateNumber', sanitizeMobile(e.target.value))}
                            placeholder="98765 43210"
                            maxLength={10}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium tracking-widest"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">Remarks <span className="text-slate-400 normal-case">(Optional)</span></label>
                    <div className="relative group">
                        <FileText className="absolute left-4 top-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <textarea
                            value={data.remarks}
                            onChange={(e) => handleChange('remarks', sanitizeAddress(e.target.value))}
                            placeholder="Any additional notes..."
                            rows="3"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium resize-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;
