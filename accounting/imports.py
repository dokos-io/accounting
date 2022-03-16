import frappe
from accounting.accounting.doctype.customer.customer import Customer

def create_customers():
	data = [
		{
			"doctype": "Customer",
			"customer_name": "Test 5"
		},
		{
			"doctype": "Customer",
			"customer_name": "Test 6"
		},
		{
			"doctype": "Customer",
			"customer_name": "Test 7"
		},
		{
			"doctype": "Customer",
			"customer_name": "Test 8"
		}
	]

	Customer.run_before_save_methods = override_validate

	for d in data:
		frappe.get_doc(d).insert()

def override_validate(self):
	pass