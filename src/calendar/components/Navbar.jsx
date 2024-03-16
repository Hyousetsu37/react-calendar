import { useAuthStore } from '../../hooks';

export function Navbar() {
  const { user, startLogout } = useAuthStore();
  return (
    <>
      <nav className="navbar navbar-dark bg-dark mb-4 px-4 text-white">
        <span className="navbar-brand gap-2">
          <i className="fas fa-calendar-alt"></i>
          &nbsp; {user.name}
        </span>
        <button onClick={startLogout} className="btn btn-outline-danger">
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
      </nav>
    </>
  );
}
