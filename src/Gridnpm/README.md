# React Grid Accordion Table

A powerful and flexible React table component with accordion functionality, CSV import/export capabilities, advanced filtering, sorting, and pagination.

## Features

✨ **Rich Table Features:**
- Dynamic columns with custom alignment and styling
- Row selection (single and multi-select)
- Advanced filtering and searching
- Sortable columns
- Pagination with customizable page sizes
- Row actions and custom buttons

🎺 **Accordion Integration:**
- Expandable rows with custom content
- Support for components with or without props
- Dynamic accordion content rendering

📊 **CSV Functionality:**
- Import CSV files with drag & drop
- Edit CSV data inline
- Export table data to CSV
- Save CSV changes with validation

🎨 **Customization:**
- Styled-components based theming
- Custom colors and typography
- Responsive design
- Print-friendly styling

## Installation

```bash
npm install react-grid-accordion-table
```

## Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install react react-dom styled-components lucide-react
```

## Basic Usage

```tsx
import React from 'react';
import GridAccordionTable, { Column } from 'react-grid-accordion-table';

const data = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin'
  },
  // ... more data
];

const columns: Column[] = [
  { key: 'name', label: 'Name', sortable: true, filterable: true },
  { key: 'email', label: 'Email', sortable: true, filterable: true },
  { key: 'role', label: 'Role', sortable: true, filterable: true },
];

function MyTable() {
  return (
    <GridAccordionTable
      data={data}
      columns={columns}
      searchable
      filterable
      sortable
      pagination={{ pageSize: 10 }}
    />
  );
}
```

## Advanced Usage with Accordion

```tsx
import React from 'react';
import GridAccordionTable, { Column } from 'react-grid-accordion-table';

// Custom accordion component
const UserDetails = ({ columns, data }) => (
  <div style={{ padding: '1rem' }}>
    <h4>User Details</h4>
    <p>Additional information for {data.name}</p>
  </div>
);

function AdvancedTable() {
  return (
    <GridAccordionTable
      data={data}
      columns={columns}
      customAccordion={UserDetails}
      csvMode={true}
      exportable
      printable
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | `[]` | Array of data objects to display |
| `columns` | `Column[]` | `[]` | Column definitions |
| `searchable` | `boolean` | `false` | Enable search functionality |
| `filterable` | `boolean` | `false` | Enable column filtering |
| `sortable` | `boolean` | `false` | Enable column sorting |
| `selectable` | `boolean` | `false` | Enable row selection |
| `multiSelect` | `boolean` | `false` | Allow multiple row selection |
| `pagination` | `object` | `null` | Pagination configuration |
| `customAccordion` | `React.Component` | `null` | Custom accordion component |
| `csvMode` | `boolean` | `false` | Enable CSV import/export |
| `exportable` | `boolean` | `false` | Show export button |
| `printable` | `boolean` | `false` | Show print button |

## Column Definition

```tsx
interface Column {
  key: string;          // Data property key
  label: string;        // Column header text
  sortable?: boolean;   // Enable sorting for this column
  filterable?: boolean; // Enable filtering for this column
  align?: 'left' | 'center' | 'right'; // Text alignment
  width?: string;       // Column width (CSS value)
  render?: (value: any, row: any) => React.ReactNode; // Custom cell renderer
}
```

## Styling

The component uses styled-components and accepts theme props for customization:

```tsx
<GridAccordionTable
  data={data}
  columns={columns}
  headerBg="#f8fafc"
  headerTextColor="#374151"
  rowHoverBg="#f1f5f9"
  textColor="#374151"
/>
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
