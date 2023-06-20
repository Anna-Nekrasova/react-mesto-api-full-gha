import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ headerEmail, isLoggedIn, signOut }) {
    const { pathname } = useLocation();

    const to =
        pathname === '/sign-up'
            ? '/sign-in'
            : pathname === '/sign-in'
                ? '/sign-up'
                : '';
    const text =
        pathname === '/sign-up'
            ? 'Войти'
            : pathname === '/sign-in'
                ? 'Регистрация'
                : '';

    return (
        <header className="header">
            <img className="header__logo" alt="Логотип" src={logo} />
            <div className="header__auth">
                <p className="header__auth_email">{headerEmail}</p>
                {isLoggedIn ? (
                    <Link to="/" className="header__auth_text" onClick={signOut}>
                        Выйти
                    </Link>
                ) : (
                    <Link to={to} className="header__auth_text">
                        {text}
                    </Link>
                )}
            </div>

        </header>
    );
}

export default Header;