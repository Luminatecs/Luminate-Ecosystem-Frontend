import React from 'react';

// Simple test component to verify React hooks work
const SimpleTable: React.FC<{ data: any[]; columns: any[] }> = ({ data, columns }) => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '1rem' }}>
      <h4>Simple Table Test</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: '16px', textAlign: 'center', color: '#666' }}>
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    {row[col.key] || '-'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
