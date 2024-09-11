"use client"
import { useRouter } from '@/navigation';
import React, { useEffect, useState } from 'react'
import Loading from './Loader/Loading';
import AdminSearchBox from './AdminSearchBox';
import { getCurrentUser } from '@/app/api/session';

const MainAdminComponent = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchUser = async () => {
          const session = await getCurrentUser();

          if (session?.user?.role === 'admin') {
            setUser(session?.user);
          } else {
            setError('Unauthorized');
            router.push('/login');
          }
    
          setLoading(false);
        };
    
        fetchUser();
      }, [router]);

      if (loading) {
        return <div className="items-center h-screen flex justify-center"><Loading/></div>;
      }
    
      if (error) {
        return <div className="items-center h-screen flex justify-center">{error}</div>;
      }
    
  return (
    <AdminSearchBox/>
  )
}

export default  MainAdminComponent