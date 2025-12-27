import React from 'react';
import { DoorOpen, Camera, Ruler, Hash } from 'lucide-react';
import { DOOR_TYPES } from '../logic/models';
import ErrorMessage from './ErrorMessage';
import { sanitizeNumber, sanitizeDoorSize, sanitizeAddress } from '../logic/validation';

const DoorSpecification = ({ data, update, errors = {} }) => {
    const handleDoorChange = (doorKey, field, value) => {
        update({
            ...data,
            [doorKey]: {
                ...data[doorKey],
                [field]: value
            }
        });
    };

    const handleImageUpload = (doorKey, e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleDoorChange(doorKey, 'photo', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const doorConfigs = [
        { key: 'mainDoor', type: DOOR_TYPES.MAIN_DOOR },
        { key: 'interiorDoor', type: DOOR_TYPES.INTERIOR_DOOR },
        { key: 'bathroomDoor', type: DOOR_TYPES.BATHROOM_DOOR },
        { key: 'poojaDoor', type: DOOR_TYPES.POOJA_DOOR },
        { key: 'balconyDoor', type: DOOR_TYPES.BALCONY_DOOR },
        { key: 'kitchenUtilityDoor', type: DOOR_TYPES.KITCHEN_UTILITY_DOOR },
        { key: 'glassDoor', type: DOOR_TYPES.GLASS_DOOR },
        { key: 'fireExitDoor', type: DOOR_TYPES.FIRE_EXIT_DOOR },
        { key: 'specialDoor', type: DOOR_TYPES.SPECIAL_DOOR }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-black text-slate-900 font-display mb-2">Door Specifications</h2>
                <p className="text-slate-500 font-medium">Specify requirements for each door type</p>
                <div className="mt-2">
                    <ErrorMessage error={errors.general} />
                </div>
            </div>

            <div className="space-y-8">
                {doorConfigs.map(({ key, type }) => {
                    const doorData = data[key];

                    return (
                        <div key={key} className="bg-white border-2 border-slate-100 rounded-2xl p-6 space-y-4">
                            <h3 className="text-lg font-black text-slate-900 font-display flex items-center gap-2">
                                <DoorOpen size={20} className="text-emerald-600" />
                                {type.name}
                            </h3>

                            {/* Material Selection */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider">Material Type</label>
                                <select
                                    value={doorData.material}
                                    onChange={(e) => handleDoorChange(key, 'material', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 font-bold text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none appearance-none cursor-pointer"
                                >
                                    <option value="">Select material...</option>
                                    {type.materials.map((material) => (
                                        <option key={material} value={material}>{material}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Size Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider">Size (W x H)</label>
                                <div className="relative group">
                                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        value={doorData.size}
                                        onChange={(e) => handleDoorChange(key, 'size', sanitizeDoorSize(e.target.value))}
                                        placeholder="e.g. 3ft x 7ft"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 font-bold text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium"
                                    />
                                </div>
                            </div>

                            {/* Quantity Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider">Quantity</label>
                                <div className="relative group">
                                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                    <input
                                        type="tel"
                                        value={doorData.quantity}
                                        onChange={(e) => handleDoorChange(key, 'quantity', sanitizeNumber(e.target.value))}
                                        placeholder="0"
                                        min="0"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 font-bold text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium"
                                    />
                                </div>
                            </div>

                            {/* Special Door Specification */}
                            {key === 'specialDoor' && (
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider">Specification Details</label>
                                    <input
                                        type="text"
                                        value={doorData.specification || ''}
                                        onChange={(e) => handleDoorChange(key, 'specification', sanitizeAddress(e.target.value))}
                                        placeholder="Describe the special door type..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 font-bold text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none placeholder:text-slate-300 placeholder:font-medium"
                                    />
                                </div>
                            )}

                            {/* Photo Upload */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 font-display uppercase tracking-wider">Door Photo</label>
                                <div className="flex gap-3">
                                    <label className="flex-1 cursor-pointer">
                                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all">
                                            <div className="flex flex-col items-center gap-2 text-slate-500">
                                                <Camera size={24} className="text-emerald-600" />
                                                <span className="text-xs font-bold">
                                                    {doorData.photo ? 'Change Photo' : 'Upload Photo'}
                                                </span>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            onChange={(e) => handleImageUpload(key, e)}
                                            className="hidden"
                                        />
                                    </label>

                                    {doorData.photo && (
                                        <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-emerald-500">
                                            <img
                                                src={doorData.photo}
                                                alt={type.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DoorSpecification;
