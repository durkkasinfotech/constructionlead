import React from 'react';
import { CreditCard, TrendingUp, Calendar, Tag } from 'lucide-react';
import { PAYMENT_METHODS, LEAD_SOURCES, PRIORITY_LEVELS } from '../logic/models';
import ErrorMessage from './ErrorMessage';

const PaymentPriority = ({ data, update, errors = {} }) => {
    const handleChange = (field, value) => {
        update({ ...data, [field]: value });
    };

    const togglePaymentMethod = (method) => {
        // Enforce single selection: Replace the array with the new single method
        handleChange('paymentMethods', [method]);
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-slate-900 font-display mb-2">Payment & Project Level</h2>
                <p className="text-slate-500 font-medium">Payment methods and lead classification</p>
            </div>

            <div className="space-y-8">
                {/* Payment Methods */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1 flex items-center gap-2">
                        <CreditCard size={16} className="text-emerald-600" />
                        Payment Methods
                    </label>
                    <div className="space-y-2">
                        {PAYMENT_METHODS.map((method) => (
                            <label
                                key={method}
                                className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-all"
                            >
                                <input
                                    type="radio"
                                    name="paymentMethods"
                                    checked={(data.paymentMethods || []).includes(method)}
                                    onChange={() => togglePaymentMethod(method)}
                                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                                />
                                <span className="font-bold text-sm text-slate-900">{method}</span>
                            </label>
                        ))}
                    </div>
                    <ErrorMessage error={errors.paymentMethods} />
                </div>

                {/* Lead Source */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1 flex items-center gap-2">
                        <Tag size={16} className="text-emerald-600" />
                        Lead Source
                    </label>
                    <select
                        value={data.leadSource}
                        onChange={(e) => handleChange('leadSource', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none appearance-none cursor-pointer"
                    >
                        <option value="">Select lead source...</option>
                        {LEAD_SOURCES.map(source => (
                            <option key={source} value={source}>{source}</option>
                        ))}
                    </select>
                    <ErrorMessage error={errors.leadSource} />
                </div>

                {/* Project Priority */}
                <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1 flex items-center gap-2">
                        <TrendingUp size={16} className="text-emerald-600" />
                        Project Priority
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {PRIORITY_LEVELS.map((priority) => (
                            <button
                                key={priority}
                                onClick={() => handleChange('projectPriority', priority)}
                                className={`
                                    p-4 rounded-xl border-2 font-black text-sm transition-all uppercase tracking-wide
                                    ${data.projectPriority === priority
                                        ? priority === 'Hot'
                                            ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-200'
                                            : priority === 'Warm'
                                                ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-200'
                                                : 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-200'
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}
                                `}
                            >
                                {priority}
                            </button>
                        ))}
                    </div>
                    <ErrorMessage error={errors.projectPriority} />
                </div>

                {/* Expected Completion Date */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider ml-1 flex items-center gap-2">
                        <Calendar size={16} className="text-emerald-600" />
                        Expected Completion Date
                    </label>
                    <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                        <input
                            type="date"
                            value={data.expectedCompletionDate}
                            onChange={(e) => handleChange('expectedCompletionDate', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                        />
                    </div>
                    <ErrorMessage error={errors.expectedCompletionDate} />
                </div>
            </div>
        </div>
    );
};

export default PaymentPriority;
