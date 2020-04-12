import React from 'react';
import ingredientList from '../ingredientList';
import { Container, Row, Col } from 'react-bootstrap';
import { updateIngredientList, updateDrinkList } from '../actions/coffeShopActions';
import { connect } from 'react-redux';

class InventoryReadout extends React.Component {

    componentDidMount() {
        // call redux action updateIngredientList
        this.props.updateIngredientList(ingredientList);

    };

    render() {
        return (
            <div className="listStyle">

                <Container className="containerMenuUI">
                    <Row>
                        <Col sm="12" md="12" className="containerMenuUI_th">
                            Ingredient Inventory
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="4" md="4" className="containerMenuUI_th2">
                            Ingredient
                        </Col>
                        <Col sm="4" md="4" className="containerMenuUI_th2">
                            Cost Per Unit
                        </Col>
                        <Col sm="4" md="4" className="containerMenuUI_th2">
                            Units In Stock
                        </Col>
                    </Row>

                    {this.props.ingredientList.map((ingredient, index) =>
                        (<div key={index}>
                            <Row>
                                <Col sm="4" md="4" className="containerMenuUI_col2">
                                    <span>{ingredient.ingredientName}</span>
                                </Col>
                                <Col sm="4" md="4" className="containerMenuUI_col2">
                                    <span>${(ingredient.costPerUnit || 0).toFixed(2)}</span>
                                </Col>
                                <Col sm="4" md="4" className="containerMenuUI_col2">
                                    <span>{ingredient.unitsInStock}</span>
                                </Col>
                            </Row>
                        </div>))}

                    <Row>
                        <Col sm="12" md="12" className="containerMenuUI_tfoot_td">
                            &nbsp;
                        </Col>
                    </Row>
                </Container>
            </div>)
    }
}


const mapDispatchToProps = (dispatch) => {

    return {
        updateIngredientList: (newIngredientList) => {
            let payloadAction = updateIngredientList(newIngredientList);
            dispatch(payloadAction);
        },
        updateDrinkList: (newDrinkList) => {
            let payloadAction = updateDrinkList(newDrinkList);
            dispatch(payloadAction);
        }
    }
}


const mapStateToProps = (state) => {

    return {
        ingredientList: state.coffeeShopReducer.ingredientList,
        drinkList: state.coffeeShopReducer.drinkList
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryReadout)