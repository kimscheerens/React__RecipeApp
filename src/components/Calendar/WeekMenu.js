import React, { useEffect, useState } from "react";
/** https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/about-big-calendar--page */
import {
  Calendar,
  dateFnsLocalizer,
  Views, 
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import { db } from "../../utils/firebase";
import { writeCalendarItem } from "../../utils/crud";
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

  useEffect(() => {
    // here mounts the data, get the data form firestore (query & onSnapshot)
    const q = query(collection(db, "WeekPlanner"));
    const unsub = onSnapshot(q, (snap) => {
      const array = snap.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.title,
          date: new Date("2022-06-12T14:00:00-05:00"),
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

  return (
    <>
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
          writeCalendarItem={writeCalendarItem}
          localizer={localizer}
          events={data}
          startAccessor="start"
          endAccessor="end" //that returns the end date + 1 day for those events that end at midnight.
          className="calendar__container"
        />
      </div>
    </>
  );
};

export default WeekMenu;
