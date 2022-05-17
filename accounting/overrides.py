import frappe
from frappe import _

from frappe.geo.doctype.country.country import Country

class BrainstormingCountry(Country):
    def before_rename(self):
        frappe.throw(_("Forbidden"))