import api from "../api";

const GetTimetable = () => {
    return api.get("booking/timetable");
}

const BookEvent = (bookingId) => {
    return api.postText("booking/" + bookingId);
}

export { GetTimetable, BookEvent };