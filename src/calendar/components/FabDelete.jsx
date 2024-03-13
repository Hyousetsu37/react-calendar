import { useCalendarStore } from '../../hooks';

export function FabDelete() {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const view = localStorage.getItem('lastView');

  const handleClickNew = () => {
    startDeletingEvent();
  };
  return (
    <button
      style={{ display: hasEventSelected ? '' : 'none' }}
      className={`btn btn-danger fab-danger ${
        (view === 'month') | (view === 'agenda') ? 'close-btn' : ''
      }`}
      onClick={handleClickNew}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
}
