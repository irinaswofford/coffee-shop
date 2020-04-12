

// open modal
import {
    UPDATE_INGREDIENT_LIST,
    UPDATE_DRINK_LIST,
    SET_RESTOCK,
    UPDATE_INGREDIENT
} from '../actions/action-types/coffeeShopTypes.js';



export const updateIngredientList = (newIngredientList) => {

    const payloadAction = {
        type: UPDATE_INGREDIENT_LIST,
        newIngredientList: newIngredientList || [],
    }

    return payloadAction
}

export const updateIngredient = (newIngredient) => {

    const payloadAction = {
        type: UPDATE_INGREDIENT,
        newIngredient: newIngredient || {},
    }

    return payloadAction
}

export const updateDrinkList = (newDrinkList, ingredientList = []) => {
 
    // init totalCostDrink
    if (typeof ingredientList !== "undefined" && ingredientList.length > 0) {
        // init totalCostDrink
        newDrinkList = newDrinkList.map((drink, index) => {
            let totalCostDrink = 0;
            drink.requiredIngredientUnits.forEach((requiredIngredient, index) => {
                let objIngredient = ingredientList.find((ingr) => (ingr.ingredientName || "").trim() === (requiredIngredient.name || "").trim()) || {};
                totalCostDrink += Number(objIngredient.costPerUnit) || 0;
            });
            drink["totalCostDrink"] = totalCostDrink;
            return drink;
        }); 
    }

    const payloadAction = {
        type: UPDATE_DRINK_LIST,
        newDrinkList: newDrinkList || [],
    }

    return payloadAction
}

export const setRestock = (isYesRestock) => {
    const payloadAction = {
        type: SET_RESTOCK,
        isYesRestock: isYesRestock || false,
    }

    return payloadAction
}
