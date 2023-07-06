import { useContext, useEffect, useState } from "react";
import { AuthContext, SetAuthContext } from "../auth/Auth";
import Version from "./Versions";
import { ResendToken, SetPatchRead } from "./Data";
import { useNavigate } from "react-router-dom";

function Patch() {
    const [showModal, setShowModal] = useState(false);
    const [currentPatch, setCurrentPatch] = useState(1.00);

    const navigate = useNavigate();

    const user = useContext(AuthContext).user();
    const patch = user.patch;
    const username = user.username;

    useEffect(() => {
        Object.keys(Version).reverse().forEach(version => {
            if (parseFloat(patch) < version) {
                setShowModal(true);
                setCurrentPatch(version);
            }
        }); 
    }, [patch])

    const closeModal = () => {
        setShowModal(false);
        SetPatchRead(currentPatch);
        ResendToken(username).then((jwt) => {
            SetAuthContext(jwt);
            navigate(0);
        })
    }

    const modalContents = (
        <div className='modal' onClick={closeModal}>
            <div className='modal-main'>
                {Version[currentPatch.toString()]}
                <div className='button-container'>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    )

    const modal = showModal ? modalContents : <></>;

    return (
        <>
            {modal}
        </>
    )
}

export default Patch;