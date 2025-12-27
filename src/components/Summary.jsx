import React from 'react';
import { User, Building2, Users, DoorOpen, CreditCard, CheckCircle } from 'lucide-react';

const Summary = ({ data }) => {
    const SectionCard = ({ icon: Icon, title, children }) => (
        <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-black text-slate-900 font-display flex items-center gap-2">
                <Icon size={20} className="text-emerald-600" />
                {title}
            </h3>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );

    const DataRow = ({ label, value }) => (
        value ? (
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 py-3 border-b border-slate-100 last:border-0">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
                <span className="text-sm font-bold text-slate-900 text-left sm:text-right break-words">{value}</span>
            </div>
        ) : null
    );

    const doorEntries = Object.entries(data.doorSpecifications || {}).filter(([_, door]) =>
        door.material || door.size || door.quantity
    );

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-slate-900 font-display mb-2">Review & Submit</h2>
                <p className="text-slate-500 font-medium">Please review all information before submitting</p>
            </div>

            <div className="space-y-6">
                {/* Customer Details */}
                <SectionCard icon={User} title="Customer Contact Details">
                    <DataRow label="Name" value={data.customer?.name} />
                    <DataRow label="Mobile" value={data.customer?.mobile} />
                    <DataRow label="Email" value={data.customer?.email} />
                    <DataRow label="Address" value={data.customer?.address} />
                    <DataRow label="Alternate Contact" value={data.customer?.alternateContact} />
                    <DataRow label="Alternate Number" value={data.customer?.alternateNumber} />
                    <DataRow label="Remarks" value={data.customer?.remarks} />
                </SectionCard>

                {/* Project Information */}
                <SectionCard icon={Building2} title="Project Information">
                    <DataRow label="Project Name" value={data.project?.projectName} />
                    <DataRow label="Building Type" value={data.project?.buildingType} />
                    <DataRow label="Construction Stage" value={data.project?.constructionStage} />
                    <DataRow label="Door Timeline" value={data.project?.doorRequirementTimeline} />
                    <DataRow label="Total Units/Floors" value={data.project?.totalUnitsFloors} />
                    <DataRow label="Total Door Count" value={data.project?.estimatedTotalDoorCount} />
                </SectionCard>

                {/* Stakeholder Details */}
                <SectionCard icon={Users} title="Stakeholder Details">
                    <DataRow label="Architect Name" value={data.stakeholders?.architectName} />
                    <DataRow label="Architect Contact" value={data.stakeholders?.architectContact} />
                    <DataRow label="Contractor Name" value={data.stakeholders?.contractorName} />
                    <DataRow label="Contractor Contact" value={data.stakeholders?.contractorContact} />
                </SectionCard>

                {/* Door Specifications */}
                {doorEntries.length > 0 && (
                    <SectionCard icon={DoorOpen} title="Door Specifications">
                        {doorEntries.map(([doorKey, door]) => {
                            const doorNames = {
                                mainDoor: 'Main Door',
                                interiorDoor: 'Interior Door',
                                bathroomDoor: 'Bathroom Door',
                                poojaDoor: 'Pooja Door',
                                balconyDoor: 'Balcony Door',
                                kitchenUtilityDoor: 'Kitchen Utility Door',
                                glassDoor: 'Glass Door',
                                fireExitDoor: 'Fire Exit Door',
                                specialDoor: 'Special Door'
                            };

                            return (
                                <div key={doorKey} className="bg-slate-50 rounded-xl p-4 space-y-2">
                                    <h4 className="font-black text-sm text-emerald-600 uppercase tracking-wide">
                                        {doorNames[doorKey]}
                                    </h4>
                                    {door.material && <DataRow label="Material" value={door.material} />}
                                    {door.size && <DataRow label="Size" value={door.size} />}
                                    {door.quantity && <DataRow label="Quantity" value={door.quantity} />}
                                    {door.specification && <DataRow label="Specification" value={door.specification} />}
                                    {door.photo && (
                                        <div className="mt-2">
                                            <img
                                                src={door.photo}
                                                alt={doorNames[doorKey]}
                                                className="w-full h-32 object-cover rounded-lg border-2 border-emerald-200"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </SectionCard>
                )}

                {/* Payment & Project Level */}
                <SectionCard icon={CreditCard} title="Payment & Project Level">
                    {data.payment?.paymentMethods && data.payment.paymentMethods.length > 0 && (
                        <DataRow
                            label="Payment Methods"
                            value={data.payment.paymentMethods.join(', ')}
                        />
                    )}
                    <DataRow label="Lead Source" value={data.payment?.leadSource} />
                    <DataRow label="Project Priority" value={data.payment?.projectPriority} />
                    <DataRow label="Expected Completion" value={data.payment?.expectedCompletionDate} />
                </SectionCard>

                {/* Confirmation Message */}
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 flex items-start gap-4">
                    <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                        <h4 className="font-black text-emerald-900 mb-1">Ready to Submit</h4>
                        <p className="text-sm text-emerald-700 font-medium">
                            Please review all the information above. Once submitted, this lead will be recorded in the system.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summary;
