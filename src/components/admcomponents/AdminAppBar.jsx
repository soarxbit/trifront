import React, { useEffect, useState, useRef, useContext } from "react";
// import "./homeappbar.scss";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/ripple";
import { StyleClass } from "primereact/styleclass";
import { Divider } from "primereact/divider";
import { InputSwitch } from "primereact/inputswitch";
import { PrimeReactContext } from "primereact/api";
export const AdminAppBar = () => {
  const [visible, setVisible] = useState(false);
  const btnRef2 = useRef(null);
  const btnRef3 = useRef(null);
  const [checked, setChecked] = useState(false);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );
  const { changeTheme } = useContext(PrimeReactContext);
  const changeMyTheme = () => {
    let currentTheme = darkMode === false ? "soho-light" : "soho-dark";
    let newTheme = darkMode === false ? "soho-dark" : "soho-light";
    changeTheme(currentTheme, newTheme, "app-theme", function () {
      setDarkMode(!darkMode);
      setChecked(!darkMode);
      localStorage.setItem("darkMode", !darkMode);
    });
  };
  useEffect(() => {
    let currentTheme = darkMode === true ? "soho-light" : "soho-dark";
    let newTheme = darkMode === true ? "soho-dark" : "soho-light";
    changeTheme(currentTheme, newTheme, "app-theme", function () {
      // setDarkMode(!darkMode);
      // localStorage.setItem("darkMode", !darkMode);
    });
  }, [darkMode, changeTheme]);
  return (
    <>
      <div className="homeappbar surface-ground">
        <div className="content">
          <Link to="/admin/" style={{ textDecoration: "none", color: "#FFF" }}>
            <div className="brand">
              <img src={window.location.origin + "/images/tlogo.webp"} alt="" />
              <div className="title text-primary">TRICONIX</div>
            </div>
          </Link>
          <div className="menu">
            <InputSwitch checked={checked} onChange={() => changeMyTheme()} />
            <Button
              type="button"
              icon="pi pi-align-center"
              rounded
              className="h-2rem w-2rem"
              onClick={() => setVisible(true)}
            ></Button>
          </div>
        </div>
      </div>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        content={({ closeIconRef, hide }) => (
          <div className="flex flex-column h-full">
            <div className="flex align-items-center justify-content-between px-2 pt-3 flex-shrink-0">
              <span className="inline-flex align-items-center gap-2">
                <img
                  src={window.location.origin + "/images/tlogo.webp"}
                  width="50px"
                  alt=""
                />
                <span className="font-semibold text-2xl text-primary">
                  TRICONIX
                </span>
              </span>
              <span>
                <Button
                  type="button"
                  ref={closeIconRef}
                  onClick={(e) => hide(e)}
                  icon="pi pi-times"
                  rounded
                  outlined
                  className="h-2rem w-2rem"
                ></Button>
              </span>
            </div>
            <Divider />
            <div className="overflow-y-auto">
              <ul className="list-none p-3 m-0">
                <li>
                  <ul className="list-none p-0 m-0 overflow-hidden">
                    <li>
                      <a
                        href="/admin/"
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                        style={{ textDecoration: "none" }}
                      >
                        <i className="pi pi-home mr-2"></i>
                        <span className="font-medium">Dashboard</span>
                        <Ripple />
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/userslist/"
                        style={{ textDecoration: "none" }}
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-bookmark mr-2"></i>
                        <span className="font-medium">Users</span>
                        <Ripple />
                      </a>
                    </li>
                    <li>
                      <StyleClass
                        nodeRef={btnRef3}
                        selector="@next"
                        enterFromClassName="hidden"
                        enterActiveClassName="slidedown"
                        leaveToClassName="hidden"
                        leaveActiveClassName="slideup"
                      >
                        <a
                          href="#ajv"
                          style={{ textDecoration: "none" }}
                          ref={btnRef3}
                          className="p-ripple bg-yellow-800 flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                        >
                          <i className="pi pi-chart-line mr-2"></i>
                          <span className="font-medium">Withdraw</span>
                          <i className="pi pi-chevron-down ml-auto mr-1"></i>
                          <Ripple />
                        </a>
                      </StyleClass>
                      <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                        <li>
                          <a
                            href="/admin/withdraw/"
                            style={{ textDecoration: "none" }}
                            className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                          >
                            <i className="pi pi-chart-line mr-2"></i>
                            <span className="font-medium">Withdraw</span>
                            <Ripple />
                          </a>
                        </li>
                        <li>
                          <a
                            href="/admin/withdrawlist/"
                            style={{ textDecoration: "none" }}
                            className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                          >
                            <i className="pi pi-chart-line mr-2"></i>
                            <span className="font-medium">Withdraw List</span>
                            <Ripple />
                          </a>
                        </li>
                      </ul>
                    </li>
                    {/* <li>
                      <a
                        href="/admin/withdraw/"
                        style={{ textDecoration: "none" }}
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-bookmark mr-2"></i>
                        <span className="font-medium">Withdraws</span>
                        <Ripple />
                      </a>
                    </li> */}
                    <li>
                      <a
                        href="/admin/claimback/"
                        style={{ textDecoration: "none" }}
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-users mr-2"></i>
                        <span className="font-medium">Claim Back</span>
                        <Ripple />
                      </a>
                    </li>
                    {/* <li>
                      <a
                        href="/admin/changeaddress/"
                        style={{ textDecoration: "none" }}
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-users mr-2"></i>
                        <span className="font-medium">Change Address</span>
                        <Ripple />
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/changesponsor/"
                        style={{ textDecoration: "none" }}
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-users mr-2"></i>
                        <span className="font-medium">Change Sponsor</span>
                        <Ripple />
                      </a>
                    </li> */}
                    {/* <li>
                      <a
                        href="/admin/updaterank/"
                        style={{ textDecoration: "none" }}
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-users mr-2"></i>
                        <span className="font-medium">Activate Rank</span>
                        <Ripple />
                      </a>
                    </li>
                    <li>
                      <a
                        href="/admin/updatesuperid/"
                        style={{ textDecoration: "none" }}
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-users mr-2"></i>
                        <span className="font-medium">Update Super Id</span>
                        <Ripple />
                      </a>
                    </li> */}
                    {/* <li>
                      <a
                        href="/admin/changedepositaddress/"
                        style={{ textDecoration: "none" }}
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-users mr-2"></i>
                        <span className="font-medium">Change Deposit Addr</span>
                        <Ripple />
                      </a>
                    </li> */}
                    <li>
                      <StyleClass
                        nodeRef={btnRef2}
                        selector="@next"
                        enterFromClassName="hidden"
                        enterActiveClassName="slidedown"
                        leaveToClassName="hidden"
                        leaveActiveClassName="slideup"
                      >
                        <a
                          href="#ajv"
                          style={{ textDecoration: "none" }}
                          ref={btnRef2}
                          className="p-ripple bg-yellow-800 flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                        >
                          <i className="pi pi-chart-line mr-2"></i>
                          <span className="font-medium">Live Account</span>
                          <i className="pi pi-chevron-down ml-auto mr-1"></i>
                          <Ripple />
                        </a>
                      </StyleClass>
                      <ul className="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">
                        <li>
                          <a
                            href="/admin/liveaccountnew"
                            style={{ textDecoration: "none" }}
                            className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                          >
                            <i className="pi pi-chart-line mr-2"></i>
                            <span className="font-medium">New Account</span>
                            <Ripple />
                          </a>
                        </li>
                        <li>
                          <a
                            href="/admin/liveaccountlist/"
                            style={{ textDecoration: "none" }}
                            className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                          >
                            <i className="pi pi-chart-line mr-2"></i>
                            <span className="font-medium">List Account</span>
                            <Ripple />
                          </a>
                        </li>
                      </ul>
                    </li>
                    <Divider />
                    {/* <li>
                      <Link
                        to="/user/messages/"
                        style={{ textDecoration: "none" }}
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-comments mr-2"></i>
                        <span className="font-medium">Messages</span>
                        <span
                          className="inline-flex align-items-center justify-content-center ml-auto bg-green-500 text-0 border-circle"
                          style={{ minWidth: "1.5rem", height: "1.5rem" }}
                        >
                          0
                        </span>
                        <Ripple />
                      </Link>
                    </li> */}
                    {/* <li>
                      <a
                        href="/user/incomedetails/"
                        style={{ textDecoration: "none" }}
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-wallet mr-2"></i>
                        <span className="font-medium">Income Details</span>
                        <Ripple />
                      </a>
                    </li>
                    <li>
                      <a
                        href="/user/withdraw/"
                        style={{ textDecoration: "none" }}
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-wallet mr-2"></i>
                        <span className="font-medium">Withdraw</span>
                        <Ripple />
                      </a>
                    </li> */}

                    <li>
                      <Link
                        to="/user/settings/"
                        style={{ textDecoration: "none" }}
                        className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-cog mr-2"></i>
                        <span className="font-medium">Settings</span>
                        <Ripple />
                      </Link>
                    </li>
                    <Divider />
                    <li>
                      <Link
                        to="/"
                        style={{ textDecoration: "none" }}
                        className="p-ripple bg-red-800 flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                      >
                        <i className="pi pi-power-off mr-2"></i>
                        <span className="font-medium">Log Out</span>
                        <Ripple />
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
              <Link
                style={{ textDecoration: "none" }}
                className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
              >
                <Avatar
                  image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
                  shape="circle"
                />
                <span className="font-bold">Talk to AI</span>
              </Link>
            </div>
          </div>
        )}
      ></Sidebar>
    </>
  );
};
