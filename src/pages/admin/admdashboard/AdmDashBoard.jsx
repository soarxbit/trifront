import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admdashboard.scss";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
export const AdmDashBoard = () => {
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const [sdate, setSdate] = useState("2025-01-01")
  const [edate, setEdate] = useState(null)
  const [allow, setAllow] = useState(0)
  const [disDate, setDisDate] = useState({
    startdata:null,
    enddata:null,
    is_allowed:0
  })
  useEffect(()=>{
    const fetchData = async () => {
      const resp = await axios.get(url + "/admin/getactwithdate", {
        headers: {
          "x-api-key": apikey,
        },
      });
      if (resp.status === 200) {
        //   setBalance(resp.data.balance);
        setDisDate({startdata:resp.data.sdate, enddata:resp.data.edate, is_allowed:resp.data.is_allowed});
        setSdate(resp.data.sdate);
        setEdate(resp.data.edate,);
        setAllow(resp.data.is_allowed);
      }
    };
    fetchData();
  },[])
  const handleSubmit = async () =>{
    const resp = await axios.post(url + "/admin/setactwithdate",{sdate, edate}, {
      headers: {
        "x-api-key": apikey,
      },
    });
    if(resp.status===200){
      alert("Submited")
    }
  }
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
                    <InputText type="date" value={sdate} className="p-inputtext-sm" onChange={e=>setSdate(e.target.value)} />
                  </div>
                  <div className="component">
                    <div>FROM DATE</div>
                    <InputText type="date" value={edate} className="p-inputtext-sm" onChange={e=>setEdate(e.target.value)} />
                  </div>
                  <div className="component">
                    <Button label="Confirm" type="button" onClick={handleSubmit} />
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
