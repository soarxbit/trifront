import React, { useState, useRef, useEffect } from "react";
import "./mybusiness.scss";
import axios from "axios";
import { DateTime } from "luxon";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
export const MyBusiness = () => {
  const toast = useRef(null);
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const [data, setData] = useState({});
  const [btnClaim, setBtnClaim] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      if (window.ethereum) {
        const adrs = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const wa = adrs[0];
        const resp = await axios.post(
          url + "/user/fetchbusiness",
          {
            wa,
          },
          {
            headers: {
              "x-api-key": apikey,
            },
          }
        );
        if (resp.status === 200) {
          setData(resp.data.mybusiness);
        } else {
          alert("X");
        }
      } else {
        alert("0");
      }
    };
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);
  const claimInvest = async (rowid) => {
    setBtnClaim(1);
    const resp = await axios.post(
      url + "/user/claimInvest",
      {
        rowid,
      },
      {
        headers: {
          "x-api-key": apikey,
        },
      }
    );
    if (resp.status === 200) {
      toast.current.show({
        severity: "info",
        summary: "Confirmed",
        detail: resp.data.success,
        life: 3000,
      });
      setBtnClaim(0);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: resp.data.error,
        life: 3000,
      });
      setBtnClaim(0);
    }
  };
  if (!data) return false;
  var rows = [];
  for (let i = 0; i < data.length; i++) {
    rows.push(data[i]);
  }
  return (
    <div className="mybusiness">
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="hero">
        <div className="content">
          <div className="border-2 border-dashed surface-border border-round surface-ground p-2">
            MY TRADE FUND:
          </div>
          <div className="grid">
            {rows.map((row, index) => (
              <div key={row._id} className="col-12 md:col-6 lg:col-6">
                <Card className="data">
                  <div className="border-2 border-dashed surface-border border-round surface-ground p-2">
                    FUND {index * 1 + 1}
                  </div>
                  <div className="details border-2 border-dashed surface-border border-round bg-primary p-2">
                    <div>
                      <div>Date</div>
                      {DateTime.fromISO(row.tran_date).toFormat("yyyy-LL-dd")}
                    </div>
                    <div>
                      <div>Amount</div>
                      {row.base_amount.toFixed(2)}
                    </div>
                    <div>
                      <div>Claimed</div>
                      {row.claimed}
                    </div>
                  </div>

                  <div className="buttons">
                    {btnClaim === 0 ? (
                      <>
                        <Button
                          label="Claim"
                          className="w-full"
                          size="small"
                          severity="info"
                          onClick={() => claimInvest(row._id)}
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          label="Claim"
                          size="small"
                          severity="info"
                          disabled
                        />
                      </>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
