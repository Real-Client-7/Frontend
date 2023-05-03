import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import './calendar.scss';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendars = (props) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/appointment/getAllAppoitment')
      .then(response => {
        const transformedEvents = response.data.response.map(event => ({
          title: event.patient.first_name,
          start: new Date(event.date),
          end: new Date(new Date(event.date).getTime() + 30 * 60000),
          allDay: false,
        }));
        setEvents(transformedEvents);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div >
      <div className="calendar" style={{ width: '50%', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px gray' }}>
      <h1 style={{ color: 'black', marginBottom: '15px' ,textAlign:'center' , marginTop:'-5px' ,color:'#447695'}}>Appointments</h1>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          defaultView="day"
        />
      </div>
    </div>
  );
};

export default Calendars;