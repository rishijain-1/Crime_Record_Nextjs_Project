"use client"
import {useRouter} from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loading from './Loader/Loading';
import AdminSearchBox from './AdminSearchBox';

const MainAdminComponent = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchUser = async () => {
          const userToken = localStorage.getItem('token');
    
          if (!userToken) {
            router.push('/login');
            return;
          }
    
          try {
            const response = await fetch(`/api/users`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${userToken}`,
              },
            });
    
            if (response.ok) {
              const data = await response.json();
              setUser(data);
            } else {
              setError('Failed to fetch user data');
              setTimeout(() => {
                router.push('/login')
              }, 2000);
            }
            
          } catch (error) {
            setError('An error occurred while fetching user data');
            console.error('An error occurred:', error);
          } finally {
            setLoading(false);
          }
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