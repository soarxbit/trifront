import React, { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import axios from "axios";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
export const LiveAccountNew = () => {
  const toast = useRef(null);
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const validationSchema = Yup.object({
    username: Yup.mixed("Invalid Transaction Hash!!! Please Check").required(
      "Invalid Value!!! Please Check."
    ),
    mobile: Yup.number("Invalid Data").required("Invalid Value!!! Please Check.").min(5555555555,"Invalid Value!!! Please Check.").max(9999999999,"Invalid Value!!! Please Check."),
    portalid:Yup.mixed("Invalid Data Found").required("Invalid Data Found")
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      mobile:"",
      portalid:""
    },
    validationSchema,
    onSubmit: async (values) => {
        console.log(values)
      const resp = await axios.post(
        url + "/admin/liveaccountnew",
        {
          values,
        },
        {
          headers: {
            "x-api-key": apikey,
          },
        }
      );
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
    <div className="liveaccountnew">
      <div className="hero">
        <div className="content p-2">
          <div className="grid">
            <div className="col-12 md:col-6 lg:col-6">
              <Card>
                <div className="p-card-body">
                  <div className="p-card-content">
                    <FormikProvider value={formik}>
                      <Form onSubmit={formik.handleSubmit} autoComplete="off">
                        <div className="form-group flex flex-column gap-3">
                          <div className="component flex flex-column">
                            <div>User Name</div>
                            <InputText
                              type="text"
                              name="username"
                              placeholder="User Name"
                              autoFocus
                              onChange={formik.handleChange}
                              value={formik.values.username}
                            />
                            {getFormErrorMessage("username")}
                          </div>
                          <div className="component flex flex-column">
                            <div>Mobile No</div>
                            <InputText
                              type="text"
                              name="mobile"
                              placeholder="User Mobile No"
                              onChange={formik.handleChange}
                              value={formik.values.mobile}
                            />
                            {getFormErrorMessage("mobile")}
                          </div>
                          <div className="component flex flex-column">
                            <div>Portal Id</div>
                            <InputText
                              type="text"
                              name="portalid"
                              placeholder="User Mobile No"
                              onChange={formik.handleChange}
                              value={formik.values.portalid}
                            />
                            {getFormErrorMessage("portalid")}
                          </div>
                          <Button label="Submit" />
                        </div>
                      </Form>
                    </FormikProvider>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-12 md:col-6 lg:col-6">
              List of Live Accounts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
