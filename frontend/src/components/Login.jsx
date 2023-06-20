import React from "react";
import useForm from "../hooks/useForm";

function Login({ loginUser }) {
    const { form, /*errors, */handleChange } = useForm({
        email: "",
        password: "",
      });
    
      const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!form.email || !form.password) {
            return
        }
        loginUser(form)
      };

    return (
        <div className="auth">
            <h2 className="auth__title">Вход</h2>
            <form className="auth__form" name="authForm" onSubmit={handleSubmit}>
                <div className="auth__content">
                    <input type="email" className="auth__text" id="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                    <span className="auth__error"></span>
                    <input type="password" className="auth__text" id="password" name="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
                    <span className="auth__error"></span>
                </div>
                <button className="auth__save" type="submit">Войти</button>
            </form>
        </div>
    );
}

export default Login;