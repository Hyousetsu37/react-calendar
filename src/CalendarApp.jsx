import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';

export function CalendarApp() {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
}
