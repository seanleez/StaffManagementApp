import React, { Component } from "react";
import { Card, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent'

function RenderSalaryItem({salaryItem}) {
    return(
        <Card>
            <CardTitle className="text-center mt-2 mb-0">{salaryItem.name}</CardTitle>
            <hr />
            <CardText className="offset-1">Staff ID: <i>{salaryItem.id}</i></CardText>
            <CardText className="offset-1">Salary Scale: <i>{salaryItem.salaryScale}</i></CardText>
            <CardText className="offset-1">Overtime: <i>{salaryItem.overTime}</i></CardText>
            <div className="text-center border border-3 mx-4 mb-2">
                <CardText className="py-1">Salary: <i>{salaryItem.salary} VND</i></CardText>
            </div>
        </Card>
    )
}

class Salary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sortOrder: "idAscending"
        }
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleSortList = this.handleSortList.bind(this);
    }

    handleSortChange(e) {
        this.setState({ sortOrder: e.target.value})
    }

    handleSortList(sortList) {
        if (this.state.sortOrder === "idAscending") {
            return sortList.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
        } else if (this.state.sortOrder === "idDescending") {
            return sortList.sort((a,b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0));
        } else if (this.state.sortOrder === "salaryAscending"){
            return sortList.sort((a,b) => (a.salary > b.salary) ? 1 : ((b.salary > a.salary) ? -1 : 0));
        } else {
            return sortList.sort((a,b) => (a.salary < b.salary) ? 1 : ((b.salary < a.salary) ? -1 : 0));
        }
    }

    render() {
        // Use slice method for clone an array
        var sortList = this.handleSortList(this.props.salaryItems.staffs.slice());
        const salaryItemList = sortList.map((salaryItem) => {
            return(
                <div key={salaryItem.id} className="col-12 col-sm-6 col-lg-4 p-2">
                    <RenderSalaryItem salaryItem={salaryItem} />
                </div>
            );
        })

        if (this.props.salaryItems.isLoading) {
            return(
                <div className='container'>
                    <div className="row height-60"></div>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            )
        } else if (this.props.salaryItems.errMess) {
            return(
                <div className='container'>
                    <div className="row height-60"></div>
                    <div className='row'>
                        <div className='col-12'>
                            <h3>{this.props.salaryItem.errMess}</h3>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <div className="container mb-3">
                    <div className="row height-60"></div>
                    <div className="row mt-2">
                        <Breadcrumb className="mx-2">
                            <BreadcrumbItem><Link to="/staff">Staff</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Salary</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>Salary</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <span><i>SortStaff: </i></span>
                            <select onChange={this.handleSortChange} className="mb-2">
                                <option defaultValue hidden>Sort by</option>
                                <option value="idAscending">ID: Ascending</option>
                                <option value="idDescending">ID: Descending</option>
                                <option value="salaryAscending">Salary: Ascending</option>
                                <option value="salaryDescending">Salary: Descending</option>
                            </select>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        {salaryItemList}
                    </div>
                </div>
            );
        }
    }
}

export default Salary