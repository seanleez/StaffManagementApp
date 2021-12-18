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
import { postStaff, fetchStaffs, fetchDepartments, fetchStaffsSalary, fetchDelStaffs, fetchUpdateStaffs } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        departments: state.departments,
        staffsSalary: state.staffsSalary,
    }
}

const mapDispatchToProps = dispatch => ({
    postStaff: (name, doB, salaryScale, startDate, departmentId, annualLeave, overTime) => dispatch(postStaff(name, doB, salaryScale, startDate, departmentId, annualLeave, overTime)),
    fetchStaffs: () => {dispatch(fetchStaffs())},
    resetStaffInforForm: () => {dispatch(actions.reset('staffinfor'))},
    resetStaffModifyForm: () => {dispatch(actions.reset('staffmodifyform'))},
    fetchDepartments: () => {dispatch(fetchDepartments())},
    fetchStaffsSalary: () => {dispatch(fetchStaffsSalary())},

    fetchDelStaffs: (id) => (dispatch(fetchDelStaffs(id))),
    fetchUpdateStaffs: (id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime) => dispatch(fetchUpdateStaffs(id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime)),
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
                    postStaff={this.props.postStaff}
                    fetchDelStaffs={this.props.fetchDelStaffs}
                    fetchUpdateStaffs={this.props.fetchUpdateStaffs}
                    resetStaffInforForm={this.props.resetStaffInforForm}
                    resetStaffModifyForm={this.props.resetStaffModifyForm}
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

