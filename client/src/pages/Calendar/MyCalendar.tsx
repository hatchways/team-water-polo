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

import Modal from '@material-ui/core/Modal';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar as any);

export default function MyCalendar(): JSX.Element {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [state, setState] = useState({
    events: events,
  });

  function moveEvent({ event, start }: any): void {
    const { events } = state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    setState({
      events: nextEvents,
    });
  }
  const msg = {
    showMore: (total: any) => `+${total} ...`,
  };
  const handleOpen = (event: any) => {
    setModalContent(event.title);
    setShowModal(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowModal(false);
  };

  const open = Boolean(anchorEl);

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
        // elementProps={{ onClick: (e) => console.log('line 89---', e.target) }}
        onSelectEvent={handleOpen}
        messages={msg}
        views={{ month: true }}
        endAccessor="start"
        defaultDate={new Date(2021, 3, 12)}
        style={{ height: 800 }}
      />

      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={showModal}
        className={classes.modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <h2 id="spring-modal-title">Hi</h2>
          <p id="spring-modal-description">react-spring animates me.</p>
        </div>
      </Modal>
    </div>
  );
}
