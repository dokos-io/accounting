frappe.pages['brainstorming'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Ma Page',
		single_column: true
	});
}