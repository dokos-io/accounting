# Copyright (c) 2022, Dokos and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Facturedeventes(Document):
	def autoname(self):
		prefix, next_no = frappe.db.get_value("Journal", self.journal, ["prefix", "prochain_numero"])

		series = DocType("journal")
		current = (
			frappe.qb.from_(series)
			.where(series.name == self.journal)
			.for_update()
			.select("prochain_numero")
		).run()

		try:
			frappe.db.set_value("Journal", self.journal, "prefix", current + 1, debug=True)
		except:
			pass

		self.name = f"{prefix}-{next_no}"

	def before_insert(self):
		pass