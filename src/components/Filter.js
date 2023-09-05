import React from "react";
import Select from "react-select";
import "./styles.css";
//import { useState } from "react";
const Filter = (props) => {
  //const [style, setStyle] = useState("cont");
  var evntvalue = props.data;
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  // const changeStyle = () => {
  //   setStyle("cont2");
  //   evntvalue = false;
  // };
  return (
    <div>
      <div
        style={{
          position: "Fixed",
          overflow: "hidden",
          top: "70px",
          right: 0,
          height: "100vh",
          width: evntvalue ? "24%" : 0,
          background: "white",
          boxShadow: "0 0 2px",
          borderLeft: "1px solid #ffffff",
          borderRadius: "2px",
          transition: "width 500ms cubic-bezier(0.25, 0.1, 0.24, 1)",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <div className="d-flex align-items-center justify-content-between filt-headline col-10 mx-auto p-0">
            <div>Filter</div>
            <button className="closebtn">×</button>
          </div>

          <div className="stage-edu">
            <div className="d-flex align-items-center justify-content-center head-line">
              {/* <hr />
              <div>Company</div>
              <hr /> */}
            </div>
            <div className="row mb-3">
              <div className="col-6 align-self-center">
                <span className="filter-head"> </span>
              </div>
              <div className="col-6">
                <label className="mylabel"></label>
              </div>
            </div>
            <Select options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
