import frappe

__version__ = '0.0.1'


def get_default_currency():
	# frappe.cache().hset(key, value) => Redis
	# frappe.db.set_default(key, value) => MariaDB
	if not frappe.flags.default_currency:
		frappe.flags.default_currency = frappe.db.get_single_value('Company', 'currency')

	return frappe.flags.default_currency