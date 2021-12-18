import React, { Component } from 'react';
import { Card, CardImg, CardTitle,
    Label, Button, Col, Row,
    Modal, ModalHeader, ModalBody} from 'reactstrap';
import { Control, Form, Errors} from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const positiveValue = (val) => !(val) || (Number(val) > 0);
const isNumber = (val) => !(val) || !isNaN(Number(val));
const compareCurrentDate = (val) => {
    var currentDate = new Date();
    var val_parts = String(val).split('-');
    var val_date = new Date(val_parts[0], val_parts[1] - 1, val_parts[2]);
    return(!(val) || (currentDate.getTime() > val_date.getTime()))
}

class RenderStaffItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
        });
    }

    handleModifyStaff(values) {
        console.log(values);
        this.toggleModal();
        let departmentID
        switch (values.department) {
            case "Sale":
                departmentID = "Dept01";
                break;
            case "HR":
                departmentID = "Dept02";
                break;
            case "Marketing":
                departmentID = "Dept03";
                break;
            case "IT":
                departmentID = "Dept04";
                break;
            case "Finance":
                departmentID = "Dept05";
                break;
        }
        this.props.fetchUpdateStaffs(this.props.staff.id, values.name, values.doB, Number(values.salaryScale), values.startDate, departmentID , Number(values.annualLeave), Number(values.overTime))
    }

    render() {
        return(
            <React.Fragment>
                <div className='position-relative'>
                    <div className="buttonDelete">
                        <Button color="warning" onClick={this.toggleModal}>
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </Button>
                        <Button color="danger" onClick={() => this.props.handleDelete(this.props.staff.id)}>
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </Button>
                    </div>
                    <Link to={`/staff/${this.props.staff.id}`}>
                        <Card className="text-center">
                            <CardImg src={this.props.staff.image} alt={this.props.staff.name}/>
                            <CardTitle className="mt-2">{this.props.staff.name}</CardTitle>
                        </Card>
                    </Link>
                </div>
                <Modal
                    isOpen={this.state.isModalOpen}
                    toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Modify Staff
                    </ModalHeader>
                    <ModalBody>
                        <Form model='staffmodifyform' onSubmit={(values) => {this.handleModifyStaff(values)}}>
                            <Row className="form-group">
                                <Label htmlFor="name" xs={4} md={3}>Name:</Label>
                                <Col xs={8} md={9}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder={this.props.staff.name}
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
                                            required, compareCurrentDate
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".doB"
                                        show="touched"
                                        messages={{
                                            required: 'Day of birth should not be empty.',
                                            compareCurrentDate: ' Day of birth should be smaller than current day.'
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
                                    <Control.text model=".salaryScale" id="salaryScale" name="salaryScale"
                                        placeholder={this.props.staff.salaryScale}
                                        defaultValue=""
                                        className="form-control"
                                        validators={{
                                            required, positiveValue, isNumber
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".salaryScale"
                                        show="touched"
                                        messages={{
                                            required: ' Salary Scale should not be empty.',
                                            positiveValue: ' Salary Scale should be positive.',
                                            isNumber : ' Salary Scale should be a number'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="annualLeave" xs={4} md={3}>Annual Leave:</Label>
                                <Col xs={8} md={9}>
                                    <Control.text model=".annualLeave" id="annualLeave" name="annualLeave"
                                        placeholder={this.props.staff.annualLeave}
                                        defaultValue=""
                                        className="form-control"
                                        validators={{
                                            required, positiveValue, isNumber
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".annualLeave"
                                        show="touched"
                                        messages={{
                                            required: ' Annual Leave should not be empty.',
                                            positiveValue: ' Salary Scale should be positive.',
                                            isNumber : ' Salary Scale should be a number'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="overTime" xs={4} md={3}>Over Time:</Label>
                                <Col xs={8} md={9}>
                                    <Control.text model=".overTime" id="overTime" name="overTime"
                                        placeholder={this.props.staff.overTime}
                                        defaultValue=""
                                        className="form-control"
                                        validators={{
                                            required, positiveValue, isNumber
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".overTime"
                                        show="touched"
                                        messages={{
                                            required: ' Over Time should not be empty.',
                                            positiveValue: ' Salary Scale should be positive.',
                                            isNumber : ' Salary Scale should be a number.'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group w-25 mx-auto my-1">
                                <Button type="submit" value="submit" color="primary">
                                    <b>MODIFY STAFF</b>
                                </Button>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

export default RenderStaffItem;