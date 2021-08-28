import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  ComboBox,
  DatePicker,
  DefaultButton,
  Label,
  Panel,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import { isArray } from "lodash";
import { FormStyled } from "./FormStyled";
import { isEmpty, isString } from "lodash";

const Form = ({ isOpen, title, fields, item, onSave, onDismiss }) => {
  const [newItem, setnewItem] = useState({ ...item });
  const [hasInvalidFields, setInvalidFields] = useState(false);
  const buttonStyles = {
    root: { marginLeft: 8, marginRight: 8, marginBottom: 8 },
  };
  const onChangeField = (fieldName, value) => {
    debugger;
    setnewItem({
      ...newItem,
      [fieldName]: value,
    });
  };

  const onSaveChanges = () => {
    if (onValidateFields() === true) {
      return;
    } else {
      onSave({ ...newItem });
    }
  };

  const onRenderFooterActions = () => {
    return (
      <div>
        <PrimaryButton
          onClick={onSaveChanges}
          text="Submit"
          iconProps={{ iconName: "Save" }}
          styles={buttonStyles}
        />
        <DefaultButton
          onClick={onDismiss}
          text="Cancel"
          iconProps={{ iconName: "Cancel" }}
          styles={buttonStyles}
        />
      </div>
    );
  };

  const onFormatDate = (date) => {
    return !date
      ? ""
      : date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          (date.getFullYear() % 100);
  };

  const onValidateFields = () => {
    const keys = Object.keys(newItem);
    let hasInvalidField = false;

    keys.forEach((key) => {
      const fieldEvaluated = fields.find((x) => x.fieldName === key);
      if (
        isString(newItem[key]) &&
        fieldEvaluated.isRequired === true &&
        isEmpty(newItem[key])
      ) {
        hasInvalidField = true;
      }
    });
    setInvalidFields(hasInvalidField);

    return hasInvalidField;
  };
  return (
    <Panel
      isLightDismiss={false}
      isOpen={isOpen}
      onDismiss={onDismiss}
      headerText={title}
      onRenderFooter={onRenderFooterActions}
      isFooterAtBottom={true}
      styles={{
        root: {
          marginRight: "10px",
          marginRight: "10px",
        },
      }}
    >
      {hasInvalidFields && (
        <h4 style={{ color: "red" }}>Check Required Fields</h4>
      )}
      <FormStyled>
        {isArray(fields) &&
          fields.map((field, index) => {
            if (
              field.controlType === "text" ||
              field.controlType === "number"
            ) {
              return (
                <TextField
                  key={index}
                  label={field.label}
                  value={newItem[field.fieldName]}
                  required={field.isRequired}
                  onChange={(ev, newValue) => {
                    onChangeField(field.fieldName, newValue);
                  }}
                  type={field.controlType}
                  validateOnFocusOut={field.isRequired}
                />
              );
            }
            if (field.controlType === "combo") {
              return (
                <ComboBox
                  key={index}
                  label={field.label}
                  selectedKey={newItem[field.fieldName]}
                  required={field.isRequired}
                  onChange={(ev, option) => {
                    onChangeField(field.fieldName, option.key);
                  }}
                  options={field.options || []}
                  validateOnFocusOut={field.isRequired}
                />
              );
            }
            if (field.controlType === "date") {
              return (
                <DatePicker
                  key={index}
                  label={field.label}
                  date={newItem[field.fieldName]}
                  required={field.isRequired}
                  onSelectDate={(ev, newDate) => {
                    onChangeField(field.fieldName, newDate);
                  }}
                  formatDate={onFormatDate}
                  validateOnFocusOut={field.isRequired}
                />
              );
            }
            if (field.controlType === "bool") {
              return (
                <Label key={index}>
                  <Checkbox
                    label={field.label}
                    checked={newItem[field.fieldName]}
                    onChange={(ev, checked) => {
                      onChangeField(field.fieldName, checked);
                    }}
                    validateOnFocusOut={field.isRequired}
                  />
                </Label>
              );
            }
          })}
      </FormStyled>
    </Panel>
  );
};

Form.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      fieldName: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      controlType: PropTypes.oneOf(["text", "number", "combo", "bool", "date"])
        .isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({ key: PropTypes.string, text: PropTypes.string })
      ),
      isRequired: PropTypes.bool,
    })
  ),
  item: PropTypes.object,
  onSave: PropTypes.func,
  onDismiss: PropTypes.func,
};

export default Form;
