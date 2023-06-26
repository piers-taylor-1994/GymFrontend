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
    const style = props.show ? "button button-nudge" : "button";
    const disabled = props.show ? true : false;

    return (
        <button onClick={props.submit} className={style} disabled={disabled}>
            <span>{props.children}</span>
            {loader}
        </button>
    )
}

export { Loader, LoaderPage, LoaderButton }