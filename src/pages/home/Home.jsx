import React from "react";
import { Button } from "primereact/button";
export const Home = () => {
  return (
    <div className="home">
      <div className="hero text-center">
        <div className="branding">
          <img src={window.location.origin + "/images/tlogo.webp"} alt="triconix" width={150} />
          <h3 className="m-0 p-0">WELCOME TO</h3>
          <h1 className="m-0 p-0">TRICONIX</h1>
          <p>Artificial Inteligence Based Robotic Trading platform</p>
        </div>
        <div className="quick flex gap-3 align-items-center w-full justify-content-center">
          <Button label="Sign Up" size="small" />
          <Button label="Login" size="small" />
        </div>
      </div>
    </div>
  );
};
