/**
 * Logic Separation: Data Models
 * This file defines the structure of the Lead record based on reg.md
 * Keeping this separate allows for code reuse in React Native.
 */

// Building Types
export const BUILDING_TYPES = [
    'Independent House / Villa',
    'Apartment / Residential Complex',
    'Commercial',
    'Office Space',
    'Other'
];

// Construction Stages
export const CONSTRUCTION_STAGES = [
    'Foundation',
    'Walls',
    'Roofing / Slab',
    'Plastering',
    'Ready for Door Work'
];

// Door Type Specifications
export const DOOR_TYPES = {
    MAIN_DOOR: {
        name: 'Main Door',
        materials: ['Teak Wood', 'Solid Core', 'Designer Laminate', 'Metal/Steel', 'Other']
    },
    INTERIOR_DOOR: {
        name: 'Interior Door',
        materials: ['Flush Door', 'Moulded Door', 'Laminated / Veneer', 'WPC', 'Other']
    },
    BATHROOM_DOOR: {
        name: 'Bathroom Door',
        materials: ['PVC/FRP', 'WPC', 'Water-proof Laminate', 'Other']
    },
    POOJA_DOOR: {
        name: 'Pooja Door',
        materials: ['Wood Carved', 'Glass', 'Laminate Design', 'Other']
    },
    BALCONY_DOOR: {
        name: 'Balcony Door',
        materials: ['UPVC', 'Aluminium', 'Glass', 'Other']
    },
    KITCHEN_UTILITY_DOOR: {
        name: 'Kitchen Utility Door',
        materials: ['WPC', 'Laminated', 'Steel', 'Other']
    },
    GLASS_DOOR: {
        name: 'Glass Door',
        materials: ['Full Glass', 'Partial Glass', 'Frame Glass']
    },
    FIRE_EXIT_DOOR: {
        name: 'Fire Exit Door',
        materials: ['Fire Rated Steel Door', 'With Panic Bar']
    },
    SPECIAL_DOOR: {
        name: 'Special / Sliding / Folding / Fire-rated',
        materials: ['Specify']
    }
};

// Payment Methods
export const PAYMENT_METHODS = [
    'Bank Transfer',
    'Cash',
    'Advance Payment'
];

// Lead Sources
export const LEAD_SOURCES = [
    'Walk-in',
    'Referral',
    'Online',
    'Advertisement',
    'Architect Reference',
    'Contractor Reference',
    'Other'
];

// Project Priority Levels
export const PRIORITY_LEVELS = [
    'Hot',
    'Warm',
    'Cold'
];

// Initial Lead Data Structure
export const INITIAL_LEAD_DATA = {
    customer: {
        name: '',
        mobile: '',
        email: '',
        address: '',
        alternateContact: '',
        alternateNumber: '',
        remarks: ''
    },
    project: {
        projectName: '',
        buildingType: '',
        constructionStage: '',
        doorRequirementTimeline: '',
        totalUnitsFloors: '',
        estimatedTotalDoorCount: ''
    },
    stakeholders: {
        architectName: '',
        architectContact: '',
        contractorName: '',
        contractorContact: ''
    },
    doorSpecifications: {
        mainDoor: { material: '', size: '', photo: null, quantity: '' },
        interiorDoor: { material: '', size: '', photo: null, quantity: '' },
        bathroomDoor: { material: '', size: '', photo: null, quantity: '' },
        poojaDoor: { material: '', size: '', photo: null, quantity: '' },
        balconyDoor: { material: '', size: '', photo: null, quantity: '' },
        kitchenUtilityDoor: { material: '', size: '', photo: null, quantity: '' },
        glassDoor: { material: '', size: '', photo: null, quantity: '' },
        fireExitDoor: { material: '', size: '', photo: null, quantity: '' },
        specialDoor: { material: '', size: '', photo: null, quantity: '', specification: '' }
    },
    payment: {
        paymentMethods: [],
        leadSource: '',
        projectPriority: '',
        expectedCompletionDate: ''
    }
};
