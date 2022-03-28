// Copyright (c) 2022, Dokos and contributors
// For license information, please see license.txt

frappe.listview_settings['Journal Entry'] = {
	get_indicator: function(doc) {
		var colors = {
			"Validated": "blue",
			"Unvalidated": "red",
			"Waiting": "orange",
		};
		return [__(doc.status), colors[doc.status], "status,=," + doc.status];
	},
	// filters: [
	// 	['status', '=', "Validated"]
	// ],
	hide_name_column: true,
	has_indicator_for_draft: true,
	total_fields: 8,
	onload(listview) {
		listview.method = "accounting.accounting.doctype.journal_entry.journal_entry.get_list"

		// $(listview.page.fields_dict.status.input).empty().add_options(["Validated"])

		listview.page.add_field({
			"fieldname": "docstatus",
			"label": "Statut du document",
			"fieldtype": "Select",
			"options": [
				{"label": "Draft", "value": 0},
				{"label": "Cancelled", "value": 2},
				{"label": "Submitted", "value": 1},
			],
			onchange: () => {
				list_view.start = 0;
				list_view.refresh();
				list_view.on_filter_change();
			},
			is_filter: 1
		}, listview.page.page_form.find('.standard-filter-section'));
	}
};
