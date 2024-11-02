import { Fragment } from "react"
import useModal from "../../context/Modal";

const Modal = () => {
    const {toggleModal , modalData} = useModal();

    return ReactDOM.createPortal(
        <Fragment>
            <h1 className="w-full">Modal data here</h1>
        </Fragment>,
    document.querySelector('#modal'))
}

export default Modal;