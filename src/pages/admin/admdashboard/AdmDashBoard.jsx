import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admdashboard.scss";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
export const AdmDashBoard = () => {
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const [disDate, setDisDate] = useState({
    startdata:"",
    enddata:""
  })
  useEffect(()=>{
    const fetchData = async () => {
      const resp = await axios.get(url + "/admin/getactwitdate", {
        headers: {
          "x-api-key": apikey,
        },
      });
      if (resp.status === 200) {
        //   setBalance(resp.data.balance);
        setDisDate(resp.data.withdraws);
      }
    };
    fetchData();
  },[])
  return (
    <div className="admdashboard">
      <div className="hero">
        <div className="content p-2">
          <div className="grid">
            <div className="col-12 md:col-4 lg:col-4">
              <Card>
                <div className="form-group">
                  <div className="component">
                    <div>START DATE</div>
                    <InputText type="date" className="p-inputtext-sm" />
                  </div>
                  <div className="component">
                    <div>START DATE</div>
                    <InputText type="date" className="p-inputtext-sm" />
                  </div>
                  <div className="component">
                    <Button label="Confirm" />
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
