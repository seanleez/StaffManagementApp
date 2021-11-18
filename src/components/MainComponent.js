import React, { Component } from 'react';
import Header from './HeaderComponent';
import StaffList from './StaffComponent';
import StaffDetail from './StaffdetailComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import Footer from './FooterComponent';
import { STAFFS } from '../shared/staffs';
import { DEPARTMENTS } from '../shared/departments';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            staffs: STAFFS,
            departments: DEPARTMENTS
        };
    }

    render() {
        const StaffWithId = ({match}) => {
            console.log(this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10)))
            return(
                <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]} />
            )
        };
        
        return (
            <div className='App'>
                <Header />
                <Switch>
                    <Route exact path="/staff" component={() => <StaffList staffs={this.state.staffs} />} />
                    <Route path="/staff/:staffId" component={StaffWithId} />
                    <Route path="/department" component={() => <Department departments={this.state.departments} />} />
                    <Route path="/salary" component={() => <Salary salaryItems={this.state.staffs}/>} />
                    <Redirect to="/staff" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;
