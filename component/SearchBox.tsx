"use client";
import { useState, useEffect } from 'react';
import CrimeTable from './CrimeTable';
import Loading from './Loader/Loading';
import { useTranslations } from 'next-intl';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true); // State for initial data loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = useTranslations('DashboardPage');

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoadingInitial(true); // Set loading state to true before fetching
      try {
        const res = await fetch('/api/initial-data');
        if (!res.ok) throw new Error('Failed to fetch initial data');
        const data = await res.json();
        setResults(data); // Set initial results as well
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingInitial(false); // Set loading state to false after fetching
      }
    };

    fetchInitialData();
  }, []);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/crime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center h-screen">
      <h3 className="text-3xl font-bold mb-4">{t('title')}</h3>

      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          className="border p-2 rounded w-64 mr-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchInput')}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {t('searchBtn')}
        </button>
      </form>
      {loadingInitial ? (
        <div className='flex flex-col text-center justify-center'>
        <Loading />
        <span className="">{t('loading')}</span></div>
      ) : (
        <>
          {loading && <p className="text-blue-500"><Loading />{t('searchLoading')}</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          <CrimeTable results={results} />
        </>
      )}
    </div>
  );
};

export default SearchBox;
