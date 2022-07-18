import React, { Component } from 'react';
import { Card, CardText, CardTitle } from 'reactstrap';
import dateFormat from 'dateformat';

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seletedStaff: null,
      responsiveCol: 'col-12 col-md-6 col-lg-4',
      department: 'all',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
  }

  // After component did mount, add eventlistener to catch resize of window
  // Whenever width of window satisfy below condition, we setState of this Component,
  // this will effect change selected value of [SELECT]
  // and transfer responsiveCol to StaffList as a props
  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }
  resize() {
    if (window.innerWidth >= 992) {
      this.setState({ responsiveCol: 'col-12 col-md-6 col-lg-4' });
    } else if (window.innerWidth < 992 && window.innerWidth >= 768) {
      this.setState({ responsiveCol: 'col-12 col-md-6' });
    } else {
      this.setState({ responsiveCol: 'col-12' });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize.bind(this));
  }

  handleChange(e) {
    this.setState({ responsiveCol: e.target.value });
  }

  handleDepartmentChange(e) {
    this.setState({ department: e.target.value });
  }

  onStaffSelected(staff) {
    this.setState({ seletedStaff: staff });
  }

  renderStaff(staff) {
    if (staff != null) {
      return (
        <div className="row information">
          <Card className="col-12 col-md-6 col-lg-4">
            <CardTitle>Name: {staff.name}</CardTitle>
            <CardText>Day of Birth: {dateFormat(staff.doB, 'dd, mm, yyyy')}</CardText>
            <CardText>Start Day: {dateFormat(staff.startDay, 'dd, mm, yyyy')}</CardText>
            <CardText>Department: {staff.department.name}</CardText>
            <CardText>Annual Leave: {staff.annualLeave}</CardText>
            <CardText>Over Time: {staff.overTime}</CardText>
          </Card>
        </div>
      );
    } else {
      return <div>Click on staff name to see their information</div>;
    }
  }

  render() {
    let staffList = [];
    if (this.state.department === 'all') {
      staffList = this.props.staffs;
    } else {
      staffList = this.props.staffs.filter((staff) => staff.department.name === this.state.department);
    }

    const staffListByDepartment = staffList.map((staff) => {
      return (
        <div key={staff.id} className={this.state.responsiveCol}>
          <Card onClick={() => this.onStaffSelected(staff)}>
            <CardTitle>{staff.name}</CardTitle>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <select value={this.state.responsiveCol} onChange={this.handleChange}>
          <option value="col-12 col-md-6 col-lg-4">Three Columns</option>
          <option value="col-12 col-md-6">Two Columns</option>
          <option value="col-12">One Column</option>
        </select>

        <select onChange={this.handleDepartmentChange}>
          <option defaultValue hidden>
            Department
          </option>
          <option value="all">All</option>
          <option value="Sale">Sale</option>
          <option value="HR">HR</option>
          <option value="Marketing">Marketing</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
        </select>
        <p>Number of Staff(s): {staffListByDepartment.length}</p>
        <div className="row">
          {staffListByDepartment}
          <p>{document.getElementById('#colSelect')}</p>
        </div>
        <div className="row" id="staffInfor">
          {this.renderStaff(this.state.seletedStaff)}
        </div>
      </div>
    );
  }
}

export default StaffList;
