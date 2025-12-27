import { supabase } from '../supabase';
import { DOOR_TYPES } from './models';

export const submitLead = async (formData, userEmail) => {
    console.log('[LeadService] Starting submission...', formData);
    try {
        // 1. Create Lead Entry
        const leadNumber = `LEAD - ${Date.now()} `; // Simple unique generator
        console.log('[LeadService] Creating lead record...', leadNumber);
        const { data: leadData, error: leadError } = await supabase
            .from('leads')
            .insert([
                {
                    lead_number: leadNumber,
                    status: 'New',
                    notes: 'Mobile App Submission',
                    submitted_by: userEmail || 'unknown'
                }
            ])
            .select()
            .single();

        if (leadError) {
            console.error('[LeadService] Failed to create lead:', leadError);
            throw leadError;
        }
        const leadId = leadData.id;
        console.log('[LeadService] Lead created with ID:', leadId);

        // 2. Insert Customer Details
        console.log('[LeadService] Inserting customer details...');
        const { error: customerError } = await supabase
            .from('customer_contact_details')
            .insert([
                {
                    lead_id: leadId,
                    customer_name: formData.customer.name,
                    mobile_number: formData.customer.mobile,
                    email_address: formData.customer.email || null,
                    address_site_location: formData.customer.address,
                    alternate_contact_person: formData.customer.alternateContact || null,
                    alternate_number: formData.customer.alternateNumber || null,
                    remarks: formData.customer.remarks || null
                }
            ]);
        if (customerError) {
            console.error('[LeadService] Failed to insert customer details:', customerError);
            throw customerError;
        }
        console.log('[LeadService] Customer details inserted.');

        // 3. Insert Project Information
        console.log('[LeadService] Inserting project information...');
        const projectPayload = {
            lead_id: leadId,
            project_name: formData.project.projectName,
            building_type: formData.project.buildingType,
            construction_stage: formData.project.constructionStage,
            door_requirement_timeline: formData.project.doorRequirementTimeline,
            total_units_floors: formData.project.totalUnitsFloors || null,
            estimated_total_door_count: parseInt(formData.project.estimatedTotalDoorCount) || 0
        };
        console.log('[LeadService] Project Payload:', projectPayload);

        const { error: projectError } = await supabase
            .from('project_information')
            .insert([projectPayload]);

        if (projectError) {
            console.error('[LeadService] Failed to insert project details:', projectError);
            throw projectError;
        }
        console.log('[LeadService] Project information inserted.');

        // 4. Insert Stakeholder Details
        console.log('[LeadService] Inserting stakeholder details...');
        const { error: stakeholderError } = await supabase
            .from('stakeholder_details')
            .insert([
                {
                    lead_id: leadId,
                    architect_engineer_name: formData.stakeholders.architectName,
                    architect_contact_number: formData.stakeholders.architectContact,
                    contractor_name: formData.stakeholders.contractorName,
                    contractor_contact_number: formData.stakeholders.contractorContact
                }
            ]);
        if (stakeholderError) {
            console.error('[LeadService] Failed to insert stakeholder details:', stakeholderError);
            throw stakeholderError;
        }
        console.log('[LeadService] Stakeholder details inserted.');

        // 5. Insert Door Specifications
        console.log('[LeadService] Processing door specifications...');
        const doorInserts = [];
        // Map keys to pretty names using a helper or hardcoded map if models.js isn't imported fully
        // Assuming DOOR_TYPES keys match or we just use the name from the object in formData if it existed
        // But formData just has keys like 'mainDoor': { material... }
        // We need the LABEL 'Main Door'.

        // Reconstruct the mapping from logic/models or hardcode it safely here to match UI
        const doorTypeMap = {
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

        for (const [key, spec] of Object.entries(formData.doorSpecifications)) {
            // Only insert if it looks valid (has quantity > 0)
            const qty = parseInt(spec.quantity) || 0;
            if (qty > 0) {
                doorInserts.push({
                    lead_id: leadId,
                    door_type: doorTypeMap[key] || key,
                    material_type: spec.material || 'Not Specified',
                    size: spec.size || 'Not Specified',
                    quantity: qty,
                    specification_details: spec.specification || null,
                    photo_url: spec.photo || null // Note: This stores base64 string directly if not uploaded elsewhere
                });
            }
        }

        if (doorInserts.length > 0) {
            const { error: doorError } = await supabase
                .from('door_specifications')
                .insert(doorInserts);
            if (doorError) {
                console.error('[LeadService] Failed to insert door specs:', doorError);
                throw doorError;
            }
            console.log('[LeadService] Inserted', doorInserts.length, 'door specifications.');
        } else {
            console.log('[LeadService] No door specifications to insert.');
        }

        // 6. Insert Payment Details
        console.log('[LeadService] Inserting payment details...');
        const { error: paymentError } = await supabase
            .from('payment_details')
            .insert([
                {
                    lead_id: leadId,
                    payment_methods: formData.payment.paymentMethods, // Array
                    lead_source: formData.payment.leadSource,
                    project_priority: formData.payment.projectPriority,
                    expected_completion_date: formData.payment.expectedCompletionDate
                }
            ]);
        if (paymentError) {
            console.error('[LeadService] Failed to insert payment details:', paymentError);
            throw paymentError;
        }
        console.log('[LeadService] Payment details inserted.');

        console.log('[LeadService] Submission successful!');
        return { success: true, leadId, leadNumber };

    } catch (error) {
        console.error('[LeadService] Submission Final Error:', error);
        return { success: false, error, message: error.message };
    }
};
