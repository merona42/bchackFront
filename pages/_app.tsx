import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import SplashScreen from '../src/app/_components/SplashScreen';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <SplashScreen />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;