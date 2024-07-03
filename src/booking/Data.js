import api from "../api";

const GetTimetable = () => {
    return api.get("booking/timetable");
}

const BookEvent = (bookingId) => {
    return api.postText("booking/" + bookingId);
}

const GetBooked = () => {
    return api.get("booking/booked");
}

export { GetTimetable, BookEvent, GetBooked };