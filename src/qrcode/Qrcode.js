import { useContext, useState } from "react";
import "./qrcode.scss"
import QRCode from "react-qr-code";
import { Format } from "../layout/dates";
import { AuthContext } from "../auth/Auth";

const RandomType = {
    0: "number",
    1: "colour"
}
Object.freeze(RandomType);

function Qrcode() {
    const randomNumberColourGenerator = (RandomType) => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVQXYZ";
        const colourList = ["red", "green", "blue"];

        if (RandomType === "number") return alphabet[Math.floor(Math.random() * alphabet.length)] + (Math.random() * 9).toString().substring(0, 1);
        else if (RandomType === "colour") return colourList.sort(() => Math.random() - 0.5)[0];
    }

    const authContext = useContext(AuthContext);
    const userId = authContext.user().sub;
    const initialValue = userId === "c1fef7f5-383b-4200-b498-c201a6ac1fec" ? "23044311" : "23044312";

    const [inputValue, setInputValue] = useState("");
    const [qrValue, setQrValue] = useState(initialValue);
    const [randomNumber, setRandomNumber] = useState(randomNumberColourGenerator(RandomType[0]))
    const [randomNumberColour, setRandomNumberColour] = useState(randomNumberColourGenerator(RandomType[1]));

    const updateQrcode = () => {
        setQrValue(inputValue);
        setRandomNumber(randomNumberColourGenerator(RandomType[0]));
        setRandomNumberColour(randomNumberColourGenerator(RandomType[1]));
    }

    const FULL_DASH_ARRAY = 283;
    let TIME_LIMIT = 15;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;

    function onTimesUp() {
        clearInterval(timerInterval);
    }

    (function startTimer() {
        timerInterval = setInterval(() => {
            if (document.getElementById("base-timer-label")) {
                timePassed = timePassed += 1;
                timeLeft = TIME_LIMIT - timePassed;
                document.getElementById("base-timer-label").innerHTML = formatTime(
                    timeLeft
                );
                setCircleDasharray();
            }
            if (timeLeft === 0 || !document.getElementById("base-timer-label")) {
                onTimesUp();
            }
        }, 1000);
    })();

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${0}${minutes}:${seconds}`;
    }

    function calculateTimeFraction() {
        const rawTimeFraction = timeLeft / TIME_LIMIT;
        return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const timeFraction = calculateTimeFraction();

        if (timeFraction <= 0) {
            document.getElementById("base-timer-path-remaining")
            .style.transition = "0s";
            document.getElementById("base-timer-path-remaining")
            .setAttribute("opacity", 0);
        }
        else {
            const circleDasharray = `${(
                timeFraction * FULL_DASH_ARRAY
            ).toFixed(0)} 283`;
            document
                .getElementById("base-timer-path-remaining")
                .setAttribute("stroke-dasharray", circleDasharray);
        }
    }

    return (
        <div className="qrcode">
            <h1>Scan QR Code to enter</h1>
            <div className="content-container">
                <div className="qrcode-date-container">
                    <div className="qrcode-container">
                        <QRCode
                            size={256}
                            value={qrValue}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                    <div className="randomNumber-container">
                        <span style={{ color: randomNumberColour }}>{randomNumber}</span>
                    </div>
                    <div className="dateTime-container-container">
                        <div className="dateTime-container">
                            <span>{Format(new Date()).date}</span>
                            <span>{Format(new Date()).time}</span>
                        </div>
                    </div>
                </div>
                <div className="timer">
                    <div className="base-timer">
                        <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <g className="base-timer__circle">
                                <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                                <path
                                    id="base-timer-path-remaining"
                                    strokeDasharray="283"
                                    className="base-timer__path-remaining"
                                    d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
                                ></path>
                            </g>
                        </svg>
                        <span id="base-timer-label" className="base-timer__label">00:15</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Qrcode;