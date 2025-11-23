import React, { useState, useRef, useEffect } from "react";
import "./myrealstate.scss";
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
export const MyRealState = () => {
    const toast = useRef(null);
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const [selectedCity, setSelectedCity] = useState('Kolkata');
  const cities = [
    { name: "Siliguri", value: "Siliguri" },
    { name: "Kolkata", value: "Kolkata" },
    { name: "Jaipur", value: "Jaipur" },
    { name: "Rachi", value: "Rachi" },
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
          url + "/user/getlandaccountlist",
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
    pancard: Yup.mixed().required("Invalid Value!!! Please Check."),
    aadhaar: Yup.mixed().required("Invalid Value!!! Please Check."),
    voter: Yup.mixed().required("Invalid Value!!! Please Check."),
    plotnumber: Yup.mixed().required("Invalid Value!!! Please Check."),
    decimal: Yup.mixed().required("Invalid Value!!! Please Check."),
    investdate: Yup.date().required("Invalid Value!!! Please Check."),
    investamt: Yup.number().required("Invalid Value!!! Please Check."),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      mobile: "",
      pancard: "",
      aadhaar: "",
      voter: "",
      plotnumber: "",
      decimal: "",
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
          url + "/user/newland",
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
                        text="NEW LAND ACCOUNT"
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
                        <div>PAN CARD</div>
                        <InputText
                          type="text"
                          name="pancard"
                          placeholder="PAN Number"
                          className="p-inputtext-sm uppercase"
                          onChange={formik.handleChange}
                          value={formik.values.pancard}
                        />
                        {getFormErrorMessage("pancard")}
                      </div>

                      <div className="component">
                        <div>AADHAAR Number</div>
                        <InputText
                          type="text"
                          name="aadhaar"
                          placeholder="Aadhar Number"
                          className="p-inputtext-sm"
                          onChange={formik.handleChange}
                          value={formik.values.aadhaar}
                        />
                        {getFormErrorMessage("aadhaar")}
                      </div>
                      <div className="component">
                        <div>VOTER Number</div>
                        <InputText
                          type="text"
                          name="voter"
                          placeholder="Voter Number"
                          className="p-inputtext-sm uppercase"
                          onChange={formik.handleChange}
                          value={formik.values.voter}
                        />
                        {getFormErrorMessage("voter")}
                      </div>
                      <div className="component">
                        <div>Process Type</div>
                        <div className="card flex justify-content-center">
                          <Dropdown
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.value)}
                            options={cities}
                            optionLabel="name"
                            placeholder="Process Type"
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div className="component">
                        <div>Location</div>
                        <div className="card flex justify-content-center">
                          <Dropdown
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.value)}
                            options={cities}
                            optionLabel="name"
                            placeholder="Select Location"
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div className="component">
                        <div>PLOT NUMBER</div>
                        <InputText
                          type="text"
                          name="plotnumber"
                          placeholder="PLOT NUMBER"
                          className="p-inputtext-sm"
                          onChange={formik.handleChange}
                          value={formik.values.plotnumber}
                        />
                        {getFormErrorMessage("plotnumber")}
                      </div>
                      <div className="component">
                        <div>DECIMAL</div>
                        <InputText
                          type="text"
                          name="decimal"
                          placeholder="DECIMAL"
                          className="p-inputtext-sm"
                          onChange={formik.handleChange}
                          value={formik.values.decimal}
                        />
                        {getFormErrorMessage("decimal")}
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
                      <Column field="location" header="Location"></Column>
                      <Column field="plotnumber" header="Plot Number"></Column>
                      <Column field="decimal" header="Decimal"></Column>
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
  )
}
