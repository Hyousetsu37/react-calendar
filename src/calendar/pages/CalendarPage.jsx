import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from '..';
import { localizer } from '../../helpers';

import { useCalendarStore, useUiStore } from '../../hooks';

export function CalendarPage() {
  const { events, setActiveEvent } = useCalendarStore();

  const newEvents = events.map((event) => {
    return { ...event, start: new Date(event.start), end: new Date(event.end) };
  });

  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  );
  const eventStyleGetter = () => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
    };
    return { style };
  };

  const onDoubleClick = () => {
    openDateModal();
  };
  const onSelect = (event) => {
    const newActiveEvent = {
      ...event,
      start: event.start.toString(),
      end: event.end.toString(),
    };
    setActiveEvent(newActiveEvent);
  };
  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };

  return (
    <>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={newEvents}
        defaultView={lastView}
        startAccessor={'start'}
        endAccessor={'end'}
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
}
