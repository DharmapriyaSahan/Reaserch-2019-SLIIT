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
import Popup from "reactjs-popup";
import { Spin, Icon } from 'antd';

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
    },
    {
        Header: "Account",
        accessor: "account",
        style: {
            textAlign: "center"
        }
    },




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

        this.popDownModel = this.popDownModel.bind(this);
        this.popUpModel = this.popUpModel.bind(this);
        //this.get = this.get.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkEnter = this.checkEnter.bind(this);
        this.spinner = this.spinner.bind(this);
        this.loadTable = this.loadTable.bind(this);
        this.ErrorLoading = this.ErrorLoading.bind(this);

    }

    componentWillMount() {
        this.get();

    }




    get() {
        if (instancePool.length == 0) {
            axios.get('getall').then((data) => {
                instancePool = data.data;
                //console.log(instancePool)
                this.loadTable();
            }).catch((err) => {
                //this.ErrorLoading();
                console.log(err)
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

    popUpModel(rowdata) {
        console.log(rowdata.status['Name'])
        this.setState({
            val: true,
            sname: rowdata.t_name,
            sid: rowdata.InstanceID,
            sip: rowdata.instance_ip,
            ssize: rowdata.instype,
            sstatus: rowdata.status['Name'],
            slctn: rowdata.avzone.AvailabilityZone,
            steam: rowdata.t_Team,
            senv: rowdata.t_environment
        });
    }

    popDownModel() {
        this.setState({
            val: false
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

        array.push(<div style={{ height: "700px" }}><ReactTable
            columns={columns}
            data={instancePool}
            filterable
            defaultPageSize={50}
            noDataText={"No Data Found."}
            defaultSortDesc={true}
            getTdProps={(state, rowInfo, column, instance) => {

                return {
                    onClick: (e, handleOriginal) => {
                        try {
                            //console.log("It was in this row:", rowInfo.original);
                            this.popUpModel(rowInfo.original);
                            if (handleOriginal) {
                                handleOriginal();
                            }
                        } catch (error) {

                        }
                    }
                };
            }
            }




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
            <div id="main" >
                <PanelHeader
                    size="sm" />
                <div className="content" overflow="hidden">
                    <Row >

                        <Col>
                            <Card style={{ height: "750px", overflow: "hidden" }} >
                                <CardHeader>
                                </CardHeader>
                                <CardBody>

                                    <div id="sp"   >
                                        <ReactTable
                                            columns={columns}
                                            data={instancePool}
                                            filterable
                                            defaultPageSize={50}
                                            noDataText={"Loading Data... Please wait.!"}

                                            getTdProps={(state, rowInfo, column, instance) => {
                                                return {
                                                    onClick: (e, handleOriginal) => {
                                                        try {
                                                            // console.log("It was in this row:", rowInfo.original);
                                                            this.popUpModel(rowInfo.original);
                                                            if (handleOriginal) {
                                                                handleOriginal();
                                                            }
                                                        } catch (error) {

                                                        }
                                                    }
                                                };
                                            }
                                            }


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

                                    <Popup open={this.state.val == true} closeOnDocumentClick={false} >

                                        <div>
                                            <Card title="Instance Details">
                                                <CardHeader>
                                                    <CardTitle>Instance Details</CardTitle>
                                                </CardHeader>
                                                <CardBody>
                                                    <table >
                                                        <tr>
                                                            <td ><strong>Name </strong></td><td>{this.state.sname}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Instance ID</strong></td><td>{this.state.sid}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>IP Address</strong></td><td>{this.state.sip}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Size</strong></td><td>{this.state.ssize}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Location</strong></td><td>{this.state.slctn}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Team</strong></td><td>{this.state.steam}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>Environment</strong></td><td>{this.state.senv}</td>
                                                        </tr>
                                                    </table>
                                                </CardBody>
                                            </Card>

                                            <Button
                                                color="blue"
                                                size="lg" block
                                                onClick={() => {
                                                    this.popDownModel();

                                                }}
                                            >
                                                Close
    </Button>
                                        </div>



                                    </Popup>


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
