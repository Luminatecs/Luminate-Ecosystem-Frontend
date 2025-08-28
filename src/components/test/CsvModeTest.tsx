import React, { useState } from 'react';
import GridAccordionTable, { Column } from '../../Gridnpm/GridAccordionTable';

const CsvModeTest: React.FC = () => {
  const [savedData, setSavedData] = useState<any[]>([]);

  // These would normally be passed from a parent component
  // But for CSV mode, they're optional since the component
  // will use the CSV data and columns instead
  const columns: Column[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  const handleCsvSave = (csvData: any[]) => {
    console.log('Saving CSV data:', csvData);
    setSavedData(csvData);
    alert(`Saved ${csvData.length} rows to database!`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>CSV Mode Test</h1>
      <p>This component tests the CSV mode functionality where columns and data props are optional.</p>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Regular Mode (with columns and data props)</h2>
        <GridAccordionTable
          columns={columns}
          data={data}
          searchable={true}
          filterable={true}
          sortable={true}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>CSV Mode (columns and data props not required)</h2>
        <GridAccordionTable
          csvMode={true}
          searchable={true}
          filterable={true}
          sortable={true}
          onCsvSave={handleCsvSave}
          emptyMessage="Upload a CSV file to get started"
        />
      </div>

      {savedData.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Saved Data</h2>
          <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}>
            {JSON.stringify(savedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CsvModeTest;
