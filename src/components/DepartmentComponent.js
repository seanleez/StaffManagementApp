import React from "react";
import { Card, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent'

function RenderDepartmentItem({department}) {
    return(
        <Link to={`/department/${department.id}`}>
            <Card>
                <CardTitle className="m-2">{department.name}</CardTitle>
                <CardText className="py-3 offset-1">Number of Staffs: <i>{department.numberOfStaff}</i></CardText>
            </Card>
        </Link>
    );
}

const Department = (props) => {
    const departmentList = props.departments.departments.map((department) => {
        return(
            <div key={department.id} className="col-12 col-sm-6 col-lg-4 p-2">
                <RenderDepartmentItem department={department} />
            </div>
        )
    });

    if (props.departments.isLoading) {
        return(
            <div className='container'>
                <div className="row height-60"></div>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    } else if (props.departments.errMess) {
        return(
            <div className='container'>
                <div className="row height-60"></div>
                <div className='row'>
                    <div className='col-12'>
                        <h3>{props.departments.errMess}</h3>
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
                        <BreadcrumbItem active>Department</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Department</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {departmentList}
                </div>
            </div>
        );
    }
}

export default Department