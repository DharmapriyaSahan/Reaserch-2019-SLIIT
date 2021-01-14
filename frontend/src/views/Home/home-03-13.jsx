import React from "react";
import { Card, CardImg, CardText, CardHeader, CardBody, CardTitle, CardSubtitle, Row, Col, Button, CardFooter, Table } from "reactstrap";
import { MDBCol, MDBIcon, Input } from "mdbreact";
import { PanelHeader, CardCategory } from "components";
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../../assets/css/template.css';
import { MDBFormInline, MDBInput } from "mdbreact";
import Loader from 'react-loader-spinner';
import { BounceyLoader, ContentLoader, PulseLoader } from 'react-loaders-spinners';
import ReactTable from "react-table";
import "react-table/react-table.css";


var instancePool = [];
var columns = [
  {
    Header: "Name",
    accessor: "t_name",
    width: 300,
    maxWidth: 400,
    minWidth: 300,
    headerClassName: 'my-favorites-column-header-group'
  },
  {
    Header: "ID",
    accessor: "InstanceID",
    width: 150,
    maxWidth: 150,
    minWidth: 110
  },
  {
    Header: "IP",
    accessor: "instance_ip",
    style: {
      textAlign: "center"
    }
  },
  {
    Header: "Size",
    accessor: "instype",
    style: {
      textAlign: "center"
    }
  },
  {
    Header: "Status",
    accessor: "status.Name",
    style: {
      textAlign: "center"
    }
  },
  {
    Header: "Location",
    accessor: "avzone.AvailabilityZone",
    style: {
      textAlign: "center"
    }
  },
  {
    Header: "Team",
    accessor: "t_Team",
    style: {
      textAlign: "center"
    }
  },
  {
    Header: "Environment",
    accessor: "t_environment",
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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {


    }

    this.get = this.get.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.spinner = this.spinner.bind(this);
    this.loadTable = this.loadTable.bind(this);
  }

  componentWillMount() {
    this.get();

  }

  get() {

    axios.get('getall').then((data) => {
      instancePool = data.data;
      console.log(instancePool)
      this.loadTable();
    }).catch((err) => {
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

    ReactDOM.render(spinner, document.getElementById('sp'));
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



  loadTable() {
    var array = [];

    array.push(<div style={{ height: "700px" }}><ReactTable
      columns={columns}
      data={instancePool}
      filterable
      defaultPageSize={50}
      noDataText={"No Data Found."}
      



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


    </ReactTable></div>)

    ReactDOM.render(array, document.getElementById('sp'));

  }

  render() {


    return (
      <div>
        <PanelHeader
          size="sm" />
        <div className="content">
          <Row >

            <Col>
              <Card style={{ height: "750px" }} >
                <CardHeader>
                </CardHeader>
                <CardBody>

                  <div id="sp">
                    <div style={{ overflow: "auto", height: "700px" }}>

                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

                      <div align="center"><PulseLoader
                        width={70}
                        height={70}
                        pColor='dodgerblue'
                        sColor='#FF711E'
                      /></div>




                    </div>
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

export default Home;


