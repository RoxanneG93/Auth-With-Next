import axios from 'axios';
import Router from 'next/router';


// gets the cookie data???
axios.defaults.withCredentials = true;

const WINDOW_USER_SCRIPT_VARIABLE = '__USER__';

export const loginUser = async (email, password) => {
    const { data } = await axios.post('/api/login', { email, password });
    if (typeof window !== 'undefined') {
        window[WINDOW_USER_SCRIPT_VARIABLE] = data || {};
    }

}

export const getUserProfile = async () => {
    const { data } = await axios.get('/api/profile');
    return data;
}

export const getServerSideToken = req => {
    if (!req) {
        return {};
    }
    const { signedCookies = {} } = req;
    if (!signedCookies) {
        return {};
    } else if (!signedCookies.token) {
        return {};
    }
    return { user: signedCookies.token }
}

export const getClientSideToken = () => {
    // checking if we are not on the client window
    if (typeof window !== 'undefined') {
        const user = window[WINDOW_USER_SCRIPT_VARIABLE] || {};
        return { user };
    }
    return { user: [] }
}

export const getUserScript = user => {
    return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`
}



const redirectcUser = (res, path) => {
    if (res) {
        // temporary redirect, significant for SEO??
        res.redirect(302, path);
        // finished property tells Next to not keep writing to the response
        res.finished = true;
        return {};
    }
    Router.push
}



// higer order function running a function???
export const authInitialProps = (isProtectedRoute) => ({ req, res }) => {
    const auth = req ? getServerSideToken(req) : getClientSideToken()
    const currentPath = req ? req.url : window.location.pathname;
    const user = auth.user;
    const isAnonymous = !user || user.type !== 'authenticated';
    if (isProtectedRoute && isAnonymous && currentPath !== "/login") {
        return redirectcUser(res, '/login');
    }
    return { auth };
}

//

export const logoutUser = async () => {
    // checking if we are not on the client window
    if (typeof window !== 'undefined') {
        const user = window[WINDOW_USER_SCRIPT_VARIABLE] = {};
    }
    await axios.post('/api/logout');
    Router.push('/login')
}