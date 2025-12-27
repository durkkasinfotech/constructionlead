
/**
 * Maps Supabase Lead DB schema to App FormData schema.
 * @param {Object} dbLead - Full lead object including joins from Supabase
 * @returns {Object} formData - Structure compatible with Summary component and App state
 */
export const mapDbLeadToFormData = (dbLead) => {
    if (!dbLead) return null;

    // Helper to safely access array[0] from joins
    const customer = dbLead.customer_contact_details?.[0] || {};
    const project = dbLead.project_information?.[0] || {};
    const stakeholder = dbLead.stakeholder_details?.[0] || {};
    const payment = dbLead.payment_details?.[0] || {};

    // Process Door Specifications from Array to Object Map
    const doorSpecs = {};
    const doorTypeReverseMap = {
        'Main Door': 'mainDoor',
        'Interior Door': 'interiorDoor',
        'Bathroom Door': 'bathroomDoor',
        'Pooja Door': 'poojaDoor',
        'Balcony Door': 'balconyDoor',
        'Kitchen Utility Door': 'kitchenUtilityDoor',
        'Glass Door': 'glassDoor',
        'Fire Exit Door': 'fireExitDoor',
        'Special Door': 'specialDoor',
        'Special / Sliding / Folding / Fire-rated': 'specialDoor'
    };

    if (dbLead.door_specifications && Array.isArray(dbLead.door_specifications)) {
        dbLead.door_specifications.forEach(ds => {
            const key = doorTypeReverseMap[ds.door_type] || 'other';
            if (key) {
                doorSpecs[key] = {
                    material: ds.material_type,
                    size: ds.size,
                    quantity: String(ds.quantity), // Form uses strings often
                    specification: ds.specification_details,
                    photo: ds.photo_url
                };
            }
        });
    }

    return {
        customer: {
            name: customer.customer_name,
            mobile: customer.mobile_number,
            email: customer.email_address,
            address: customer.address_site_location,
            alternateContact: customer.alternate_contact_person,
            alternateNumber: customer.alternate_number,
            remarks: customer.remarks
        },
        project: {
            projectName: project.project_name,
            buildingType: project.building_type,
            constructionStage: project.construction_stage,
            doorRequirementTimeline: project.door_requirement_timeline,
            totalUnitsFloors: project.total_units_floors,
            estimatedTotalDoorCount: String(project.estimated_total_door_count)
        },
        stakeholders: {
            architectName: stakeholder.architect_engineer_name,
            architectContact: stakeholder.architect_contact_number,
            contractorName: stakeholder.contractor_name,
            contractorContact: stakeholder.contractor_contact_number
        },
        doorSpecifications: doorSpecs,
        payment: {
            paymentMethods: payment.payment_methods || [],
            leadSource: payment.lead_source,
            projectPriority: payment.project_priority,
            expectedCompletionDate: payment.expected_completion_date
        }
    };
};
