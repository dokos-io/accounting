frappe.provide("accounting.listview")


accounting.listview = class AListView extends frappe.views.ListView {
	static load_last_view() {
		const route = frappe.get_route();
		const doctype = route[1];

		// if (frappe.boot.reporting_doctypes.includes(doctype)) {
		// 	frappe.set_route(
		// 		"List",
		// 		doctype,
		// 		"Report"
		// 	);
		// }
	}
}

$(document).ready(() => {
	frappe.views.ListView = accounting.listview
})