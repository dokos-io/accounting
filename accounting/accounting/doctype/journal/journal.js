// Copyright (c) 2022, Dokos and contributors
// For license information, please see license.txt

frappe.ui.form.on('Journal', {
	setup: function(frm) {
		// let field = $(cur_frm.page.wrapper).find("[data-fieldname='journal']")
		// field.val = "Blabla"

		frm.page.set_primary_action("Mettre en lecture seule", () => {
			frm.disable_form();
			// frm.page.set_primary_action("Permettre l'écriture", () => {
			// 	frm.save_disabled = false;
			// 	frm.fields
			// 		.forEach((field) => {
			// 			frm.set_df_property(field.df.fieldname, "read_only", "0");
			// 		});
			// })
		})
	}
});