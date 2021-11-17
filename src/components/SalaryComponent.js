import React from "react";
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

const Salary = (props) => {
    const salaryItemList = props.salaryItems.map((salaryItem) => {
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
            <div className="row">
                {salaryItemList}
            </div>
        </div>
    )
}

export default Salary