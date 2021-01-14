import React from "react";
import { Card, CardImg, CardText, CardHeader, CardBody, CardTitle, CardSubtitle, Row, Col, Button, CardFooter, Table } from "reactstrap";
import { MDBCol, MDBIcon, Input } from "mdbreact";
import { PanelHeader, CardCategory } from "components";
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../../assets/css/template.css';
import "../../assets/css/style.css"
import { MDBFormInline, MDBInput } from "mdbreact";
import Loader from 'react-loader-spinner';
import { BounceyLoader, ContentLoader, PulseLoader } from 'react-loaders-spinners';
import ReactTable from "react-table";
import "react-table/react-table.css";


var instancePool = [];
var columns = [
  {
    Header: "Target Group Name",
    accessor: "TargetGroupName",
    width: 300,
    maxWidth: 400,
    minWidth: 300,
  },
  {
    Header: "Port",
    accessor: "Port",
    headerClassName: 'my-favorites-column-header-group'
    // ,
    // Cell: ({ row }) => (
    //   <a onClick={e => this.handleButtonClick(e, row)}>
    //     Click Me
    //   </a>
    // )
  },
  {
    Header: "Protocol",
    accessor: "Protocol",
    style: {
      textAlign: "center"
    }
  },
  {
    Header: "Target Type",
    accessor: "TargetType",
    style: {
      textAlign: "center"
    }
  },
  {
    Header: "Vpc Id",
    accessor: "VpcId",
    style: {
      textAlign: "center"
    }
  },
  {
    Header: "LoadBalancerArns",
    accessor: "LoadBalancerArns",
    style: {
      textAlign: "center"
    }
  },
  {
    Header: "Target Group Arn",
    accessor: "TargetGroupArn",
    style: {
      textAlign: "center"
    }
  }
  // ,
  // {
  //   Header: "Actions",
  //   filterable: false,
  //   sortable: false,
  //   Cell: props =>{
  //     return(
  //       <Button  size="sm" variant="outline-primary">Stop</Button>
  //     )

  //   }
  // }
]

class tgroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    }

    //this.getallprod = this.getallprod.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.spinner = this.spinner.bind(this);
    this.loadTable = this.loadTable.bind(this);
    this.ErrorLoading = this.ErrorLoading.bind(this);
  }

  componentWillMount() {
    this.getallprod();

  }

  getallprod() {
    if (instancePool.length == 0) {
      axios.get('getalltg').then((data) => {
        instancePool = data.data;
        console.log(instancePool)
        this.loadTable();
      }).catch((err) => {
        console.log(err)
        //this.ErrorLoading();
      });
    }

  }

  spinner() {
    var spinner = [];
    spinner.push(<div align="center"><PulseLoader
      width={100}
      height={100}
      pColor='dodgerblue'
      sColor='#FF711E'
    /></div>);

    ReactDOM.render(spinner, document.getElementById('sp1'));
  }


  checkEnter(e) {

    if (e.key == 'Enter') {
      e.preventDefault();
      this.search(e);
    }

  }

  handleButtonClick = (e, row) => {
    // this.setState({ visible: true});
    console.log("clicked")
  };

  handleChange(e) {

    this.setState({
      [e.target.name]: e.target.value
    });

  }

  ErrorLoading() {
    var array = [];

    array.push(<div >



      <div id="notfound" style={{ height: "700px" }}>
        <div class="notfound">
          <div class="notfound-404">

          </div>
          <h2>Oops! This Data Could Not Be Found</h2>
          <p>Site is temporarily unavailable or Could not connect to the endpoint URL: "https://ec2.us-east-1.amazonaws.com/"</p>
          <a href="http://aws-dashboard.prv-prsn.com">Go To Homepage</a>
        </div>
      </div>


    </div>)

    ReactDOM.render(array, document.getElementById('main'));

  }


  loadTable() {
    var array = [];

    array.push(<div ><ReactTable

      columns={columns}
      data={instancePool}
      filterable
      defaultPageSize={50}
      noDataText={"No Data Found."}
      className="-striped -highlight"
      style={
        { height: "700px", width: "100%", overflow: "hidden" }

      }
      showPaginationBottom

    >
      {(state, makeTable, instance) => {
        let recordsInfoText = "";

        const { filtered, pageRows, pageSize, sortedData, page } = state;

        if (sortedData && sortedData.length > 0) {
          let isFiltered = filtered.length > 0;

          let totalRecords = sortedData.length;

          let recordsCountFrom = page * pageSize + 1;

          let recordsCountTo = recordsCountFrom + pageRows.length - 1;

          if (isFiltered)
            recordsInfoText = `${recordsCountFrom}-${recordsCountTo} of ${totalRecords} filtered records`;
          else
            recordsInfoText = `${recordsCountFrom}-${recordsCountTo} of ${totalRecords} records`;
        } else recordsInfoText = "No records";

        return (
          <div className="main-grid">
            <div className="above-table text-right">
              <div className="col-sm-12">
                <span className="records-info">{recordsInfoText}</span>
              </div>
            </div>

            {makeTable()}
          </div>
        );
      }}


    </ReactTable></div>)

    ReactDOM.render(array, document.getElementById('sp1'));

  }

  render() {


    return (
      <div id="main">
        <PanelHeader
          size="sm" />
        <div className="content">
          <Row >

            <Col>
              <Card style={{ height: "750px" }} >
                <CardHeader>
                </CardHeader>
                <CardBody>

                  <div id="sp1">
                    <ReactTable
                      columns={columns}
                      data={instancePool}
                      filterable
                      defaultPageSize={50}
                      noDataText={"Loading Data... Please wait.!"}




                      style={{
                        height: "700px" // This will force the table body to overflow and scroll, since there is not enough room
                      }}
                      className="-striped -highlight"
                    >
                      {(state, makeTable, instance) => {
                        let recordsInfoText = "";

                        const { filtered, pageRows, pageSize, sortedData, page } = state;

                        if (sortedData && sortedData.length > 0) {
                          let isFiltered = filtered.length > 0;

                          let totalRecords = sortedData.length;

                          let recordsCountFrom = page * pageSize + 1;

                          let recordsCountTo = recordsCountFrom + pageRows.length - 1;

                          if (isFiltered)
                            recordsInfoText = `${recordsCountFrom}-${recordsCountTo} of ${totalRecords} filtered records`;
                          else
                            recordsInfoText = `${recordsCountFrom}-${recordsCountTo} of ${totalRecords} records`;
                        } else recordsInfoText = "No records";

                        return (
                          <div className="main-grid">
                            <div className="above-table text-right">
                              <div className="col-sm-12">
                                <span className="records-info">{recordsInfoText}</span>
                              </div>
                            </div>

                            {makeTable()}
                          </div>
                        );
                      }}


                    </ReactTable>
                  </div>


                </CardBody>


              </Card>

            </Col>

          </Row>
        </div>

      </div >

    );
  }
}

export default tgroup;


