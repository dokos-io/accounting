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
	filters: [
		['status', '=', "Validated"]
	],
	hide_name_column: true,
	has_indicator_for_draft: true,
	total_fields: 8,
	onload(listview) {
		listview.method = "accounting.accounting.doctype.journal_entry.journal_entry.get_list"

		$(listview.page.fields_dict.status.input).empty().add_options(["Validated"])
	}
};
