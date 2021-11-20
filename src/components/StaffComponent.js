import React, { Component } from 'react';
import { Card, CardImg, CardTitle } from 'reactstrap'
import { Link } from 'react-router-dom';

function RenderStaffItem({staff}) {
    return(
        <Link to={`/staff/${staff.id}`} >
            <Card className="text-center">
                <CardImg src={staff.image}/>
                <CardTitle className="mt-2">{staff.name}</CardTitle>
            </Card>
        </Link>
    )
}

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortOrder: "nameAscending",
            findStaffName: "all"
        }
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    handleSortChange(e) {
        this.setState({ sortOrder: e.target.value });
    } 

    handleChangeInput(e) {
        this.setState({ findStaffName : e.target.value });
    }

    render() {
        var sortList = this.props.staffs.slice()
        if (this.state.sortOrder === "nameAscending") {
            sortList.sort((a,b) => { return a.name.split(" ").at(-1).localeCompare(b.name.split(" ").at(-1), 'vi')});
        } else {
            sortList.sort((a,b) => { return b.name.split(" ").at(-1).localeCompare(a.name.split(" ").at(-1), 'vi')});
        }

        if (this.state.findStaffName !== "all") {
            sortList = sortList.filter((staff) => staff.name.toLowerCase().includes(this.state.findStaffName.toLowerCase()))
        }

        const staffList = sortList.map((staff) => {
            return(
                <div key={staff.id} className="col-6 col-sm-4 col-lg-2 my-2 p-2">
                    <RenderStaffItem staff={staff}/>
                </div>
            )
        });

        return(
            <div className="container">
                <div className="row height-60"></div>
                <div className="row">
                    <div className="col-12 mt-2">
                        <h3>Staff</h3>
                        <hr />  
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 d-flex align-items-center">
                        <span><i>SortStaff: </i></span>
                        <select onChange={this.handleSortChange} className="mx-2">
                            <option defaultValue hidden>Sort by</option>
                            <option value="nameAscending">Name: Ascending</option>
                            <option value="nameDescending">Name: Descending</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6 d-flex align-items-center justifycontentend">
                        <span><i>FindStaff: </i></span>
                        <input onChange={this.handleChangeInput} className="mx-1" width="100"/>
                        <button onChange={this.handleChangeInput} className="btn btn-secondary"><i className="fa fa-search fa-lg"></i></button>
                    </div>
                </div>
                <hr />
                <div className="row">
                    {staffList}
                </div>
            </div>
        )
    }
}

export default StaffList