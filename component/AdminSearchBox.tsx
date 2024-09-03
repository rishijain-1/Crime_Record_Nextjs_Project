"use client";
import { useState, useEffect } from 'react';
import Loading from './Loader/Loading';
import CrimeTable from './CrimeTable'; // Assuming you've already created this component
import AdminCrimeTable from './AdminCrimeTable';

interface CrimeRecord {
  _id: string;
  ID: number;
  CaseNumber: string;
  Date: string;
  Description: string;
  Location: string;
  PrimaryType: string;
  IUCR: string;
  LocationDescription: string;
  Beat: number;
  District: number;
  Ward: number;
  CommunityArea: number;
  FBICode: string;
  XCoordinate: number;
  YCoordinate: number;
  Year: number;
  Arrest: boolean;
  Domestic: boolean;
  Block: string;
}

const AdminSearchBox = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CrimeRecord[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoadingInitial(true);
      try {
        const res = await fetch('/api/initial-data');
        if (!res.ok) throw new Error('Failed to fetch initial data');
        const data = await res.json();
        setResults(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoadingInitial(false);
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
  
  const updateCrimeRecord = async (updatedRecord: CrimeRecord) => {
    try {
      const response = await fetch('/api/updateCrimeRecord', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecord),
      });

      if (response.ok) {
        console.log('Record updated successfully');
      } else {
        console.error('Failed to update record');
      }
    } catch (error) {
      console.error('Error updating record:', error);
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
        <div className="flex flex-col text-center justify-center">
          <Loading />
          <span>Loading initial data...</span>
        </div>
      ) : (
        <>
          {loading && <p className="text-blue-500"><Loading /> Loading search results...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          <AdminCrimeTable results={results} onSave={updateCrimeRecord} />
        </>
      )}
    </div>
  );
};

export default AdminSearchBox;
