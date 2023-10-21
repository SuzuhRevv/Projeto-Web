import { AppProps } from 'next/app';
import AppRouter from '..';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppRouter>
      <Component {...pageProps} />
    </AppRouter>
  );
};

export default MyApp;
