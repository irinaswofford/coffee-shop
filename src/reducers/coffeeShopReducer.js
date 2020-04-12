
import {
    UPDATE_INGREDIENT_LIST,
    UPDATE_DRINK_LIST,
    SET_RESTOCK,
    UPDATE_INGREDIENT
} from '../actions/action-types/coffeeShopTypes.js';

// initialState
const initState = {
    ingredientList: [],
    drinkList: [],
    isYesRestock: false
}

const coffeeShopReducer = (state = initState, action) => {

    // 
    if (action.type === UPDATE_INGREDIENT_LIST) {
        return {
            ...state,
            ingredientList: action.newIngredientList
        }
    }
    else if (action.type === UPDATE_DRINK_LIST) {
        return {
            ...state,
            drinkList: action.newDrinkList
        }
    }
    else if (action.type === UPDATE_INGREDIENT) {

        // vals
        let ingredientName = (action.newIngredient.ingredientName || "").trim();

        // copies array
        let ingredientListCopy = [...state.ingredientList];

        // update 1 ingredient
        ingredientListCopy.forEach((item, index) => {
            if (item.ingredientName === ingredientName) {
                ingredientListCopy[index] = action.newIngredient;
            }   
        });

        return {
            ...state,
            ingredientList: ingredientListCopy
        }
    }
    else if (action.type === SET_RESTOCK) {
        return {
            ...state,
            isYesRestock: action.isYesRestock
        }
    }
    else {
        return state;
    }


}

export default coffeeShopReducer