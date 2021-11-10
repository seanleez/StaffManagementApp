// Allow us to create React components
import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';

class Menu extends Component {
    constructor(props) {
        // Supply this props to my super class
        super(props);
        this.state = {
            selectedDish: null
        };
    }

    onDishSelected(dish) {
        this.setState({ selectedDish : dish });   
    }

    // Return what will be displayed on this UI by this component
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelected(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay className="ml-5 col-10">
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    <DishDetail dish={this.state.selectedDish} />
                </div>
            </div>
        );
    }
}

// For import this component wherever we need in application
export default Menu;