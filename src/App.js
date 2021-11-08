import React, { Component } from 'react';
import './App.css';
import StaffList from './components/StaffComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
import { STAFFS } from './shared/staffs';
import { OPTIONS } from './shared/options'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			staffs: STAFFS,
            responsiveCol: "col-12 col-md-6 col-lg-4"
		};
        this.handleChange = this.handleChange.bind(this);
	}

    handleChange(e) {
        this.setState({ responsiveCol: e.target.value });
    }
	render() {
		return (
			<div className="App">
				<Navbar dark color="primary">
					<div className="container">
						<NavbarBrand href="/">
							Staff Management Application v1.0
						</NavbarBrand>
					</div>
				</Navbar>
                <div className="container">
                    <select value={this.state.responsiveCol} onChange={this.handleChange}>
                        {OPTIONS.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
				<StaffList staffs={this.state.staffs} responsiveCol={this.state.responsiveCol} />
			</div>
		);
	}
}

export default App;
