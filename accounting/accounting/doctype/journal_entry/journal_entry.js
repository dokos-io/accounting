// Copyright (c) 2022, Dokos and contributors
// For license information, please see license.txt

frappe.ui.form.on('Journal Entry', {
	refresh(frm) {
		frm.set_df_property('duration', 'options', [
			{
				label: __("Days"),
				value: 0
			},
			{
				label: __("Hours"),
				value: 1
			}
		]);
		frm.trigger("show_recap")

		frm.trigger("set_tax_values")


		frm.page.set_secondary_action(__("Action secondaire"), () => {
			console.log("Secondaire")
		},{ icon: 'change', size: 'sm' }
		)


		frm.page.add_menu_item(__("Mon menu"), () => {
			console.log("Mon menu")
		},0
		)

		frm.add_custom_button(__("Bouton personnalisé"), () => {
			console.log("Mon bouton")
		}, __("Mon groupe"))

		frm.page.add_inner_button(__("Bouton personnalisé 2"), () => {
			frappe.call({
				method: "accounting.accounting.doctype.journal_entry.journal_entry.get_data",
				args: {
					doc: frm.doc
				}
			})
			.then(
				data => {
					const dialog = new frappe.ui.Dialog({
						title: "Mon Popup",
						size: "extra-large",
						fields: [
							{
								"fieldname": "name",
								"fieldtype": "Data",
								"label": "Le nom de mon document",
								"default": frm.doc.name,
								"read_only": 1
							},
							{
								"fieldname": "resultat",
								"fieldtype": "Data",
								"label": "Votre réponse"
							}
						],
						primary_action: () => {
							dialog.hide()
							const msg = `
								<div class="next-action-container">
									<button class="next-action" data-action="my-action"><span>${__("Click click")}</span></button>
								</div>
							`
							frappe.show_alert({
								message: __("Yeah"),
								body: msg,
								indicator: "orange"
							}, 25, {
								"my-action": () => {
									console.log("Done!")
								}
							})
						},
						primary_action_label: __("Click click")
					})

					dialog.show()
					dialog.set_df_property("resultat", "reqd", 1)

					// frappe.prompt("champ A", () => {
					// 	//
					// })
				}
			)
		}, __("Mon groupe"))
	},

	currency(frm) {
		frm.datatable.refresh(getData(frm), getColumns())
	},

	show_recap(frm) {
		frm.fields_dict["recap"].$wrapper.empty()
		frm.fields_dict["recap"].$wrapper.append(
			`<div class="data-recap"><div>`
		)

		// const details = frm.doc.details.map(line =>
		// 	`
		// 	<tr>
		// 		<td>${line.idx}</td>
		// 		<td>${line.account || ''}</td>
		// 		<td class='text-right'>${line.debit || ''}</td>
		// 		<td class='text-right'>${line.credit || ''}</td>
		// 	</tr>
		// 	`
		// ).join('')

		// const account_table = $(`
		// 	<div class="tax-break-up" style="overflow-x: auto;">
		// 		<table class="table table-bordered table-hover">
		// 		<thead>
		// 			<tr>
		// 				<th class="text-left">${__("Line")}</th>
		// 				<th class="text-left">${__("Account")}</th>
		// 				<th class="text-left">${__("Debit")}</th>
		// 				<th class="text-left">${__("Credit")}</th>
		// 			</tr>
		// 		</thead>
		// 		<tbody>
		// 			${details}
		// 		</tbody>
		// 		</table>
		// 	</div>`)

		// frm.fields_dict["recap"].$wrapper.append(account_table)

		frm.datatable = new DataTable(".data-recap", {
			columns: getColumns(),
			data: getData(frm)
		});
	},

	status(frm) {
		console.log(frm.doc.status)
	},

	set_tax_values(frm) {
		frm.doc.details.forEach(row => {
			set_tax_value(frm, row)
		})
	}
});

const tax_map = {
	"Category 1": [20],
	"Category 2": [10, 5.5, 2.1],
}

const set_tax_value = (frm, row) => {
	if (row.tax_category) {
		const grid_row = frm.fields_dict["details"].grid.grid_rows_by_docname[row.name]
		const tax_value_field = grid_row.docfields.filter(f => f.fieldname == "tax_value")[0]
		tax_value_field.options = tax_map[row.tax_category]
		grid_row.refresh_field("tax_value")
	}
}

frappe.ui.form.on('Journal Entry Details', {
	details_remove(frm, cdt, cdn) {
		frm.datatable.refresh(getData(frm), getColumns())
	},

	account(frm, cdt, cdn) {
		frm.datatable.refresh(getData(frm), getColumns())
	},

	tax_category(frm, cdt, cdn) {
		const row = locals[cdt][cdn]
		set_tax_value(frm, row)
	},

	tax_value(frm, cdt, cdn) {
		//
	},

	debit(frm, cdt, cdn) {
		frm.datatable.refresh(getData(frm), getColumns())
	},

	credit(frm, cdt, cdn) {
		const row = locals[cdt][cdn]
		frm.datatable.refresh(getData(frm), getColumns())
	}
})

const getData = (frm) => {
	return frm.doc.details.map(line => {
		return {
			account: line["account"],
			debit: line["debit"],
			credit: line["credit"]
		}
	})
}

const getColumns = () => {
	return [
		{
			name: 'Account',
			id: 'account',
			editable: true,
			resizable: true,
			sortable: true,
			focusable: true,
			dropdown: true,
			width: 80,
		},
		{
			name: 'Debit',
			id: 'debit'
		},
		{
			name: 'credit',
			id: 'credit'
		}
	]
}