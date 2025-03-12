import React from "react";
import "./homefooter.scss";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
export const HomeFooter = () => {
  return (
    <div className="homefooter">
      <div className="content">
        <div className="getupdate">
          <div className="title">Get Regular Updates</div>
          <div className="comp">
            <InputText
              type="text"
              placeholder="Enter Your Email Address"
              className="p-inputtext-sm"
            />
            <Button label="Subscribe" size="small" />
          </div>
        </div>
        <Divider />
        <div className="lnkgroup">
          <div className="grid">
            <div className="col-12 md:col-6 lg:col-3">
              <div className="join text-center">
                <div className="title">Join Our Smart Community</div>
                <div><Button label="JOIN" style={{marginTop:10}} size="small" /></div>
              </div>
            </div>
            <Divider layout="vertical" className="pd" />
            <div className="col-12 md:col-6 lg:col-3 qklink">
              <div className="title">Quick Links</div>
              <ul>
                <li>
                  <a href="/">Progress Way</a>
                </li>
                <li>
                  <a href="/">Pager</a>
                </li>
                <li>
                  <a href="/">Presentation</a>
                </li>
                <li>
                  <a href="/">Contact</a>
                </li>
                <li>
                  <a href="/">Coin Status</a>
                </li>
              </ul>
            </div>
            <div className="col-12 md:col-6 lg:col-3 qklink">
            <div className="title">Other Links</div>
              <ul>
                <li>
                  <a href="/">About</a>
                </li>
                <li>
                  <a href="/">API Docs</a>
                </li>
                <li>
                  <a href="/">News</a>
                </li>
                <li>
                  <a href="/">Team</a>
                </li>
                <li>
                  <a href="/">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="col-12 md:col-6 lg:col-2 qklink">
            <div className="title">Legel</div>
              <ul>
                <li>
                  <a href="/">Privacy Policy</a>
                </li>
                <li>
                  <a href="/">Terms & Conditions</a>
                </li>
                <li>
                  <a href="/">Disclaimer</a>
                </li>
                <li>
                  <a href="/">Sitemap</a>
                </li>
                <li>
                  <a href="/">Terms & Use</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="left">Copyright © 2025 TRICONIX. All rights reserved.</div>
        <div className="right"></div>
      </div>
    </div>
  )
}
