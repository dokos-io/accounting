# Copyright (c) 2022, Dokos and contributors
# For license information, please see license.txt

import frappe
from frappe import _
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