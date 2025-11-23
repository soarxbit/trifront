import React, { useRef } from "react";
import "./login.scss";
import axios from "axios";
import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

export const Login = () => {
  const toast = useRef(null);
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const autoLogin = async () => {
    if (window.ethereum) {
      const adrs = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(adrs)
      const wa = adrs[0];
      const resp = await axios.post(
        url + "/checkuser",
        { wa },
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
          Navigate("/user/");
        }, 1000);
      } else if (resp.status === 202) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: resp.data.error,
        });
        setTimeout(() => {
          Navigate("/activate");
        }, 1000);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: resp.data.error,
        });
        setTimeout(() => {
          Navigate("/signup/");
        }, 1000);
      }
    }
  };
  return (
    <div className="login">
      <Toast ref={toast} position="top-right" />
      <div className="hero">
        <div className="content text-center">
          <div className="heading">Discover the Next Big Opportunity:</div>
          <div className="msg">Our Trading is Live</div>
          <div className="title">
            A new smart block chain based marketplace for trading digital goods
            & assets according.
          </div>
          <div>
            <Button
              label="Login"
              icon="pi pi-sign-in"
              rounded
              onClick={() => autoLogin()}
              style={{ marginTop: "30px" }}
            />
          </div>
          <div className="logsignup">
            <p>
              Don't have account? <Link to="/signup/">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
