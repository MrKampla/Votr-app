import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { ModalProvider } from 'styled-react-modal';
import Provider from '../components/theme/Provider';
import Header from '../components/header';
import { useWalletProvider, WalletContext } from '../components/providers/WalletConnector';
import { GlobalStyle } from '../components/theme';
import ContractInitializer from '../components/providers/ContractInitializer';
import { useEagerWalletConnection } from '../utils/hooks/useEagerWalletConnection';
import { usePageLoadingIndicator } from '../utils/hooks/usePageLoadingIndicator';
import { FadingBackground } from '../components/styled/create/VotrModalStyled';

function VotrApp({ Component, pageProps }: AppProps) {
  const wallet = useWalletProvider();
  useEagerWalletConnection(wallet);
  usePageLoadingIndicator();
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
      </Head>
      <Provider>
        <WalletContext.Provider value={wallet}>
          <Toaster />
          <ContractInitializer>
            <ModalProvider backgroundComponent={FadingBackground}>
              <GlobalStyle />
              <Header />
              <Component {...pageProps} />
            </ModalProvider>
          </ContractInitializer>
        </WalletContext.Provider>
      </Provider>
    </>
  );
}

export default VotrApp;
