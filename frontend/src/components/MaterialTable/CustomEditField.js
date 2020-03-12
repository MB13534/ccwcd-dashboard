import React from "react";
import { MTableEditField } from "material-table";
import AutocompleteTable from "./AutocompleteTable";

class CustomEditField extends MTableEditField {
  renderLookupField() {
    console.log(this.props);
    return (
      <AutocompleteTable
        {...this.getProps()}
        name={this.props.columnDef.field}
        label={this.props.columnDef.title}
        data={Object.entries(this.props.columnDef.lookup)}
        onChange={event => this.props.onChange(event.target.value)}
        value={
          this.props.value === undefined
            ? ""
            : [this.props.value, this.props.columnDef.lookup[this.props.value]]
        }
      />
    );
  }

  render() {
    let component = "ok";

    if (this.props.columnDef.lookup) {
      component = this.renderLookupField();
    } else if (this.props.columnDef.type === "boolean") {
      component = this.renderBooleanField();
    } else if (this.props.columnDef.type === "date") {
      component = this.renderDateField();
    } else if (this.props.columnDef.type === "time") {
      component = this.renderTimeField();
    } else if (this.props.columnDef.type === "datetime") {
      component = this.renderDateTimeField();
    } else if (this.props.columnDef.type === "currency") {
      component = this.renderCurrencyField();
    } else {
      component = this.renderTextField();
    }

    return component;
  }
}

export default CustomEditField;
