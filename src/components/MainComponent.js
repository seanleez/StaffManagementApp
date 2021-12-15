import React, { Component } from 'react';
import Header from './HeaderComponent';
import StaffList from './StaffComponent';
import StaffDetail from './StaffdetailComponent';
import Department from './DepartmentComponent';
import StaffInDepartment from './StaffInDepartment'
import Salary from './SalaryComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { addStaff, fetchStaffs, fetchDepartments, fetchStaffsSalary } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        departments: state.departments,
        staffsSalary: state.staffsSalary,
    }
}

const mapDispatchToProps = dispatch => ({
    addStaff: (id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image) => dispatch(addStaff(id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime, image)),
    fetchStaffs: () => {dispatch(fetchStaffs())},
    resetStaffInforForm: () => {dispatch(actions.reset('staffinfor'))},
    fetchDepartments: () => {dispatch(fetchDepartments())},
    fetchStaffsSalary: () => {dispatch(fetchStaffsSalary())}
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDepartments();
        this.props.fetchStaffsSalary();
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
        };

        const StaffWithId = ({match}) => {
            var selectedStaff = this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]
            return(
                <StaffDetail 
                    staff={selectedStaff} 
                    isLoading={this.props.staffs.isLoading}
                    errMess={this.props.staffs.errMess}
                    department={this.props.departments.departments.filter((department) => department.id === selectedStaff.departmentId)[0]}
                />
            )
        };

        const HomePageStaffInDepartment = ({match}) => {
            var selectedDepartment = this.props.departments.departments.filter((department) => department.id === match.params.departmentId)[0]
            return(
                <StaffInDepartment 
                    staffindepartment = {this.props.staffs.staffs.filter(staff => staff.departmentId === selectedDepartment.id)}
                    department={selectedDepartment}
                />

            )
        }

        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/staff" component={HomePageStaffList} />
                    <Route path="/staff/:staffId" component={StaffWithId} />
                    <Route exact path="/department" component={() => <Department departments={this.props.departments} />} />
                    <Route path="/department/:departmentId" component={HomePageStaffInDepartment} />
                    <Route path="/salary" component={() => <Salary staffsSalary={this.props.staffsSalary}/>} />
                    <Redirect to="/staff" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

