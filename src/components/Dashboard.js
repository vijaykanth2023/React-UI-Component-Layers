import React from "react";
import axios from "axios";
import Layer1 from "./Layer1";
import Layer2 from "./Layer2";
import Layer3 from "./Layer3";

//import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import makeAnimated from "react-select/animated";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import $ from "jquery";
import { Accordion } from "react-bootstrap";
import Select from "react-select";
import "./styles.css";

const animatedComponents = makeAnimated();

function Dashboard() {
  const [check, setCheck] = useState(true);
  //const data = check;
  const [company, setCompany] = useState([]);
  const [solution, setSolution] = useState([]);
  const [service, setService] = useState([]);
  //const [id, setId] = useState(0);
  //const { CompanyId, Name} = company;
  const getCompany = async () => {
    try {
      const data = await axios.get("http://localhost:3000/company");

      console.log(data);

      setCompany(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getSolution = async () => {
    try {
      const data = await axios.get("http://localhost:3000/solutions");

      console.log(data);

      setSolution(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getService = async () => {
    try {
      const data = await axios.get("http://localhost:3000/services");

      console.log(data);

      setService(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCompany();
    getSolution();
    getService();
  }, []);

  const [formValues, setFormValues] = useState({
    CompanyId: [],
    Solution: [],
    Service: [],
    InvoiceDateFrom: "",
    InvoiceDateTo: "",
    PaymentDateFrom: "",
    PaymentDateTo: "",
  });

  

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const handleCheckInDate = (date) => {
    setCheckInDate(date);
    //setCheckOutDate(null);
    console.log(date);
  };

  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
    console.log(date);
  };


  const handleCheck = ({ target }) => {
    const { name, checked, value } = target;
    
    
    
    //console.log(name);
    
    
    
    if (checked) {
    formValues[name].push(parseInt(value));
   // console.log("index result",formValues[name]);
    } else {
    //const index = formValues[name].indexOf(value);
    var arr = formValues.CompanyId;
    var solutionArray=formValues.Solution;
    var serviceArray=formValues.Service;
    for (var key in arr) {
    var valuea = arr[key];
    if(value ==valuea ){
    formValues[name].splice(key, 1);
    }
    }
    for (var key in serviceArray) {
    var valuea = serviceArray[key];
    if(value ==valuea ){
    formValues[name].splice(key, 1);
    }
    }
    for (var key in solutionArray) {
    var valuea = solutionArray[key];
    if(value ==valuea ){
    formValues[name].splice(key, 1);
    }
    }
    
    }
    
    console.log(formValues);
    setFormValues(formValues);
    };

  // const handleCheck = ({ target }) => {
  //   const { name, checked, value } = target;

  //   //console.log(name);


  //   if (checked) {
  //     formValues[name].push(parseInt(value));
  //   } else {
      
  //     const index = formValues[name].indexOf(value);
  //     formValues[name].splice(index, 1);
      
  //   }
    
  //   console.log("formvalue", formValues);
  //   setFormValues(formValues);
  // };


  const [getCompValued, setCompValued] = useState();
  const [getBarValued, setBarValued] = useState();
  const [getTableValued, setTableValued] = useState();

  
  const pieClickData = () => {
    const url = "http://localhost:3000/dashboardchart";

    axios
      .post(url, formValues, {})
      .then((response) => {
        console.log(response.data);
       // console.log("pieclickdate",response.data[0].Valued);
        setCompValued(response.data);
    
      })
      .catch(({ response }) => {
        console.log(response);
      });

  }

  const barClickData = () => {
 
    const urlService = "http://localhost:3000/dashboardgraph";

    axios
      .post(urlService, formValues, {})
      .then((response) => {
        console.log(response.data);
      //  console.log("clickdate",response.data[0].Valued);
        setBarValued(response.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });

  }

  const tableClickData = () => {
 
    const urlTable = "http://localhost:3000/dashboardtable";

    axios
      .post(urlTable, formValues, {})
      .then((response) => {
        console.log(response.data);
       // console.log("clickdate",response.data[0].Valued);
        setTableValued(response.data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
      
  }

    

  const handleClickData = () => {
   
    if (
      formValues["CompanyId"].length !== 0 &&
      formValues["Service"].length !== 0 &&
      formValues["Solution"].length !== 0
    ) {
      // check the dates
      if (checkInDate !== null && checkOutDate !== null) {
        formValues["InvoiceDateFrom"] = checkInDate.toISOString().slice(0, 10);
        formValues["InvoiceDateTo"] = checkOutDate.toISOString().slice(0, 10);
        formValues["PaymentDateFrom"] = checkInDate.toISOString().slice(0, 10);
        formValues["PaymentDateTo"] = checkOutDate.toISOString().slice(0, 10);
      
        //const pieChartValue = JSON.stringify(formValues);
       // console.log(pieChartValue);
       pieClickData();
       barClickData();  
       tableClickData();  
       setCheck(prevCheck => !prevCheck);
      }
      
    }


   // AllClickData();
  
  
    
    // console.log(" getCompValued ", getCompValued);
    // console.log("formValueSolution", formValueSolution);
    
    // console.log("pieclickdata", getCompValued);
  };
  const resetClick = () => {
    $("#InitialPopup input[type=checkbox]").prop("checked", false);
    $("#InitialPopup input[type=text]").val("");
  };
 // console.log(" company data ", getCompValued);
  //console.log(" bar data ", getBarValued);
 // console.log(" Table data ", getTableValued);

  //const pieChartValue = JSON.stringify(formValues);
       // console.log(pieChartValue);

  const layerAllData = {getBarValued, formValues}
  const tableAllData = {getTableValued, formValues}

  return (
    <div className="dashboard-fix ">
      {/* filter section start*/}

      <div
        id="InitialPopup"
        style={{
          position: "Fixed",
          overflow: "hidden",
          top: "70px",
          right: 0,
          height: "100vh",
          width: check ? "24%" : 0,
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
          <div className="d-flex align-items-center justify-content-between filt-headline col-10 mx-auto pt-3">
            <div>Filter</div>
            <button
              className="closebtn"
              onClick={() => setCheck((prevCheck) => !prevCheck)}
            >
              ×
            </button>
          </div>

          <div className="stage-edu p-4 side-data">
            <div className="d-flex align-items-center justify-content-center head-line">
              <hr />
              <div>COMPANY</div>
              <hr />
            </div>

            <div className="row mb-3">
              {company.map((item, index) => (
                <div key={index} className="col-6 d-flex text-left">
                  <label class="lblwraper">
                    <input
                      type="checkbox"
                      name="CompanyId"
                      onChange={handleCheck}
                      value={item.CompanyId}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <span className="filter-head">{item.Name}</span>
                </div>
              ))}
            </div>

            <div className="d-flex align-items-center justify-content-center head-line">
              <hr />
              <div>SOLUTIONS</div>
              <hr />
            </div>
            <div className="row mb-3">
              {solution.map((item, index) => (
                <div key={index} className="col-12 d-flex mb-2">
                  <label className="lblwraper">
                    <input
                      type="checkbox"
                      name="Solution"
                      onChange={handleCheck}
                      value={item.ParamId}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <span className="filter-head">{item.ParamDesciption}</span>
                </div>
              ))}
            </div>
            <div className="d-flex align-items-center justify-content-center head-line">
              <hr />
              <div>SERVICES</div>
              <hr />
            </div>
            <div className="row mb-3">
              {service.map((item, index) => (
                <div key={index} className="col-12 d-flex mb-2">
                  <label className="lblwraper">
                    <input
                      type="checkbox"
                      name="Service"
                      onChange={handleCheck}
                      value={item.ParamId}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <span className="filter-head">{item.ParamDesciption}</span>
                </div>
              ))}
            </div>

            <div className="d-flex align-items-center justify-content-center head-line">
              <hr />
              <div>DATE RANGE</div>
              <hr />
            </div>

            <div className="mb-3">
              <div className=" row">
                <div className="col-6 ">
                  <div className="col-12 text-Center">
                    <span className="filter-head">Start Date</span>
                  </div>
                  <DatePicker
                    placeholderText="DD/MM/YY"
                    selected={checkInDate}
                    startDate={new Date()}
                    minDate={checkInDate}
                    onChange={handleCheckInDate}
                  />
                </div>

                <div className="col-6">
                  <div className="col-12 text-Center">
                    <span className="filter-head">End Date</span>
                  </div>
                  <DatePicker
                    placeholderText="DD/MM/YY"
                    selected={checkOutDate}
                    minDate={new Date().setDate(
                      new Date(checkOutDate).getDate(checkOutDate)
                    )}
                    maxDate={new Date()}
                    endDate={new Date().setDate(
                      new Date(checkOutDate).getDate(checkOutDate)
                    )}
                    onChange={handleCheckOutDate}
                  />
                </div>
              </div>
              {/* {checkInDate && checkOutDate && (
                <div className="summary">
                  <p className="head-line">
                    Filter from {moment(checkInDate).format("LL")} to{" "}
                    {moment(checkOutDate).format("LL")}.
                  </p>
                </div>
              )} */}
            </div>
            <div className="row mt-5">
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm w-100"
                  onClick={resetClick}
                >
                  RESET
                </button>
              </div>
              <div className="col-6">
                <button
                  onClick={handleClickData}
                  type="button"
                  className="btn btn-primary btn-sm w-100 gradientBtn"
                >
                  VIEW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* filter section end*/}

      {/* Dashboard section start*/}

      <div id="overly" className={check ? "overly" : null}></div>

      <Container>
        <Row className="mt-5">
          <Col className="d-flex justify-content-start">
            <h5 className="font-weight-bold">
              <strong>Summary</strong>
            </h5>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              className="gradientBtn"
              style={{ padding: "0px 35px" }}
              variant="secondary"
              size="lg"
              onClick={() => setCheck((prevCheck) => !prevCheck)}
            >
              Filter
            </Button>
          </Col>
        </Row>
        {/* <Filter data={data} /> */}
        <Accordion
          className="mt-3"
          defaultActiveKey={["0", "1", "2"]}
          alwaysOpen
        >
          <Accordion.Item eventKey="0" className="mb-2">
            <Accordion.Header>Layer 1</Accordion.Header>
            <Accordion.Body>
              <Layer1 chartData={getCompValued} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className="mb-2">
            <Accordion.Header>Layer 2</Accordion.Header>
            <Accordion.Body>
              <Layer2 barData = {layerAllData}/>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="mb-2">
            <Accordion.Header>Layer 3</Accordion.Header>
            <Accordion.Body>
              <Layer3 tableData = {tableAllData} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
}
export default Dashboard;
