import React, { useState } from 'react';

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

interface CrimeTableProps {
  results: CrimeRecord[];
  onSave: (updatedRecord: CrimeRecord) => void;
}

const columns = [
  { key: 'ID', label: 'ID' },
  { key: 'CaseNumber', label: 'Case Number' },
  { key: 'Date', label: 'Date' },
  { key: 'Description', label: 'Description' },
  { key: 'Location', label: 'Location' },
  { key: 'PrimaryType', label: 'Primary Type' },
  { key: 'IUCR', label: 'IUCR' },
  { key: 'LocationDescription', label: 'Location Description' },
  { key: 'Beat', label: 'Beat' },
  { key: 'District', label: 'District' },
  { key: 'Ward', label: 'Ward' },
  { key: 'CommunityArea', label: 'Community Area' },
  { key: 'FBICode', label: 'FBI Code' },
  { key: 'Year', label: 'Year' },
  { key: 'Arrest', label: 'Arrest' },
  { key: 'Block', label: 'Block' },
  { key: 'Domestic', label: 'Domestic' },
];

const AdminCrimeTable: React.FC<CrimeTableProps> = ({ results, onSave }) => {
  const [itemsToShow, setItemsToShow] = useState<number>(100);
  const [selectedColumns, setSelectedColumns] = useState<string[]>(columns.slice(0, 6).map(c => c.key));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Partial<CrimeRecord>>({});

  const handleLoadMore = () => {
    setItemsToShow(prev => prev + 100);
  };

  const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (event.target.checked) {
      if (selectedColumns.length < 6) {
        setSelectedColumns(prev => [...prev, key]);
      }
    } else {
      setSelectedColumns(prev => prev.filter(col => col !== key));
    }
  };

  const handleEdit = (record: CrimeRecord) => {
    setEditingId(record._id);
    setEditingData(record);
  };

  const handleChange = (key: keyof CrimeRecord, value: string | number | boolean) => {
    setEditingData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    if (editingId && editingData) {
      onSave({ ...editingData, _id: editingId } as CrimeRecord);
      setEditingId(null);
      setEditingData({});
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Select Columns (Max 6)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {columns.map(column => (
            <label key={column.key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={column.key}
                checked={selectedColumns.includes(column.key)}
                onChange={(e) => handleColumnChange(e, column.key)}
                disabled={!selectedColumns.includes(column.key) && selectedColumns.length >= 6}
              />
              <span>{column.label}</span>
            </label>
          ))}
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-800 text-white">
            {columns
              .filter(col => selectedColumns.includes(col.key))
              .map(col => (
                <th key={col.key} className="py-3 px-5 text-left border-b border-gray-600">
                  {col.label}
                </th>
              ))}
            <th className="py-3 px-5 text-left border-b border-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.slice(0, itemsToShow).map((result, index) => (
            <tr
              key={result._id}
              className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200 transition duration-200`}
            >
              {editingId === result._id ? (
                columns
                  .filter(col => selectedColumns.includes(col.key))
                  .map(col => (
                    <td key={col.key} className="py-3 px-5 border-b border-gray-300">
                      <input
                        type="text"
                        className="w-full border rounded p-1"
                        value={editingData[col.key as keyof CrimeRecord] as string}
                        onChange={(e) => handleChange(col.key as keyof CrimeRecord, e.target.value)}
                      />
                    </td>
                  ))
              ) : (
                columns
                  .filter(col => selectedColumns.includes(col.key))
                  .map(col => (
                    <td key={col.key} className="py-3 px-5 border-b border-gray-300">
                      {result[col.key as keyof CrimeRecord] as string}
                    </td>
                  ))
              )}
              <td className="py-3 px-5 border-b border-gray-300">
                {editingId === result._id ? (
                  <button onClick={handleSave} className="bg-green-500 text-white px-4 py-1 rounded">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(result)} className="bg-blue-500 text-white px-4 py-1 rounded">
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {itemsToShow < results.length && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminCrimeTable;
