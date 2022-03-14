// Copyright (c) 2022, Dokos and contributors
// For license information, please see license.txt

frappe.listview_settings['Journal Entry'] = {
	get_indicator: function(doc) {
		var colors = {
			"Validated": "green",
			"Unvalidated": "red",
			"Waiting": "orange",
		};
		return [__(doc.status), colors[doc.status], "status,=," + doc.status];
	},
	hide_name_column: true,
	has_indicator_for_draft: true
};
