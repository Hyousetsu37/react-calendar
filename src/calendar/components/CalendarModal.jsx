import { addHours, differenceInSeconds } from 'date-fns';
import { useMemo, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%,-50%)',
  },
};
Modal.setAppElement('#root');
export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [formValues, setFormValues] = useState({
    title: 'something',
    notes: 'something else',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';
    return formValues.title.length > 0 ? '' : 'is-invalid';
  }, [formSubmitted, formValues.title]);
  const onChangeFormValues = ({ target }) => {
    setFormValues((fv) => {
      return { ...fv, [target.name]: target.value };
    });
  };

  const onCloseModal = () => {
    console.log('closing');
    setIsOpen(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Incorrect dates', 'Rectify dates', 'error');
      return;
    }
    if (formValues.title.length === 0) return;
    console.log(formValues);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onCloseModal}
      className={'modal'}
      overlayClassName={'modal-fondo'}
      closeTimeoutMS={300}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form onSubmit={onSubmit} className="container">
        <div className="form-group mb-2">
          <label>Start date</label>
          <input
            className="form-control"
            placeholder="Fecha inicio"
            type="datetime-local"
            name="start"
            value={formValues.start}
            onChange={onChangeFormValues}
          />
        </div>

        <div className="form-group mb-2">
          <label>End date</label>
          <input
            lang="en"
            /* min={formValues.start} */
            className="form-control"
            placeholder="Fecha inicio"
            type="datetime-local"
            name="end"
            value={formValues.end}
            onChange={onChangeFormValues}
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Title</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onChangeFormValues}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onChangeFormValues}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
