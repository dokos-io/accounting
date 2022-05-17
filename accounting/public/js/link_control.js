frappe.provide("frappe.ui")
frappe.provide("accounting.ui")

accounting.ui.ControlSelect = class AControlSelect extends frappe.ui.form.ControlSelect {
	//
};

$(document).ready(() => {
	frappe.ui.form.ControlSelect = accounting.ui.ControlSelect

	frappe.form.formatters = Object.assign(frappe.form.formatters, {
		Select: function(value, df) {
			if (typeof(df.options) == "object") {
				const options = Object.assign({}, ...df.options.map(o => {
					return {
						[o.value]: o.label
					}
				}))
				return __(options[value])
			}
		},
	})

})