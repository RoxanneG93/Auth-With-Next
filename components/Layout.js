import React from 'react';
import Link from 'next/link';
import { logoutUser } from '../lib/auth';



export default function Layout({ title, children, auth }) {

    // this syntax defualts the variable as an empty objet if there is no auth value
    const { user = {} } = auth || {};

    return (
        <div className="root">
            <nav className="navbar">
                <span>Welcom, <strong>{user.name || "Guest"}</strong></span>
                <div>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    {user.email ? (
                        <React.Fragment>
                            <Link href="/profile">
                                <a>Profile</a>
                            </Link>
                            <button onClick={logoutUser}>Logout</button>
                        </React.Fragment>
                    )
                        :
                        (
                            <Link href="/login">
                                <a>Login</a>
                            </Link>
                        )
                    }



                </div>
            </nav>
            <h1>{title}</h1>
            {children}
            <style jsx>{
                `
                    .root {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;

                    }
                    .navbar {
                        width: 100%;
                        display: flex;
                        justify-content: space-around;
                    }
                    a {
                        margin-right: .5em;
                    
                    }
                    button {
                        text-decoration: underline;
                        padding: 0;
                        font: inherit;
                        cursor: pointer;
                        border-style: none;
                        color: rba(0,0,238)
                    }
                `
            }</style>
        </div>
    )
}
