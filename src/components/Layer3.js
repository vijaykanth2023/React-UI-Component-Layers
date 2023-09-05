import React from "react";
import { Col, Container, Row, Card, Table, Overlay, Popover, Form, Button } from "react-bootstrap";
// import Download from "../assets/download.png";
import { useState, useRef } from "react";
import Excel from "../assets/excel.png";
import $ from "jquery";
import fileDownload from "js-file-download";
import axios from "axios";
// import Filter from "../assets/filter.png";
const Layer3 = ({tableData}) =>{
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const tableValueData = [];
  if(tableData !== undefined){
    const {getTableValued, formValues} = tableData;
    if(getTableValued !== undefined){
      let result = Object.values(getTableValued);
      console.log("result", result);

    for(var k=0; k<result.length; k++)
    {
      tableValueData.push({
      name: result[k].ClientCompanyName,
      Value: result[k].Valued,
      Invoice: result[k].Invoiced,
      Payment: result[k].Payment,
      Pending:  parseInt(result[k].Invoiced) - parseInt(result[k].Payment),
    })
    }
    }

  }
  
  // Excel Download functionality

const [getTableBarValued, setTableBarValued] = useState(tableData.formValues);

const exportTableDownload = async() => {

  console.log("dashexcel",getTableBarValued);  

      const urlService = "http://localhost:3000/exportdashboardtable";

      const fileDownload = require('js-file-download');

    axios

      .post(urlService, getTableBarValued, {

        headers:{

          'Content-Disposition': "attachment; filename=Layer2.xlsx"

        },

        responseType:'arraybuffer'

      })

      .then((response) => {

        fileDownload(response.data, `${Date.now()}.xlsx`);

        console.log(response.data);

        setTableBarValued(response.data);

      })

      .catch(({ response }) => {

        console.log(response);

      });

    }

// End of Excel Download functionality

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
return(
    <div>
    <Container>
    <div className="Filter-block service-filter text-right" ref={ref}>
      {/* <img className="mx-2 my-2 btn_filter" src={Download} width="25px"></img>
      <img className="mx-2 my-2 btn_filter" src={Filter} width="25px" onClick={handleClick}></img> */}
      <Button id="excelfilter" className="my-2 filtr_button excel-btn" onClick={exportTableDownload}><img src={Excel} className="excelimg" width="26px" alt="Excel"/></Button>
      <Button className="my-2 filtr_button"  onClick={handleClick}>service filter</Button>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Body className="d-flex p-0">
          <div>
            <Form className="py-3 px-3 layer3_form bg-white">
            <div className="row mb-3 flex-col">
            <h6 className="infilter_title">solutions</h6>
              <div className="col-12 d-flex text-left mb-2">
              
                <label class="lblwraper">
                  <input type="checkbox"/>
                  <span class="checkmark"></span>
                </label>
                <span className="filter-head font-12">All</span>
              </div>
              <div className="col-12  d-flex mb-2">
                <label class="lblwraper">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
                <span className="filter-head font-12">Development</span>
              </div>
              <div className="col-12  d-flex mb-2">
                <label class="lblwraper">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
                <span className="filter-head font-12">Support</span>
              </div>
              <div className="col-12  d-flex">
                <label class="lblwraper">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
                <span className="filter-head font-12">Resource Augument</span>
              </div>
            </div>
          </Form>
          </div>
          <div>
            <Form className="px-3 py-3 layer3_form">
            <div className="row mb-3 flex-col">
            <h6 className="infilter_title">solutions</h6>
              <div className="col-12 d-flex text-left mb-2">
              
                <label class="lblwraper">
                  <input type="checkbox"/>
                  <span class="checkmark"></span>
                </label>
                <span className="filter-head font-12">All</span>
              </div>
              <div className="col-12  d-flex mb-2">
                <label class="lblwraper">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
                <span className="filter-head font-12">Smart</span>
              </div>
              <div className="col-12  d-flex mb-2">
                <label class="lblwraper">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
                <span className="filter-head font-12">Salesforce</span>
              </div>
              <div className="col-12  d-flex">
                <label class="lblwraper">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
                <span className="filter-head font-12">AI</span>
              </div>
            </div>
          </Form>
          </div>
          <div>
          <Form className="py-3 px-3 layer3_form bg-white">
            <div className="row mb-3 flex-col">
            <h6 className="infilter_title">Company</h6>
              <div className="col-12 d-flex text-left mb-2">
              
                <label class="lblwraper">
                  <input type="checkbox"/>
                  <span class="checkmark"></span>
                </label>
                <span className="filter-head font-12">All</span>
              </div>
              <div className="col-12  d-flex">
                <label class="lblwraper">
                  <input type="checkbox" />
                  <span class="checkmark"></span>
                </label>
                <span className="filter-head font-12">Customer / client</span>
              </div>
            </div>
          </Form>
          </div>
          </Popover.Body>
        </Popover>
      </Overlay>
      </div>
  <Row>
    <Col sm={12} className="mb-4">
    <Card>
    <Table striped bordered hover variant="white"
    className="mb-0 Dash_table">
  <thead>
    <tr>
      <th style={{width: "25%"}}>Customer</th>     
      <th>Values</th>
      <th>Invoice</th>
      <th>Payment</th>
      <th>Pending</th>
    </tr>
  </thead>
  <tbody>
  {tableValueData.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td> 
      <td>{item.Value}</td>
      <td>{item.Invoice}</td>
      <td>{item.Payment}</td>
      <td>{item.Pending}</td>
    </tr>
  ))}
  </tbody>
</Table>
        </Card>
        </Col> 
  </Row> 
</Container>
        </div>
);
}
export default Layer3;