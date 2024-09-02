"use client";
import { useState } from 'react';

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
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter case number..."
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {results.length > 0 && (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Case Number</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Location</th>
                <th className="py-2 px-4 border-b">Primary Type</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result._id}>
                  <td className="py-2 px-4 border-b">{result.CaseNumber}</td>
                  <td className="py-2 px-4 border-b">{result.Date}</td>
                  <td className="py-2 px-4 border-b">{result.Description}</td>
                  <td className="py-2 px-4 border-b">{result.Location}</td>
                  <td className="py-2 px-4 border-b">{result.PrimaryType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
