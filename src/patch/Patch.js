import { useContext, useEffect, useState } from "react";
import { AuthContext, SetAuthContext } from "../auth/Auth";
import Version from "./Versions";
import { ResendToken, SetPatchRead } from "./Data";
import { useNavigate } from "react-router-dom";
import * as Icon from "../layout/Icons";

function Patch() {
    const [showModal, setShowModal] = useState(false);
    const [currentPatch, setCurrentPatch] = useState(1.00);

    const navigate = useNavigate();

    const user = useContext(AuthContext).user();
    const patch = user.patch;
    const username = user.username;

    useEffect(() => {
        if (!patch) navigate("/logout");
        if (parseFloat(patch) < parseFloat(Object.keys(Version)[Object.keys(Version).length - 1])) {
            Object.keys(Version).reverse().forEach(version => {
                if (parseFloat(patch) < version) {
                    setShowModal(true);
                    setCurrentPatch(version);
                }
            }); 
        }
    }, [patch, navigate])

    const closeModal = () => {
        setShowModal(false);
        SetPatchRead(currentPatch).then(() => {
            ResendToken(username).then((jwt) => {
                SetAuthContext(jwt);
                navigate(0);
            })
        });
    }

    const modalContents = (
        <div className='modal' onClick={closeModal}>
            <div className='modal-main'>
                <div className="button-container" onClick={closeModal}><Icon.Close /></div>
                <h1>Release notes v{currentPatch.toString()}</h1>
                {Version[currentPatch.toString()]}
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