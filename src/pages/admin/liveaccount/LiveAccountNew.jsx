import "./admliveaccount.scss";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DateTime } from "luxon";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
export const LiveAccountNew = () => {
  const toast = useRef(null);
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const [withlist, setWithList] = useState([]);
  const [rowid, setRowId] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(url + "/admin/fetchliveaccount", {
        headers: {
          "x-api-key": apikey,
        },
      });
      if (resp.status === 200) {
        //   setBalance(resp.data.balance);
        setWithList(resp.data.withdraws);
      }
    };
    fetchData();
  }, []);
  const custDate = (data) => {
    return <>{DateTime.fromISO(data.tran_date).toFormat("yyyy-mm-dd")}</>;
  };
  const custDate1 = (data) => {
    return <>{DateTime.fromISO(data.investdate).toFormat("yyyy-mm-dd")}</>;
  };
  const approveTran = async (_id) =>{
    const resp = await axios.post(url + "/admin/approveliveaccount",{_id}, {
      headers: {
        "x-api-key": apikey,
      },
    });
    if (resp.status === 200) {
      window.location.reload(true)
    }
  }
  const approve = (data) => {
    return (
      <>
        <Button label="Approve" onClick={()=>approveTran(data._id)} />
      </>
    );
  };
  const reject = (data) => {
    return (
      <>
        <Button label="Reject" severity="danger" />
      </>
    );
  };
  const mobile = (data) => {
    return <a href={`tel:${data.mobile}`}>{data.mobile}</a>;
  };
  const portalid = (data) => {
    return <div className="cursor-pointer" onClick={()=>copyText(data.portalid)}>{data.portalid}</div>;
  };
  const portalpass = (data) => {
    return <div className="cursor-pointer" onClick={()=>copyText(data.portalpassword)}>{data.portalpassword}</div>;
  };
  const mtid = (data) => {
    return <div className="cursor-pointer" onClick={()=>copyText(data.mtid)}>{data.mtid}</div>;
  };
  const mtpass = (data) => {
    return <div className="cursor-pointer" onClick={()=>copyText(data.mtpass)}>{data.mtpass}</div>;
  };
  const mtserver = (data) => {
    return <div className="cursor-pointer" onClick={()=>copyText(data.mtserver)}>{data.mtserver}</div>;
  };

  const copyText = (x) => {
    navigator.clipboard.writeText(x);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "Content Copied Successfully",
    });
  };

  return (
    <div className="admliveaccount">
      <Toast ref={toast} position="top-right" />
      <div className="hero">
        <div className="content p-2">
            <Card>
            <DataTable value={withlist}>
            <Column body={custDate} header="Date"></Column>
            <Column field="memberid" header="Mem Id"></Column>
            <Column field="username" header="User Name"></Column>
            <Column body={mobile} header="Mobile"></Column>
            <Column body={portalid} header="Portal Id"></Column>
            <Column body={portalpass} header="Portal Pass"></Column>
            <Column body={mtid} header="MTID"></Column>
            <Column body={mtpass} header="MTPass"></Column>
            <Column body={mtserver} header="Server"></Column>
            <Column body={custDate1} header="Date"></Column>
            <Column field="investamt" header="Amount"></Column>
            <Column body={approve} header="Approve"></Column>
            <Column body={reject} header="Reject"></Column>
          </DataTable>
            </Card>
          
        </div>
      </div>
    </div>
  );
};
