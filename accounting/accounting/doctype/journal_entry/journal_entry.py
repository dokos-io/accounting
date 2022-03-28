# Copyright (c) 2022, Dokos and contributors
# For license information, please see license.txt

import frappe
from frappe import _

from frappe.desk.reportview import get

from accounting.accounting.doctype.accounting_controller import AccountingController

class JournalEntry(AccountingController):
	def autoname(self):
		self.name = frappe.get_doc("Journal", self.journal).run_method("get_name_from_journal")

	def on_submit(self):
		# Création des écritures comptables
		accounting_entries = []
		for item in self.details:
			pass

		self.set_status("Validated")

	def on_cancel(self):
		self.set_status("Unvalidated")

		# Suppression des écritures comptables

	def set_status(self, status):
		self.db_set("status", status, commit=True)

@frappe.whitelist()
def get_data(doc):
	return frappe.parse_json(doc)


@frappe.whitelist()
def get_list():
	filters = frappe.parse_json(frappe.local.form_dict.filters) if frappe.local.form_dict.filters else []
	filters.append(["Journal Entry", "status", "=", "Validated"])
	frappe.local.form_dict.filters = filters


	return get()