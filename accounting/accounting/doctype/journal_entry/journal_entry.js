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
	}
});

frappe.ui.form.on('Journal Entry Details', {
	details_remove(frm, cdt, cdn) {
		frm.datatable.refresh(getData(frm), getColumns())
	},

	account(frm, cdt, cdn) {
		frm.datatable.refresh(getData(frm), getColumns())
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