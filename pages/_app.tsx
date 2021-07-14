import type { AppProps /*, AppContext */ } from 'next/app';
import Head from 'next/head';
import Provider from '../components/theme/Provider';
import Header from '../components/header';
import { useWalletProvider, WalletContext } from '../components/providers/WalletConnector';
import { GlobalStyle } from '../components/theme';
import ContractInitializer from '../components/providers/ContractInitializer';
import { Toaster } from 'react-hot-toast';
import { useEagerWalletConnection } from '../utils/hooks/useEagerWalletConnection';

function VotrApp({ Component, pageProps }: AppProps) {
  const wallet = useWalletProvider();
  useEagerWalletConnection(wallet);
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <Toaster />
        <WalletContext.Provider value={wallet}>
          <ContractInitializer>
            <GlobalStyle />
            <Header />
            <Component {...pageProps} />
          </ContractInitializer>
        </WalletContext.Provider>
      </Provider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// VotrApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default VotrApp;
