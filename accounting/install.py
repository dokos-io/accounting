import frappe
from frappe.desk.listview import set_list_settings

def after_install():
	configure_list_views()

def configure_list_views():
	for dt in frappe.get_all("DocType", filters={"issingle": 0, "is_virtual": 0, "istable": 0}, pluck="name"):
		set_list_settings(dt, 8)