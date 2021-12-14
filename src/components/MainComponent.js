import React, { Component } from 'react';
import Header from './HeaderComponent';
import StaffList from './StaffComponent';
import StaffDetail from './StaffdetailComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { addStaff, fetchStaffs } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        departments: state.departments,
        roles: state.roles,
        staffs: state.staffs
    }
}

const mapDispatchToProps = dispatch => ({
    addStaff: (id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image) => dispatch(addStaff(id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image)),
    fetchStaffs: () => {dispatch(fetchStaffs())},
    resetStaffInforForm: () => {dispatch(actions.reset('staffinfor'))}
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchStaffs();
    }

    render() {

        const HomePageStaffList = () => {
            return(
                <StaffList 
                    staffs={this.props.staffs}
                    addStaff={this.props.addStaff}
                    resetStaffInforForm={this.props.resetStaffInforForm}
                />
            )
        }
        const StaffWithId = ({match}) => {
            return(
                <StaffDetail 
                    staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} 
                    isLoading={this.props.staffs.isLoading}
                    errMess={this.props.staffs.errMess}
                />
            )
        };

        return (
            <div>
                <Header />
                <Switch>
                    {/* <Route exact path="/staff" component={() => <StaffList staffs={this.props.staffs} addStaff={this.props.addStaff} />} /> */}
                    <Route exact path="/staff" component={HomePageStaffList} />
                    <Route path="/staff/:staffId" component={StaffWithId} />
                    <Route path="/department" component={() => <Department departments={this.props.departments} />} />
                    <Route path="/salary" component={() => <Salary salaryItems={this.props.staffs}/>} />
                    <Redirect to="/staff" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

