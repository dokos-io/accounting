class AControlCurrency extends frappe.ui.form.ControlCurrency {
	format_for_input(value) {
		var formatted_value = format_number(value, this.get_number_format(), this.get_precision());
		return isNaN(Number(value)) ? "" : formatted_value * -1;
	}
}

$(document).ready(() => {
	// frappe.ui.form.ControlCurrency = AControlCurrency

	// Object.assign(frappe.form.formatters, {
	// 	Currency: function (value, docfield, options, doc) {
	// 		var currency  = frappe.meta.get_field_currency(docfield, doc);
	// 		var precision = docfield.precision || cint(frappe.boot.sysdefaults.currency_precision) || 2;
	
	// 		// If you change anything below, it's going to hurt a company in UAE, a bit.
	// 		if (precision > 2) {
	// 			var parts	 = cstr(value).split("."); // should be minimum 2, comes from the DB
	// 			var decimals = parts.length > 1 ? parts[1] : ""; // parts.length == 2 ???
	
	// 			if ( decimals.length < 3 || decimals.length < precision ) {
	// 				const fraction = frappe.model.get_value(":Currency", currency, "fraction_units") || 100; // if not set, minimum 2.
	
	// 				if (decimals.length < cstr(fraction).length) {
	// 					precision = cstr(fraction).length - 1;
	// 				}
	// 			}
	// 		}

	// 		value = (value == null || value === "") ? "" : format_currency(value * -1, currency, precision);
	
	// 		if ( options && options.only_value ) {
	// 			return value;
	// 		} else {
	// 			return frappe.form.formatters._right(value, options);
	// 		}
	// 	},
	// })
})