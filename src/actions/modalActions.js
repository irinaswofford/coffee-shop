// open modal
import { OPEN_MODAL, CLOSE_MODAL, REMOVE_ONCLOSEMODAL }
    from '../actions/action-types/modal-actionTypes.js';


export const openModal = (settings) => {
    let hasSettings = typeof settings !== "undefined" && settings !== null;

    const payloadAction = {
        type: OPEN_MODAL,
        isOpenModal: true,
        header: hasSettings ? (settings["header"] || "") : "",
        body: hasSettings ? (settings["body"] || "") : "",
        buttonLeft: hasSettings ? (settings["buttonLeft"] || "") : "",
        buttonRight: hasSettings ? (settings["buttonRight"] || "") : ""
    }

    return payloadAction
}

export const closeModal = (callback) => {

    const payloadAction = {
        type: CLOSE_MODAL,
        isOpenModal: false,
        onCloseModal: typeof callback === "function" ? callback : () => { }
    }

    return payloadAction;

    
}



// add cart action
export const removeOnCloseModal = () => {
    return {
        type: REMOVE_ONCLOSEMODAL
    }
}
