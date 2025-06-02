import React, { useState, useRef, useEffect } from "react";
import "./liveaccount.scss";
import { Message } from "primereact/message";
import axios from "axios";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
export const LiveAccount = () => {
  const toast = useRef(null);
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const [selectedCity, setSelectedCity] = useState('Hantec');
  const cities = [
    { name: "Hantec", value: "Hantec" },
    { name: "Vantage", value: "Vantage" },
    { name: "Startrader", value: "Startrader" },
  ];
  const [isButtonDisabled, setButtonDisabled] = useState(0);
  const [livelist, setLiveList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (window.ethereum) {
        const adrs = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const wa = adrs[0];
        const resp = await axios.post(
          url + "/user/getliveaccountlist",
          { wa },
          {
            headers: {
              "x-api-key": apikey,
            },
          }
        );
        if (resp.status === 200) {
          setLiveList(resp.data.livelist);
        }
      } else {
        // alert("0000")
      }
    };
    fetchData();
  }, [apikey, url]);
  const validationSchema = Yup.object({
    username: Yup.mixed().required("Invalid Value!!! Please Check."),
    mobile: Yup.mixed().required("Invalid Value!!! Please Check."),
    portalid: Yup.mixed().required("Invalid Value!!! Please Check."),
    portalpassword: Yup.mixed().required("Invalid Value!!! Please Check."),
    mtid: Yup.mixed().required("Invalid Value!!! Please Check."),
    mtpass: Yup.mixed().required("Invalid Value!!! Please Check."),
    mtserver: Yup.mixed().required("Invalid Value!!! Please Check."),
    investdate: Yup.date().required("Invalid Value!!! Please Check."),
    investamt: Yup.number().required("Invalid Value!!! Please Check."),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      mobile: "",
      portalid: "",
      portalpassword: "",
      mtid: "",
      mtpass: "",
      mtserver: "",
      investdate: "",
      investamt: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (window.ethereum) {
        const adrs = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const wa = adrs[0];
        const resp = await axios.post(
          url + "/user/newliveaccount",
          {
            values,
            selectedCity,
            wa,
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
        } else if (resp.status === 202) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: resp.data.error,
          });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: resp.data.error,
          });
          setButtonDisabled(0);
        }
      } else {
      }
      setButtonDisabled(1);
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
  const transtatus = (data) => {
    return <>{data.approve_status === 0 ? "Pending" : "Success"}</>;
  };
  return (
    <div className="liveaccount">
      <Toast ref={toast} position="top-right" />
      <div className="hero">
        <div className="content">
          <div className="grid">
            <div className="col-12 md:col-6 lg:col-6">
              <Card>
                <FormikProvider value={formik}>
                  <Form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="form-group">
                      <Message
                        severity="info"
                        text="NEW LIVE ACCOUNT"
                        style={{ justifyContent: "left" }}
                      />

                      <div className="component">
                        <div>USER NAME</div>
                        <InputText
                          type="text"
                          name="username"
                          placeholder="User Name"
                          className="p-inputtext-sm uppercase"
                          autoFocus
                          onChange={formik.handleChange}
                          value={formik.values.username}
                        />
                        {getFormErrorMessage("username")}
                      </div>
                      <div className="component">
                        <div>MOBILE</div>
                        <InputText
                          type="text"
                          name="mobile"
                          placeholder="Mobile"
                          className="p-inputtext-sm"
                          onChange={formik.handleChange}
                          value={formik.values.mobile}
                        />
                        {getFormErrorMessage("mobile")}
                      </div>
                      <div className="component">
                        <div>BROCKER HOUSE</div>
                        <div className="card flex justify-content-center">
                          <Dropdown
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.value)}
                            options={cities}
                            optionLabel="name"
                            placeholder="Select Broker House"
                            className="w-full"
                          />
                        </div>
                        {getFormErrorMessage("mobile")}
                      </div>
                      <div className="component">
                        <div>CLIENT PORTAL ID</div>
                        <InputText
                          type="text"
                          name="portalid"
                          placeholder="Portal Id"
                          className="p-inputtext-sm lowercase"
                          onChange={formik.handleChange}
                          value={formik.values.portalid}
                        />
                        {getFormErrorMessage("portalid")}
                      </div>

                      <div className="component">
                        <div>CLIENT PORTAL PASSWORD</div>
                        <InputText
                          type="text"
                          name="portalpassword"
                          placeholder="Portal Password"
                          className="p-inputtext-sm"
                          onChange={formik.handleChange}
                          value={formik.values.portalpassword}
                        />
                        {getFormErrorMessage("portalpassword")}
                      </div>
                      <div className="component">
                        <div>MT4 ID</div>
                        <InputText
                          type="text"
                          name="mtid"
                          placeholder="MT4 Id"
                          className="p-inputtext-sm"
                          onChange={formik.handleChange}
                          value={formik.values.mtid}
                        />
                        {getFormErrorMessage("mtid")}
                      </div>
                      <div className="component">
                        <div>MT4 PASSWORD</div>
                        <InputText
                          type="text"
                          name="mtpass"
                          placeholder="MT4 Password"
                          className="p-inputtext-sm"
                          onChange={formik.handleChange}
                          value={formik.values.mtpass}
                        />
                        {getFormErrorMessage("mtpass")}
                      </div>
                      <div className="component">
                        <div>MT4 SERVER</div>
                        <InputText
                          type="text"
                          name="mtserver"
                          placeholder="Server"
                          className="p-inputtext-sm"
                          onChange={formik.handleChange}
                          value={formik.values.mtserver}
                        />
                        {getFormErrorMessage("mtserver")}
                      </div>
                      <div className="component">
                        <div>INVESTMENT DATE</div>
                        <InputText
                          type="date"
                          name="investdate"
                          placeholder="Invest Dtae"
                          className="p-inputtext-sm"
                          onChange={formik.handleChange}
                          value={formik.values.investdate}
                        />
                        {getFormErrorMessage("investdate")}
                      </div>
                      <div className="component">
                        <div>INVEST AMOUNT</div>
                        <InputText
                          type="text"
                          name="investamt"
                          placeholder="Amount"
                          className="p-inputtext-sm"
                          onChange={formik.handleChange}
                          value={formik.values.investamt}
                        />
                        {getFormErrorMessage("investamt")}
                      </div>
                      <div className="component">
                        {isButtonDisabled === 0 ? (
                          <Button
                            severity="warning"
                            type="submit"
                            label="Confirm"
                          />
                        ) : (
                          <Button
                            severity="warning"
                            type="button"
                            label="Confirming..."
                          />
                        )}
                      </div>
                    </div>
                  </Form>
                </FormikProvider>
              </Card>
            </div>
            <div className="col-12 md:col-6 lg:col-6">
              <Card>
                <div className="p-card-body p-0">
                  <div className="p-card-content p-0">
                    <DataTable value={livelist}>
                      <Column field="portalid" header="Portal Id"></Column>

                      <Column field="mtid" header="MTID"></Column>

                      <Column field="investamt" header="Amount"></Column>
                      <Column body={transtatus} header="Status"></Column>
                    </DataTable>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
