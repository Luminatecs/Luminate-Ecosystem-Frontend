import React, { useState, useMemo, useRef, useEffect } from "react"
import styled from "styled-components"
import { Loader2, Filter, SearchIcon, AlertCircle, CheckSquare, ChevronDown, ChevronUp, MoreHorizontal, X, Edit, Eye, Save, Download, Printer, Lightbulb } from 'lucide-react'

// Types and Interfaces
export interface Column {
  key: string
  label: string
  sortable?: boolean
  filterable?: boolean
  width?: string
  align?: "left" | "center" | "right"
  render?: (value: any, row: any) => React.ReactNode
}

export interface RowAction {
  label: string
  icon?: string | React.ReactNode
  variant?: "default" | "primary" | "danger"
  onClick: (row: any, index: number) => void
}

export interface PaginationConfig {
  pageSize: number
  totalItems?: number
}

export interface GridAccordionTableProps {
  columns?: Column[]
  data?: any[]
  loading?: boolean
  error?: string | null
  searchable?: boolean
  filterable?: boolean
  sortable?: boolean
  selectable?: boolean
  multiSelect?: boolean
  
  // Accordion Configuration
  /** 
   * Enable accordion/expandable rows functionality. 
   * Note: Rows will only be clickable and show accordion content when either 
   * customAccordionComponent or renderAccordionContent is provided.
   */
  accordion?: boolean
  /** 
   * Custom function to render accordion content. Receives row data and row index.
   * Use this for simple custom rendering logic.
   * Required if you want accordion functionality when accordion=true.
   */
  renderAccordionContent?: (row: any, index: number) => React.ReactNode
  /** 
   * Custom React component to render accordion content. 
   * Can be either:
   * 1. A component with no props: React.ComponentType<{}>
   * 2. A component with columns and data props: React.ComponentType<{ columns: Column[]; data: any[] }>
   * Use this for complex reusable accordion components. Takes precedence over renderAccordionContent.
   * Required if you want accordion functionality when accordion=true.
   */
  customAccordionComponent?: React.ComponentType<{}> | React.ComponentType<{ columns: Column[]; data: any[] }>
  
  rowActions?: RowAction[]
  pagination?: PaginationConfig
  className?: string
  emptyMessage?: string
  onSelectionChange?: (selectedRows: any[]) => void
  onSort?: (column: string, direction: "asc" | "desc") => void
  onFilter?: (filters: Record<string, string[]>) => void
  onPageChange?: (page: number) => void
  headerBg?: string
  headerTextColor?: string
  headerTextSize?: string
  textColor?: string
  rowHoverBg?: string
  // New props for edit/delete permissions
  allowEdit?: boolean
  allowDelete?: boolean
  allowView?: boolean
  onEdit?: (row: any, index: number) => void
  onDelete?: (row: any, index: number) => void
  onView?: (row: any, index: number) => void
  onSave?: (row: any, index: number) => void
  // Added export and print props
  exportable?: boolean
  printable?: boolean
  onExport?: (data: any[], columns: Column[]) => void
  exportFileName?: string
  // CSV Mode props
  csvMode?: boolean
  csvmodeonmount?: boolean
  onCsvSave?: (data: any[]) => void
}

// Styled Components
const TableContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 4px 12px rgba(0, 0, 0, 0.04);
`

const LoadingOverlay = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(2px);
  z-index: 10;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .spinner {
    animation: spin 1s linear infinite;
    color: #6366f1;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #dc2626;
  gap: 0.75rem;
  margin: 1rem;
`

const Header = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  background: #fafbfc;
`

const SearchFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`

const StyledSearchInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  background: #ffffff;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`

const SearchIconStyled = styled(SearchIcon)`
  position: absolute;
  left: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
`

const FilterControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`

const FilterToggle = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${(props) => (props.active ? "#6366f1" : "#ffffff")};
  border: 1px solid ${(props) => (props.active ? "#6366f1" : "#e2e8f0")};
  border-radius: 10px;
  color: ${(props) => (props.active ? "#ffffff" : "#475569")};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${(props) => (props.active ? "#5855eb" : "#f8fafc")};
    border-color: ${(props) => (props.active ? "#5855eb" : "#cbd5e1")};
  }
`

const ActiveFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`

const FilterChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 20px;
  font-size: 13px;
  color: #1e40af;
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    color: #1e40af;
    padding: 0;
    display: flex;
    align-items: center;
    
    &:hover {
      color: #1e3a8a;
    }
  }
`

const FilterDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 280px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1rem;
  margin-top: 0.5rem;
  max-height: ${(props) => (props.isOpen ? "400px" : "0")};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
  transform: ${(props) => (props.isOpen ? "scaleY(1)" : "scaleY(0)")};
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
    border-radius: 2px;
    transition: background 0.2s ease;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(148, 163, 184, 0.5);
  }
  
  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.3) transparent;
`

const FilterSection = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const FilterLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  fontSize: 14px;
  background: #ffffff;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  
  &:hover {
    border-color: #cbd5e1;
    background-color: #f8fafc;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    background-color: #ffffff;
  }
  
  option {
    padding: 0.75rem;
    background: #ffffff;
    color: #374151;
    transition: all 0.2s ease;
    
    &:hover {
      background: #f8fafc;
    }
    
    &:checked {
      background: #eff6ff;
      color: #1e40af;
    }
  }
`

const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
  
  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
`

const StyledTable = styled.table`
  width: 100%;
  min-width: 800px; /* Set minimum table width to trigger scrolling earlier */
  border-collapse: collapse;
  table-layout: auto;
  
  /* Ensure columns have reasonable minimum widths */
  th, td {
    min-width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  /* Allow columns with explicit widths to override */
  th[style*="width"], td[style*="width"] {
    min-width: unset;
  }
`

const TableHeader = styled.thead<{ headerBg?: string; headerTextColor?: string; headerTextSize?: string }>`
  background: ${(props) => props.headerBg || "#f8fafc"};
  
  th {
    color: ${(props) => props.headerTextColor || "#374151"};
    font-size: ${(props) => props.headerTextSize || "14px"};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 1rem;
    text-align: left;
    border-bottom: 2px solid #e2e8f0;
  }
`

const TableBody = styled.tbody<{ textColor?: string; rowHoverBg?: string }>`
  tr {
    transition: background-color 0.2s ease;
    
    &:hover {
      background: ${(props) => props.rowHoverBg || "#f8fafc"};
    }
  }
  
  td {
    color: ${(props) => props.textColor || "#374151"};
    padding: 1rem;
    border-bottom: 1px solid #f1f5f9;
    vertical-align: middle;
  }
`

const TableRow = styled.tr<{ selected?: boolean; accordion?: boolean }>`
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  
  ${(props) =>
    props.selected &&
    `
    background: #eff6ff;
    border-color: #bfdbfe;
  `}
  
  &:hover {
    background: ${(props) => (props.selected ? "#dbeafe" : "#f8fafc")};
  }
  
  ${(props) =>
    props.accordion &&
    `
    cursor: pointer;
  `}
`

const TableCell = styled.td<{ align?: string }>`
  padding: 1rem 1.5rem;
  text-align: ${(props) => props.align || "left"};
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
`

const CellContent = styled.div`
  display: flex;
  align-items: center;
`

const Checkbox = styled.input`
  cursor: pointer;
  width: 16px;
  height: 16px;
  accent-color: #6366f1;
`

const AccordionRow = styled.tr`
  background: #f8fafc;
`

const AccordionContent = styled.div<{ isExpanded: boolean }>`
  padding: ${(props) => (props.isExpanded ? "1.5rem" : "0")};
  border-top: ${(props) => (props.isExpanded ? "1px solid #e2e8f0" : "none")};
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: ${(props) => (props.isExpanded ? "500px" : "0")};
  opacity: ${(props) => (props.isExpanded ? "1" : "0")};
`

const ActionsContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding-right: 0.5rem;
`

const ActionsTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  border-radius: 6px;
  cursor: pointer;
  color: #94a3b8;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f1f5f9;
    color: #475569;
  }
`

const ActionsDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 160px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 50;
  overflow: hidden;
  margin-top: 0.25rem;
`

const ActionItem = styled.button<{ variant?: string }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${(props) => {
    switch (props.variant) {
      case "danger":
        return `
          color: #dc2626;
          &:hover { background: #fef2f2; }
        `
      case "primary":
        return `
          color: #6366f1;
          &:hover { background: #eff6ff; }
        `
      default:
        return `
          color: #374151;
          &:hover { background: #f8fafc; }
        `
    }
  }}
`

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-top: 1px solid #f1f5f9;
  background: #fafbfc;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const PaginationInfo = styled.div`
  font-size: 14px;
  color: #64748b;
`

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`

const PaginationButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${(props) => (props.active ? "#6366f1" : "#e2e8f0")};
  background: ${(props) => (props.active ? "#6366f1" : "#ffffff")};
  color: ${(props) => (props.active ? "#ffffff" : "#475569")};
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 40px;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:not(:disabled):hover {
    background: ${(props) => (props.active ? "#5855eb" : "#f8fafc")};
    border-color: ${(props) => (props.active ? "#5855eb" : "#cbd5e1")};
  }
`

const PaginationEllipsis = styled.span`
  padding: 0.5rem;
  color: #94a3b8;
`

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  text-align: center;
`

const EmptyStateIcon = styled.div`
  margin-bottom: 1rem;
  opacity: 0.4;
  color: #6366f1;
`

const EmptyStateTitle = styled.h3`
  margin: 0;
  margin-bottom: 0.5rem;
  font-size: 18px;
  font-weight: 600;
  color: #374151;
`

const EmptyStateMessage = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 14px;
`

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`

const Modal = styled.div<{ isOpen: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  transform: ${(props) => (props.isOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)")};
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`

const SlidePanel = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  z-index: 2000;
  padding: 2rem;
  overflow-y: auto;
  transform: ${(props) => (props.isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #374151;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  color: #6b7280;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`

const FormField = styled.div`
  margin-bottom: 1.5rem;
`

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid;
  
  ${(props) =>
    props.variant === "primary"
      ? `
    background: #6366f1;
    border-color: #6366f1;
    color: white;
    
    &:hover {
      background: #5855eb;
      border-color: #5855eb;
    }
  `
      : `
    background: white;
    border-color: #e2e8f0;
    color: #374151;
    
    &:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
    }
  `}
`

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f5f9;
  
  &:last-child {
    border-bottom: none;
  }
`

const DetailLabel = styled.span`
  font-weight: 600;
  color: #374151;
  font-size: 14px;
`

const DetailValue = styled.span`
  color: #6b7280;
  font-size: 14px;
`

const ActionButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${props => props.active ? '#f8fafc' : '#ffffff'};
  border: 1px solid ${props => props.active ? '#3b82f6' : '#e2e8f0'};
  border-radius: 10px;
  color: ${props => props.active ? '#3b82f6' : '#475569'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? '#f1f5f9' : '#f8fafc'};
    border-color: ${props => props.active ? '#2563eb' : '#cbd5e1'};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`

// Special glowing icon component for the tungsten lightbulb
const GlowingLightbulb = styled(Lightbulb)<{ active?: boolean }>`
  transition: all 0.3s ease;
  
  ${props => props.active ? `
    color: #ff8c00;
    filter: drop-shadow(0 0 8px rgba(255, 140, 0, 0.6))
            drop-shadow(0 0 16px rgba(255, 140, 0, 0.4))
            drop-shadow(0 0 24px rgba(255, 165, 0, 0.3));
    
    /* Tungsten glow animation for the icon only */
    animation: iconGlow 2s ease-in-out infinite alternate;
    
    @keyframes iconGlow {
      0% {
        color: #ff8c00;
        filter: drop-shadow(0 0 6px rgba(255, 140, 0, 0.5))
                drop-shadow(0 0 12px rgba(255, 140, 0, 0.3))
                drop-shadow(0 0 18px rgba(255, 165, 0, 0.2));
      }
      100% {
        color: #ffb347;
        filter: drop-shadow(0 0 10px rgba(255, 140, 0, 0.7))
                drop-shadow(0 0 20px rgba(255, 140, 0, 0.5))
                drop-shadow(0 0 30px rgba(255, 165, 0, 0.4));
      }
    }
  ` : `
    color: inherit;
    filter: none;
  `}
`

const PrintStyles = styled.div`
  @media print {
    @page {
      size: landscape;
      margin: 0.5in;
    }
    
    * {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    
    body * {
      visibility: hidden;
    }
    
    .printable-table, .printable-table * {
      visibility: visible;
    }
    
    .printable-table {
      position: absolute;
      left: 0;
      top: 0;
      width: 100% !important;
    }
    
    .no-print {
      display: none !important;
    }
    
    table {
      border-collapse: collapse !important;
      width: 100% !important;
      font-size: 10px !important;
    }
    
    th, td {
      border: 1px solid #000 !important;
      padding: 4px !important;
      word-wrap: break-word !important;
    }
    
    th {
      background-color: #f5f5f5 !important;
      font-weight: bold !important;
      font-size: 9px !important;
    }
  }
`

// CSV Mode Styled Components
const CsvModeContainer = styled.div`
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin: 1rem;
`

const CsvDropZone = styled.div<{ isDragging: boolean }>`
  background: ${props => props.isDragging ? '#eff6ff' : '#ffffff'};
  border: 2px dashed ${props => props.isDragging ? '#3b82f6' : '#e2e8f0'};
  border-radius: 8px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1rem;
  
  &:hover {
    border-color: #3b82f6;
    background: #eff6ff;
  }
`

const CsvModeToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 8px;
  margin-bottom: 1rem;
`

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`

const ToggleSlider = styled.span<{ checked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.checked ? '#3b82f6' : '#ccc'};
  transition: .4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: ${props => props.checked ? '30px' : '4px'};
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`

const CsvFileInput = styled.input`
  display: none;
`

const CsvUploadButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: #2563eb;
  }
`

const CsvActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`

const CsvSaveButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #059669;
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`

const CsvCancelButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #dc2626;
  }
`

// Main Component
const GridAccordionTable: React.FC<GridAccordionTableProps> = ({
  columns,
  data = [],
  loading = false,
  error = null,
  searchable = true,
  filterable = true,
  sortable = true,
  selectable = false,
  multiSelect = false,
  accordion = false,
  renderAccordionContent,
  customAccordionComponent: CustomAccordionComponent,
  rowActions = [],
  pagination,
  className = "",
  emptyMessage = "No data available",
  onSelectionChange,
  onSort,
  onFilter,
  onPageChange,
  headerBg = "#f8fafc",
  headerTextColor = "#1e293b",
  headerTextSize = "14px",
  textColor = "#475569",
  rowHoverBg = "#f8fafc",
  // New props for edit/delete permissions
  allowEdit = false,
  allowDelete = false,
  allowView = false,
  onEdit = () => {},
  onDelete = () => {},
  onView = () => {},
  onSave = () => {},
  // Added export and print props with defaults
  exportable = false,
  printable = false,
  onExport = () => {},
  exportFileName = "table-data",
  // CSV Mode props
  csvMode = false,
  csvmodeonmount = false,
  onCsvSave = () => {}
}) => {
  // State
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<Record<string, string[]>>({})
  const [showFilters, setShowFilters] = useState(false)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [columnOrder, setColumnOrder] = useState<number[]>(columns?.map((_, index) => index))

  // New state for modals and editing
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [viewPanelOpen, setViewPanelOpen] = useState(false)
  const [currentEditRow, setCurrentEditRow] = useState<any>(null)
  const [currentViewRow, setCurrentViewRow] = useState<any>(null)
  const [editFormData, setEditFormData] = useState<any>({})

  // CSV Mode state
  const [csvModeActive, setCsvModeActive] = useState(false)
  const [csvData, setCsvData] = useState<any[]>([])
  const [csvColumns, setCsvColumns] = useState<Column[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const filterDropdownRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get unique filter options for each column
  const getFilterOptions = (columnKey: string) => {
    const uniqueValues = Array.from(new Set(data.map((row) => row[columnKey])))?.filter(Boolean)
    return uniqueValues.sort()
  }

  // Filter and search data
  const filteredData = useMemo(() => {
    const sourceData = csvMode && csvModeActive && csvData.length > 0 ? csvData : data;
    const sourceColumns = csvMode && csvModeActive && csvColumns.length > 0 ? csvColumns : columns;
    
    return sourceData?.filter((row) => {
      // Search filter
      if (searchTerm) {
        const searchMatch = sourceColumns?.some((col) => {
          const value = row[col.key]
          return value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        })
        if (!searchMatch) return false
      }

      // Column filters - support multiple selections
      return Object.entries(filters).every(([key, values]) => {
        if (!values || values.length === 0) return true
        const rowValue = row[key]
        return values.includes(rowValue?.toString())
      })
    })
  }, [data, searchTerm, filters, columns, csvMode, csvModeActive, csvData, csvColumns])

  // Active columns (either CSV columns or regular columns)
  const activeColumns = csvMode && csvModeActive && csvColumns.length > 0 ? csvColumns : columns;

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue === bValue) return 0

      const comparison = aValue < bValue ? -1 : 1
      return sortConfig.direction === "desc" ? -comparison : comparison
    })
  }, [filteredData, sortConfig])

  // Pagination
  const pageSize = pagination?.pageSize || sortedData.length
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData
    const startIndex = (currentPage - 1) * pageSize
    return sortedData.slice(startIndex, startIndex + pageSize)
  }, [sortedData, currentPage, pageSize, pagination])

  // Handlers
  const handleSort = (column: string) => {
    if (!sortable) return

    setSortConfig((current) => {
      if (current?.key === column) {
        return current.direction === "asc" ? { key: column, direction: "desc" } : null
      }
      return { key: column, direction: "asc" }
    })

    onSort?.(column, sortConfig?.direction === "asc" ? "desc" : "asc")
  }

  const handleFilterChange = (column: string, value: string) => {
    const newFilters = { ...filters }

    if (value === "") {
      delete newFilters[column]
    } else {
      newFilters[column] = [value]
    }

    setFilters(newFilters)
    setCurrentPage(1)
    onFilter?.(newFilters)
  }

  const removeFilter = (column: string, value?: string) => {
    const newFilters = { ...filters }

    if (value) {
      newFilters[column] = newFilters[column]?.filter((v) => v !== value) || []
      if (newFilters[column].length === 0) {
        delete newFilters[column]
      }
    } else {
      delete newFilters[column]
    }

    setFilters(newFilters)
    onFilter?.(newFilters)
  }

  const handleRowSelect = (rowIndex: number) => {
    if (!selectable) return

    const newSelectedRows = new Set(selectedRows)

    if (multiSelect) {
      if (selectedRows.has(rowIndex)) {
        newSelectedRows.delete(rowIndex)
      } else {
        newSelectedRows.add(rowIndex)
      }
    } else {
      newSelectedRows.clear()
      newSelectedRows.add(rowIndex)
    }

    setSelectedRows(newSelectedRows)

    const selectedData = Array.from(newSelectedRows).map((index) => paginatedData[index])
    onSelectionChange?.(selectedData)
  }

  const handleRowDoubleClick = (rowIndex: number) => {
    if (!accordion) return

    const newExpandedRows = new Set<number>()
    if (!expandedRows.has(rowIndex)) {
      newExpandedRows.add(rowIndex)
    }
    setExpandedRows(newExpandedRows)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    onPageChange?.(page)
  }

  const handleColumnDrag = (fromIndex: number, toIndex: number) => {
    const newColumnOrder = [...columnOrder]
    const [movedColumn] = newColumnOrder.splice(fromIndex, 1)
    newColumnOrder.splice(toIndex, 0, movedColumn)
    setColumnOrder(newColumnOrder)
  }

  const toggleDropdown = (rowIndex: number) => {
    setActiveDropdown(activeDropdown === rowIndex ? null : rowIndex)
  }

  const toggleRow = (rowIndex: number) => {
    const newExpandedRows = new Set<number>()
    if (!expandedRows.has(rowIndex)) {
      newExpandedRows.add(rowIndex)
    }
    setExpandedRows(newExpandedRows)
  }

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedRows = new Set<number>()
    if (e.target.checked) {
      paginatedData.forEach((_, index) => newSelectedRows.add(index))
    }
    setSelectedRows(newSelectedRows)

    const selectedData = Array.from(newSelectedRows).map((index) => paginatedData[index])
    onSelectionChange?.(selectedData)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
        setShowFilters(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Auto-enable CSV mode on mount if csvmodeonmount is true
  useEffect(() => {
    if (csvmodeonmount) {
      setCsvModeActive(true)
    }
  }, [csvmodeonmount])

  const renderCellContent = (column: Column, value: any, row: any) => {
    if (column.render) {
      return column.render(value, row)
    }

    if (column.key === "name" && typeof value === "string") {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontWeight: "500" }}>{value}</span>
        </div>
      )
    }

    return value
  }

  // Error state
  if (error) {
    return (
      <TableContainer className={className}>
        <ErrorMessage>
          <AlertCircle size={20} />
          <span>{error}</span>
        </ErrorMessage>
      </TableContainer>
    )
  }

  // Empty state component
  const EmptyState = () => (
    <EmptyStateContainer>
      <EmptyStateIcon>
        <CheckSquare size={48} />
      </EmptyStateIcon>
      <EmptyStateTitle>No data found</EmptyStateTitle>
      <EmptyStateMessage>{emptyMessage}</EmptyStateMessage>
    </EmptyStateContainer>
  )

  // Pagination component
  const PaginationComponent = () => {
    if (!pagination || totalPages <= 1) return null

    const maxVisiblePages = 5
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

    return (
      <PaginationContainer>
        <PaginationInfo>
          Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
          {sortedData.length} entries
        </PaginationInfo>
        <PaginationControls>
          <PaginationButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </PaginationButton>

          {startPage > 1 && (
            <>
              <PaginationButton onClick={() => handlePageChange(1)}>1</PaginationButton>
              {startPage > 2 && <PaginationEllipsis>...</PaginationEllipsis>}
            </>
          )}

          {pages.map((page) => (
            <PaginationButton key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
              {page}
            </PaginationButton>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <PaginationEllipsis>...</PaginationEllipsis>}
              <PaginationButton onClick={() => handlePageChange(totalPages)}>{totalPages}</PaginationButton>
            </>
          )}

          <PaginationButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </PaginationButton>
        </PaginationControls>
      </PaginationContainer>
    )
  }

  // New handlers for edit, delete, view functionality
  const handleEdit = (row: any, index: number) => {
    setCurrentEditRow({ ...row, index })
    setEditFormData({ ...row })
    setEditModalOpen(true)
    onEdit(row, index)
  }

  const handleDelete = (row: any, index: number) => {
    onDelete(row, index)
  }

  const handleView = (row: any, index: number) => {
    setCurrentViewRow({ ...row, index })
    setViewPanelOpen(true)
    onView(row, index)
  }

  const handleSave = () => {
    if (currentEditRow) {
      onSave(editFormData, currentEditRow.index)
      setEditModalOpen(false)
      setCurrentEditRow(null)
      setEditFormData({})
    }
  }

  const handleEditFormChange = (key: string, value: any) => {
    setEditFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }))
  }

  const getDefaultRowActions = (): RowAction[] => {
    const actions: RowAction[] = []

    if (allowView) {
      actions.push({
        label: "View Details",
        icon: <Eye size={16} />,
        variant: "default",
        onClick: handleView,
      })
    }

    if (allowEdit) {
      actions.push({
        label: "Edit",
        icon: <Edit size={16} />,
        variant: "primary",
        onClick: handleEdit,
      })
    }

    if (allowDelete) {
      actions.push({
        label: "Delete",
        icon: <X size={16} />,
        variant: "danger",
        onClick: handleDelete,
      })
    }

    return [...actions, ...rowActions]
  }

  const finalRowActions = getDefaultRowActions()

  // Added export functionality
  const handleExport = () => {
    const exportData = csvMode && csvModeActive && csvData.length > 0 ? csvData : filteredData;
    const exportColumns = csvMode && csvModeActive && csvColumns.length > 0 ? csvColumns : activeColumns;
    
    if (onExport && typeof onExport === 'function') {
      onExport(exportData, exportColumns);
    } else {
      // Default CSV export
      const csvContent = generateCSV(exportData, exportColumns);
      downloadCSV(csvContent, `${exportFileName}.csv`);
    }
  };

  const generateCSV = (data: any[], columns: Column[]) => {
    const headers = columns.map(col => col.label).join(',');
    const rows = data.map(row => 
      columns.map(col => {
        const value = row[col.key];
        // Handle commas and quotes in CSV
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(',')
    );
    return [headers, ...rows].join('\n');
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Added print functionality
  const handlePrint = () => {
    window.print();
  };

  // CSV Mode functions
  const parseCSV = (csvText: string): { data: any[], columns: Column[] } => {
    const lines = csvText.trim().split('\n');
    if (lines.length === 0) return { data: [], columns: [] };

    const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));
    const parsedColumns: Column[] = headers.map((header, index) => ({
      key: header.toLowerCase().replace(/\s+/g, '_'),
      label: header,
      sortable: true,
      filterable: true
    }));

    const parsedData = lines.slice(1).map((line, rowIndex) => {
      const values = line.split(',').map(value => value.trim().replace(/"/g, ''));
      const rowData: any = { id: rowIndex + 1 };
      headers.forEach((header, colIndex) => {
        const key = header.toLowerCase().replace(/\s+/g, '_');
        rowData[key] = values[colIndex] || '';
      });
      return rowData;
    });

    return { data: parsedData, columns: parsedColumns };
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvText = e.target?.result as string;
        const { data: newData, columns: newColumns } = parseCSV(csvText);
        setCsvData(newData);
        setCsvColumns(newColumns);
        setHasUnsavedChanges(false);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(event.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv');
    
    if (csvFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvText = e.target?.result as string;
        const { data: newData, columns: newColumns } = parseCSV(csvText);
        setCsvData(newData);
        setCsvColumns(newColumns);
        setHasUnsavedChanges(false);
      };
      reader.readAsText(csvFile);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleCsvSave = () => {
    if (csvData.length > 0) {
      onCsvSave(csvData);
      setHasUnsavedChanges(false);
    }
  };

  const handleCsvCancel = () => {
    setCsvModeActive(false);
    setCsvData([]);
    setCsvColumns([]);
    setHasUnsavedChanges(false);
  };

  const handleCsvDataEdit = (rowIndex: number, columnKey: string, value: any) => {
    const newData = [...csvData];
    newData[rowIndex][columnKey] = value;
    setCsvData(newData);
    setHasUnsavedChanges(true);
  };

  return (
    <>
      <PrintStyles />
      <TableContainer className={`${className} printable-table`}>
        {(searchable || filterable || exportable || printable) && (
          <Header>
            <SearchFilterContainer>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                {searchable && (
                  <SearchContainer>
                    <SearchIconStyled size={16} />
                    <StyledSearchInput
                      type="text"
                      placeholder="Search across all columns..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </SearchContainer>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                {/* Added export and print buttons */}
                {exportable && (
                  <ActionButton onClick={handleExport} className="no-print">
                    <Download size={16} />
                    Export
                  </ActionButton>
                )}
                
                {printable && (
                  <ActionButton onClick={handlePrint} className="no-print">
                    <Printer size={16} />
                    Print
                  </ActionButton>
                )}

                {/* CSV Mode Toggle */}
                {csvMode && (
                  <ActionButton 
                    active={csvModeActive}
                    onClick={() => setCsvModeActive(!csvModeActive)} 
                    className="no-print"
                  >
                    <GlowingLightbulb size={16} active={csvModeActive} />
                    {csvModeActive ? 'Exit CSV Mode' : 'CSV Mode'}
                  </ActionButton>
                )}

                {filterable && (
                  <div style={{ position: "relative", zIndex: 1000 }} ref={filterDropdownRef}>
                    <FilterToggle active={showFilters} onClick={() => setShowFilters(!showFilters)} className="no-print">
                      <Filter size={16} />
                      Filters
                      {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </FilterToggle>

                    <FilterDropdown isOpen={showFilters}>
                      {columns
                        .filter((col) => col.filterable !== false)
                        .map((column) => (
                          <FilterSection key={column.key}>
                            <FilterLabel>{column.label}</FilterLabel>
                            <StyledSelect
                              value={filters[column.key]?.[0] || ""}
                              onChange={(e) => handleFilterChange(column.key, e.target.value)}
                            >
                              <option value="">All {column.label}</option>
                              {getFilterOptions(column.key).map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </StyledSelect>
                          </FilterSection>
                        ))}
                    </FilterDropdown>
                  </div>
                )}
              </div>
            </SearchFilterContainer>
          </Header>
        )}

        {/* CSV Mode Interface */}
        {csvMode && csvModeActive && (
          <CsvModeContainer>
            <h3 style={{ margin: '0 0 1rem 0', color: '#1f2937' }}>CSV Import Mode</h3>
            
            {csvData.length === 0 ? (
              <>
                <CsvDropZone
                  isDragging={isDragging}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div>
                    <Download size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>
                      {isDragging ? 'Drop CSV file here' : 'Import CSV File'}
                    </h4>
                    <p style={{ margin: '0', color: '#6b7280' }}>
                      Drag and drop a CSV file here, or click to browse
                    </p>
                  </div>
                </CsvDropZone>
                
                <CsvFileInput
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                />
                
                <CsvUploadButton onClick={() => fileInputRef.current?.click()}>
                  Browse Files
                </CsvUploadButton>
              </>
            ) : (
              <CsvActions>
                <CsvSaveButton 
                  onClick={handleCsvSave}
                  disabled={csvData.length === 0}
                >
                  Save to Database ({csvData.length} rows)
                </CsvSaveButton>
                <CsvCancelButton onClick={handleCsvCancel}>
                  Cancel
                </CsvCancelButton>
              </CsvActions>
            )}
          </CsvModeContainer>
        )}

        {/* Main Table - Hidden when CSV mode is active but no data loaded */}
        {(!csvMode || !csvModeActive || csvData.length > 0) && (
          <TableWrapper>
          <StyledTable>
            <TableHeader headerBg={headerBg} headerTextColor={headerTextColor} headerTextSize={headerTextSize}>
              <tr>
                {selectable && (
                  <th style={{ width: "48px" }}>
                    {multiSelect && (
                      <input
                        type="checkbox"
                        checked={selectedRows.size === filteredData.length && filteredData.length > 0}
                        onChange={handleSelectAll}
                      />
                    )}
                  </th>
                )}

                {activeColumns.map((column) => (
                  <th key={column.key} style={{ width: column.width }}>
                    {sortable && column.sortable !== false ? (
                      <div
                        onClick={() => handleSort(column.key)}
                        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}
                      >
                        {column.label}
                        {sortConfig?.key === column.key && (
                          <ChevronUp
                            size={16}
                            style={{
                              transform: sortConfig.direction === "desc" ? "rotate(180deg)" : "none",
                              transition: "transform 0.2s ease",
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      column.label
                    )}
                  </th>
                ))}

                {finalRowActions.length > 0 && <th style={{ width: "40px" }}></th>}
              </tr>
            </TableHeader>

            <TableBody textColor={textColor} rowHoverBg={rowHoverBg}>
              {error ? (
                <tr>
                  <td colSpan={activeColumns.length + (selectable ? 1 : 0) + (finalRowActions.length > 0 ? 1 : 0)}>
                    <div style={{ textAlign: "center", padding: "2rem", color: "#dc2626" }}>{error}</div>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={activeColumns.length + (selectable ? 1 : 0) + (finalRowActions.length > 0 ? 1 : 0)}>
                    <div style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>No data available</div>
                  </td>
                </tr>
              ) : (
                filteredData.map((row, rowIndex) => (
                  <React.Fragment key={rowIndex}>
                    <TableRow
                      onClick={accordion && (CustomAccordionComponent || renderAccordionContent) ? () => toggleRow(rowIndex) : undefined}
                      style={{ cursor: accordion && (CustomAccordionComponent || renderAccordionContent) ? "pointer" : "default" }}
                    >
                      {selectable && (
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedRows.has(rowIndex)}
                            onChange={() => handleRowSelect(rowIndex)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </TableCell>
                      )}

                      {activeColumns.map((column) => (
                        <TableCell key={column.key}>{renderCellContent(column, row[column.key], row)}</TableCell>
                      ))}

                      {finalRowActions.length > 0 && (
                        <TableCell style={{ padding: "0.5rem", width: "40px" }}>
                          <ActionsContainer>
                            <ActionsTrigger
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveDropdown(activeDropdown === rowIndex ? null : rowIndex)
                              }}
                            >
                              <MoreHorizontal size={16} />
                            </ActionsTrigger>

                            {activeDropdown === rowIndex && (
                              <ActionsDropdown>
                                {finalRowActions.map((action, actionIndex) => (
                                  <ActionItem
                                    key={actionIndex}
                                    variant={action.variant}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      action.onClick(row, rowIndex)
                                      setActiveDropdown(null)
                                    }}
                                  >
                                    {action.icon}
                                    {action.label}
                                  </ActionItem>
                                ))}
                              </ActionsDropdown>
                            )}
                          </ActionsContainer>
                        </TableCell>
                      )}
                    </TableRow>

                    {accordion && (CustomAccordionComponent || renderAccordionContent) && (
                      <AccordionRow>
                        <TableCell
                          colSpan={activeColumns.length + (selectable ? 1 : 0) + (finalRowActions.length > 0 ? 1 : 0)}
                          style={{ padding: 0 }}
                        >
                          <AccordionContent isExpanded={expandedRows.has(rowIndex)}>
                            {CustomAccordionComponent ? (
                              <CustomAccordionComponent columns={activeColumns} data={csvMode && csvModeActive && csvData.length > 0 ? csvData : data} />
                            ) : renderAccordionContent ? (
                              renderAccordionContent(row, rowIndex)
                            ) : null}
                          </AccordionContent>
                        </TableCell>
                      </AccordionRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </StyledTable>
          <LoadingOverlay isVisible={loading}>
            <div>
              <Loader2 size={32} className="spinner" />
              <span>Loading...</span>
            </div>
          </LoadingOverlay>
        </TableWrapper>
        )}

        {/* Existing pagination code */}
        <PaginationComponent />
      </TableContainer>

      <ModalOverlay isOpen={editModalOpen} onClick={() => setEditModalOpen(false)}>
        <Modal isOpen={editModalOpen} onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Edit Item</ModalTitle>
            <CloseButton onClick={() => setEditModalOpen(false)}>
              <X size={20} />
            </CloseButton>
          </ModalHeader>

          {currentEditRow && (
            <div>
              {activeColumns.map((column) => (
                <FormField key={column.key}>
                  <FormLabel>{column.label}</FormLabel>
                  <FormInput
                    type="text"
                    value={editFormData[column.key] || ""}
                    onChange={(e) => {
                      handleEditFormChange(column.key, e.target.value);
                      // Handle CSV data editing if in CSV mode
                      if (csvMode && csvModeActive) {
                        handleCsvDataEdit(currentEditRow.index, column.key, e.target.value);
                      }
                    }}
                  />
                </FormField>
              ))}

              <ButtonGroup>
                <Button variant="secondary" onClick={() => setEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  <Save size={16} style={{ marginRight: "0.5rem" }} />
                  Save Changes
                </Button>
              </ButtonGroup>
            </div>
          )}
        </Modal>
      </ModalOverlay>

      <SlidePanel isOpen={viewPanelOpen}>
        <ModalHeader>
          <ModalTitle>View Details</ModalTitle>
          <CloseButton onClick={() => setViewPanelOpen(false)}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        {currentViewRow && (
          <div>
            {activeColumns.map((column) => (
              <DetailRow key={column.key}>
                <DetailLabel>{column.label}:</DetailLabel>
                <DetailValue>{currentViewRow[column.key]}</DetailValue>
              </DetailRow>
            ))}
          </div>
        )}
      </SlidePanel>
    </>
  )
}

export default GridAccordionTable
