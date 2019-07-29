import Document, { Head, Main, NextScript } from 'next/document';
import { getServerSideToken, getUserScript } from '../lib/auth';
// *** this file will read on the server, want to get info from our token to user later****

export default class MyDocument extends Document {

    static async getInitialProps(context) {
        const props = await Document.getInitialProps(context);
        const userData = await getServerSideToken(context.req);

        return { ...props, ...userData }
    }


    render() {
        const { user = {} } = this.props;
        return (
            <html>
                <Head />
                <body>
                    <Main />
                    <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }}></script>
                    <NextScript />

                </body>
            </html>

        )
    }
}
