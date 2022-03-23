frappe.provide("accounting")

class AFilter extends frappe.ui.Filter {
	make_field(df, old_fieldtype) {
		super.make_field(df, old_fieldtype)

		if (df.parent == "Journal Entry" && df.fieldname == "status") {
			$(this.field.input).empty().add_options(["Validated"])
			this.field.set_value("Validated")
			this.field.refresh()
		}
	}
}

frappe.form.link_formatters['Journal'] = function (value, doc, docfield) {
	return `${value}: BLABLA`
};

$(document).ready(() => {
	//  frappe.ui.Filter = AFilter
})

// $(document).on("startup", () => {
// 	console.log("Hello")
// })