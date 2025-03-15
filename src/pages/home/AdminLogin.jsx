import React, { useState, useRef, useEffect } from "react";
import "./signup.scss";
import { Message } from "primereact/message";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Password } from "primereact/password";
export const AdminLogin = () => {
    const toast = useRef(null);
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const initialized = useRef(false);
  const [visible, setVisible] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(0);
  const [depositadd, setDepositAdd] = useState("");
  const [useradd, setUserAdd] = useState("");
  const validationSchema = Yup.object({
    userid: Yup.mixed("Invalid Value found!!!").required(
      "Invalid Value found!!!"
    ),
    password: Yup.mixed("Invalid Value!!! Please Check").required(
      "Invalid Value!!! Please Check"
    ),
  });
  const formik = useFormik({
    initialValues: {
      userid: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setButtonDisabled(true);
      const resp = await axios.post(
        url + "/adminlogin",
        {
          values,
        },
        {
          headers: {
            "x-api-key": apikey,
          },
        }
      );
      if (resp.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: resp.data.success,
        });
        setTimeout(() => {
          Navigate("/admin/");
        }, 2000);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: resp.data.error,
        });
      }
    },
  });
  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };
  return (
    <div className="signup">
    <Toast ref={toast} position="top-right" />
    <div className="hero">
      <div className="content">
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="form-group">
              <img
                src={window.location.origin + "/wallet.png"}
                width="150"
                alt=""
              />
              <Message
                severity="info"
                text="ADMIN LOGIN"
                style={{ justifyContent: "left" }}
              />
              <div className="component">
                <div>USER ID</div>
                <InputText
                  type="text"
                  name="userid"
                  placeholder="User Name"
                  autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.userid}
                />
                {getFormErrorMessage("userid")}
              </div>
              <div className="component w-full">
                <div>PASSWORD</div>
                <InputText
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="w-full"
                />
                {getFormErrorMessage("password")}
              </div>
              <div className="component">
                {isButtonDisabled === 0 ? (
                  <Button
                    severity="success"
                    type="submit"
                    label="Confirm"
                    size="small"
                  />
                ) : (
                  <Button
                    severity="success"
                    type="button"
                    label="Confirming..."
                    size="small"
                  />
                )}
              </div>
              <div className="component">
                <Message
                  severity="info"
                  text="Submit USDT in Receive Link and obtain transaction hash"
                  style={{ justifyContent: "left", marginBottom: "10px" }}
                />
                <Message
                  severity="info"
                  text="Provide transaction has and deposited amount press submit"
                  style={{ justifyContent: "left" }}
                />
              </div>
            </div>
          </Form>
        </FormikProvider>
        <div className="signuplog">
          <p>
            Already have account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
    <Dialog
      header="Deposit address"
      visible={visible}
      onHide={() => {
        if (!visible) return;
        setVisible(false);
      }}
      style={{ width: "50vw" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    >
      <img
        src={window.location.origin + "/deposit.png"}
        alt=""
        style={{ width: "100%" }}
      />
    </Dialog>
  </div>
  )
}
