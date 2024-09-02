"use client";
import { useState, useEffect } from 'react';
import CrimeTable from './CrimeTable';
import Loading from './Loader/Loading';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [initialResults, setInitialResults] = useState<any[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true); // State for initial data loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoadingInitial(true); // Set loading state to true before fetching
      try {
        const res = await fetch('/api/initial-data');
        if (!res.ok) throw new Error('Failed to fetch initial data');
        const data = await res.json();
        setInitialResults(data);
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
      const res = await fetch(`/api/crime`, {
        method: 'POST',
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
      <h3 className="text-3xl font-bold mb-4">Crime Records</h3>

      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          className="border p-2 rounded w-64 mr-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter case number..."
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>
      {loadingInitial ? (
        <div className='flex flex-col text-center justify-center'>
        <Loading />
        <span className=""> Loading initial data...</span></div>
      ) : (
        <>
          {loading && <p className="text-blue-500"><Loading /> Loading search results...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          <CrimeTable results={results} />
        </>
      )}
    </div>
  );
};

export default SearchBox;
