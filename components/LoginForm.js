import React, { Component } from 'react'
import { loginUser } from '../lib/auth'
import Router from 'next/router';

export default class LoginForm extends Component {


    state = {
        email: 'Shanna@melissa.tv',
        password: 'anastasia.net',
        error: '',
        isLoading: false
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    showError(e) {
        console.log(e)
        const error = e.response && e.response.data || e.message;
        this.setState({ error });
    }

    handleSubmit = event => {
        this.setState({ error: '', isLoading: true })
        const { email, password } = this.state;
        event.preventDefault();
        loginUser(email, password).then(() => {
            Router.push('/profile');
        })
            .catch((e) => {
                this.showError(e);
                this.setState({ isLoading: false })
            })
    }

    render() {

        const { email, password, error, isLoading } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            value={email}
                            onChange={this.handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="password"
                            onChange={this.handleChange}
                        />
                        <button type="submit" disabled={isLoading}>{isLoading ? "sending" : "submit"}</button>
                        {error && <div>{error}</div>}
                    </div>
                </form>
            </div>
        )
    }
}
