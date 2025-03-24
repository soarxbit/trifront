import React, { useState, useRef, useEffect } from "react";
import "./signup.scss";
import { Message } from "primereact/message";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { DateTime } from "luxon";
export const Signup = () => {
  const toast = useRef(null);
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const initialized = useRef(false);
  const [visible, setVisible] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(0);
  const [depositadd, setDepositAdd] = useState("");
  const [useradd, setUserAdd] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (window.ethereum) {
        const adrs = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAdd(adrs[0]);
      } else {
        // alert("0000")
      }
      const resp = await axios.get(url + "/getdepositaddress", {
        headers: {
          "x-api-key": apikey,
        },
      });
      if (resp.status === 200) {
        setDepositAdd(resp.data.address);
      }
    };
    if (!initialized.current) {
      initialized.current = true;
      fetchData();
    }
  }, [apikey, url]);
  const validationSchema = Yup.object({
    tranhash: Yup.mixed("Invalid Transaction Hash!!! Please Check").required(
      "Invalid Value!!! Please Check."
    ),
    usdt: Yup.number("Invalid Value!!! Please Check")
      .required("Invalid Value!!! Please Check")
      .min(10, "Minimum should be 10 USDT "),
    sponsorid: Yup.number().required("Field can not be empty."),
  });
  const formik = useFormik({
    initialValues: {
      tranhash:
        "0xb4b493fcea68d97ccb1b3406bee22ee264cfcd13664fbc00bfe6b25a1b8d432d",
      usdt: "50",
      sponsorid: "100001",
    },
    validationSchema,
    onSubmit: async (values) => {
      let rnd = DateTime.now().toFormat("x");
      rnd = rnd.slice(7);
      rnd = rnd.length < 6 ? rnd + "0" : rnd;
      setButtonDisabled(1);
      const resp = await axios.post(
        url + "/signupinit",
        {
          values,
          rnd,
          useradd,
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
          Navigate("/login");
        }, 2000);
      } else if (resp.status === 202) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: resp.data.error,
        });
        setTimeout(() => {
          Navigate("/login");
        }, 2000);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: resp.data.error,
        });
        setButtonDisabled(0);
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
  const copyText = (x) => {
    navigator.clipboard.writeText(x);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "Address Copied Successfully",
    });
  };
  const content = (
    <div className="w-full flex align-items-center justify-content-between">
      <div style={{ fontSize: "11px" }}>{depositadd}</div>
      <div className="flex gap-2">
        <i
          className="pi pi-copy cursor-pointer"
          onClick={() => copyText(depositadd)}
        ></i>
        <i
          className="pi pi-qrcode cursor-pointer"
          // onClick={() => setVisible(true)}
        ></i>
      </div>
    </div>
  );
  const userdata = (
    <div className="w-full flex align-items-center justify-content-between">
      <div style={{ fontSize: "12px" }}>{useradd}</div>
    </div>
  );
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
                  text="NEW SIGN UP"
                  style={{ justifyContent: "left" }}
                />
                <div className="component">
                  <div>Deposit Link:</div>
                  <div>
                    <Message
                      severity="warn"
                      style={{
                        border: "solidrgb(255, 255, 0)",
                        borderWidth: "0 0 0 6px",
                        color: "#000",
                        paddingLeft: "2px",
                      }}
                      className="w-full justify-content-between"
                      content={content}
                    />
                  </div>
                </div>
                <div className="component">
                  <div>Submitting From:</div>
                  <div>
                    <Message
                      severity="warn"
                      style={{
                        border: "solidrgb(255, 255, 0)",
                        borderWidth: "0 0 0 6px",
                        color: "#000",
                        paddingLeft: "2px",
                      }}
                      className="w-full justify-content-between"
                      content={userdata}
                    />
                  </div>
                </div>
                <div className="component">
                  <div>Transaction Hash</div>
                  <InputText
                    type="text"
                    name="tranhash"
                    placeholder="Transaction Hash"
                    autoFocus
                    onChange={formik.handleChange}
                    value={formik.values.tranhash}
                  />
                  {getFormErrorMessage("tranhash")}
                </div>
                <div className="component">
                  <div>USDT</div>
                  <InputText
                    type="number"
                    name="usdt"
                    placeholder="USDT Amount"
                    onChange={formik.handleChange}
                    value={formik.values.usdt}
                  />
                  {getFormErrorMessage("usdt")}
                </div>
                <div className="component">
                  <div>Sponsor.</div>
                  <InputText
                    type="text"
                    name="sponsorid"
                    placeholder="Sponsor Code"
                    onChange={formik.handleChange}
                    value={formik.values.sponsorid}
                  />
                </div>
                <div className="component">
                  {isButtonDisabled === 0 ? (
                    <Button severity="warning" type="submit" label="Confirm" />
                  ) : (
                    <Button
                      severity="warning"
                      type="button"
                      label="Confirming..."
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
  );
};
