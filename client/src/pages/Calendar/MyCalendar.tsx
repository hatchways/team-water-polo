import { useState } from 'react';
import Tag from './Tag';
import CardModal from './CardModal';
import events from './mockData';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './MyCalendar.css';
import useStyles from './useStyles';
import { IPropContent } from '../../interface/Calendar';

import Modal from '@material-ui/core/Modal';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar as any);

interface Params {
  event: IPropContent;
  start: Date;
}

export default function MyCalendar(): JSX.Element {
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [state, setState] = useState({
    events: events,
  });

  function moveEvent({ event, start }: Params) {
    const { events } = state;
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start };
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    setState({
      events: nextEvents,
    });
  }

  const handleOpen = (e: unknown): void => {
    setModalContent(e);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  function updateEvent(property: string, value: string) {
    const { events } = state;
    const idx = events.indexOf(modalContent);
    const updatedEvent = { ...modalContent };
    updatedEvent[property] = value;
    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    setState({
      events: nextEvents,
    });
  }

  return (
    <div className={classes.calendarContainer}>
      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={state.events}
        components={{
          event: Tag,
        }}
        onEventDrop={moveEvent as () => void}
        startAccessor="start"
        popup
        onSelectEvent={handleOpen}
        views={{ month: true }}
        endAccessor="start"
        defaultDate={new Date(2021, 3, 12)}
        style={{ height: 800 }}
      />

      <Modal
        open={showModal}
        className={classes.modal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modalContent}>
          {showModal ? <CardModal content={modalContent} methods={{ handleClose, updateEvent }} /> : null}
        </div>
      </Modal>
    </div>
  );
}
