import Layout from '../components/Layout';
import Link from 'next/link';
import React from 'react'
import { authInitialProps } from '../lib/auth'

export default function index(props) {

    return (
        <Layout {...props}>
            <Link href="/profile">
                <a> Go to profile</a>
            </Link>
        </Layout>
    )
}

index.getInitialProps = authInitialProps();

