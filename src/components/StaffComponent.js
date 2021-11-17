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
            sortOrder: "nameAscending"
        }
        this.handleSortChange = this.handleSortChange.bind(this);
    }

    handleSortChange(e) {
        this.setState({ sortOrder: e.target.value });
    } 

    render() {
        var sortList = this.props.staffs.slice()
        if (this.state.sortOrder === "nameAscending") {
            sortList.sort((a,b) => (a.name.split(" ").at(-1) > b.name.split(" ").at(-1)) ? 1 : ((b.name.split(" ").at(-1) > a.name.split(" ").at(-1)) ? -1 : 0))
        } else {
            sortList.sort((a,b) => (a.name.split(" ").at(-1) < b.name.split(" ").at(-1)) ? 1 : ((b.name.split(" ").at(-1) < a.name.split(" ").at(-1)) ? -1 : 0))
        }
        const staffList = sortList.map((staff) => {
            return(
                <div key={staff.id} className="col-12 col-sm-4 col-lg-2 my-2 p-2">
                    <RenderStaffItem staff={staff}/>
                </div>
            )
        });
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-2">
                        <h3>Staff</h3>
                        <hr />
                    </div>                
                </div>
                <select onChange={this.handleSortChange}>
                    <option defaultValue hidden>Sort by</option>
                    <option value="nameAscending">Name: Ascending</option>
                    <option value="nameDescending">Name: Descending</option>
                </select>
                <div className="row">
                    {staffList}
                </div>
            </div>
        )
    }
}

export default StaffList