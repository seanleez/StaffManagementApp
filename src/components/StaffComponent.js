import React from 'react';
import { Card, CardImg, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom';

function RenderStaffItem({staff}) {
    return(
        <Link to={`/staff/${staff.id}`} >
            <Card className="text-center">
                <CardImg src={staff.image}/>
                <CardTitle className="mt-2">{staff.name}</CardTitle>
            </Card>
        </Link>
    )
}

const StaffList = (props) => {
    const staffList = props.staffs.map((staff) => {
        return(
            <div key={staff.id} className="col-12 col-sm-4 col-lg-2 my-2 p-2">
                <RenderStaffItem staff={staff}/>
            </div>
        )
    });

    return(
        <div className="container">
            <div className="row">
                <div className="col-12 mt-2">
                    <h3>Staff</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                {staffList}
            </div>
        </div>
    )
}

export default StaffList