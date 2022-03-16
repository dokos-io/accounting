// Copyright (c) 2022, Dokos and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Details clients - journaux"] = {
	"filters": [
		{
			"fieldname": "journal",
			"fieldtype": "Link",
			"options": "Journal",
			"label": "Journal",
			get_query: () => {
				return {
					filters: {
						"name": "VBE"
					}
				}
			}
		}
	],
	get_datatable_options(options) {
		options.columns[0].width = 500
		return options
	}
};
