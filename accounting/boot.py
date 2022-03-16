import frappe

def boot_session(bootinfo):
	bootinfo.reporting_doctypes = frappe.conf.reporting_doctypes

	# bootinfo.company_currency = frappe.db.get_single_value('Company', 'currency')