import nProgress from 'nprogress';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const startProgressIndicator = () => {
  nProgress.start();
};
const stopProgressIndicator = () => {
  nProgress.done();
};

export const usePageLoadingIndicator = () => {
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart', startProgressIndicator);
    router.events.on('routeChangeComplete', stopProgressIndicator);
    return () => {
      router.events.off('routeChangeStart', startProgressIndicator);
      router.events.off('routeChangeComplete', stopProgressIndicator);
    };
  }, [router]);
};
