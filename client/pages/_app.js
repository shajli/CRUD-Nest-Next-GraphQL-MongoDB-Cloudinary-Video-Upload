import Head from 'next/head';
import '../styles/globals.css';
import Layout from '../components/layout/layout';
import apolloClient from '../apollo/apollo-client';
import { ApolloProvider } from '@apollo/client';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

export default MyApp;
