# Copyright (c) 2022, Dokos and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Facturedeventes(Document):
	def autoname(self):
		prefix, next_no = frappe.db.get_value("Journal", self.journal, ["prefix", "prochain_numero"])

		try:
			frappe.db.get_value("Journal", self.journal, "prefix", next_no + 1)
		except:
			pass

		self.name = f"{prefix}-{next_no}"

	def before_insert(self):
		pass