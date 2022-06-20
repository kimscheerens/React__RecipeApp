import React, { Fragment, useEffect, useState, useCallback } from "react";
/** https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/about-big-calendar--page */
/** Fragments let you group a list of children without adding extra nodes to the DOM */
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import { db } from "../../utils/firebase";
import { query, onSnapshot, addDoc, collection, Timestamp } from "firebase/firestore";

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

const DragAndDropCalendar = withDragAndDrop(Calendar);

/** firestore configuration to get date: https://firebase.google.com/docs/reference/js/v8/firebase.firestore.Timestamp */
const WeekMenu = () => {
  const [myEvents, setEvents] = useState([]);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const desc = window.prompt("Add something to the calendar");
      const event = {
        desc,
        start: Timestamp.fromDate(start),
        end: Timestamp.fromDate(end),
      };
      addDoc(collection(db, "WeekPlanner"), event);

      const newLocalEvent = { desc, start, end };
      setEvents(prev => [...prev, newLocalEvent]);
    },
    [setEvents]
  );

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setEvents(prev => {
        const existing = prev.find(ev => ev.id === event.id) ?? {};
        const filtered = prev.filter(ev => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay }];
      });
    },
    [setEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setEvents(prev => {
        const existing = prev.find(ev => ev.id === event.id) ?? {};
        const filtered = prev.filter(ev => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setEvents]
  );

  /** to see the date on the calander it must been convert to a date toDate() */
  useEffect(() => {
    const q = query(collection(db, "WeekPlanner"));
    const unsub = onSnapshot(q, snap => {
      const array = snap.docs.map(doc => {
        const dbObj = doc.data();
        return {
          title: dbObj.desc,
          start: dbObj.start.toDate(),
          end: dbObj.end.toDate(),
        };
      });
      setEvents(array);
    });
    return () => unsub();
  }, []);

  return (
    <Fragment>
      <div className="weeklyMenu-container">
        <h2 className="recipeDetail__title">Weekly Menu</h2>
        <div>
          Today:
          {today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear()}
        </div>
        <DragAndDropCalendar
          defaultView={Views.WEEK}
          localizer={localizer}
          events={myEvents}
          onSelectSlot={handleSelectSlot}
          selectable
          startAccessor="start"
          endAccessor="end" //that returns the end date + 1 day for those events that end at midnight.
          className="calendar__container"
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          popup
          resizable
        />
      </div>
    </Fragment>
  );
};

export default WeekMenu;
