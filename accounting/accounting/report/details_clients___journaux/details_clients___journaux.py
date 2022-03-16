# Copyright (c) 2022, Dokos and contributors
# For license information, please see license.txt

import frappe

def execute(filters=None):
	columns, data = get_columns(filters), get_data(filters)
	return columns, data

def get_columns(filters=None):
	return [
		{
			"fieldname": "journal",
			"fieldtype": "Link",
			"options": "Journal",
			"label": "Journal"
		},
		{
			"fieldname": "journal_entry",
			"fieldtype": "Link",
			"options": "Journal Entry",
			"label": "Journal Entry"
		}
	]

def get_data(filters=None):
	query_filters = {}
	if filters.get("journal"):
		query_filters.update({
			"name": filters.get("journal")
		})

	journals = frappe.get_list("Journal", filters=query_filters, pluck="name")

	result = []
	for journal in journals:
		journal_entries = frappe.get_list("Journal Entry", filters={"journal": journal}, pluck="name")

		for index, je in enumerate(journal_entries):
			result.append({
				"journal": journal if index == 0 else None,
				"journal_entry": je
			})

	return result