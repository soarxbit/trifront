import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Badge } from "primereact/badge";
import "./myteam.scss"
export const MyTeam = () => {
    const url = process.env.REACT_APP_HOST_ADDR;
  const apikey = process.env.REACT_APP_APIKEY;
  const initialized = useRef(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (window.ethereum) {
        const adrs = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const wa = adrs[0];
        const resp = await axios.post(
          url + "/user/fetchteam",
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
          setData(resp.data.usr);
        }
      } else {
        alert("0");
      }
    };
    setTimeout(() => {
      fetchData();
    }, 1000);
    // if (!initialized.current) {
    //   initialized.current = true;
    //   fetchData();
    // }
  }, [apikey, url]);
  const createChild = (index, memberid, e) => {
    alert("Hi")
    e.currentTarget.className = "p-button p-button-danger";
    e.currentTarget.disabled = true;
    e.currentTarget.size = "small"
    const fetchData = async () => {
      const resp = await axios.post(
        url + "/user/gettreedata",
        {
          actuser: memberid,
        },
        {
          headers: {
            "x-api-key": apikey,
          },
        }
      );
      if (resp.status === 200) {
        var tempdata = resp.data.userdata;
        for (let j = 0; j < tempdata.length; j++) {
          setData((prevArray) => {
            const newArray = [...prevArray];
            newArray.splice(index * 1 + 1, 0, resp.data.userdata[j]);
            return newArray;
          });
        }
      }
    };
    fetchData();
  };
  if (!data) return false;
  var rows = [];
  for (let i = 0; i < data.length; i++) {
    rows.push(data[i]);
  }
  return (
    <div className="myteam">
      <div className="hero p-2">
        <div className="content">
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell className="text-primary" align="center">M. Id</TableCell>
                  <TableCell className="text-primary" align="center">Down</TableCell>
                  <TableCell className="text-primary" align="center">Own Fund</TableCell>
                  <TableCell className="text-primary" align="center">Team Fund</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={row.memberid}
                    style={{ backgroundColor: `#${row.color_code}` }}
                  >
                    <TableCell align="center"><Badge value={row.memberid} /></TableCell>
                    <TableCell align="center">
                      {row.mydown > 0 ? (
                        <Badge value={row.mydown} id={row.email} onClick={(e)=> createChild(index, row.mem_address, e)} />
                        // <Button
                        //   label={row.mydown}
                        //   id={row.email}
                        //   size="small"
                        //   onClick={(e) =>
                        //     createChild(index, row.mem_address, e)
                        //   }
                        // />
                      ) : (
                        <Badge value={row.mydown} />
                      )}
                    </TableCell>
                    <TableCell align="center"><Badge value={row.myfund} /></TableCell>
                    <TableCell align="center"><Badge value={row.teamfund} /></TableCell>
                   
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}
