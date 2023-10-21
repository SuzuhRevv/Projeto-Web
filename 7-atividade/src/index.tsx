import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

const AppRouter = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
    router.push('/about'); 
  }, [router]);

  return <>{children}</>;
};

export default AppRouter;
