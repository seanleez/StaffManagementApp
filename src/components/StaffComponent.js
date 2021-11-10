import React, {Component} from 'react';
import {Card, CardText, CardTitle} from 'reactstrap'
import dateFormat from 'dateformat'

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
        if (staff != null) {
            return(
                <div className="row information">
                    <Card className="col-12 col-md-6 col-lg-4">
                        <CardTitle>Name: {staff.name}</CardTitle>
                        <CardText>Day of Birth: {dateFormat(staff.doB, "dd, mm, yyyy")}</CardText>
                        <CardText>Start Day: {dateFormat(staff.startDay, "dd, mm, yyyy")}</CardText>
                        <CardText>Department: {staff.department.name}</CardText>
                        <CardText>Annual Leave: {staff.annualLeave}</CardText>
                        <CardText>Over Time: {staff.overTime}</CardText>
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
        let staffList = [];
        if (this.props.department === "all") {
            staffList = this.props.staffs
        } else {
            staffList = this.props.staffs.filter(
                (staff) => staff.department.name === this.props.department
            )
        }
        const staffListByDepartment = staffList.map((staff) => {
            return(
                <div key={staff.id} className={this.props.responsiveCol}>
                    <Card onClick={() => this.onStaffSelected(staff)}>
                        <CardTitle>{staff.name}</CardTitle>
                    </Card>
                </div>
            )
        });
        return(
            <div className="container">
                <div className="row">
                    {staffListByDepartment}
                    <p>{document.getElementById('#colSelect')}</p>
                </div>
                <div className="row" id="staffInfor">
                    {this.renderStaff(this.state.seletedStaff)}
                </div>
            </div>
        )
    }
}

export default StaffList