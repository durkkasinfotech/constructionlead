import React from 'react';
import { Building2, Calendar, Layers, Hash } from 'lucide-react';
import { BUILDING_TYPES, CONSTRUCTION_STAGES } from '../logic/models';
import ErrorMessage from './ErrorMessage';
import { sanitizeNumber, sanitizeAddress } from '../logic/validation';

const ProjectDetails = ({ data, update, errors = {} }) => {
    const handleChange = (field, value) => {
        update({ ...data, [field]: value });
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-slate-900 font-display mb-2">Project Information</h2>
                <p className="text-slate-500 font-medium">Details about the construction project</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">
                        Project Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="text"
                            value={data.projectName}
                            onChange={(e) => handleChange('projectName', sanitizeAddress(e.target.value))}
                            placeholder="e.g. Green Valley Residency"
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium"
                        />
                    </div>
                    <ErrorMessage error={errors.projectName} />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">
                        Building Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={data.buildingType}
                        onChange={(e) => handleChange('buildingType', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none appearance-none cursor-pointer"
                    >
                        <option value="">Select building type...</option>
                        {BUILDING_TYPES.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <ErrorMessage error={errors.buildingType} />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">
                        Construction Stage <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={data.constructionStage}
                        onChange={(e) => handleChange('constructionStage', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none appearance-none cursor-pointer"
                    >
                        <option value="">Select construction stage...</option>
                        {CONSTRUCTION_STAGES.map((stage) => (
                            <option key={stage} value={stage}>{stage}</option>
                        ))}
                    </select>
                    <ErrorMessage error={errors.constructionStage} />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">
                        Estimated Door Requirement Timeline <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="text"
                            value={data.doorRequirementTimeline}
                            onChange={(e) => handleChange('doorRequirementTimeline', sanitizeAddress(e.target.value))}
                            placeholder="MM/YYYY or months"
                            required
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium"
                        />
                    </div>
                    <ErrorMessage error={errors.doorRequirementTimeline} />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">Total Units / Floors <span className="text-slate-400 normal-case">(If Multi-Unit)</span></label>
                    <div className="relative group">
                        <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="text"
                            value={data.totalUnitsFloors}
                            onChange={(e) => handleChange('totalUnitsFloors', sanitizeAddress(e.target.value))}
                            placeholder="e.g. 4 Floors or 12 Units"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1">
                        Estimated Total Door Count <span className="text-red-500">*</span> <span className="text-slate-400 normal-case">(All Types)</span>
                    </label>
                    <div className="relative group">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="number"
                            value={data.estimatedTotalDoorCount}
                            onChange={(e) => handleChange('estimatedTotalDoorCount', sanitizeNumber(e.target.value))}
                            placeholder="e.g. 15"
                            required
                            min="1"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium"
                        />
                    </div>
                    <ErrorMessage error={errors.estimatedTotalDoorCount} />
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
