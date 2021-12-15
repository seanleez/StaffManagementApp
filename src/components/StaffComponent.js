import React, { Component } from 'react';
import { Card, CardImg, CardTitle,
    Label, Button, Col, Row,
    Input,Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, Form, Errors} from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

function RenderStaffItem({ staff }) {
    return (
        <Link to={`/staff/${staff.id}`}>
            <Card className="text-center">
                <CardImg src={staff.image} alt={staff.name}/>
                <CardTitle className="mt-2">{staff.name}</CardTitle>
            </Card>
        </Link>
    );
}

// For validate form purpose
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const positiveNumber = (val) => !(val) || (val > 0)
const compareAge = (val) => {
    var currentDate = new Date();
    var val_parts = String(val).split('-');
    var val_date = new Date(val_parts[0], val_parts[1] - 1, val_parts[2]);
    return(!(val) || (currentDate.getFullYear() - val_date.getFullYear() > 0))
}
const compareCurrentDate = (val) => {
    var currentDate = new Date();
    var val_parts = String(val).split('-');
    var val_date = new Date(val_parts[0], val_parts[1] - 1, val_parts[2]);
    return(!(val) || (currentDate.getTime() > val_date.getTime()))
}

class StaffList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortOrder: 'nameAscending',
            findStaffName: '',
            isModalOpen: false
        };
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleSortList = this.handleSortList.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        // toggleModal
        this.toggleModal = this.toggleModal.bind(this);
        // Controlled Form
        this.handleAddStaff = this.handleAddStaff.bind(this);
        // Validate Form
    }

    handleSortChange(e) {
        this.setState({ sortOrder: e.target.value });
    }

    handleSortList(sortList) {
        if (this.state.sortOrder === 'nameAscending') {
            return (
                sortList.sort((a, b) => {
                    return a.name.split(' ').at(-1).localeCompare(b.name.split(' ').at(-1), 'vi');
                })
            )
        } else {
            return(
                sortList.sort((a, b) => {
                    return b.name.split(' ').at(-1).localeCompare(a.name.split(' ').at(-1), 'vi');
                })
            )
        }
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

    // Button AddStaff => submit new staff's infor
    handleAddStaff(values) {
        this.toggleModal();
        this.props.addStaff(this.props.staffs.staffs.length, values.name, values.doB, Number(values.salaryScale), values.startDate, values.department, Number(values.annualLeave), Number(values.overTime), values.image);
        console.log(values);
        this.props.resetStaffInforForm();
    }

    render() {
        var sortList = this.handleSortList(this.props.staffs.staffs.slice());

        // Find Staff
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

        if (this.props.staffs.isLoading) {
            return(
                <div className="container">
                    <div className="row height-60"></div>
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        } else if (this.props.staffs.errMess) {
            return(
                <div className="container">
                    <div className="row height-60"></div>
                    <div className="row">
                        <div className="col-12">
                            <h3>{this.props.staffs.errMess}</h3>
                        </div>
                    </div>
                </div>
            )
        } else {
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
                                <i>SortStaff:</i>
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
                        
                        <div className="col-12 col-sm-12 col-lg-4 my-2">
                            <div>
                                <Label htmlFor="findstaff">
                                    <i>FindStaff:</i>
                                </Label>
                                <div className='d-inline-block'>
                                    <Input
                                        type="text"
                                        id="findstaff"
                                        name="findstaff"
                                        className="w-75 d-inline-block mx-1"
                                        innerRef={(input) =>
                                            (this.findstaff = input)
                                        }
                                    />
                                    <Button type="button" value="button" color="primary"
                                        className="px-2 mb-1 mx-2"
                                        onClick={this.handleSearch}>
                                        <span className="fa fa-search fa-lg"></span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-12 col-lg-4 d-flex justifycontentend">
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
                            <Form model='staffinfor' onSubmit={(values) => {this.handleAddStaff(values)}}>
                                <Row className="form-group">
                                    <Label htmlFor="name" xs={4} md={3}>Name:</Label>
                                    <Col xs={8} md={9}>
                                        <Control.text model=".name" id="name" name="name"
                                            defaultValue=""
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(20)
                                            }} />
                                        <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                required: 'Name should not be empty.',
                                                minLength: ' Name must be greater than 2 characters.',
                                                maxLength: ' Name must be less than 20 characters.'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="doB" xs={4} md={3}>Day of Birth:</Label>
                                    <Col xs={8} md={9}>
                                        <Control type="date" model=".doB" id="doB" name="doB" 
                                            defaultValue=""
                                            className="form-control"
                                            validators={{
                                                required, compareAge
                                            }} />
                                        <Errors
                                            className="text-danger"
                                            model=".doB"
                                            show="touched"
                                            messages={{
                                                required: 'Day of birth should not be empty.',
                                                compareAge: ' Age of Staff should be > 18.'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="startDate" xs={4} md={3}>Start Date:</Label>
                                    <Col xs={8} md={9}>
                                        <Control type="date" model=".startDate" id="startDate" name="startDate" 
                                            defaultValue=""
                                            className="form-control"
                                            validators={{
                                                required, compareCurrentDate
                                            }} />
                                        <Errors
                                            className="text-danger"
                                            model=".startDate"
                                            show="touched"
                                            messages={{
                                                required: 'Start Day should not be empty.',
                                                compareCurrentDate: 'Start Day should be smaller than Current Day.'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="department" xs={4} md={3}>Department:</Label>
                                    <Col xs={8} md={9}>
                                        <Control.select model=".department" id="department" name="department"
                                            className="form-select"
                                            validators={{
                                                required
                                            }} >
                                            <option defaultValue hidden>--Department--</option>
                                            <option>Sale</option>
                                            <option>HR</option>
                                            <option>Marketing</option>
                                            <option>IT</option>
                                            <option>Finance</option>
                                        </Control.select>
                                        <Errors
                                            className="text-danger"
                                            model=".department"
                                            show="touched"
                                            messages={{
                                                required: 'Please choose one from departments above.',
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="salaryScale" xs={4} md={3}>Salary Scale:</Label>
                                    <Col xs={8} md={9}>
                                        <Control type="number" model=".salaryScale" id="salaryScale" name="salaryScale"
                                            defaultValue=""
                                            className="form-control"
                                            validators={{
                                                required, positiveNumber
                                            }} />
                                        <Errors
                                            className="text-danger"
                                            model=".salaryScale"
                                            show="touched"
                                            messages={{
                                                required: 'Salary Scale should not be empty.',
                                                positiveNumber: 'Salary Scale should be positive.'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="annualLeave" xs={4} md={3}>Annual Leave:</Label>
                                    <Col xs={8} md={9}>
                                        <Control type="number" model=".annualLeave" id="annualLeave" name="annualLeave"
                                            defaultValue=""
                                            className="form-control"
                                            validators={{
                                                required, positiveNumber
                                            }} />
                                        <Errors
                                            className="text-danger"
                                            model=".annualLeave"
                                            show="touched"
                                            messages={{
                                                required: 'Annual Leave should not be empty.',
                                                positiveNumber: 'Annual Leave should be positive.'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="overTime" xs={4} md={3}>Over Time:</Label>
                                    <Col xs={8} md={9}>
                                        <Control type="number" model=".overTime" id="overTime" name="overTime"
                                            defaultValue=""
                                            className="form-control"
                                            validators={{
                                                required, positiveNumber
                                            }} />
                                        <Errors
                                            className="text-danger"
                                            model=".overTime"
                                            show="touched"
                                            messages={{
                                                required: 'Over Time should not be empty.',
                                                positiveNumber: 'Over Time should be positive.'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="salary" xs={4} md={3}>Salary(VND):</Label>
                                    <Col xs={8} md={9}>
                                        <Control type="number" model=".salary" id="salary" name="salary"
                                            defaultValue=""
                                            min={500000}
                                            step={100000}
                                            className="form-control"
                                            validators={{
                                                required, positiveNumber
                                            }} />
                                        <Errors
                                            className="text-danger"
                                            model=".salary"
                                            show="touched"
                                            messages={{
                                                required: 'Salary should not be empty.',
                                                positiveNumber: 'Salary should be positive.'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group w-25 mx-auto my-1">
                                    <Button type="submit" value="submit" color="primary">
                                        <b>ADD STAFF</b>
                                    </Button>
                                </Row>
                            </Form>
                        </ModalBody>
                    </Modal>
                    <hr />
                    <h5>Number of Staff(s): {staffList.length}</h5>
                    <div className="row">{staffList}</div>
                </div>
            );
        }
    }
}

export default StaffList;
