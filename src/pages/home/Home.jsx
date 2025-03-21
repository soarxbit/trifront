import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "./home.scss"
import {Link} from "react-router-dom"
export const Home = () => {
  return (
    <div className="home">
      <div className="hero text-center">
        <div className="branding">
          <img src={window.location.origin + "/images/tlogo.webp"} alt="triconix" width={150} />
          <h3 className="m-0 p-0">WELCOME TO</h3>
          <h1 className="m-0 p-0 text-primary text-7xl">TRICONIX</h1>
          <p>Artificial Inteligence Based Robotic Trading platform</p>
        </div>
        <div className="quick flex gap-3 align-items-center w-full justify-content-center">
          <Link to="/signup"><Button label="Sign Up" icon="pi pi-user" size="small" /></Link>
          <Link to="/login"><Button label="Login" icon="pi pi-sign-in" size="small" /></Link>
        </div>
      </div>
      <div className="module text-center">
        <div className="text-primary-300 text-2xl">
          Revolutionary Trading Platform with Exclusive Features
        </div>
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-6">
            <div className="moduleitem">
                <div className="left">
                    <div className="text-primary">Mobile Payment Make Easy</div>
                    <div className="msg">Add new trending and rare artwork to your collection.</div>
                </div>
                <div className="right">
                    <img src={window.location.origin + "/images/coinicon.png"} alt="" />
                </div>
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-6">
          <div className="moduleitem">
                <div className="left">
                    <div className="moduletitle">Mobile Payment Make Easy</div>
                    <div className="msg">Add new trending and rare artwork to your collection.</div>
                </div>
                <div className="right">
                    <img src={window.location.origin + "/images/piggy.png"} alt="" />
                </div>
            </div>
          </div>
        </div>
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-6">
            <Card>
            <div className="moduleitem">
                <div className="left">
                    <div className="moduletitle">Mobile Payment Make Easy</div>
                    <div className="msg">Add new trending and rare artwork to your collection.</div>
                </div>
                <div className="right">
                    <img src={window.location.origin + "/images/lock.png"} alt="" />
                </div>
            </div>
            </Card>
            
          </div>
          <div className="col-12 md:col-6 lg:col-6">
          <div className="moduleitem">
                <div className="left">
                    <div className="moduletitle">Mobile Payment Make Easy</div>
                    <div className="msg">Add new trending and rare artwork to your collection.</div>
                </div>
                <div className="right">
                    <img src={window.location.origin + "/images/lock.png"} alt="" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};
