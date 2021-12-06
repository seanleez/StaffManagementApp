import React, { Component } from 'react';
import Header from './HeaderComponent';
import StaffList from './StaffComponent';
import StaffDetail from './StaffdetailComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {
        departments: state.departments,
        roles: state.roles,
        staffs: state.staffs
    }
}
class Main extends Component {
    render() {
        if (localStorage.getItem('staffs') !== null) {
            let temp = JSON.parse(localStorage.getItem('staffs'));
            for (let i = 0; i < temp.length; i++) {
                if (this.props.staffs.some((ele) => ele.id === temp[i].id) === false) {
                    this.props.staffs.push(temp[i]);
                }
            }
        }
        
        const StaffWithId = ({match}) => {
            return(
                <StaffDetail staff={this.props.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
            )
        };
        
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/staff" component={() => <StaffList staffs={this.props.staffs}/>} />
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

export default withRouter(connect(mapStateToProps)(Main));

