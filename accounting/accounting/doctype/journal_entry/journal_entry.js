// Copyright (c) 2022, Dokos and contributors
// For license information, please see license.txt

frappe.ui.form.on('Journal Entry', {
	refresh: function(frm) {
		frm.set_df_property('duration', 'options', [
			{
				label: __("Days"),
				value: 0
			},
			{
				label: __("Hours"),
				value: 1
			}
		]);
	}
});
