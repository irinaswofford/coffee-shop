
import { OPEN_MODAL, CLOSE_MODAL, ADD_TO_CART, REMOVE_ONCLOSEMODAL } from '../actions/action-types/modal-actionTypes.js';
import drinkList from '../drinkList';

const initState = {
    drinkList: drinkList,
    addedItems: [],
    total: 0,
    modal: {
        isOpenModal: false,
        productId: "",
        modalId: "modal1",
        header: "",
        body: "",
        footer: "",
        // modal events
        onOpenModal: null,
        onCloseModal: null,
        // buttons
        buttonLeft: null,
        buttonRight: null,
    }
}


const modalReducer = (state = initState, action) => {

    //INSIDE HOME COMPONENT
    if (action.type === OPEN_MODAL) {

        return {
            ...state,
            modal: {
                ...state.modal,
                isOpenModal: action.isOpenModal,
                modalId: action.modalId,
                header: action.header,
                body: action.body,
                buttonLeft: action.buttonLeft,
                buttonRight: action.buttonRight
            }
        }
    }
    else if (action.type === CLOSE_MODAL) {
        return {
            ...state,
            modal: {
                ...state.modal,
                isOpenModal: action.isOpenModal,
                onCloseModal: action.onCloseModal
            }
        }
    }
    else if (action.type === REMOVE_ONCLOSEMODAL) {
        return {
            ...state,
            modal: {
                ...state.modal,
                onCloseModal: null
            }
        }
    }
    else if (action.type === ADD_TO_CART) {
        //debugger
        //in array called item you find item ..
        let addedItem = state.items.find(item => item.id === action.id)
        //check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => action.id === item.id)
        if (existed_item) {
            //means+= if was 5 you added 1 more
            addedItem.quantity += 1
            return {
                ...state,
                total: state.total + addedItem.price
            }
        }
        else {
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price

            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }

        }
    }
    else {
        return state;
    }
    /*     else if (action.type === REMOVE_ITEM) {
            let itemToRemove = state.addedItems.find(item => action.id === item.id)
            let new_items = state.addedItems.filter(item => action.id !== item.id)
    
            //calculating the total
            let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
            console.log(itemToRemove)
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }  */

}

export default modalReducer