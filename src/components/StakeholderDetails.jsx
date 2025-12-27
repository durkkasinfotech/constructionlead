import React from 'react';
import { Compass, Phone, HardHat } from 'lucide-react';
import ErrorMessage from './ErrorMessage';
import { sanitizeName, sanitizeMobile } from '../logic/validation';

const StakeholderDetails = ({ data, update, errors = {} }) => {
    const handleChange = (field, value) => {
        update({ ...data, [field]: value });
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-slate-900 font-display mb-2">Stakeholder Details</h2>
                <p className="text-slate-500 font-medium">Key people involved in the project</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">
                        Architect / Engineer Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <Compass className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="text"
                            value={data.architectName}
                            onChange={(e) => handleChange('architectName', sanitizeName(e.target.value))}
                            placeholder="e.g. Ar. Rajesh Kumar"
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium"
                        />
                    </div>
                    <ErrorMessage error={errors.architectName} />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">
                        Contact Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="tel"
                            value={data.architectContact}
                            onChange={(e) => handleChange('architectContact', sanitizeMobile(e.target.value))}
                            placeholder="98765 43210"
                            required
                            maxLength={10}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium tracking-widest"
                        />
                    </div>
                    <ErrorMessage error={errors.architectContact} />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">
                        Contractor Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <HardHat className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="text"
                            value={data.contractorName}
                            onChange={(e) => handleChange('contractorName', sanitizeName(e.target.value))}
                            placeholder="e.g. BuildWell Constructions"
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium"
                        />
                    </div>
                    <ErrorMessage error={errors.contractorName} />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">
                        Contact Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="tel"
                            value={data.contractorContact}
                            onChange={(e) => handleChange('contractorContact', sanitizeMobile(e.target.value))}
                            placeholder="98765 43210"
                            required
                            maxLength={10}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium tracking-widest"
                        />
                    </div>
                    <ErrorMessage error={errors.contractorContact} />
                </div>
            </div>
        </div>
    );
};

export default StakeholderDetails;
