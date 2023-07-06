import { useEffect, useState } from "react";
import { Format } from "../layout/dates";
import { GetPatchRead, SetPatchRead } from "./Data";

function Homepage(props) {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        GetPatchRead().then((bool) => {
            setShowModal(!bool);
        })
    }, [])

    const closeModal = () => {
        setShowModal(false);
        SetPatchRead();
    }

    const modalContents = (
        <div className='modal'>
            <div className='modal-main'>
                <h1>Release notes 05/07</h1>
                <div className='image-container'>
                    <img src='images/screenshot1.png' alt='screenshot1' />
                </div>
                <span>Added routine set placeholders so user can easily see what they did the last time they did an exercise.</span>
                <div className='image-container'>
                    <img src='images/screenshot2.png' alt='screenshot1' />
                </div>
                <span>Added multiple muscle groups to each exercise.</span>
                <div className='button-container'>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    )

    const modal = showModal ? modalContents : <></>; 

    return (
        <div>
            {modal}
            <div className="homepage content">
                <h1>{Format(new Date()).day}</h1>
            </div>
        </div>
    )
}

export default Homepage;