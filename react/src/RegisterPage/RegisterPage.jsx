import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { history } from '@/_helpers';
import { userService } from '@/_services';

function RegisterPage() {
    const [user, setUser] = useState({
        role: 'Editor',
        firstName: '',
        email: '',
        lastName: '',
        info: '',
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const registering = false

    function validateMail(value) {
        const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(value)) {
            setEmailValid(false);
            setErrors(error => ({ ...error, ["email"]: "Please enter a valid email address." }));
        }
        else {
            setEmailValid(true);
            setErrors(error => ({ ...error, ["email"]: "" }));
        }
    }

    function validPassword(value) {
        const validLength = value.length >= 8 ? true : false
        const isLower = value.toUpperCase() !== value
        const isUpper = value.toLowerCase() !== value
        const hasNumber = /\d/.test(value)
        const hasSpecialChar = /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value)
        const isValid = validLength && hasNumber && isLower && isUpper && hasSpecialChar
        setPasswordValid(isValid)
        if (!isValid) {
            setEmailValid(false);
            setErrors(error => ({ ...error, ["password"]: "Password must contain at least one small and capital alphabet, numbers and special characters" }));
        }
        else {
            setEmailValid(true);
            setErrors(error => ({ ...error, ["password"]: "" }));
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === 'email') validateMail(value)
        if (name === 'password') validPassword(value)
        setUser(user => ({ ...user, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (user.firstName && user.lastName && user.email && user.info && user.username && user.password) {
            userService.register(user)
            history.push('/');
        }
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Register</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Role</label>
                    <input type="text" name="role" value={user.role} onChange={handleChange} className={'form-control' + (submitted && !user.role ? ' is-invalid' : '')} />
                    {submitted && !user.firstName &&
                        <div className="invalid-feedback">Role is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} className={'form-control' + (submitted && !user.firstName ? ' is-invalid' : '')} />
                    {submitted && !user.firstName &&
                        <div className="invalid-feedback">First Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} className={'form-control' + (submitted && !user.lastName ? ' is-invalid' : '')} />
                    {submitted && !user.lastName &&
                        <div className="invalid-feedback">Last Name is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Email ID</label>
                    <input type="text" name="email" value={user.email} onChange={handleChange} className={'form-control' + (submitted && !user.email ? ' is-invalid' : '')} />
                    {submitted && !user.email &&
                        <div className="invalid-feedback">Email ID is required</div>
                    }
                    {!emailValid && 
                        <div className="text-danger">{errors.email}</div>
                    }
                </div>
                <div className="form-group">
                    <label>Details</label>
                    <input type="text" name="info" value={user.info} onChange={handleChange} className={'form-control' + (submitted && !user.info ? ' is-invalid' : '')} />
                    {submitted && !user.email &&
                        <div className="invalid-feedback">Details of the Editor is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} className={'form-control' + (submitted && !user.username ? ' is-invalid' : '')} />
                    {submitted && !user.username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} />
                    {submitted && !user.password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                    {!passwordValid && 
                        <div className="text-danger">{errors.password}</div>
                    }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary float-left">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <Link to="/" className="btn btn-secondary float-right">Cancel</Link>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };