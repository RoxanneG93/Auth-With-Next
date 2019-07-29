import React from 'react'
import LoginForm from '../components/LoginForm'
import Layout from '../components/Layout';
import { authInitialProps } from '../lib/auth'

export default function login(props) {
    return (
        <div>
            <Layout title="Login" {...props}>
                <LoginForm />
            </Layout>

        </div>
    )
}
login.getInitialProps = authInitialProps();