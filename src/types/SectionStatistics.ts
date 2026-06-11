export interface SectionStatistics {
    // basic-info -> layout
    overview: {
        departments_count: number,
        activities_types_count: number,
        payments_types_count: number,
        regions_count: number,
        districts_count: number,
        file_status_count: number
    },
    // files -> layout
    files: {
        total_files: number,
        individual_files: number,
        company_files: number,
        charitable_company_files: number,
        total_attachments: number
    },
    // files-movments -> page
    files_movements: {
        total_movements: number,
        inside_archive_count: number,
        outside_archive_count: number,
        missing_count: number
    },
    // requests -> layout
    requests: {
        total_requests: number,
        pending_count: number,
        confirmed_count: number,
        archived_count: number,
        rejected_count: number
    },
    // users -> page 
    users: {
        total_users: number,
        admin_count: number,
        manager_count: number,
        employee_count: number,
        tax_payer_count: number,
        collectors_manager_count: number
    },
    // tax-collectors -> layout
    tax_collectors_and_job_types: {
        total_tax_collectors: number,
        total_job_types: number
    },
    // tax-payers -> layout
    tax_payers: {
        total_tax_payers: number,
        individual_count: number,
        company_count: number,
        charitable_company_count: number
    },
    // notifications -> page
    notifications: {
        total_notifications: number,
        type_counts: {
            General: number,
            ForSystemUsers: number,
            ForTaxPayers: number,
            Special: number
        }
    },
    // activity-log -> page
    activity_log: {
        total: number,
        created: number,
        updated: number,
        deleted: number
    }
}