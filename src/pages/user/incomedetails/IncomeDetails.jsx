import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./incomedetails.scss";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import axios from "axios";
export const IncomeDetails = () => {
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const Navigate = useNavigate();
  const toast = useRef(null);
  const [withdraw, setWithdraw] = useState(0);
  const [levelIncome, setLevelIncome] = useState(0);
  const [monthRoiIncome, setMonthRoiIncome] = useState(0);
  const [income, setIncome] = useState({
    FEE: 0,
    VM: 0,
    AUTO: 0,
    WEEKLY: 0,
    SILVER: 0,
    PLATINUM: 0,
    SUP: 0,
    DGOLD: 0,
    CROWN: 0,
    REWARD: 0,
    MONTHLY: 0,
    MLEVEL: 0,
    REF: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      if (window.ethereum) {
        const adrs = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const wa = adrs[0];
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
          setWithdraw(resp.data.withdraw);
          setLevelIncome(resp.data.levelIncome)
          setMonthRoiIncome(resp.data.usrmonthlyamt)
          await updateData(resp.data.userIncomes);
        }
      }
    };
    fetchData();
  }, []);
  async function updateData(xdata) {
    for (let i = 0; i < xdata.length; i++) {
      if (xdata[i]._id === "FEE") {
        setIncome((prevIncome) => ({ ...prevIncome, FEE: xdata[i].sum }));
      } else if (xdata[i]._id === "REWARD") {
        setIncome((prevIncome) => ({ ...prevIncome, REWARD: xdata[i].sum }));
      } else if (xdata[i]._id === "MONTHLY") {
        setIncome((prevIncome) => ({ ...prevIncome, MONTHLY: xdata[i].sum }));
      } else if (xdata[i]._id === "MLEVEL") {
        setIncome((prevIncome) => ({ ...prevIncome, MLEVEL: xdata[i].sum }));
      } else if (xdata[i]._id === "CROWN") {
        setIncome((prevIncome) => ({ ...prevIncome, CROWN: xdata[i].sum }));
      } else if (xdata[i]._id === "REF") {
        setIncome((prevIncome) => ({ ...prevIncome, REF: xdata[i].sum }));
      }
      // else if(xdata[i]._id=='VM'){
      //   setIncome(prevIncome => ({...prevIncome, VM: xdata[i].sum}))
      // }else if(xdata[i]._id=='WEEKLY'){
      //   setIncome(prevIncome => ({...prevIncome, WEEKLY: xdata[i].sum}))
      // }else if(xdata[i]._id=='SILVER'){
      //   setIncome(prevIncome => ({...prevIncome, SILVER: xdata[i].sum}))
      // }else if(xdata[i]._id=='REWARD'){
      //   setIncome(prevIncome => ({...prevIncome, REWARD: xdata[i].sum}))
      // }else if(xdata[i]._id=='SUP'){
      //   setIncome(prevIncome => ({...prevIncome, SUP: xdata[i].sum}))
      // }else if(xdata[i]._id=='DGOLD'){
      //   setIncome(prevIncome => ({...prevIncome, DGOLD: xdata[i].sum}))
      // }else if(xdata[i]._id=='SPGOLD'){
      //   setIncome(prevIncome => ({...prevIncome, SPGOLD: xdata[i].sum}))
      // }else if(xdata[i]._id=='PLATINUM'){
      //   setIncome(prevIncome => ({...prevIncome, PLATINUM: xdata[i].sum}))
      // }
    }
  }
  const globalMessage = () => {
    toast.current.show({
      severity: "error",
      summary: "Sorry",
      detail: "Zero Balance to Navigate...",
    });
  };
  return (
    <div className="incdetails">
      <Toast ref={toast} position="top-right" />
      <div className="hero">
        <div className="content">
          <div className="text-2xl font-bold bg-primary p-2 border-round">
            INCOME DETAILS
          </div>
          <div className="grid text-center">
            <div className="col-12">
              <div className="data1">
                <div className="font-bold">TOTAL INCOME</div>
                <div className="amt">
                  {(
                    income.FEE +
                    income.REF +
                    levelIncome +
                    income.MONTHLY +
                    income.MLEVEL +
                    income.CROWN +
                    monthRoiIncome
                  ).toFixed(3)}
                </div>
                <Button
                  severity="warning"
                  label="Details"
                  size="small"
                  onClick={() => globalMessage()}
                />
              </div>
            </div>
          </div>
          <div className="grid text-center">
            <div className="col-12">
              <div className="data1">
                <div className="font-bold">TOTAL WITHDRAW</div>
                <div className="amt">{withdraw.toFixed(3)}</div>
                <Button
                  severity="warning"
                  label="Details"
                  size="small"
                  onClick={() => globalMessage()}
                />
              </div>
            </div>
          </div>
          <div className="grid text-center">
            <div className="col-12">
              <div className="data1">
                <div className="font-bold">MONTHLY SALARY</div>
                <div className="amt">{income.MONTHLY.toFixed(3)}</div>
                <Button
                  label="Details"
                  size="small"
                  onClick={() => Navigate("/user/incomes/monthly")}
                />
              </div>
            </div>
          </div>
          <div className="grid text-center">
            <div className="col-6">
              <div className="data">
                <div className="font-bold">REF. BONUS</div>
                <div className="amt">{income.REF.toFixed(3)}</div>
                <Button
                  label="Details"
                  size="small"
                  onClick={() => Navigate("/user/incomes/fee")}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="data">
                <div className="font-bold">TRADE LEVEL</div>
                <div className="amt">{levelIncome.toFixed(3)}</div>
                <Button
                  label="Details"
                  size="small"
                  onClick={() => Navigate("/user/incomes/mlevel")}
                />
              </div>
            </div>
          </div>
          <div className="grid text-center">
            <div className="col-6">
              <div className="data">
                <div className="font-bold">STAR</div>
                <div className="amt">0.00</div>
                <Button
                  label="Details"
                  size="small"
                  onClick={() => globalMessage()}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="data">
                <div className="font-bold">BRONZE</div>
                <div className="amt">0.00</div>
                <Button
                  label="Details"
                  size="small"
                  onClick={() => globalMessage()}
                />
              </div>
            </div>
          </div>
          <div className="grid text-center">
            <div className="col-6">
              <div className="data">
                <div className="font-bold">SILVER</div>
                <div className="amt">0.00</div>
                <Button
                  label="Details"
                  size="small"
                  onClick={() => globalMessage()}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="data">
                <div className="font-bold">GOLD</div>
                <div className="amt">0.00</div>
                <Button
                  label="Details"
                  size="small"
                  onClick={() => globalMessage()}
                />
              </div>
            </div>
          </div>
          <div className="grid text-center">
            <div className="col-6">
              <div className="data">
                <div className="font-bold">PLATINUM</div>
                <div className="amt">0.00</div>
                <Button
                  label="Details"
                  size="small"
                  onClick={() => globalMessage()}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="data">
                <div className="font-bold">RUBY</div>
                <div className="amt">0.00</div>
                <Button
                  label="Details"
                  size="small"
                  onClick={() => globalMessage()}
                />
              </div>
            </div>
          </div>
          <div className="grid text-center">
            <div className="col-6">
              <div className="data">
                <div className="font-bold">DIAMOND</div>
                <div className="amt">0.00</div>
                <Button
                  label="Details"
                  size="small"
                  onClick={() => globalMessage()}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="data">
                <div className="font-bold">KOHINOOR</div>
                <div className="amt">0.00</div>
                <Button
                  label="Details"
                  size="small"
                  onClick={() => globalMessage()}
                />
              </div>
            </div>
          </div>
          <div className="grid text-center">
            <div className="col-12">
              <div className="data1">
                <div className="font-bold">AMBASSADOR</div>
                <div className="amt">{income.CROWN.toFixed(3)}</div>
                <Button
                  severity="warning"
                  label="Details"
                  size="small"
                  onClick={() => Navigate("/user/incomes/crown")}
                />
              </div>
            </div>
          </div>
          <div className="grid text-center">
            <div className="col-12">
              <div className="data1">
                <div className="font-bold">REWARD</div>
                <div className="amt">{income.REWARD.toFixed(3)}</div>
                <Button
                  severity="warning"
                  label="Details"
                  size="small"
                  onClick={() => Navigate("/user/incomes/reward")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
