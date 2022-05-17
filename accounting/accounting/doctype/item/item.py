# Copyright (c) 2022, Dokos and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Item(Document):
	pass


def search_item(txt=None, get_list=False):
	if get_list:
		return search_item_get_list(txt)

	return search_item_sql(txt)

def search_item_get_list(txt=None):
	from frappe.query_builder import DocType
	from frappe.query_builder import Case, Field
	from frappe.query_builder.functions import Coalesce, Trim
	from frappe.desk.reportview import build_match_conditions

	dt = DocType("Item")
	description_field = Field('description1')

	description = Case().when(Trim(Coalesce(description_field)) != "", description_field).else_(dt.description)

	query = frappe.qb.from_(dt).select(
		dt.name, description
	).where(
		(dt.name.like(f"%{txt}%") | (description).like(f"%{txt}%"))
	)

	q = f"""
		{query.get_sql()}
		AND {build_match_conditions("Item")}
		ORDER BY `tabItem`.name
	"""

	return frappe.db.sql(q, debug=True)

def search_item_sql(txt=None):
	field_description = 'description1'

	sql = "select a.name as name, case when trim(ifnull(a." + field_description + ", '')) <> '' then a." + field_description + " else a.description end as description "

	sql += "from `tabItem` a "

	sql += "where 1 = 1 "

	if txt:
		sql += "and (a.name like %(txt)s or case when trim(ifnull(a." + field_description + ", '')) <> '' then a." + field_description + " else a.description end like %(txt)s ) "

	sql += "order by a.name "

	if txt:
		frappe.db.sql(sql, {"txt": '%' + txt + '%'}, as_dict=0, debug=True)

	else:
		frappe.db.sql(sql, {}, as_dict=0, debug=True)