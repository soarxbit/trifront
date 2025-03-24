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
import { DateTime } from "luxon";
export const LiveAccount = () => {
  const toast = useRef(null);
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
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
    fetchData()
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
  return (
    <div className="liveaccount">
      <Toast ref={toast} position="top-right" />
      <div className="hero">
        <div className="content">
          <div className="grid">
            <div className="col-12 md:col-6 lg:col-6">
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
                      text="NEW LIVE ACCOUNT"
                      style={{ justifyContent: "left" }}
                    />

                    <div className="component">
                      <div>USER NAME</div>
                      <InputText
                        type="text"
                        name="username"
                        placeholder="User Name"
                        className="p-inputtext-sm"
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
                      <div>PORTAL ID</div>
                      <InputText
                        type="text"
                        name="portalid"
                        placeholder="Portal Id"
                        className="p-inputtext-sm"
                        onChange={formik.handleChange}
                        value={formik.values.portalid}
                      />
                      {getFormErrorMessage("portalid")}
                    </div>
                    <div className="component">
                      <div>PORTAL PASSWORD</div>
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
                      <div>MT4/MT5 ID</div>
                      <InputText
                        type="text"
                        name="mtid"
                        placeholder="MT4/MT5 Id"
                        className="p-inputtext-sm"
                        onChange={formik.handleChange}
                        value={formik.values.mtid}
                      />
                      {getFormErrorMessage("mtid")}
                    </div>
                    <div className="component">
                      <div>MT4/MT5 PASSWORD</div>
                      <InputText
                        type="text"
                        name="mtpass"
                        placeholder="MT4/MT5 Password"
                        className="p-inputtext-sm"
                        onChange={formik.handleChange}
                        value={formik.values.mtpass}
                      />
                      {getFormErrorMessage("mtpass")}
                    </div>
                    <div className="component">
                      <div>MT4/MT5 SERVER</div>
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
                    {/* <div className="component">
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
                    </div> */}
                  </div>
                </Form>
              </FormikProvider>
            </div>
            <div className="col-12 md:col-6 lg:col-6">
              <DataTable value={livelist}>
                {/* <Column body={custDate} header="Date"></Column> */}
                {/* <Column field="memberid" header="Mem Id"></Column>
                <Column field="mobile" header="Mobile"></Column>
                <Column field="username" header="User Name"></Column> */}
                <Column field="portalid" header="Portal Id"></Column>
                {/* <Column field="portalpassword" header="Portal Pass"></Column> */}
                <Column field="mtid" header="MTID"></Column>
                {/* <Column field="mtpass" header="MTPass"></Column> */}
                {/* <Column field="mtserver" header="Server"></Column> */}
                {/* <Column body={custDate1} header="Date"></Column> */}
                <Column field="investamt" header="Amount"></Column>
                {/* <Column body={approve} header="Approve"></Column>
                          <Column body={reject} header="Reject"></Column> */}
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
