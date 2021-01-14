import React from "react";
import { Card, CardImg, CardText, CardHeader, CardBody, CardTitle, CardSubtitle,Button, Form, Row,Modal, Col, CardFooter, Table } from "reactstrap";
import { MDBCol, MDBIcon, Input } from "mdbreact";
import { PanelHeader, CardCategory } from "components";
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../../assets/css/template.css';
import "../../assets/css/style.css"
import { MDBFormInline, MDBInput, MDBBtn } from "mdbreact";
import Loader from 'react-loader-spinner';
import { BounceyLoader, ContentLoader, PulseLoader } from 'react-loaders-spinners';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Popup from "reactjs-popup";



var instancePool = [];


class elb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        host: "",
        DiskValue: "",
        RAMValue: "",

    }

    this.popDownModel = this.popDownModel.bind(this);
    this.popUpModel = this.popUpModel.bind(this);
    // this.getallprod = this.getallprod.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.spinner = this.spinner.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.loadNotification = this.loadNotification.bind(this);
    this.updateDiskValue = this.updateDiskValue.bind(this);
    this.updateRAMValue = this.updateRAMValue.bind(this);
  }

  componentWillMount() {
   // this.getallprod();

  }

  getallprod() {
   
      axios.get('getServicePlacement?ram='+this.state.RAMValue+'&disk='+this.state.DiskValue).then((data) => {
        instancePool = data.data;
        
      }).catch((err) => {
        //this.ErrorLoading();
        console.log(err)
      });

    
  }



  spinner() {
    var spinner = [];
    spinner.push(<div align="center"><PulseLoader
      width={100}
      height={100}
      pColor='dodgerblue'
      sColor='#FF711E'
    /></div>);

    ReactDOM.render(spinner, document.getElementById('sp2'));
  }


  checkEnter(e) {

    if (e.key == 'Enter') {
      e.preventDefault();
      this.search(e);
    }

  }

 

  handleChange(e) {

    this.setState({
      [e.target.name]: e.target.value
    });

  }

  popUpModel(rowdata) {
    
    this.setState({
      val: true,
      sarn: rowdata.LoadBalancerArn,
      senv: 'non_prod'
    });

    // this.gettgforelb();


  }

  popDownModel() {
    this.setState({
      val: false
    });
  }


  loadNotification(){
    
    var array = [];

        array.push(<div >
   
      <div className="static-modal">
      <h1>
        Most Suitable Host is : {instancePool['0']["HostID"]}
      </h1>
     
      </div>
      </div>)
 
    
    ReactDOM.render(array, document.getElementById('sp'));
  }

  handleClick(){
    try{
      this.getallprod();
      console.log(instancePool['0'])  
      //this.setState({host: instancePool['0']["HostID"]})
      this.loadNotification();
    }catch(error){
      
    }
    
  }
  updateDiskValue(e) {
    this.setState({
      DiskValue: e.target.value
    });
    console.log(e.target.value)
  }
  updateRAMValue(e) {
    this.setState({
      RAMValue: e.target.value
    });
  }


  render() {


    return (
      <div id="main">
        <PanelHeader
          size="sm" />
          <br></br><br></br><br></br>
          
        <div className="content" align="center" margin-top="10" >
          

      <Form>
  
      <p className="h5 text-center mb-4">Select a Server for Placement</p>
      <div className="grey-text">
              <MDBInput
                label="Requested Disk Capacity (Mb)"
                group
                type="number"
                validate
                error="wrong"
                success="right"
                align="center"
                onChange={this.updateDiskValue}
              />

                  <MDBInput
                label="Requested RAM Capacity (Mb)"
                group
                type="number"
                validate
                error="wrong"
                success="right"
                align="center"
                onChange={this.updateRAMValue}
              />

              </div>

      </Form>
      <div>
          <Button variant="primary"  size="lg" block onClick={this.handleClick} >
        Find a Host
      </Button>
    <div>

    </div>
    <br></br><br></br>


      {/* <p>{this.state.host}</p> */}
      <div id="sp">

      </div>

          


          </div>
        
        </div>

      </div >

    );
  }
}

export default elb;


