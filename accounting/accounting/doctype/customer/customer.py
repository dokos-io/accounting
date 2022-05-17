# Copyright (c) 2022, Dokos and contributors
# For license information, please see license.txt

import frappe
from frappe.website.website_generator import WebsiteGenerator

class Customer(WebsiteGenerator):
	def validate(self):
		self.customer_type = "Company"


def get_list_context(context=None):
	context.update(
		{
			"show_search": True,
			"no_breadcrumbs": True,
			"title": "Clients",
			"filters": {"published": 1},
			"row_template": "templates/customer_row.html",
			"get_list": get_customer_list
		}
	)

def get_customer_list(doctype, txt=None, limit_start=0, limit=20, pathname=None, **kwargs):
	return frappe.get_all("Customer", filters={"published": 0}, fields=["customer_name", "name", "route", "modified"])


def update_customer_description(communication, method='after_insert'):
	if communication.reference_doctype  == "Customer" and communication.reference_name:
		frappe.db.set_value(
			communication.reference_doctype,
			communication.reference_name,
			"description",
			communication.content
		)