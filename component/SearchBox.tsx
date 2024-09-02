"use client";
import { useState } from 'react';
import CrimeTable from './CrimeTable';
import Loading from './Loader/Loading';
const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="p-4 flex  flex-col justify-center items-center h-screen">
       <h3 className="text-3xl font-bold mb-4">Crime Records</h3>

      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          className="border p-2 rounded w-64 mr-2"
          value={query}
          onChange={(e) => setQuery(e.target.value.toUpperCase())}
          placeholder="Enter case number..."
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>
      {loading && <p className="text-blue-500"><Loading/></p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {results.length > 0 && (
        <CrimeTable results={results}/>
      )}
    </div>
  );
};

export default SearchBox;
