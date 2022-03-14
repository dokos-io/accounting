# Copyright (c) 2022, Dokos and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class Customer(Document):
	def validate(self):
		self.customer_type = "Company"
