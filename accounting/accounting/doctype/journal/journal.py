# Copyright (c) 2022, Dokos and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.utils import now_datetime, cint
from frappe.model.naming import determine_consecutive_week_number
from frappe.model.document import Document

from frappe.query_builder import DocType

class Journal(Document):
	def get_name_from_journal(self):
		parts = (self.prefix + ".#####").split('.')
		return parse_naming_series(self.name, parts)

	@frappe.whitelist()
	def validate_book(self):
		return True

def parse_naming_series(journal, parts):
	n = ''
	if isinstance(parts, str):
		parts = parts.split('.')
	series_set = False
	today = now_datetime()
	for e in parts:
		part = ''
		if e.startswith('#'):
			if not series_set:
				digits = len(e)
				part = getseries(journal, digits)
				series_set = True
		elif e == 'YY':
			part = today.strftime('%y')
		elif e == 'MM':
			part = today.strftime('%m')
		elif e == 'DD':
			part = today.strftime("%d")
		elif e == 'YYYY':
			part = today.strftime('%Y')
		elif e == 'WW':
			part = determine_consecutive_week_number(today)
		elif e == 'timestamp':
			part = str(today)
		else:
			part = e

		if isinstance(part, str):
			n += part

	return n

def getseries(journal, digits):
	# series created ?
	# Using frappe.qb as frappe.get_values does not allow order_by=None
	journal_dt = DocType("Journal")
	current = (
		frappe.qb.from_(journal_dt)
		.where(journal_dt.name == journal)
		.for_update()
		.select("prochain_numero")
	).run()

	if current and current[0][0] is not None:
		current = current[0][0]
		# yes, update it
		frappe.db.sql("UPDATE `tabJournal` SET `prochain_numero` = `prochain_numero` + 1 WHERE `name`=%s", (journal,))
		current = cint(current) + 1
	else:
		# no, create it
		frappe.db.sql("INSERT INTO `tabJournal` (`name`, `prochain_numero`) VALUES (%s, 1)", (journal,))
		current = 1
	return ('%0'+str(digits)+'d') % current