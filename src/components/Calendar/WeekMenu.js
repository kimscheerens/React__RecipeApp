import React, { Fragment, useEffect, useState, useCallback } from "react";
/** https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/about-big-calendar--page */
/** Fragments let you group a list of children without adding extra nodes to the DOM */
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import { db } from "../../utils/firebase";
import { query, onSnapshot, addDoc, collection } from "firebase/firestore";

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

const WeekMenu = () => {
  const [data, setData] = useState([]);
  const [myEvents, setEvents] = useState([]);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event name");
      const event = {
        title: title,
        date: start,
        end,
      };
      addDoc(collection(db, "WeekPlanner"), event);
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  useEffect(() => {
    // here mounts the data, get the data form firestore (query & onSnapshot)
    const q = query(collection(db, "WeekPlanner"));
    const unsub = onSnapshot(q, (snap) => {
      const array = snap.docs.map((doc) => {
        console.log(doc);
        return {
          ...doc.data(),
          title: doc.title,
          // date: date.toDate(),
          // end: end.toDate(),
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
        <Calendar
          defaultView={Views.WEEK}
          localizer={localizer}
          events={myEvents}
          onSelectSlot={handleSelectSlot}
          selectable
          startAccessor="start"
          endAccessor="end" //that returns the end date + 1 day for those events that end at midnight.
          className="calendar__container"
        />
      </div>
    </Fragment>
  );
};

export default WeekMenu;
