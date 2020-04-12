import React from 'react';
import ingredientList from '../ingredientList';
import drinkList from '../drinkList';
import { Container, Row, Col } from 'react-bootstrap';
import MaterialIcon from 'material-icons-react';
import { connect } from 'react-redux';
import { updateIngredientList, updateDrinkList, updateIngredient, setRestock } from '../actions/coffeShopActions';
import ModalDrinks from './ModalDrinks';
import { openModal, closeModal } from '../actions/modalActions';


class MenuUi extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    };

    componentDidMount() {
        //console.log(ingredientList);
        // call redux action updateDrinkList
        this.props.updateDrinkList(drinkList, ingredientList || this.props.ingredientList);
    };





    handleClick(drink) {
        // un-pack drink
        //let drinkId = (String(drink["drinkId"]) || "").trim(); // safe trim
        let drinkName = (drink["drinkName"] || "").trim();
        let requiredIngredientUnits = drink["requiredIngredientUnits"] || [];

        // vals
        var weCanMakeTheDrink = true;
        let missingIngredients = [];
        let errorMessage = `Sorry, cannot buy ${drinkName}!\nWould you like us to re-stock ingredients:`;

        // process drink, based on needed/actual ingredients
        requiredIngredientUnits.forEach((requiredIngredientUnit, index) => {

            // needed ingredients
            let requiredIngredientName = (requiredIngredientUnit["name"] || "").trim();
            let requiredUnits = Number(requiredIngredientUnit["units"]) || 0;

            // actual ingredients
            let objIngredient = this.props.ingredientList.find((ingredient) => (ingredient.ingredientName || "").trim() === requiredIngredientName) || {};
            let actualUnitsInStock = Number(objIngredient.unitsInStock) || 0;

            // validation- do we have enough ingredient to make the drink?
            let hasEnoughUnits = actualUnitsInStock >= requiredUnits;

            // if cannot make drink due to lack of ingredients
            if (!hasEnoughUnits) {
                weCanMakeTheDrink = false;
                missingIngredients.push(objIngredient);
                errorMessage += `\n${objIngredient.ingredientName}`;
            }
        });

        // YES, we can make the drink!
        if (weCanMakeTheDrink) {

            // update unitsInStock for ingredients (subtract used units from current used)
            let totalCostDrink = 0;
            requiredIngredientUnits.forEach((usedIngredient, index) => {
                // used ingredients
                let usedIngredientName = (usedIngredient["name"] || "").trim();
                let usedUnits = Number(usedIngredient["units"]) || 0;

                // subtract used units from current units
                let objUsedIngredient = this.props.ingredientList.find((ingredient) => (ingredient.ingredientName || "").trim() === usedIngredientName) || {};
                objUsedIngredient.unitsInStock = (Number(objUsedIngredient.unitsInStock) || 0) - usedUnits;

                // totalCostDrink
                totalCostDrink += objUsedIngredient.costPerUnit || 0;

                // call redux action updateIngredient
                this.props.updateIngredient(objUsedIngredient);
            });

            // success modal
            setTimeout(() => {
                this.props.openModal({
                    header: <span style={{ color: "green" }}>Success!</span>,
                    body: <span>You bought 1 {drinkName} for ${(totalCostDrink || 0).toFixed(2)}</span>,
                    buttonLeft: <button onClick={e => this.props.closeModal()}>Dismiss</button>
                });
            }, 100)
        }

        // NO we cannot make the drink!
        else if (!weCanMakeTheDrink) {

            // creates line breaks
            errorMessage = errorMessage.split('\n').map((item, i) => {
                return <p key={i}>{item}</p>;
            });

            // confirm modal re-stock ingredients
            this.props.openModal({
                header: <span style={{ color: "darkred" }}>Re-Stock Ingredients?</span>,
                body: errorMessage,
                buttonLeft: <button onClick={e => {
                    this.props.setRestock(false); // call redux action setRestock
                    this.props.closeModal(); // call redux action closeModal
                }}
                >Cancel</button>,
                buttonRight: <button onClick={e => {

                    // vals
                    let messageRestockSuccess = "";

                    // process missing ingredients
                    missingIngredients.forEach((missingIngredient, index) => {
                        // un-pack
                        let missingIngredientName = (missingIngredient.ingredientName || "").trim();

                        // refresh unitsInStock
                        missingIngredient.unitsInStock = 40;

                        // call redux action updateIngredient
                        this.props.updateIngredient(missingIngredient);

                        messageRestockSuccess += `re-stocked ${missingIngredient.unitsInStock} units of ${missingIngredientName}\n`;
                    });




                    this.props.setRestock(true); // call redux action setRestock
                    this.props.closeModal(); // call redux action closeModal

                    // creates line breaks
                    messageRestockSuccess = messageRestockSuccess.split('\n').map((item, i) => {
                        return <p key={i}>{item}</p>;
                    });

                    // show restock success alert
                    setTimeout(() => {
                        this.props.openModal({
                            header: <span style={{ color: "green" }}>Success!</span>,
                            body: <span>{messageRestockSuccess}</span>,
                            buttonLeft: <button onClick={e => this.props.closeModal()}>Dismiss</button>
                        });
                    }, 400)


                }}>Yes Restock</button>
            });


        }
    }

    render() {
        return (
            <div>


                <Container className="containerMenuUI">
                    <Row>

                        <Col sm="12" md="12" className="containerMenuUI_th">
                            Coffee Shop Drink Menu
                        </Col>
                    </Row>

                    <Row>
                        <Col sm="1" md="1" className="containerMenuUI_th1">
                            &nbsp;
                        </Col>
                        <Col sm="7" md="7" className="containerMenuUI_th1">
                            Drink
                        </Col>
                        <Col sm="4" md="4" className="containerMenuUI_th1">
                            Price
                        </Col>
                    </Row>

                    {this.props.drinkList.map((drink, index) =>
                        (<div key={index}>
                            <Row>
                                <Col sm="1" md="1" className="containerMenuUI_col">
                                    <span className="btn-floating halfway-fab waves-effect waves-light" onClick={(event) => { this.handleClick(drink) }}>
                                        <MaterialIcon icon="add" />
                                    </span>
                                </Col>

                                <Col sm="7" md="7" className="containerMenuUI_col">
                                    <div className="drinkName" onClick={(event) => { this.handleClick(drink) }}>
                                        {drink["drinkName"] || ""}
                                    </div>
                                </Col>

                                <Col sm="4" md="4" className="containerMenuUI_col">
                                    ${(drink["totalCostDrink"] || 0).toFixed(2)}
                                </Col>
                            </Row>
                        </div>))}
                    <Row>
                        <Col sm="12" md="12" className="containerMenuUI_tfoot_td">
                            &nbsp;
                        </Col>
                    </Row>
                </Container>


                <ModalDrinks />
            </div>)
    }
}


const mapDispatchToProps = (dispatch) => {

    return {
        updateIngredientList: (newIngredientList) => {
            let payloadAction = updateIngredientList(newIngredientList);
            dispatch(payloadAction);
        },
        updateDrinkList: (newDrinkList, ingredientList) => {
            let payloadAction = updateDrinkList(newDrinkList, ingredientList);
            dispatch(payloadAction);
        },
        updateIngredient: (ingredient) => {
            let payloadAction = updateIngredient(ingredient);
            dispatch(payloadAction);
        },
        setRestock: (isYesRestock) => {
            let payloadAction = setRestock(isYesRestock);
            dispatch(payloadAction);
        },

        // modal controls
        openModal: (settings) => { dispatch(openModal(settings)) },
        closeModal: (callback) => { dispatch(closeModal(callback)) }
    }
}


const mapStateToProps = (state) => {
    return {
        ingredientList: state.coffeeShopReducer.ingredientList,
        drinkList: state.coffeeShopReducer.drinkList,
        isYesRestock: state.coffeeShopReducer.isYesRestock
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuUi)