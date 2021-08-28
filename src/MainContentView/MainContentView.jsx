import React, { useState } from "react";
import PropTypes from "prop-types";
import { Label, PrimaryButton } from "@fluentui/react";
import Form from "../FormControl/Form";
import { FieldsDataUser } from "./SettingsFactory";

const MainContentView = (props) => {
  const baseUserData = {
    name: "",
    middleName: "",
    lastName: "",
    age: 0,
    maritalStatus: "",
    gender: "",
    hasVisa: false,
    birthDate: new Date(),
  };

  const [dataUser, setdataUser] = useState({ ...baseUserData });
  const [showPanel, setshowPanel] = useState(false);

  const onGetDataForm = (item) => {
    setdataUser(item);
    setshowPanel(false);
  };
  return (
    <div>
      <PrimaryButton text="Show Panel" onClick={() => setshowPanel(true)} />
      <br className="" />
      <div className="">
        <Label>
          Los datos ingresados fueron:
          <p className="">
            El usuario se llama: {dataUser.name} {dataUser.middleName}{" "}
            {dataUser.lastName}
          </p>
          <p className="">
            {dataUser.name} tiene {dataUser.age}, es {dataUser.gender}, es{" "}
            {dataUser.maritalStatus}, cumple años el{" "}
            {new Date(dataUser.birthDate).getDate()}/
            {new Date(dataUser.birthDate).getMonth()} y{" "}
            {dataUser.hasVisa ? "tiene visa" : "no tiene visa"}
          </p>
        </Label>
      </div>
      <Form
        isOpen={showPanel}
        onDismiss={() => {
          setshowPanel(false);
          setdataUser({ ...baseUserData });
        }}
        item={baseUserData}
        fields={FieldsDataUser}
        onSave={onGetDataForm}
      />
    </div>
  );
};

MainContentView.propTypes = {};

export default MainContentView;
