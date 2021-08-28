const maritalStatusOptions = [
  {
    key: "1",
    text: "Single",
  },
  {
    key: "2",
    text: "Married",
  },
  {
    key: "3",
    text: "Divorced",
  },
  {
    key: "4",
    text: "widow/Widower",
  },
];

const genderOptions = [
  {
    key: "1",
    text: "Female",
  },
  {
    key: "2",
    text: "Male",
  },
];

export const FieldsDataUser = [
  {
    fieldName: "name",
    label: "Name",
    controlType: "text",
    isRequired: true,
  },
  {
    fieldName: "middleName",
    label: "Middle Name",
    controlType: "text",
    isRequired: false,
  },
  {
    fieldName: "lastName",
    label: "Lastname",
    controlType: "text",
    isRequired: true,
  },
  {
    fieldName: "age",
    label: "Age",
    controlType: "number",
    isRequired: true,
  },
  {
    fieldName: "maritalStatus",
    label: "Marital Status",
    controlType: "combo",
    options: maritalStatusOptions,
    isRequired: true,
  },
  {
    fieldName: "gender",
    label: "Gender",
    controlType: "combo",
    options: genderOptions,
    isRequired: true,
  },
  {
    fieldName: "hasVisa",
    label: "Has Visa",
    controlType: "bool",
  },
];
