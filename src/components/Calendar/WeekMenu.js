import React, { useEffect, useState, Fragment } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views, 
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import DatePicker from "react-datepicker";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import { db } from "../../utils/firebase";
import { writeCalendarItem } from "../../utils/crud";
import {
  query,
  onSnapshot,
  addDoc,
  collection,
} from "firebase/firestore";

const locales = {
  "nl-BE": require("date-fns/locale/nl-BE"),
};

const today = new Date();

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2022, 6, 6),
    end: new Date(2022, 6, 6),
  },
  {
    title: "Vacation",
    start: new Date(2022, 6, 10),
    end: new Date(2022, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2022, 6, 12),
    end: new Date(2022, 6, 13),
  },
];
// console.log(events);

const WeekMenu = () => {
  const [data, setData] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  useEffect(() => {
    // here mounts the data, get the data form firestore (query & onSnapshot)
    const q = query(collection(db, "WeekPlanner"));
    const unsub = onSnapshot(q, (snap) => {
      const array = snap.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.title,
          date: doc.date, // toDate() om een timestamp te krijgen?
          ...doc.data(),
        };
      });
      console.log(array);
      setData([...array]);
    });
    // here unmounts the data
    return () => {
      unsub();
    };
  }, []);

  function handleDateClick(e) {
    const NewEvent = {
      // get the Id of the recipe???
      //   title: title ? title : e.dateStr,
      start: e.date,
    };
    console.log("datum:", handleDateClick);
    console.log("event:", NewEvent);
    addDoc(collection(db, "WeekPlanner"), NewEvent);
  }

  return (
    <Fragment>
      <div className="weeklyMenu-container">
        <h2 className="recipeDetail__title">Weekly Menu</h2>
        <div>
          Today:
          {today.getDate() +
            "-" +
            (today.getMonth() + 1) +
            "-" +
            today.getFullYear()}
        </div>
        <div className="inputCalendar">
          <input
            className="inputCalendar__title"
            type="text"
            placeholder="Add Recipe"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <DatePicker
            className="inputCalendar__date"
            placeholderText="Date"
            selected={newEvent.date}
            onChange={(date) => setNewEvent({ ...newEvent, date })}
          />

          <button onClick={handleAddEvent} className="inputCalendar__btn">
            Add Event
          </button>
        </div>
        <Calendar
          defaultView={Views.WEEK}
          onClick={handleDateClick}
          writeCalendarItem={writeCalendarItem}
          handleAddEvent={handleAddEvent}
          localizer={localizer}
          events={events} // deze komen op de kalender
          startAccessor="start"
          endAccessor="end" //that returns the end date + 1 day for those events that end at midnight.
          className="calendar__container"
        />
      </div>
    </Fragment>
  );
};

export default WeekMenu;
