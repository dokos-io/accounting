import frappe

def get_additional_filters_config(*args, **kwargs):
	filters_config = {
		"journal status": {
			"label": "Status Equal",
			"get_field": "accounting.filters.get_journal_entry_status_field",
			"valid_for_fieldtypes": ["Select"],
			"depends_on": "status",
		}
	}

	return filters_config

@frappe.whitelist()
def get_journal_entry_status_field(company=None):
	field = {
		"fieldtype": "Select",
		"options": ["Validated"],
		"operator": "=",
		"query_value": [{"label":"Validated","status":"Validated"}]
	}

	return field