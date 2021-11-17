import React, { Component } from "react";
import { Card, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
            sortOrder: "nameAscending"
        }
        this.handleSortChange = this.handleSortChange.bind(this)
    }

    handleSortChange(e) {
        this.setState({ sortOrder: e.target.value})
    }

    render() {
        // Use slice method for clone an array
        var sortList = this.props.salaryItems.slice();
        if (this.state.sortOrder === "salaryAscending") {
            sortList.sort((a,b) => (a.salary > b.salary) ? 1 : ((b.salary > a.salary) ? -1 : 0))
        } else if (this.state.sortOrder === "salaryDescending") {
            sortList.sort((a,b) => (a.salary < b.salary) ? 1 : ((b.salary < a.salary) ? -1 : 0))
        } else if (this.state.sortOrder === "nameAscending"){
            sortList.sort((a,b) => (a.name.split(" ").at(-1) > b.name.split(" ").at(-1)) ? 1 : ((b.name.split(" ").at(-1) > a.name.split(" ").at(-1)) ? -1 : 0))
        } else {
            sortList.sort((a,b) => (a.name.split(" ").at(-1) < b.name.split(" ").at(-1)) ? 1 : ((b.name.split(" ").at(-1) < a.name.split(" ").at(-1)) ? -1 : 0))
        }

        const salaryItemList = sortList.map((salaryItem) => {
            return(
                <div key={salaryItem.id} className="col-12 col-sm-6 col-lg-4 p-2">
                    <RenderSalaryItem salaryItem={salaryItem} />
                </div>
            );
        })
        return(
            <div className="container mb-3">
                <div className="row mt-2">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staff">Staff</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Salary</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Salary</h3>
                        <hr />
                    </div>
                </div>
                <select onChange={this.handleSortChange} className="mb-2">
                    <option defaultValue hidden>Sort by</option>
                    <option value="nameAscending">Name: Ascending</option>
                    <option value="nameDescending">Name: Descending</option>
                    <option value="salaryAscending">Salary: Ascending</option>
                    <option value="salaryDescending">Salary: Descending</option>
                </select>
                <div className="row">
                    {salaryItemList}
                </div>
            </div>
        )
    }
}

export default Salary