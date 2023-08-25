import { useEffect, useState } from "react";
import "./qrcode.scss"
import QRCode from "react-qr-code";
import { Format } from "../layout/dates";

function Qrcode() {
    const [inputValue, setInputValue] = useState("");
    const [qrValue, setQrValue] = useState("");
    const [randomNumber, setRandomNumber] = useState("A1")

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVQXYZ";
    const colourList = ["red", "green", "blue"];

    const updateQrcode = () => {
        setQrValue(inputValue);
        setRandomNumber(alphabet[Math.floor(Math.random() * alphabet.length)] + (Math.random() * 9).toString().substring(0, 1));
    }

    return (
        <div className="qrcode content">
            <h1>Scan QR Code to enter</h1>
            <div style={{ height: "auto", margin: "0 auto", maxWidth: "11em", width: "100%" }}>
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={qrValue}
                    viewBox={`0 0 256 256`}
                />
            </div>
            <div className="randomNumber-container">
                <span style={{color: colourList.sort(() => Math.random() - 0.5)[0]}}>{randomNumber}</span>
            </div>
            <div className="dateTime-container-container">
                <div className="dateTime-container">
                    <span>{Format(new Date()).date}</span>
                    <span>{Format(new Date()).time}</span>
                </div>
            </div>
            <div className="qrcode-submit">
                <label>
                    Qr code value:
                    <input onChange={(e) => setInputValue(e.target.value)} />
                </label>
                <div className="button-container">
                    <button className="button button-s" onClick={updateQrcode}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Qrcode;