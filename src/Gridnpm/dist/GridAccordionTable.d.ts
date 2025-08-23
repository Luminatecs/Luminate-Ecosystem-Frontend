import React from "react";
export interface Column {
    key: string;
    label: string;
    sortable?: boolean;
    filterable?: boolean;
    width?: string;
    align?: "left" | "center" | "right";
    render?: (value: any, row: any) => React.ReactNode;
}
export interface RowAction {
    label: string;
    icon?: string | React.ReactNode;
    variant?: "default" | "primary" | "danger";
    onClick: (row: any, index: number) => void;
}
export interface PaginationConfig {
    pageSize: number;
    totalItems?: number;
}
export interface GridAccordionTableProps {
    columns: Column[];
    data: any[];
    loading?: boolean;
    error?: string | null;
    searchable?: boolean;
    filterable?: boolean;
    sortable?: boolean;
    selectable?: boolean;
    multiSelect?: boolean;
    /**
     * Enable accordion/expandable rows functionality.
     * Note: Rows will only be clickable and show accordion content when either
     * customAccordionComponent or renderAccordionContent is provided.
     */
    accordion?: boolean;
    /**
     * Custom function to render accordion content. Receives row data and row index.
     * Use this for simple custom rendering logic.
     * Required if you want accordion functionality when accordion=true.
     */
    renderAccordionContent?: (row: any, index: number) => React.ReactNode;
    /**
     * Custom React component to render accordion content.
     * Can be either:
     * 1. A component with no props: React.ComponentType<{}>
     * 2. A component with columns and data props: React.ComponentType<{ columns: Column[]; data: any[] }>
     * Use this for complex reusable accordion components. Takes precedence over renderAccordionContent.
     * Required if you want accordion functionality when accordion=true.
     */
    customAccordionComponent?: React.ComponentType<{}> | React.ComponentType<{
        columns: Column[];
        data: any[];
    }>;
    rowActions?: RowAction[];
    pagination?: PaginationConfig;
    className?: string;
    emptyMessage?: string;
    onSelectionChange?: (selectedRows: any[]) => void;
    onSort?: (column: string, direction: "asc" | "desc") => void;
    onFilter?: (filters: Record<string, string[]>) => void;
    onPageChange?: (page: number) => void;
    headerBg?: string;
    headerTextColor?: string;
    headerTextSize?: string;
    textColor?: string;
    rowHoverBg?: string;
    allowEdit?: boolean;
    allowDelete?: boolean;
    allowView?: boolean;
    onEdit?: (row: any, index: number) => void;
    onDelete?: (row: any, index: number) => void;
    onView?: (row: any, index: number) => void;
    onSave?: (row: any, index: number) => void;
    exportable?: boolean;
    printable?: boolean;
    onExport?: (data: any[], columns: Column[]) => void;
    exportFileName?: string;
    csvMode?: boolean;
    onCsvSave?: (data: any[]) => void;
}
declare const GridAccordionTable: React.FC<GridAccordionTableProps>;
export default GridAccordionTable;
//# sourceMappingURL=GridAccordionTable.d.ts.map