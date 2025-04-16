import React, { useState, useEffect, useRef } from "react";
// import "./admwithdraw.scss"
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DateTime } from "luxon";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
export const UserList = () => {
    const toast = useRef(null);
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const [withlist, setWithList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(url + "/admin/fetchusers", {
        headers: {
          "x-api-key": apikey,
        },
      });
      if (resp.status === 200) {
        //   setBalance(resp.data.balance);
        setWithList(resp.data.users);
      }
    };
    fetchData();
  }, []);
  const custDate = (data) => {
    return <>{DateTime.fromISO(data.tran_date).toFormat("yyyy-LL-dd")}</>;
  };
  const copyText = (x) => {
    navigator.clipboard.writeText(x);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "Ref. Link Copied Successfully",
    });
  };
  const custAdd = (data) => {
    return (
      <>
        <div className="flex gap-2">
          <div className="text-sm">{data.mem_address}</div>
          <i
            className="pi pi-copy cursor-pointer"
            onClick={() => copyText(data.mem_address)}
          />
        </div>
      </>
    );
  };
  const paidConfirm = async (_id) => {
    const resp = await axios.post(
      url + "/admin/withdrawpaid",
      { _id },
      {
        headers: {
          "x-api-key": apikey,
        },
      }
    );
    if (resp.status === 200) {
      //   setBalance(resp.data.balance);
      setWithList(resp.data.withdraws);
    }
  };
  const withstatus = (data) => {
    return (
      <>
        <Button
          label="Paid"
          size="small"
          onClick={() => paidConfirm(data._id)}
        />
      </>
    );
  };
  const payusdt = (data) => {
    return <>{(data.usdt_val - (data.usdt_val * 10) / 100).toFixed(3)}</>;
  };
  return (
    <div className="userlist" style={{paddingTop:"80px", paddingBottom:"80px", paddingLeft:"5px", paddingRight:"5ps"}}>
          <Toast ref={toast} position="top-right" />
          <div className="hero">
            <div className="content">
              <DataTable value={withlist}>
                <Column body={custDate} header="Date"></Column>
                <Column field="memberid" header="MemId"></Column>
                <Column body={custAdd} header="Mem Address"></Column>
                <Column field="mydown" header="Dowm"></Column>
                <Column field="join_under_id" header="Join Under"></Column>
                <Column field="myfund" header="Own Fund"></Column>
                <Column field="teamfund" header="Team Fund"></Column>
              </DataTable>
            </div>
          </div>
        </div>
  )
}
