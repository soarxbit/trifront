import React, { useState, useEffect, useRef } from "react";
import "./withdraw.scss";
import { Message } from "primereact/message";
import axios from "axios";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DateTime } from "luxon";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
export const Withdraw = () => {
  const toast = useRef(null);
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const [isButtonDisabled, setButtonDisabled] = useState(0);
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [withlist, setWithList] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        if (window.ethereum) {
          const adrs = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const wa = adrs[0];
          setAddress(adrs[0]);
          const resp = await axios.post(
            url + "/user/getincome",
            { wa },
            {
              headers: {
                "x-api-key": apikey,
              },
            }
          );
          if (resp.status === 200) {
            setBalance((resp.data.balance*1).toFixed(4));
            setWithList(resp.data.withlist);
          }
        } else {
          alert("0");
        }
      };
      setTimeout(() => {
        fetchData();
      }, 1000);
      
    },[]);
  const validationSchema = Yup.object({
    usdt: Yup.number("Invalid Value!!! Minimum 10 USDT")
      .required("Invalid Value!!! Minimum 10 USDT")
      .min(10, "Minimum should be 10 USDT "),
  });
  const formik = useFormik({
    initialValues: {
      usdt: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (balance * 1 < values.usdt * 1) {
        return false;
      }
      setButtonDisabled(1);
      const resp = await axios.post(
        url + "/user/requestWithdraw",
        { values, address },
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
  const userdata = (
    <div className="w-full flex align-items-center justify-content-between">
      <div className="pl-1">USDT</div>
      <div>{balance}</div>
    </div>
  );
  const custDate = (data) => {
    return <>{DateTime.fromISO(data.tran_date).toFormat("yyyy-LL-dd")}</>;
  };
  const withstatus = (data) => {
    return <>{data.is_conf === 0 ? "Processing..." : "Confirmed"}</>;
  };
  const payusdt = (data) => {
    return <>{(data.usdt_val - data.usdt_val*10/100).toFixed(3)}</>;
  };
  return (
    <div className="withdraw">
      <Toast ref={toast} position="top-right" />
      <div className="hero">
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-6">
            <Card className="content">
              <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit} autoComplete="off">
                  <div className="form-group">
                    <img
                      src={window.location.origin + "/wallet.png"}
                      width="150"
                      alt=""
                    />
                    <Message
                      severity="warn"
                      text="WITHDRAW"
                      style={{ justifyContent: "left" }}
                    />
                    <div className="component">
                      <div>Available Balance:</div>
                      <div>
                        <Message
                          severity="success"
                          style={{
                            border: "solidrgb(255, 255, 0)",
                            borderWidth: "0 0 0 6px",
                            color: "#000",
                            paddingLeft: "2px",
                          }}
                          className="w-full justify-content-between mt-1"
                          content={userdata}
                        />
                      </div>
                    </div>
                    <div className="component">
                      <div>WITHDRAW</div>
                      <InputText
                        type="number"
                        name="usdt"
                        placeholder="USDT"
                        onChange={formik.handleChange}
                        value={formik.values.usdt}
                        className="p-inputtext-sm mt-1"
                      />
                      {getFormErrorMessage("usdt")}
                    </div>
                    <div className="component">
                      {isButtonDisabled === 0 ? (
                        <Button type="submit" label="Confirm" size="small" />
                      ) : (
                        <Button
                          type="button"
                          label="Confirming..."
                          size="small"
                        />
                      )}
                    </div>
                  </div>
                </Form>
              </FormikProvider>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-6">
          <DataTable value={withlist}>
            <Column body={custDate} header="Date"></Column>
            <Column field="usdt_val" header="Amount"></Column>
            <Column body={payusdt} header="Amount"></Column>
            <Column body={withstatus} header="Status"></Column>
          </DataTable>
        </div>
        </div>
        
      </div>
    </div>
  );
};
