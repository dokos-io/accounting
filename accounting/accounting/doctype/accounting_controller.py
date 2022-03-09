from frappe.model.document import Document
from frappe.model.docstatus import DocStatus

class AccountingController(Document):
	def _cancel(self):
		self.docstatus = DocStatus.draft()
		return self.save()

	def check_docstatus_transition(self, to_docstatus):
		if not self.docstatus:
			self.docstatus = DocStatus.draft()

		if to_docstatus == DocStatus.draft():
			if self.docstatus.is_draft():
				self._action = "save"
			elif self.docstatus.is_submitted():
				self._action = "submit"
				self.check_permission("submit")

		elif to_docstatus == DocStatus.submitted():
			if self.docstatus.is_submitted():
				self._action = "update_after_submit"
				self.check_permission("submit")
			elif self.docstatus.is_draft():
				self._action = "cancel"
				self.check_permission("cancel")

	def after_delete(self):
		if self.doctype in ("Journal Entry"):
			# revert_series_if_last
			pass

# def revert_series_if_last(key, name, doc=None):
# 	"""
# 	Reverts the series for particular naming series:
# 	* key is naming series		- SINV-.YYYY-.####
# 	* name is actual name		- SINV-2021-0001

# 	1. This function split the key into two parts prefix (SINV-YYYY) & hashes (####).
# 	2. Use prefix to get the current index of that naming series from Series table
# 	3. Then revert the current index.

# 	*For custom naming series:*
# 	1. hash can exist anywhere, if it exist in hashes then it take normal flow.
# 	2. If hash doesn't exit in hashes, we get the hash from prefix, then update name and prefix accordingly.

# 	*Example:*
# 		1. key = SINV-.YYYY.-
# 			* If key doesn't have hash it will add hash at the end
# 			* prefix will be SINV-YYYY based on this will get current index from Series table.
# 		2. key = SINV-.####.-2021
# 			* now prefix = SINV-#### and hashes = 2021 (hash doesn't exist)
# 			* will search hash in key then accordingly get prefix = SINV-
# 		3. key = ####.-2021
# 			* prefix = #### and hashes = 2021 (hash doesn't exist)
# 			* will search hash in key then accordingly get prefix = ""
# 	"""
# 	if ".#" in key:
# 		prefix, hashes = key.rsplit(".", 1)
# 		if "#" not in hashes:
# 			# get the hash part from the key
# 			hash = re.search("#+", key)
# 			if not hash:
# 				return
# 			name = name.replace(hashes, "")
# 			prefix = prefix.replace(hash.group(), "")
# 	else:
# 		prefix = key

# 	if '.' in prefix:
# 		prefix = parse_naming_series(prefix.split('.'), doc=doc)

# 	count = cint(name.replace(prefix, ""))
# 	series = DocType("Series")
# 	current = (
# 		frappe.qb.from_(series)
# 		.where(series.name == prefix)
# 		.for_update()
# 		.select("current")
# 	).run()

# 	if current and current[0][0]==count:
# 		frappe.db.sql("UPDATE `tabSeries` SET `current` = `current` - 1 WHERE `name`=%s", prefix)