import React from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Overlay,
  Popover,
  Form,
} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
// import Download from "../assets/download.png";
// import Filter from "../assets/filter.png";
import { useState, useRef, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import $ from "jquery";

const Layer1 = ({ chartData }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const [width, setWidth] = useState(null);
  //console.log("layer dashboard u", layerDate);

  // const [chartData, setChartData] = useState([]);
  // setChartData(layerDate);
  console.log("layer pie data", chartData);
  const cardref = useRef(null);
  useEffect(() => {
    setWidth(cardref.current.offsetWidth);
  }, []);

  // const handleClick = (event) => {
  // setShow(!show);
  // setTarget(event.target);
  // };
  const data = [];
  const invoiceData = [];
  const paymentData = [];
  const pendingData = [];
  //const chartCount = 4;
  //const allChartData =[];

  const companyName = [];

  if (chartData !== undefined) {
    for (var i = 0; i < chartData.length; i++) {
      companyName.push(chartData[i].Name);
      data.push({
        name: parseInt(chartData[i].companyId),
        value: chartData[i].Valued,
      });
      invoiceData.push({
        name: parseInt(chartData[i].companyId),
        value: chartData[i].Invoiced,
      });
      paymentData.push({
        name: parseInt(chartData[i].companyId),
        value: chartData[i].Payment,
      });
      pendingData.push({
        name: parseInt(chartData[i].companyId),
        value: parseInt(chartData[i].Invoiced) - parseInt(chartData[i].Payment),
      });
    }

    // if(chartData.length > 1){

    //   data.push({name: "Biz", value: chartData[1].Valued});
    // }
    // else{

    // }

    //console.log("layer dashboard", allChartData[0]);
  }

  // const data3 = [
  //   { name: "BICS", value: 500 },
  //   { name: "BITZ", value: 500 },
  // ];
  // const data4 = [
  //   { name: "BICS", value: 0 }

  // ];
  var COLORS;

  if (companyName[0] == "Biz Impact") {
    // COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    COLORS = [
      { start: "#051937", end: "#0057DA" },
      { start: "#A8EB12", end: "#547704" },     
    ];
    console.log(COLORS);
  }

  if (companyName[0] == "Bics Global") {
    // COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042"];
    COLORS = [
      { start: "#A8EB12", end: "#547704" },
      { start: "#051937", end: "#0057DA" },
    ];

    console.log(COLORS);
  } else {
    // COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    COLORS = [
      { start: "#A8EB12", end: "#547704" },
      { start: "#051937", end: "#0057DA" },
    ];
  }

  //const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  function numChange(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? Math.abs(Number(labelValue)) / 1.0e9 + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? Math.abs(Number(labelValue)) / 1.0e6 + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? Math.abs(Number(labelValue)) / 1.0e3 + "K"
      : Math.abs(Number(labelValue));
  }

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    value,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {/* {`${(percent * 100).toFixed(0)}%`} */}
        {/* {data[index].value} */}
        {numChange(value)}
        {/* {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
      </text>
    );
  };

  if (companyName[0] != "Biz Impact") {
    $(".demo").removeClass("bics_rect");
  }

  if (companyName[0] == "Biz Impact") {
    $(".demo").addClass("bics_rect");
  }

  if (companyName[0] == "Bics Global") {
    $(".demo").addClass("bitz_rect");
  }

  if (companyName[1] != "Bics Global") {
    $(".demo2").removeClass("bitz_rect");
  }

  if (companyName[1] == "Bics Global") {
    $(".demo2").addClass("bitz_rect");
  }

  return (
    <div>
      <Container>
        <div className="Filter-block text-right" ref={ref}>
          {/* <img
className="mx-2 my-2 btn_filter"
alt="Download"
src={Download}
width="25px"
></img>
<img
className="mx-2 my-2 btn_filter"
alt="Filter"
src={Filter}
width="25px"
onClick={handleClick}
></img> */}
          <Overlay
            show={show}
            target={target}
            placement="bottom"
            container={ref}
            containerPadding={20}
          >
            <Popover id="popover-contained">
              <Popover.Header as="h3">Filter</Popover.Header>
              <Popover.Body>
                <Form>
                  {["checkbox"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3 tooltip_filter">
                      <Form.Check
                        inline
                        label="Value"
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="Invoiced"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="Pending"
                        type={type}
                        id={`inline-${type}-3`}
                      />
                      <Form.Check
                        inline
                        label="Payment"
                        type={type}
                        id={`inline-${type}-4`}
                      />
                    </div>
                  ))}
                </Form>
              </Popover.Body>
            </Popover>
          </Overlay>
        </div>
        <Row>
          <Col sm={12} md={3}>
            <Card ref={cardref}>
              <CardHeader>Value</CardHeader>

              <PieChart width={width} height={300}>
              <defs>
          {data.map((entry, index) => (
            <linearGradient id={`myGradient${index}`}>
              <stop
                offset="0%"
                stopColor={COLORS[index % COLORS.length].start}
              />
              <stop
                offset="100%"
                stopColor={COLORS[index % COLORS.length].end}
              />
            </linearGradient>
          ))}
        </defs>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={false}
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell
                    key={`cell-${index}`} fill={`url(#myGradient${index})`}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div className="not_found">No Data Available</div>
              <div className="mb-3">
                <span className="bics_rect demo">{companyName[0]}</span>

                <span className="bitz_rect demo2">{companyName[1]}</span>
                {/* <span className="bics_rect"></span>
            
                <span>{companyName[0]}</span>
                <span className="bitz_rect"></span>
           
                   <span>{companyName[1]}</span> */}
              </div>
            </Card>
          </Col>

          <Col sm={12} md={3}>
            <Card ref={cardref}>
              <CardHeader>Invoiced</CardHeader>
              <PieChart width={width} height={300}>
              <defs>
          {data.map((entry, index) => (
            <linearGradient id={`myGradient${index}`}>
              <stop
                offset="0%"
                stopColor={COLORS[index % COLORS.length].start}
              />
              <stop
                offset="100%"
                stopColor={COLORS[index % COLORS.length].end}
              />
            </linearGradient>
          ))}
        </defs>
                <Pie
                  data={invoiceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={false}
                  stroke="none"
                >
                  {invoiceData.map((entry, index) => (
                    <Cell
                    key={`cell-${index}`} fill={`url(#myGradient${index})`}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div className="not_found">No Data Available</div>
              <div className="mb-3">
                <span className="bics_rect demo">{companyName[0]}</span>

                <span className="bitz_rect demo2">{companyName[1]}</span>
                {/* <span className="bics_rect"></span>
               
                <span>{companyName[0]}</span>
                <span className="bitz_rect"></span>
           
                   <span>{companyName[1]}</span>
            */}
              </div>
            </Card>
          </Col>
          <Col sm={12} md={3}>
            <Card ref={cardref}>
              <CardHeader>Pending</CardHeader>
              <PieChart width={width} height={300}>
              <defs>
          {data.map((entry, index) => (
            <linearGradient id={`myGradient${index}`}>
              <stop
                offset="0%"
                stopColor={COLORS[index % COLORS.length].start}
              />
              <stop
                offset="100%"
                stopColor={COLORS[index % COLORS.length].end}
              />
            </linearGradient>
          ))}
        </defs>
                <Pie
                  data={pendingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={false}
                  stroke="none"
                >
                  {pendingData.map((entry, index) => (
                    <Cell
                    key={`cell-${index}`} fill={`url(#myGradient${index})`}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div className="not_found">No Data Available</div>
              <div className="mb-3">
                <span className="bics_rect demo">{companyName[0]}</span>

                <span className="bitz_rect demo2">{companyName[1]}</span>
                {/* <span className="bics_rect"></span>               
                <span>{companyName[0]}</span>

                <span className="bitz_rect"></span>
           
                   <span>{companyName[1]}</span> */}
              </div>
            </Card>
          </Col>
          <Col sm={12} md={3}>
            <Card ref={cardref}>
              <CardHeader>Payments</CardHeader>
              <PieChart width={width} height={300}>
              <defs>
          {data.map((entry, index) => (
            <linearGradient id={`myGradient${index}`}>
              <stop
                offset="0%"
                stopColor={COLORS[index % COLORS.length].start}
              />
              <stop
                offset="100%"
                stopColor={COLORS[index % COLORS.length].end}
              />
            </linearGradient>
          ))}
        </defs>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  isAnimationActive={false}
                  stroke="none"
                >
                  {paymentData.map((entry, index) => (
                    <Cell
                    key={`cell-${index}`} fill={`url(#myGradient${index})`}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div className="not_found">No Data Available</div>
              <div className="mb-3">
                <span className="bics_rect demo">{companyName[0]}</span>

                <span className="bitz_rect demo2">{companyName[1]}</span>
                {/* <span className="bics_rect"></span>
               
                <span>{companyName[0]}</span>
                <span className="bitz_rect"></span>
           
                   <span>{companyName[1]}</span> */}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Layer1;
