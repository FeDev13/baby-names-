import { useRouter } from 'next/navigation';

export const useGoHome = () => {
  const router = useRouter();
  const goHome = () => router.push('/');
  return goHome;
};
