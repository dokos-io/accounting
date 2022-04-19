# Copyright (c) 2022, Dokos and Contributors
# See license.txt

import frappe
from frappe.utils import nowdate
from frappe.tests.utils import FrappeTestCase


class TestJournalEntry(FrappeTestCase):
	def tearDown(self):
		for je in frappe.get_all("Journal Entry"):
			frappe.delete_doc("Journal Entry", je.name, force=True)
			frappe.db.commit()

	def test_autoname(self):
		doc = self.make_journal_entry()
		self.assertEqual(doc.name, "VEN-2022-00001")

	def test_status(self):
		doc = self.make_journal_entry()
		self.assertEqual(doc.status, "Waiting")
		doc.submit()
		self.assertEqual(doc.status, "Validated")
		doc.cancel()
		self.assertEqual(doc.status, "Unvalidated")

	def make_journal_entry(self):
		return frappe.get_doc({
			"doctype": "Journal Entry",
			"title": "Test JE",
			"date": nowdate(),
			"journal": "VEN",
			"currency": "EUR",
			"details": [
				{
					"account": "411 - Clients",
					"debit": 100,
					"credit": 0
				},
				{
					"account": "706 - Prestations de services",
					"debit": 0,
					"credit": 100
				}
			]
		}).insert()