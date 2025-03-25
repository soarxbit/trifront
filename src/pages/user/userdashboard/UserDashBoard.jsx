import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./userdashboard.scss";
import axios from "axios";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
export const UserDashBoard = () => {
  const toast = useRef(null);
  const initialized = useRef(false);
  const Navigate = useNavigate();
  const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const [userdata, setUserData] = useState({});
  const [number, setNumber] = useState(1);
  const [userreward, setUserReward] = useState("NO REWARD");
  const _ranks = [
    "NO RANK",
    "SILVER",
    "GOLD",
    "PLATINUM",
    "DIAMOND",
    "CROWN DIAMOND",
  ];
  const pair = [
    "BTCUSD",
    "ETHUSDT",
    "BNBUSDT",
    "SOLUSDT",
    "TRXUSD",
    "XRPUSD",
    "AAVEUSDT",
    "ADAUSDT",
  ];
  var _reward = [
    "NO REWARD",
    "REWARD-1",
    "REWARD-2",
    "REWARD-3",
    "REWARD-4",
    "REWARD-5",
    "REWARD-6",
    "REWARD-7",
    "REWARD-8",
    "REWARD-9",
    "REWARD-10",
    "REWARD-11",
    "REWARD-12",
    "REWARD-13",
    "REWARD-14",
  ];
  const globalMessage = () =>{
    toast.current.show({
      severity: "error",
      summary: "Sorry",
      detail: "Something Went wrong!!!",
    });
  }
  useEffect(() => {
    const fetchData = async () => {
      if (window.ethereum) {
        const adrs = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        let wa = adrs[0];
        const resp = await axios.post(
          url + "/user/getdbdetails",
          { wa },
          {
            headers: {
              "x-api-key": apikey,
            },
          }
        );
        if (resp.status === 200) {
          if (resp.data.userdata.is_active === 1) {
            setUserData(resp.data.userdata);
            setUserReward(_reward[resp.data.userdata.reward]);
          } else {
            Navigate("/");
          }
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Please connect to Wallet.",
          });
        }
      }
    };
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);
  const checkRank = async () => {
    return false;
    if (window.ethereum) {
      const adrs = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const wa = adrs[0];
      const resp = await axios.post(url + "/user/checkrank", { wa });
      if (resp.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Rank Updated Successfully.",
        });
        //setUserRank(_rank[resp.data.data]);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "You are not qualified for New Rank.",
        });
      }
    } else {
      alert("Not Connected");
    }
  };
  const checkReward = async () => {
    if (window.ethereum) {
      const adrs = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const wa = adrs[0];
      const resp = await axios.post(
        url + "/user/checkreward",
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
          detail: "Reward Updated Successfully.",
        });
        //setUserReward(_reward[resp.data.data]);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "You are not qualified for New Reward.",
        });
      }
    } else {
      alert("Not Connected");
    }
  };
  const copyText = (x) => {
    navigator.clipboard.writeText(x);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "Ref. Link Copied Successfully",
    });
  };
  const content = (
    <div className="w-full flex align-items-center justify-content-between">
      <div style={{ fontSize: "14px", color: "#000" }}>
        MY ID: {userdata.memberid}
      </div>
    </div>
  );
  const usercont = (
    <div className="w-full flex align-items-center justify-content-between gap-3">
      <div className="text-sm">
        Ref: https://triconix.io/signup/{userdata.memberid}
      </div>
      <i
        className="pi pi-copy cursor-pointer"
        onClick={() =>
          copyText(`https://triconix.io/signup/${userdata.memberid}`)
        }
      ></i>
    </div>
  );
  const userdown = (
    <div className="w-full flex align-items-center justify-content-between">
      <div style={{ fontSize: "14px" }}>MY DIRECT</div>
      <div>{userdata.mydown}</div>
    </div>
  );
  const botfund = (
    <div className="w-full flex align-items-center justify-content-between">
      <div style={{ fontSize: "14px" }}>OWN FEE FUND</div>
      <div>{userdata.botfund}</div>
    </div>
  );
  const tradefund = (
    <div className="w-full flex align-items-center justify-content-between">
      <div style={{ fontSize: "14px" }}>TEAM FEE FUND</div>
      <div>{(userdata.tradefund * 1).toFixed(3)}</div>
    </div>
  );
  const myfund = (
    <div className="w-full flex align-items-center justify-content-between">
      <div style={{ fontSize: "14px" }}>MY INVEST</div>
      <div>{userdata.myfund}</div>
    </div>
  );
  const teamfund = (
    <div className="w-full flex align-items-center justify-content-between">
      <div style={{ fontSize: "14px" }}>TEAM INVEST</div>
      <div>{userdata.teamfund}</div>
    </div>
  );
  return (
    <div className="userdashboard">
      <Toast ref={toast} position="top-right" />
      <div className="hero">
        <div className="content p-2">
          <div className="grid">
            <div className="col-12 md:col-6 lg:col-6 text-center">
              <div className="data flex flex-column gap-2">
                <div className="branding">
                  <img
                    src={window.location.origin + "/images/tlogo.webp"}
                    alt="triconix"
                    width={100}
                  />
                  <h3 className="m-0 p-0">WELCOME BACK TO</h3>
                  <h1 className="m-0 p-0 text-primary text-4xl">TRICONIX</h1>
                  <p>Artificial Inteligence Based Robotic Trading platform</p>
                </div>
                <Message
                  style={{
                    border: "solid #696cff",
                    borderWidth: "0 0 0 6px",
                    color: "#696cff",
                  }}
                  className="border-primary w-full justify-content-start"
                  severity="info"
                  content={content}
                />
                <Message
                  style={{
                    border: "solid #696cff",
                    borderWidth: "0 0 0 6px",
                    color: "#696cff",
                  }}
                  className="border-primary w-full justify-content-start"
                  severity="info"
                  content={usercont}
                />
                <Message
                  style={{
                    border: "solid #696cff",
                    borderWidth: "0 0 0 6px",
                    color: "#696cff",
                  }}
                  className="border-primary w-full justify-content-start"
                  severity="info"
                  content={teamfund}
                />
                <div className="grid text-center">
                  <div className="col-6 md:col-6">
                    <div className="cont border-dotted border-round">
                      <div className="text-primary">My Direct</div>
                      <div>{userdata.mydown}</div>
                      <Link to="/user/myteam"><Button
                        label="Explore"
                        size="small"
                      /></Link>
                      
                    </div>
                  </div>
                  <div className="col-6 md:col-6">
                    <div className="cont border-dotted border-round">
                      <div className="text-primary">Self Business</div>
                      <div>{userdata.myfund}</div>
                      <Link to="/user/mybusiness"><Button
                        label="Explore"
                        severity="info"
                        size="small"
                      /></Link>
                      
                    </div>
                  </div>
                  <div className="col-6 md:col-6">
                    <div className="cont border-dotted border-round">
                      <div className="text-primary">Active Rank</div>
                      <div>No Rank</div>
                      <Link><Button
                        icon="pi pi-check-circle"
                        label="Check"
                        size="small"
                        onClick={()=>globalMessage()}
                      /></Link>
                      
                    </div>
                  </div>
                  <div className="col-12 md:col-6">
                    <div className="cont border-dotted border-round">
                      <div className="text-primary">Active Salary</div>
                      <div>No Salary</div>
                      <Link><Button
                        icon="pi pi-check-circle"
                        severity="danger"
                        label="Check"
                        size="small"
                        onClick={()=>globalMessage()}
                      /></Link>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 md:col-6 lg:col-6">
              
            </div>
          </div>
        </div>
      </div>
      {/* <div className="hero">
        <div className="content">
          <Message
            severity="warn"
            style={{
              border: "solidrgb(255, 255, 0)",
              borderWidth: "0 0 0 6px",
              color: "#ffff00",
            }}
            className="w-full justify-content-between"
            content={content}
          />
          <div className="grid text-center">
            <div className="col-12 md:col-6 lg:col-6 left">
              <div className="data">
                <div className="title text-2xl font-bold">MY UNIQUE ID</div>
                <div className="userid border-1 border-dashed surface-border border-round p-2">
                  {userdata.memberid}
                </div>
                <Message
                  severity="warn"
                  content={usercont}
                  className="w-full"
                  style={{ color: "#000" }}
                />
              </div>
            </div>
            <div className="col-12 md:col-6 lg:col-6 right">
              <div className="data flex flex-column gap-2">
                <div className="userid">@GLANCE</div>
                <Message
                  severity="error"
                  content={userdown}
                  className="w-full"
                  style={{ color: "#fff" }}
                />

                <div className="w-full border-1 border-dashed surface-border border-round p-2">
                  <Message
                    severity="info"
                    content={myfund}
                    className="w-full"
                    style={{ color: "#fff" }}
                  />
                  <Message
                    severity="warn"
                    content={teamfund}
                    className="w-full mt-1"
                    style={{ color: "#fff" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 md:col-6 lg:col-6 right">
              <div className="data">
                <div className="flex w-full justify-content-around gap-2">
                  <div className="w-full border-1 border-dashed surface-border border-round p-2">
                    <div className="text-4xl font-bold">Rank</div>
                    <div className="border-1 bg-green-900 border-dashed surface-border border-round p-2 text-xs font-bold">
                      {_ranks[userdata.rank]}
                    </div>
                    <Button
                      severity="danger"
                      icon="pi pi-check-circle"
                      label="Rank"
                      rounded
                      size="small"
                      className="mt-3"
                      onClick={() => checkRank()}
                    />
                  </div>
                  <div className="w-full border-1 border-dashed surface-border border-round p-2">
                    <div className="text-4xl font-bold">Reward</div>
                    <div className="border-1 bg-red-700 border-dashed surface-border border-round p-2 text-xs font-bold">
                    {userreward}
                    </div>
                    <Button
                      severity="warning"
                      icon="pi pi-check-circle"
                      label="Reward"
                      rounded
                      size="small"
                      className="mt-3"
                      onClick={() => checkReward()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
