import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';

export function FabAddNew() {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: '#fafa',
      user: {
        _id: '123',
        name: 'Test Subject',
      },
    });

    openDateModal();
  };
  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
}
