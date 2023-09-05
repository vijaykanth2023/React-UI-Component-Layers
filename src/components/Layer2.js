import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
Col,
Container,
Row,
Card,
Overlay,
Button,
Popover,
Form,
} from "react-bootstrap";
import Download from "../assets/download.png";
import Filter from "../assets/filter.png";
import Excel from "../assets/excel.png";
import {
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
Legend,
Cell,
} from "recharts";
import $ from "jquery";
import fileDownload from "js-file-download";

const Layer2 = ({barData}) => {
const [show, setShow] = useState(false);
const [target, setTarget] = useState(null);
const [width, setWidth] = useState(null);



const [services, setServices] = useState([]);

const getServices = async () => {

  try {

    const data = await axios.get("http://localhost:3000/services");

    console.log(data);

    setServices(data.data);

  } catch (e) {

    console.log(e);

  }

};

useEffect(() => {

  getServices();

}, [])




const ref = useRef(null);
const cardref = useRef(null);
useEffect(() => {
setWidth(cardref.current.offsetWidth);
}, []);




//console.log("bar data services", services);
 
const barValueData = [];

// Excel Download functionality
const [getFilterValued, setFilterValued] = useState([]);
const [getdashBarValued, setDashBarValued] = useState(barData.formValues);

const exportDownload = async() => {

  //console.log("dashexcel",getdashBarValued);  

      const urlService = "http://localhost:3000/exportdashboardgraph";

      const fileDownload = require('js-file-download');

    axios

      .post(urlService, getdashBarValued, {

        headers:{

          'Content-Disposition': "attachment; filename=Layer2.xlsx"

        },

        responseType:'arraybuffer'

      })

      .then((response) => {

        fileDownload(response.data, `${Date.now()}.xlsx`);

        console.log(response.data);

        setDashBarValued(response.data);

      })

      .catch(({ response }) => {

        console.log(response);

      });

    }

// End of Excel Download functionality
const itemChecked = [];
if(barData !== undefined){
  const {getBarValued, formValues} = barData;
  
  // console.log("bar datrrra", getBarValued);
  // console.log("bar datrrrffa", formValues);
  if(formValues !== undefined){
    let formArray = Object.values(formValues);
    console.log("formarray result", formArray[2]);  
    
      for(var m=0; m<formArray[2].length; m++)
{
     // $("input[value='" + formArray[2][m] + "']").prop('checked', true);
      itemChecked.push(formArray[2][m]);
}
   
    
// for(var m=0; m<services.length; m++)
// {
//   const isChecked = false;
//   if( formArray[2].includes(services[m].ParamId)){
//     isChecked = true;
//   }

//   itemChecked.push({
//     ParamId: services[m].ParamId,
//     ParamCode: services[m].ParamCode,
//     ParamDesciption: services[m].ParamDesciption,
//     checked: isChecked
//    })
// }
    for (var k = 0; k < formValues.length; k++) {
      getServices.push(formValues[k].value)
    }
    console.log("matched", services.length);
    console.log("matched 33", formArray[2].length);

    if((services.length) === formArray[2].length){
      $("#Servicefilter").show();
      console.log("matched");
    }
   else {
      console.log("not matched"); 
      $("#Servicefilter").hide();
    }
  }
  
  if(getBarValued !== undefined){
    let result = Object.values(getBarValued);
  console.log("result", result);
  for(var j=0; j<result.length; j++)
  {
    barValueData.push({
       name: result[j].ParamDesciption,
       Value: result[j].Valued,
       Invoice: result[j].Invoiced,
       Payment: result[j].Payment,
       pending: parseInt(result[j].Invoiced) - parseInt(result[j].Payment),
       No_of_projects: result[j].Count,
        });
  }
  }
 
}

const handleClick = (event) => {
  setShow(!show);
  setTarget(event.target);
 
};

const serviceCheck = ({ target }) => {

  const { name, checked, value } = target;
  console.log("checked value",value)
  if (checked) {
      
    itemChecked.push(parseInt(value));  
    console.log("Adding")
      
  }
  else
  {
      
    const Intexx = itemChecked;
    // itemChecked.splice(Intexx, 1);
    for (var key in Intexx) {
      var valuea = Intexx[key];
      if(value ==valuea ){
        itemChecked.splice(key, 1);
      }      
    }
    console.log("Splice");
  }
  console.log("Final service",itemChecked)
};

 
    if (itemChecked.length >0) {
      $(document).ready(function(){
        for(var n=0; n<itemChecked.length; n++)
        {
          $("input[value='" + itemChecked[n] + "']").prop('checked', true);       
        }
      });
    }
 
    //const [getFilterValued, setFilterValued] = useState([]);

    const barRefreshData = () => {
      if(barData !== undefined){
        const {getBarValued, formValues} = barData;
        console.log("selectedArray formValues", formValues);  
        if(formValues !== undefined){
          let selectedArray = barData.formValues;
          console.log("selectedArray result", selectedArray["Service"]);  
          selectedArray["Service"] = itemChecked;
          console.log("selectedArray2 result", selectedArray);  
           
          const urlService = "http://localhost:3000/dashboardgraph";
  
          axios
            .post(urlService, selectedArray, {})
            .then((response) => {
              console.log(response.data);
              console.log("setFilterValued",response.data[0].Valued);
              setFilterValued(response.data);
            })
            .catch(({ response }) => {
              console.log(response);
            });
        }  

      }
      setShow(!show);
     // setTarget(event.target);
    }
    if (getFilterValued.length >0){
      barValueData.length =0;
      for(var q=0; q<getFilterValued.length; q++)
      {
        barValueData.push({
          name: getFilterValued[q].ParamDesciption,
          Value: getFilterValued[q].Valued,
          Invoice: getFilterValued[q].Invoiced,
          Payment: getFilterValued[q].Payment,
          pending: parseInt(getFilterValued[q].Invoiced) - parseInt(getFilterValued[q].Payment),
          No_of_projects: getFilterValued[q].Count,
        });
      }
    }
    console.log("getFilterValued",getFilterValued);
    console.log("barValueData push",barValueData);
    //console.log("itemChecked", itemChecked);

    const barColors = [ '#051937', '#0057DA'];
    const barColorsInvoice = [ '#A8EB12', '#547704'];

return (
<div>
<Container>
<div className="Filter-block text-right layer2_tooltip" ref={ref}>
{/* <img
className="mx-2 my-2 btn_filter"
alt="Download"
src={Download}
width="25px"
></img> */}
<Button id="excelfilter" className="my-2 filtr_button excel-btn" onClick={exportDownload}><img src={Excel} className="excelimg" width="26px" alt="Excel"/></Button>
<Button id="Servicefilter" className="my-2 filtr_button" onClick={handleClick}>service filter</Button>
{/* <img
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
<Popover.Header as="h3">Service Filter</Popover.Header>
<Popover.Body>
<Form>
<div className="row mb-3 flex-col">

{services.map((item, index) => (

<div key={index} className="col-12 d-flex mb-2">

  <label className="lblwraper">

    <input
       id={item.ParamId}

      type="checkbox"

      name="Service"

      value={item.ParamId}
      
       onChange={serviceCheck}

      //checked ={item.checked}

    />

    <span className="checkmark"></span>

  </label>

  <span className="filter-head">{item.ParamDesciption}</span>

</div>

))}

   <Button id="Servicefilter" className="my-2 filtr_button m-0" onClick={barRefreshData}>Refresh</Button>      
            </div>
</Form>
</Popover.Body>
</Popover>
</Overlay>
</div>
<Row>
<Col sm={12}>
<Card ref={cardref}>
<BarChart
width={width}
className="bar-text my-2"
height={400}
data={barValueData}
isAnimationActive={false}
margin={{
top: 20,
right: 30,
left: 20,
bottom: 5,
}}
>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Legend />
<defs>
  {barColors.map((color, index) => (
   <linearGradient id={`colorUv${index}`} x1='0' y1='0' x2='100%' y2='0' spreadMethod='reflect'>
    <stop offset='0' stopColor='#1a1a1a' />
    <stop offset='1' stopColor={color} />
   </linearGradient>
  ))}
    {barColorsInvoice.map((color, index) => (
   <linearGradient id={`colorUvIn${index}`} x1='0' y1='0' x2='100%' y2='0' spreadMethod='reflect'>
    <stop offset='0' stopColor='#1a1a1a' />
    <stop offset='1' stopColor={color} />
   </linearGradient>
  ))}
 </defs>
<Bar dataKey="Value" stackId="a"  fill="#051937">
{/* {barValueData.map((entry, index) => (
   <Cell key={`cell-${index}`} fill={`url(#colorUv${index})`} />
  ))} */}
</Bar>
<Bar dataKey="invoiced" stackId="b" fill="#82ca9d">

</Bar>
<Bar dataKey="Payment" stackId="c" fill="#ffc658" />
<Bar dataKey="pending" stackId="d" fill="#60AAFF" />
<Bar dataKey="No_of_projects" stackId="e" fill="#15AF89" />
</BarChart>
</Card>
</Col>
</Row>
</Container>
</div>
);
};
export default Layer2;