import React, { useState } from 'react';

interface CrimeRecord {
  _id: string;
  CaseNumber: string;
  Date: string;
  Description: string;
  Location: string;
  PrimaryType: string;
}

interface CrimeTableProps {
  results: CrimeRecord[];
}

const CrimeTable: React.FC<CrimeTableProps> = ({ results }) => {
  const [itemsToShow, setItemsToShow] = useState<number>(100); 

  const handleLoadMore = () => {
    setItemsToShow(prev => prev + 100); 
  };

  return (
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
          {results.slice(0, itemsToShow).map((result) => (
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
      {itemsToShow < results.length && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CrimeTable;
