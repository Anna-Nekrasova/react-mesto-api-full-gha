import React from "react";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";

function Register({ registerUser }) {
    const { form, /*errors, */handleChange } = useForm({
        email: "",
        password: "",
      });
    
      const handleSubmit = (evt) => {
        evt.preventDefault();
        registerUser(form)
      };

    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form className="auth__form" name="authForm" onSubmit={handleSubmit}>
                <div className="auth__content">
                    <input type="email" className="auth__text" id="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <span className="auth__error"></span>
                    <input type="password" className="auth__text" id="password" name="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
                    <span className="auth__error"></span>
                </div>
                <button className="auth__save" type="submit">Зарегестрироваться</button>
            </form>
            <Link to="/sign-in" className="auth__link">Уже зарегестрированы? Войти</Link>
        </div>
    );
}

export default Register;