frappe.provide("frappe.ui")
frappe.provide("accounting.ui")

accounting.ui.ControlSelect = class AControlSelect extends frappe.ui.form.ControlSelect {
	//
};

$(document).ready(() => {
	frappe.ui.form.ControlSelect = accounting.ui.ControlSelect
})