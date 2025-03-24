import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "./home.scss";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div className="home">
      <div className="hero text-center">
        <div className="branding">
          <img
            src={window.location.origin + "/images/tlogo.webp"}
            alt="triconix"
            width={150}
          />
          <h3 className="m-0 p-0">WELCOME TO</h3>
          <h1 className="m-0 p-0 text-primary text-7xl">TRICONIX</h1>
          <p>Artificial Inteligence Based Robotic Trading platform</p>
        </div>
        <div className="quick flex gap-3 align-items-center w-full justify-content-center">
          <Link to="/signup">
            <Button label="Sign Up" icon="pi pi-user" size="small" />
          </Link>
          <Link to="/login">
            <Button label="Login" icon="pi pi-sign-in" size="small" />
          </Link>
        </div>
      </div>
      <div className="module text-center">
        <div className="text-primary text-4xl mb-5">
          Revolutionary Trading Platform with Exclusive Features
        </div>
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-6">
            <Card className="moduleitem">
              <div className="left">
                <div className="text-primary text-2xl">Mobile Payment Make Easy</div>
                <div className="msg">
                  Add new trending and rare artwork to your collection.
                </div>
              </div>
              <div className="right">
                <img
                  src={window.location.origin + "/images/coinicon.png"}
                  alt=""
                />
              </div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-6">
            <Card className="moduleitem">
              <div className="left">
                <div className="text-primary text-2xl">Mobile Payment Make Easy</div>
                <div className="msg">
                  Add new trending and rare artwork to your collection.
                </div>
              </div>
              <div className="right">
                <img
                  src={window.location.origin + "/images/piggy.png"}
                  alt=""
                />
              </div>
            </Card>
          </div>
        </div>
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-6">
            <Card>
              <div className="moduleitem">
                <div className="left">
                  <div className="text-primary text-2xl">Mobile Payment Make Easy</div>
                  <div className="msg">
                    Add new trending and rare artwork to your collection.
                  </div>
                </div>
                <div className="right">
                  <img
                    src={window.location.origin + "/images/lock.png"}
                    alt=""
                  />
                </div>
              </div>
            </Card>
          </div>
          <div className="col-12 md:col-6 lg:col-6">
            <Card className="moduleitem">
              <div className="left">
                <div className="text-primary text-2xl">Mobile Payment Make Easy</div>
                <div className="msg">
                  Add new trending and rare artwork to your collection.
                </div>
              </div>
              <div className="right">
                <img src={window.location.origin + "/images/lock.png"} alt="" />
              </div>
            </Card>
          </div>
        </div>
      </div>
      {/* <div className="mivi">
        <div className="mission col-12 md:col-6 lg:col-6">
          <div className="missionmsg">
            <div className="missiontitle text-align-center ">
              <h1>Our Mission</h1>
            </div>
            To create profesional development opporutunites for our audience
            from brginer to advanced Triconix,and for our employees and partners
            (banks,educators,independent analysts,data providers, and brokers)
            We Provide the most advanced information and tools,such as qutes and
            charts,market analysis,economic calenders, and webinars.along with a
            varity of information source for traders sekking a conscious
            approach to the market
          </div>

          <div className="missionmsg">
            <div className="missiontitle text-align-center ">
              <h1>Our Vision</h1>
            </div>
            To create profesional development opporutunites for our audience
            from brginer to advanced Triconix,and for our employees and partners
            (banks,educators,independent analysts,data providers, and brokers)
            We Provide the most advanced information and tools,such as qutes and
            charts,market analysis,economic calenders, and webinars.along with a
            varity of information source for traders sekking a conscious
            approach to the market
          </div>
        </div>
        <div className="corevalue">
          <div className="corevaluetitle">
            <h1>Our Core Values</h1>
            <div className="values">
              <div className="valuea">
                <h4 className="pi pi-users ">
                  Teamwork <p>Together, we can achive more</p>
                  <h4 className=" pi pi-lightbulb">
                    Innovation <p>We never stop finding new ways to </p>
                    <h4 className="pi pi-comments ">
                      Feedback <p>We rely on feedback to find ways improve</p>
                      <h4 className="pi pi-eye ">
                        Visions{" "}
                        <p>
                          We want our readers to have a clear view of the market
                        </p>
                        <h4 className=" pi pi-search">
                          TRANSPARENCY{" "}
                          <p>
                            We want to create a level playing field for
                            retailers by being honest and transparenc
                          </p>
                        </h4>
                      </h4>
                    </h4>
                  </h4>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
