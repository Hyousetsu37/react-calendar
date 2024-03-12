import { addHours } from 'date-fns';
import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent, CalendarModal, Navbar } from '..';
import { localizer } from '../../helpers';

const events = [
  {
    title: 'Boss birthday',
    notes: 'Buy the cake',
    start: new Date(),
    end: addHours(new Date(), 2),
    user: {
      _id: '123',
      name: 'Test Subject',
    },
  },
];

export function CalendarPage() {
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

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
  };
  const onSelect = (event) => {
    console.log({ click: event });
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
        events={events}
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
    </>
  );
}
