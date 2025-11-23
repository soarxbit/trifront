// import "./admliveaccount.scss";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DateTime } from "luxon";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
export const LandAccountNew = () => {
    const toast = useRef(null);
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const [withlist, setWithList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(url + "/admin/fetchlandeaccount", {
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
    return <>{DateTime.fromISO(data.tran_date).toFormat("yyyy-LL-dd")}</>;
  };
  const approveTran = async (_id) =>{
    const resp = await axios.post(url + "/admin/approvelandaccount",{_id}, {
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
               <Column field="location" header="Location"></Column>
               <Column field="plotnumber" header="Plot No"></Column>
               <Column field="decimal" header="Decimal"></Column>
               <Column field="investamt" header="Amount"></Column>
               <Column body={approve} header="Approve"></Column>
               <Column body={reject} header="Reject"></Column>
             </DataTable>
               </Card>
             
           </div>
         </div>
       </div>
  )
}
