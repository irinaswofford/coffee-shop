
import React from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from 'react-redux';
import { openModal, closeModal, removeOnCloseModal } from '../actions/modalActions';


class ModalDrinks extends React.Component {

    constructor(props) {
        super(props)
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    onCloseModal() {
        if (typeof this.props.onCloseModal === "function") {
            this.props.onCloseModal(); // call it...
            this.props.removeOnCloseModal(); // ...than kill it (self-removing)
        }
    }

    render() {
        return (
            <div>
                <Modal show={this.props.isOpenModal}
                    onEnter={this.props.onOpenModal}
                    onExit={typeof this.props.onCloseModal === "function" ? this.onCloseModal() : () => { }}>

                    <Modal.Header>
                        <Modal.Title>
                            {this.props.modal.header}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.props.modal.body}
                    </Modal.Body>

                    <Modal.Footer>

                        {this.props.modal.buttonLeft !== null ? this.props.modal.buttonLeft : <button onClick={e => this.props.closeModal()}>Cancel</button>}
                        {this.props.modal.buttonRight !== null ? this.props.modal.buttonRight : <button onClick={e => this.props.closeModal()}>Save</button>}

                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

} // end class


const mapDispatchToProps = (dispatch) => {

    return {
        // modal controls
        openModal: () => { dispatch(openModal()) },
        closeModal: () => { dispatch(closeModal()) },
        removeOnCloseModal: () => { dispatch(removeOnCloseModal()) }
    }
}

const mapStateToProps = (state) => {
    return {
        isOpenModal: state.modalReducer.modal.isOpenModal,
        modal: state.modalReducer.modal,
        // modal events
        onOpenModal: state.modalReducer.modal.onOpenModal,
        onCloseModal: state.modalReducer.modal.onCloseModal
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalDrinks)



