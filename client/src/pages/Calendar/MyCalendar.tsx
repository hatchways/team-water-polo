import { useState } from 'react';
import events from './mockData';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Tag from './Tag';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './MyCalendar.css';
import useStyles from './useStyles';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar as any);

export default function MyCalendar(): JSX.Element {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [popOvercontent, setPopOverContent] = useState(null);
  const [state, setState] = useState({
    events: events,
  });

  function moveEvent({ event, start, end }: any): void {
    const { events } = state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    setState({
      events: nextEvents,
    });
  }
  const msg = {
    showMore: (total: any) => `+${total} ...`,
  };

  const handleClick = (event: any) => {
    console.log(event);
    setPopOverContent(event.title);
    if (popOvercontent === event.title) {
      setAnchorEl(!anchorEl);
    } else {
      setAnchorEl(true);
    }
  };

  // const handleClose = () => {
  //   setAnchorEl(false);
  // };

  return (
    <div>
      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={state.events}
        components={{
          event: Tag,
        }}
        onEventDrop={moveEvent}
        startAccessor="start"
        popup
        onSelectEvent={handleClick}
        messages={msg}
        // views={{ month: true }}
        endAccessor="start"
        defaultDate={new Date(2021, 3, 12)}
        style={{ height: 800 }}
      />
    </div>
  );
}
