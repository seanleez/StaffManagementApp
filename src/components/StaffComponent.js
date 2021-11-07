import React, {Component} from 'react';
import {Card, CardText, CardBody, CardTitle} from 'reactstrap'

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seletedStaff: null
        };
    }

    onStaffSelected(staff) {
        this.setState({seletedStaff : staff});
    }

    renderStaff(staff) {
        if (staff!=null) {
            return(
                <div className="row">
                    <Card className="col-12">
                        <CardTitle>{staff.name}</CardTitle>
                    </Card>
                </div>
            )
        } else {
            return(
                <div>Click on staff name to see their information</div>
            );
        }
    }

    render() {
        const staffList = this.props.staffs.map((staff) => {
            return(
                <div key={staff.id} className="col-12">
                    <Card onClick={() => this.onStaffSelected(staff)}>
                        <CardTitle>{staff.name}</CardTitle>
                    </Card>
                </div>
            )
        });
        return(
            <div className="container">
                <div className="row">
                    {staffList}
                </div>
                <div className="row">
                    {this.renderStaff(this.state.seletedStaff)}
                </div>
            </div>
        )
    }
}

export default StaffList