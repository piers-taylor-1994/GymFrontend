import * as Icon from './Icons'

function Loader(props) {
    return (
        <div className="loader loader-section">
            <div className="spinner">&nbsp;</div>
        </div>
    )
}

function LoaderPage(props) {
    return (
        <div className="loader loader-page">
            <div className="spinner">&nbsp;</div>
        </div>
    )
}

function LoaderButton(props) {
    const loader = props.show ? <div className="spinner">&nbsp;</div> : <></>;
    let style = props.show ? "button button-nudge " : "button ";
    style = props.buttonStyle ? style + props.buttonStyle : style;
    const disabled = props.show ? true : false;

    return (
        <button onClick={props.submit} className={style} disabled={disabled}>
            <span>{props.children}</span>
            {loader}
        </button>
    )
}

function Modal(props) {
    return (
        <div className="modal" onClick={props.modalExit ? () => props.setShow(false) : null}>
            <div className="modal-main">
                <div className="button-container button-container-exit" onClick={() => props.setShow(false)}><Icon.Close /></div>
                {props.children}
            </div>
        </div>
    )
}

export { Loader, LoaderPage, LoaderButton, Modal }