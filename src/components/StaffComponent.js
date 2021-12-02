import React, { Component } from 'react';
import { Card, CardImg, CardTitle,
    Form, FormGroup, FormFeedback,
    Label, Input, Button, Col,
    Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Link } from 'react-router-dom';
import { STAFFS } from '../shared/staffs';

function RenderStaffItem({ staff }) {
    return (
        <Link to={`/staff/${staff.id}`}>
            <Card className="text-center">
                <CardImg src={staff.image} />
                <CardTitle className="mt-2">{staff.name}</CardTitle>
            </Card>
        </Link>
    );
}

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortOrder: 'nameAscending',
            findStaffName: '',
            isModalOpen: false,
            name: '',
            doB: '',
            startDate: '',
            department: '',
            salaryScale: '',
            annualLeave: '',
            overTime: '',
            salary: '',
            touched: {
                name: false,
                doB: false,
                startDate: false,
                department: false,
                salaryScale: false,
                annualLeave: false,
                overTime: false,
                salary: false
            },
        };
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        // toggleModal
        this.toggleModal = this.toggleModal.bind(this);
        // Controlled Form
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddStaff = this.handleAddStaff.bind(this);
        // Validate Form
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleSortChange(e) {
        this.setState({ sortOrder: e.target.value });
    }

    handleSearch(event) {
        this.setState({
            findStaffName: this.findstaff.value,
        });
        event.preventDefault();
    }

    // ToggleModal
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }
    // Controlled Form :
    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        event.preventDefault();
    }

    handleAddStaff(event) {
        const newStaff = {
            id: STAFFS.length,
            name: this.state.name,
            doB: this.state.doB,
            salaryScale: this.state.salaryScale,
            startDate: this.state.startDate,
            department: this.state.department,
            annualLeave: this.state.annualLeave,
            overTime: this.state.overTime,
            salary: this.state.salary,
            image: '../assets/images/HarryPotter.jpg',
        };
        STAFFS.push(newStaff);
        event.preventDefault();
    }

    // Validate Form
    handleBlur = (field) => (event) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    };

    validate(name, doB, startDate, department, salaryScale, annualLeave, overTime, salary) {
        const errors = {
            name: '',
            doB: '',
            startDate: '',
            department: '',
            salaryScale: '',
            annualLeave: '',
            overTime: '',
            salary: ''
        };

        if (this.state.touched.name && name.length < 3) {
            errors.name = 'Name should be >= 3 characters';
        } else if (this.state.touched.name && name.length > 20) {
            errors.name = 'Name should be <= 20 characters';
        }

        var currentDate = new Date();
        var doB_parts = doB.split('-');
        var doB_object = new Date(doB_parts[0], doB_parts[1] - 1, doB_parts[2]);
        if (this.state.touched.doB) {
            if (doB.length === 0) {
                errors.doB = 'Day of Birth should not be empty';
            }
            // } else if ((currentDate.getFullYear() - doB_object.getFullYear() < 18) || (currentDate.getFullYear() - doB_object.getFullYear() > 99)) {
            //     errors.doB = 'Age of Staff should be > 18 and < 99';
            // }
        }

        var startdate_parts = startDate.split('-');
        var startdate_object = new Date(startdate_parts[0], startdate_parts[1] - 1, startdate_parts[2]);
        if (this.state.touched.startDate) {
            if (startDate.length === 0) {
                errors.startDate = 'Start Day should not be empty';
            } else if (startdate_object.getTime() > currentDate.getTime()) {
                errors.startDate = 'Start Day should be smaller than Current Day';
            }
        }

        if (this.state.touched.department && department.length === 0) {
            errors.department = 'Choose one from above departments';
        }

        if (this.state.touched.salaryScale && salaryScale.length === 0) {
            errors.salaryScale = 'Salary Scale should not be empty';
        } else if (this.state.touched.salaryScale && Number(salaryScale) <= 0) {
            errors.salaryScale = 'Salary Scale should be positive';
        }

        if (this.state.touched.annualLeave && annualLeave.length === 0) {
            errors.annualLeave = 'Annual Leave should not be empty';
        } else if (this.state.touched.annualLeave && Number(annualLeave) <= 0) {
            errors.annualLeave = 'Annual Leave should be positive';
        }

        if (this.state.touched.overTime && overTime.length === 0) {
            errors.overTime = 'Over Time should not be empty';
        } else if (this.state.touched.overTime && Number(overTime) <= 0) {
            errors.overTime = 'Over Time should be positive';
        }

        if (this.state.touched.salary && salary.length === 0) {
            errors.salary = 'Salary should not be empty';
        } else if (this.state.touched.salary && Number(salary) <= 0) {
            errors.salary = 'Salary should be positive';
        }

        return errors;
    }

    render() {
        const errors = this.validate(
            this.state.name,
            this.state.doB,
            this.state.startDate,
            this.state.department,
            this.state.salaryScale,
            this.state.annualLeave,
            this.state.overTime,
            this.state.salary
        );
        var sortList = this.props.staffs.slice();
        if (this.state.sortOrder === 'nameAscending') {
            sortList.sort((a, b) => {
                return a.name.split(' ').at(-1).localeCompare(b.name.split(' ').at(-1), 'vi');
            });
        } else {
            sortList.sort((a, b) => {
                return b.name.split(' ').at(-1).localeCompare(a.name.split(' ').at(-1), 'vi');
            });
        }

        if (this.state.findStaffName !== '') {
            sortList = sortList.filter((staff) =>
                staff.name.toLowerCase().includes(this.state.findStaffName.toLowerCase())
            );
        }

        const staffList = sortList.map((staff) => {
            return (
                <div
                    key={staff.id}
                    className="col-6 col-sm-4 col-lg-2 my-2 p-2">
                    <RenderStaffItem staff={staff} />
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row height-60"></div>
                <div className="row">
                    <div className="col-12 mt-2">
                        <h3>Staff</h3>
                        <hr />
                    </div>
                </div>
                <div className="row d-flex align-items-center">
                    <div className="col-12 col-sm-12 col-lg-4 d-flex align-items-center">
                        <span>
                            <i>SortStaff: </i>
                        </span>
                        <select
                            onChange={this.handleSortChange}
                            className="mx-2">
                            <option defaultValue hidden>
                                Sort by
                            </option>
                            <option value="nameAscending">
                                Name: Ascending
                            </option>
                            <option value="nameDescending">
                                Name: Descending
                            </option>
                        </select>
                    </div>
                    <div className="col-12 col-sm-8 col-lg-5 my-2">
                        <Form onSubmit={this.handleSearch} className="w-100">
                            <FormGroup>
                                <Label htmlFor="findstaff">
                                    <i>FindStaff:</i>
                                </Label>
                                <Input
                                    type="text"
                                    id="findstaff"
                                    name="findstaff"
                                    className="d-inline-block mx-2"
                                    innerRef={(input) =>
                                        (this.findstaff = input)
                                    }
                                />
                                <Button
                                    type="submit"
                                    value="submit"
                                    color="primary"
                                    className="px-2 mb-1">
                                    <span className="fa fa-search fa-lg"></span>
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className="col-12 col-sm-4 col-lg-3 justifycontentend">
                        <Button
                            onClick={this.toggleModal}
                            color="danger"
                            className="mb-1 mx-2">
                            <span className="fa fa-plus fa-lg"></span>{' '}
                            <b>ADD STAFF</b>
                        </Button>
                    </div>
                </div>

                {/* ADD STAFF MODAL */}

                <Modal
                    isOpen={this.state.isModalOpen}
                    toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Add Staff
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleAddStaff}>
                            <FormGroup>
                                <Label htmlFor="name" xs={3}>
                                    Name:
                                </Label>
                                <Col
                                    xs={9}
                                    className="d-inline-block align-top">
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-100"
                                        placeholder="name"
                                        value={this.state.name}
                                        valid={errors.name === ''}
                                        invalid={errors.name !== ''}
                                        onBlur={this.handleBlur('name')}
                                        onChange={
                                            this.handleInputChange
                                        }></Input>
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="doB" xs={3}>
                                    Day of Birth:
                                </Label>
                                <Col
                                    xs={9}
                                    className="d-inline-block align-top">
                                    <Input
                                        type="date"
                                        id="doB"
                                        name="doB"
                                        className="w-100"
                                        value={this.state.doB}
                                        valid={errors.doB === ''}
                                        invalid={errors.doB !== ''}
                                        onBlur={this.handleBlur('doB')}
                                        onChange={
                                            this.handleInputChange
                                        }></Input>
                                    <FormFeedback>{errors.doB}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="startDate" xs={3}>
                                    Start Date:
                                </Label>
                                <Col
                                    xs={9}
                                    className="d-inline-block align-top">
                                    <Input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        className="w-100"
                                        value={this.state.startDate}
                                        valid={errors.startDate === ''}
                                        invalid={errors.startDate !== ''}
                                        onBlur={this.handleBlur('startDate')}
                                        onChange={
                                            this.handleInputChange
                                        }></Input>
                                    <FormFeedback>
                                        {errors.startDate}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="department" xs={3}>
                                    Deparment:
                                </Label>
                                <Col
                                    xs={9}
                                    className="d-inline-block align-top">
                                    <Input
                                        type="select"
                                        id="department"
                                        name="department"
                                        className="form-select"
                                        value={this.state.department}
                                        valid={errors.department === ''}
                                        invalid={errors.department !== ''}
                                        onBlur={this.handleBlur('department')}
                                        onChange={this.handleInputChange}>
                                        <option defaultValue hidden>--Department--</option>
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                        <option>Finance</option>
                                    </Input>
                                    <FormFeedback>
                                        {errors.department}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="salaryScale" xs={3}>
                                    Salary Scale:
                                </Label>
                                <Col
                                    xs={9}
                                    className="d-inline-block align-top">
                                    <Input
                                        type="number"
                                        id="salaryScale"
                                        name="salaryScale"
                                        className="w-100"
                                        placeholder="salaryScale"
                                        valid={errors.salaryScale === ''}
                                        invalid={errors.salaryScale !== ''}
                                        onBlur={this.handleBlur('salaryScale')}
                                        value={this.state.salaryScale}
                                        onChange={
                                            this.handleInputChange
                                        }></Input>
                                    <FormFeedback>
                                        {errors.salaryScale}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="annualLeave" xs={3}>
                                    Annual Leave:
                                </Label>
                                <Col
                                    xs={9}
                                    className="d-inline-block align-top">
                                    <Input
                                        type="number"
                                        id="annualLeave"
                                        name="annualLeave"
                                        className="w-100"
                                        placeholder="annualLeave"
                                        valid={errors.annualLeave === ''}
                                        invalid={errors.annualLeave !== ''}
                                        onBlur={this.handleBlur('annualLeave')}
                                        value={this.state.annualLeave}
                                        onChange={
                                            this.handleInputChange
                                        }></Input>
                                    <FormFeedback>
                                        {errors.annualLeave}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="overTime" xs={3}>
                                    Over Time:
                                </Label>
                                <Col
                                    xs={9}
                                    className="d-inline-block align-top">
                                    <Input
                                        type="number"
                                        id="overTime"
                                        name="overTime"
                                        className="w-100"
                                        placeholder="overTime"
                                        valid={errors.overTime === ''}
                                        invalid={errors.overTime !== ''}
                                        onBlur={this.handleBlur('overTime')}
                                        value={this.state.overTime}
                                        onChange={
                                            this.handleInputChange
                                        }></Input>
                                    <FormFeedback>
                                        {errors.overTime}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="salary" xs={3}>
                                    Salary(VND):
                                </Label>
                                <Col
                                    xs={9}
                                    className="d-inline-block align-top">
                                    <Input
                                        type="number"
                                        id="salary"
                                        min="500000"
                                        step="100000"
                                        name="salary"
                                        className="w-100"
                                        placeholder="salary"
                                        valid={errors.salary === ''}
                                        invalid={errors.salary !== ''}
                                        onBlur={this.handleBlur('salary')}
                                        value={this.state.salary}
                                        onChange={
                                            this.handleInputChange
                                        }></Input>
                                    <FormFeedback>
                                        {errors.salary}
                                    </FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Button
                                    type="submit"
                                    value="submit"
                                    color="primary">
                                    Add Staff
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
                <hr />
                <div className="row">{staffList}</div>
            </div>
        );
    }
}

export default StaffList;
