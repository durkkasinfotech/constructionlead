import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INITIAL_LEAD_DATA } from './logic/models';
import StepIndicator from './components/StepIndicator';
import CustomerDetails from './components/CustomerDetails';
import ProjectDetails from './components/ProjectDetails';
import StakeholderDetails from './components/StakeholderDetails';
import DoorSpecification from './components/DoorSpecification';
import PaymentPriority from './components/PaymentPriority';
import Summary from './components/Summary';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { CheckCircle2, ChevronLeft, ChevronRight, Save, Home, Loader2, LogOut } from 'lucide-react';
import { validateMobile } from './logic/validation';
import { submitLead } from './logic/leadService';

import { mapDbLeadToFormData } from './logic/mappers';

const STEPS = [
    'Customer',
    'Project',
    'Stakeholders',
    'Doors',
    'Payment',
    'Review'
];

function App() {
    const [user, setUser] = useState(null); // { role: 'user' | 'admin', email: '...' }
    const [showForm, setShowForm] = useState(false);
    const [viewModeLead, setViewModeLead] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState(INITIAL_LEAD_DATA);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const mainContentRef = useRef(null);

    const updateFormData = (section, data) => {
        setFormData(prev => ({
            ...prev,
            [section]: data
        }));
        // Clear errors for this section when data is updated
        setErrors(prev => ({
            ...prev,
            [section]: {}
        }));
    };

    // Scroll to top whenever step changes
    useEffect(() => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollTop = 0;
        }
    }, [currentStep]);

    // Validation functions for each step
    const validateCustomerDetails = () => {
        const { name, mobile, address } = formData.customer;
        const newErrors = {};

        if (!name) newErrors.name = 'Customer/Owner Name is required';

        const mobileError = validateMobile(mobile);
        if (mobileError) newErrors.mobile = mobileError;

        if (!address) newErrors.address = 'Address/Site Location is required';

        setErrors({ customer: newErrors });
        return Object.keys(newErrors).length === 0;
    };

    const validateProjectDetails = () => {
        const { projectName, buildingType, constructionStage, doorRequirementTimeline, estimatedTotalDoorCount } = formData.project;
        const newErrors = {};

        if (!projectName) newErrors.projectName = 'Project Name is required';
        if (!buildingType) newErrors.buildingType = 'Building Type is required';
        if (!constructionStage) newErrors.constructionStage = 'Construction Stage is required';
        if (!doorRequirementTimeline) newErrors.doorRequirementTimeline = 'Requirement Timeline is required';
        if (!estimatedTotalDoorCount) newErrors.estimatedTotalDoorCount = 'Estimated Door Count is required';

        setErrors({ project: newErrors });
        return Object.keys(newErrors).length === 0;
    };

    const validateStakeholderDetails = () => {
        const { architectName, architectContact, contractorName, contractorContact } = formData.stakeholders;
        const newErrors = {};

        if (!architectName) newErrors.architectName = 'Architect/Engineer Name is required';

        const architectContactError = validateMobile(architectContact);
        if (architectContactError) newErrors.architectContact = architectContactError;

        if (!contractorName) newErrors.contractorName = 'Contractor Name is required';

        const contractorContactError = validateMobile(contractorContact);
        if (contractorContactError) newErrors.contractorContact = contractorContactError;

        setErrors({ stakeholders: newErrors });
        return Object.keys(newErrors).length === 0;
    };

    const validateDoorSpecifications = () => {
        // Check if at least one door type has been specified
        const doorSpecs = formData.doorSpecifications;
        const hasAnyDoor = Object.values(doorSpecs).some(door =>
            door.material && door.size && door.quantity && parseInt(door.quantity) > 0
        );

        if (!hasAnyDoor) {
            setErrors({
                doorSpecifications: {
                    general: 'Please specify at least one door type with Material, Size, and Quantity.'
                }
            });
            return false;
        }

        setErrors({ doorSpecifications: {} });
        return true;
    };

    const validatePaymentDetails = () => {
        const { paymentMethods, leadSource, projectPriority, expectedCompletionDate } = formData.payment;
        const newErrors = {};

        if (!paymentMethods || paymentMethods.length === 0) newErrors.paymentMethods = 'Select at least one payment method';
        if (!leadSource) newErrors.leadSource = 'Lead Source is required';
        if (!projectPriority) newErrors.projectPriority = 'Project Priority is required';
        if (!expectedCompletionDate) newErrors.expectedCompletionDate = 'Expected Completion Date is required';

        setErrors({ payment: newErrors });
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        // Validate current step before proceeding
        let isValid = true;

        switch (currentStep) {
            case 0: // Customer Details
                isValid = validateCustomerDetails();
                break;
            case 1: // Project Details
                isValid = validateProjectDetails();
                break;
            case 2: // Stakeholder Details
                isValid = validateStakeholderDetails();
                break;
            case 3: // Door Specifications
                isValid = validateDoorSpecifications();
                break;
            case 4: // Payment & Priority
                isValid = validatePaymentDetails();
                break;
            default:
                isValid = true;
        }

        if (isValid && currentStep < STEPS.length - 1) {
            setCurrentStep(curr => curr + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(curr => curr - 1);
        }
    };

    const handleSubmit = async () => {
        // Final validation before submit
        if (!validatePaymentDetails()) {
            return;
        }

        setIsSubmitting(true);
        // Pass user.email to track who submitted
        const result = await submitLead(formData, user?.email);
        setIsSubmitting(false);

        if (result.success) {
            console.log('Lead Submitted Successfully:', result);
            setIsSubmitted(true);
        } else {
            console.error('Submission Failed:', result.error);
            alert('Failed to submit lead. Please try again. ' + (result.error?.message || ''));
        }
    };



    // 1. Auth Flow
    if (!user) {
        return <Login onLogin={(role, email) => {
            setUser({ role, email });
            if (role === 'user') {
                setShowForm(true);
            }
        }} />;
    }

    // 2. View Mode (Admin Viewing Specific Lead)
    if (viewModeLead) {
        return (
            <div className="bg-slate-50 min-h-screen font-sans">
                <header className="bg-white border-b border-slate-100 sticky top-0 z-10 px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center justify-between w-full sm:w-auto">
                        <button
                            onClick={() => setViewModeLead(null)}
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors"
                        >
                            <ChevronLeft size={20} />
                            Back
                        </button>
                        {/* Mobile-only Title logic could go here, but let's keep it simple */}
                    </div>

                    <div className="flex-1 w-full sm:w-auto sm:text-center">
                        <h1 className="text-xl font-black text-slate-900 font-display">Lead Details</h1>
                        {viewModeLead?.project?.projectName && (
                            <p className="text-sm font-medium text-slate-500 truncate">{viewModeLead.project.projectName}</p>
                        )}
                    </div>

                    <div className="w-20 hidden sm:block"></div> {/* Spacer for centering desktop */}
                </header>
                <main className="max-w-3xl mx-auto px-6 py-8">
                    <Summary data={viewModeLead} />
                </main>
            </div>
        );
    }

    // 3. Dashboard Flow (Admin Only)
    if (!showForm && user.role === 'admin') {
        return (
            <Dashboard
                user={user}
                onLogout={() => {
                    setUser(null);
                    setShowForm(false);
                }}
                onNewLead={() => {
                    setFormData(INITIAL_LEAD_DATA);
                    setCurrentStep(0);
                    setIsSubmitted(false);
                    setShowForm(true);
                }}
                onView={(lead) => {
                    const mappedData = mapDbLeadToFormData(lead);
                    setViewModeLead(mappedData);
                }}
            />
        );
    }

    // 3. Success State
    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass p-8 rounded-3xl shadow-2xl text-center max-w-md w-full border-t-8 border-primary-500"
                >
                    <div className="flex justify-center mb-6">
                        <CheckCircle2 size={80} className="text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Lead Collected!</h1>
                    <p className="text-slate-600 mb-8">
                        The construction lead for <span className="font-semibold text-primary-600">{formData.project.siteName || 'the site'}</span> has been successfully recorded.
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                setFormData(INITIAL_LEAD_DATA);
                                setCurrentStep(0);
                                setIsSubmitted(false);
                            }}
                            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold shadow-lg transform active:scale-95 transition-all"
                        >
                            Collect Another Lead
                        </button>
                        <button
                            onClick={() => {
                                setShowForm(false);
                                setFormData(INITIAL_LEAD_DATA);
                                setCurrentStep(0);
                                setIsSubmitted(false);
                                // If user, logout on 'Back' since they have no dashboard
                                if (user.role === 'user') {
                                    setUser(null);
                                }
                            }}
                            className="w-full py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95"
                        >
                            {user.role === 'admin' ? 'Back to Dashboard' : 'Sign Out'}
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // 4. Form Flow
    return (
        <div className="bg-slate-50 h-[100dvh] font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-hidden">
            <div className="app-container max-w-[600px] mx-auto h-full bg-white shadow-2xl shadow-slate-200/50 flex flex-col relative">

                {/* Decorative Top Bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

                {/* Header */}
                <header className="flex-none bg-white z-20 shadow-sm border-b border-slate-100 px-6 py-4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    if (user.role === 'user') {
                                        setUser(null);
                                        setShowForm(false);
                                    } else {
                                        setShowForm(false);
                                    }
                                }}
                                className="p-2.5 -ml-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
                                title={user.role === 'user' ? 'Sign Out' : 'Back to Dashboard'}
                            >
                                {user.role === 'user' ? <LogOut size={22} strokeWidth={2} /> : <Home size={22} strokeWidth={2} />}
                            </button>
                            <div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none font-display">LeadPro</h1>
                                <p className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest mt-1 font-display">Field Collector</p>
                            </div>
                        </div>
                        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-400">
                            <Save size={20} strokeWidth={2} />
                        </div>
                    </div>

                    <div className="mb-6 flex gap-3">
                        {currentStep > 0 && (
                            <button
                                onClick={prevStep}
                                disabled={isSubmitting}
                                className="px-4 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-95 transition-all text-xs font-display uppercase tracking-wide disabled:opacity-50"
                            >
                                <ChevronLeft size={16} />
                                Back
                            </button>
                        )}

                        {currentStep < STEPS.length - 1 ? (
                            <button
                                onClick={nextStep}
                                className="flex-1 py-3 px-6 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all text-xs font-display uppercase tracking-wide group"
                            >
                                Next Step
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex-1 py-3 px-6 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all text-xs font-display uppercase tracking-wide disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        Submit Lead
                                        <CheckCircle2 size={16} />
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    <StepIndicator steps={STEPS} currentStep={currentStep} />
                </header>

                {/* Main Content */}
                <main ref={mainContentRef} className="flex-1 overflow-y-auto scrollbar-hide bg-slate-50/50 px-6 pt-4 pb-32">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {currentStep === 0 && <CustomerDetails data={formData.customer} update={(d) => updateFormData('customer', d)} errors={errors.customer || {}} />}
                            {currentStep === 1 && <ProjectDetails data={formData.project} update={(d) => updateFormData('project', d)} errors={errors.project || {}} />}
                            {currentStep === 2 && <StakeholderDetails data={formData.stakeholders} update={(d) => updateFormData('stakeholders', d)} errors={errors.stakeholders || {}} />}
                            {currentStep === 3 && <DoorSpecification data={formData.doorSpecifications} update={(d) => updateFormData('doorSpecifications', d)} errors={errors.doorSpecifications || {}} />}
                            {currentStep === 4 && <PaymentPriority data={formData.payment} update={(d) => updateFormData('payment', d)} errors={errors.payment || {}} />}
                            {currentStep === 5 && <Summary data={formData} />}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}

export default App;
