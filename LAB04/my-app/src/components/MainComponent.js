import React, { Component } from 'react';
import Menu from './MenuComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish : dishId });   
    }

    render() {
        return (
            <div className='App'>
                <Navbar dark color='primary'>
                    <div className='container'>
                        <NavbarBrand href='/'>Hello</NavbarBrand>
                    </div>
                </Navbar>
                {/* Menu component line 12 */}
                <Menu dishes={this.state.dishes} 
                    onClick={(dishId) => this.onDishSelect(dishId)}/>
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
            </div>
        );
    }
}

export default Main;
