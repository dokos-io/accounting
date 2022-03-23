(() => {
  // ../accounting/accounting/public/js/listview.js
  frappe.provide("accounting.listview");
  accounting.listview = class AListView extends frappe.views.ListView {
    static load_last_view() {
      const route = frappe.get_route();
      const doctype = route[1];
    }
  };
  $(document).ready(() => {
    frappe.views.ListView = accounting.listview;
  });

  // ../accounting/accounting/public/js/link_control.js
  frappe.provide("frappe.ui");
  frappe.provide("accounting.ui");
  accounting.ui.ControlSelect = class AControlSelect extends frappe.ui.form.ControlSelect {
  };
  $(document).ready(() => {
    frappe.ui.form.ControlSelect = accounting.ui.ControlSelect;
  });

  // ../accounting/accounting/public/js/report_view.js
  frappe.provide("accounting.ui");
  accounting.ui.ReportView = class AReportView extends frappe.views.ReportView {
    setup_datatable(values) {
      this.$datatable_wrapper.empty();
      this.datatable = new DataTable(this.$datatable_wrapper[0], {
        columns: this.columns,
        data: this.get_data(values),
        getEditor: this.get_editing_object.bind(this),
        language: frappe.boot.lang,
        translations: frappe.utils.datatable.get_translations(),
        checkboxColumn: false,
        inlineFilters: false,
        cellHeight: 60,
        direction: frappe.utils.is_rtl() ? "rtl" : "ltr",
        events: {
          onRemoveColumn: (column) => {
            this.remove_column_from_datatable(column);
          },
          onSwitchColumn: (column1, column2) => {
            this.switch_column(column1, column2);
          },
          onCheckRow: () => {
            const checked_items = this.get_checked_items();
            this.toggle_actions_menu_button(checked_items.length > 0);
          }
        },
        hooks: {
          columnTotal: frappe.utils.report_column_total
        },
        headerDropdown: [{
          label: __("Add Column"),
          action: (datatabe_col) => {
            let columns_in_picker = [];
            const columns = this.get_columns_for_picker();
            columns_in_picker = columns[this.doctype].filter((df) => !this.is_column_added(df)).map((df) => ({
              label: __(df.label),
              value: df.fieldname
            }));
            delete columns[this.doctype];
            for (let cdt in columns) {
              columns[cdt].filter((df) => !this.is_column_added(df)).map((df) => ({
                label: __(df.label) + ` (${cdt})`,
                value: df.fieldname + "," + cdt
              })).forEach((df) => columns_in_picker.push(df));
            }
            const d = new frappe.ui.Dialog({
              title: __("Add Column"),
              fields: [
                {
                  label: __("Select Column"),
                  fieldname: "column",
                  fieldtype: "Autocomplete",
                  options: columns_in_picker
                },
                {
                  label: __("Insert Column Before {0}", [__(datatabe_col.docfield.label).bold()]),
                  fieldname: "insert_before",
                  fieldtype: "Check"
                }
              ],
              primary_action: ({column, insert_before}) => {
                if (!columns_in_picker.map((col) => col.value).includes(column)) {
                  frappe.show_alert({message: __("Invalid column"), indicator: "orange"});
                  d.hide();
                  return;
                }
                let doctype = this.doctype;
                if (column.includes(",")) {
                  [column, doctype] = column.split(",");
                }
                let index = datatabe_col.colIndex;
                if (insert_before) {
                  index = index - 1;
                }
                this.add_column_to_datatable(column, doctype, index);
                d.hide();
              }
            });
            d.show();
          }
        }]
      });
    }
  };
  window.addEventListener("pageshow", () => {
    frappe.views.ReportView = accounting.ui.ReportView;
  });

  // ../accounting/accounting/public/js/filter.js
  frappe.provide("accounting");
  var AFilter = class extends frappe.ui.Filter {
    make_field(df, old_fieldtype) {
      super.make_field(df, old_fieldtype);
      if (df.parent == "Journal Entry" && df.fieldname == "status") {
        $(this.field.input).empty().add_options(["Validated"]);
        this.field.set_value("Validated");
        this.field.refresh();
      }
    }
  };
  frappe.form.link_formatters["Journal"] = function(value, doc, docfield) {
    return `${value}: BLABLA`;
  };
  $(document).ready(() => {
  });

  // ../accounting/accounting/public/js/formatters.js
  var AControlCurrency = class extends frappe.ui.form.ControlCurrency {
    format_for_input(value) {
      var formatted_value = format_number(value, this.get_number_format(), this.get_precision());
      return isNaN(Number(value)) ? "" : formatted_value * -1;
    }
  };
  $(document).ready(() => {
  });
})();
//# sourceMappingURL=custom.bundle.YTSDYDIC.js.map
