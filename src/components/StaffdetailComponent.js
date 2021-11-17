import React from 'react';
import { Media, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat'

function RenderStaff({staff}) {
    return(
        <Media className="mb-3">
            <div className="col-12 col-sm-3 col-md-4 d-inline-block position-relative align-top m-0">
                <Media>
                    <Media width="100%" object src={staff.image} alt={staff.name} className="top mx-auto text-center"></Media>
                </Media>
            </div>
            <div className="col-12 col-sm-9 col-md-8 d-inline-block px-3 pt-2 m-0">
                <Media body>
                    <Media heading>{staff.name}</Media>
                    <p>Day of Birth: {dateFormat(staff.doB, "dd, mm, yyyy")}</p>
                    <p>Start Day: {dateFormat(staff.startDay, "dd, mm, yyyy")}</p>
                    <p>Department: {staff.department.name}</p>
                    <p>Annual Leave: {staff.annualLeave}</p>
                    <p>Over Time: {staff.overTime}</p>
                </Media>
            </div>
        </Media>
    )
}

const StaffDetail = (props) => {
    if (props.staff != null) {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staff">Staff</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.staff.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <RenderStaff staff={props.staff} />
                </div>
            </div>
        )
    } else {
        return(
            <div>Click on staff to see their information</div>
        );
    }
}

export default StaffDetail