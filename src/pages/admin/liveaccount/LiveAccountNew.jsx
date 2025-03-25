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
  const approve = (data) => {
    return (
      <>
        <Button label="Approve" />
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
  const portalid = (data) => {
    return <div className="">{data.portalid}</div>;
  };
  return (
    <div className="admliveaccount">
      <div className="hero">
        <div className="content p-2">
            <Card>
            <DataTable value={withlist}>
            <Column body={custDate} header="Date"></Column>
            <Column field="memberid" header="Mem Id"></Column>
            <Column field="username" header="User Name"></Column>
            <Column field="mobile" header="Mobile"></Column>
            <Column body={portalid} header="Portal Id"></Column>
            <Column field="portalpassword" header="Portal Pass"></Column>
            <Column field="mtid" header="MTID"></Column>
            <Column field="mtpass" header="MTPass"></Column>
            <Column field="mtserver" header="Server"></Column>
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
