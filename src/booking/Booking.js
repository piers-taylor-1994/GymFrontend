import { useContext, useEffect, useState } from "react";
import { BookEvent, GetBooked, GetTimetable } from "./Data";
import { Loader, Modal } from "../layout/Layout";
import "./booking.scss";
import { Format } from "../layout/dates";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/Auth";

function Booking() {
    const [timetable, setTimetable] = useState([]);
    const [booked, setBooked] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [response, setResponse] = useState("")

    const authContext = useContext(AuthContext);
    const userId = authContext.user().sub;
    const navigate = useNavigate();

    useEffect(() => {
        if (userId !== "9f15fa88-844e-480c-9440-c7290ee31115") navigate("/");

        GetTimetable().then((t) => {
            setTimetable(t);

            GetBooked().then((b) => {
                setBooked(b);
                setLoading(false);
            })
        })
    }, [userId, navigate, response])

    const closeModal = () => {
        setModalShow(false);
        setResponse("");
    }

    const onSubmit = (bookingId) => {
        setModalShow(true);
        BookEvent(bookingId).then((r) => {
            console.log(r);
            setResponse(r);
        })
    }

    const row = (t) => {
        let className = booked.includes(t.id) ? "row row-disabled" : "row";
        let buttonText = booked.includes(t.id) ? "Booked" : "Book";
        return (
            <div key={t.id} className={className}>
                <p style={{ "textAlign": "center" }} className="bold">{t.name}</p>
                <p className="italic">{t.instructors[0].name}</p>
                <p>{Format(t.date.raw).dayMonth}</p>
                <p id="time">{t.starts_At.format_12_Hour} - {t.ends_At.format_12_Hour}</p>
                <button className="button" onClick={() => onSubmit(t.id)} disabled={booked.includes(t.id)}>{buttonText}</button>
            </div>
        )
    }

    const rows = timetable.map(t => row(t));

    const modal = modalShow
        ? <Modal setShow={closeModal}>
            {response === "" ? <Loader /> : <p id="response">{response}</p>}
        </Modal>
        : <></>;

    const display = loading
        ? <Loader />
        : <>{rows}</>

    return (
        <div className="booking content">
            <h1 id="header1">Class booker</h1>
            {display}
            {modal}
        </div>
    )
}

export default Booking;