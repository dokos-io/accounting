// Copyright (c) 2022, Dokos and contributors
// For license information, please see license.txt

frappe.ui.form.on('Customer', {
	refresh: function(frm) {
		frm.set_df_property("selection", 'options', [
			{
				label: "Hello",
				value: "H"
			},
			{
				label: "World",
				value: "W"
			}
		])
	}
});
