import { useContext, useEffect, useState } from "react";
import { AuthContext, SetAuthContext } from "../auth/Auth";
import Version from "./Versions";
import { ResendToken, SetPatchRead } from "./Data";
import './patch.scss'
import { Modal } from "../layout/Layout";

function Patch() {
    const [showPage, setShowPage] = useState(false);
    const [currentPatch, setCurrentPatch] = useState(1.00);
    const [patchContents, setPatchContents] = useState();

    const user = useContext(AuthContext).user();
    let patch = user.patch;
    const username = user.username;

    useEffect(() => {
        let currentPatch = parseFloat(patch);
        let contents = <></>;
        if (currentPatch < Math.max.apply(Math, Object.keys(Version).map(i => parseFloat(i)))) {
            Object.keys(Version).forEach(version => {
                if (currentPatch < version) {
                    contents = 
                        <>
                            {contents}
                            <h2>v{version}</h2>
                            {Version[version.toString()]}
                        </>
                    currentPatch = version;
                    setCurrentPatch(version);
                }
            })
            setPatchContents(contents);
            setShowPage(true);
        }
    }, [patch])


    const closeModal = () => {
        setShowPage(false);
        SetPatchRead(currentPatch).then(() => {
            ResendToken(username).then((jwt) => {
                SetAuthContext(jwt);
            })
        });
    }

    const page = (
        <Modal setShow={closeModal} modalExit={true} modalStyle={"modal-main-patch"}>
            <h1>Release notes</h1>
                {patchContents}
        </Modal>
    )

    const modal = showPage ? page : <></>;

    return (
        <>
            {modal}
        </>
    )
}

export default Patch;