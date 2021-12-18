import React from 'react';
import { Card, CardImg, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const StaffInDepartment = (props) => {

    const staffInDepartmentList = props.staffindepartment.map((staff) => {
        return(
            <div
                key={staff.id}
                className="col-6 col-sm-4 col-lg-2 my-2 p-2">
                <Card className="text-center">
                    <CardImg src={staff.image} alt={staff.name}/>
                    <CardTitle className="mt-2">{staff.name}</CardTitle>
                </Card>
            </div>
        )
    })

    if (props.department != null) {
        return(
            <div className="container">
                <div className="row height-void"></div>
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/department">Department</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.department.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.department.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {staffInDepartmentList}
                </div>
            </div>
        )
    } else {
        return(
            <div>Click on staff to see their information</div>
        );
    }
}

export default StaffInDepartment