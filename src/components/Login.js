import React from 'react';
import { withRouter } from 'react-router-dom';
import * as auth from '../utils/auth';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(e) {
        e.preventDefault()
        if (!this.state.email || !this.state.password) {
            return;
        }
        auth.authorize(this.state.email, this.state.password)
            .then((data) => {

                if (data.token) {
                    this.props.handleLogin();
                    this.setState({ email: '', password: '' }, () => {

                        this.props.history.push('/');
                    })
                }
            })
            .catch(err => {
                console.log(err)
                this.props.openInfoTooltip();
            }); // запускается, если пользователь не найден
    }
    render() {
        return (
            <form className="login" onSubmit={this.handleSubmit}>
                <h1 className="login__title">Вход</h1>
                <input className="login-input__email" placeholder="Email" required id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} ></input>
                <input className="login-input__password" placeholder="Пароль" required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange}></input>
                <button type="submit" onSubmit={this.handleSubmit} className="login__button">Войти</button>
            </form>
        )
    }
}

export default withRouter(Login); 
