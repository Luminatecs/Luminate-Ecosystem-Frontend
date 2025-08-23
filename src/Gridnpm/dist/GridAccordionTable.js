"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var lucide_react_1 = require("lucide-react");
// Styled Components
var TableContainer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  background: #ffffff;\n  border-radius: 16px;\n  border: 1px solid #e5e7eb;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 4px 12px rgba(0, 0, 0, 0.04);\n"], ["\n  width: 100%;\n  background: #ffffff;\n  border-radius: 16px;\n  border: 1px solid #e5e7eb;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;\n  overflow: hidden;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02), 0 4px 12px rgba(0, 0, 0, 0.04);\n"])));
var LoadingOverlay = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.95);\n  backdrop-filter: blur(2px);\n  z-index: 10;\n  opacity: ", ";\n  visibility: ", ";\n  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  \n  > div {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 1rem;\n  }\n  \n  .spinner {\n    animation: spin 1s linear infinite;\n    color: #6366f1;\n  }\n  \n  @keyframes spin {\n    from { transform: rotate(0deg); }\n    to { transform: rotate(360deg); }\n  }\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.95);\n  backdrop-filter: blur(2px);\n  z-index: 10;\n  opacity: ", ";\n  visibility: ", ";\n  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  \n  > div {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 1rem;\n  }\n  \n  .spinner {\n    animation: spin 1s linear infinite;\n    color: #6366f1;\n  }\n  \n  @keyframes spin {\n    from { transform: rotate(0deg); }\n    to { transform: rotate(360deg); }\n  }\n"])), function (props) { return (props.isVisible ? 1 : 0); }, function (props) { return (props.isVisible ? "visible" : "hidden"); });
var ErrorMessage = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem;\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  border-radius: 12px;\n  color: #dc2626;\n  gap: 0.75rem;\n  margin: 1rem;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 2rem;\n  background: #fef2f2;\n  border: 1px solid #fecaca;\n  border-radius: 12px;\n  color: #dc2626;\n  gap: 0.75rem;\n  margin: 1rem;\n"])));
var Header = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  padding: 1.5rem;\n  border-bottom: 1px solid #f1f5f9;\n  background: #fafbfc;\n"], ["\n  padding: 1.5rem;\n  border-bottom: 1px solid #f1f5f9;\n  background: #fafbfc;\n"])));
var SearchFilterContainer = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  \n  @media (min-width: 768px) {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n  }\n"], ["\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  \n  @media (min-width: 768px) {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n  }\n"])));
var SearchContainer = styled_components_1.default.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  position: relative;\n  flex: 1;\n  max-width: 400px;\n"], ["\n  position: relative;\n  flex: 1;\n  max-width: 400px;\n"])));
var StyledSearchInput = styled_components_1.default.input(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  width: 100%;\n  padding: 0.875rem 1rem 0.875rem 2.75rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  font-size: 14px;\n  background: #ffffff;\n  transition: all 0.2s ease;\n  \n  &:focus {\n    outline: none;\n    border-color: #6366f1;\n    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n  }\n  \n  &::placeholder {\n    color: #94a3b8;\n  }\n"], ["\n  width: 100%;\n  padding: 0.875rem 1rem 0.875rem 2.75rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  font-size: 14px;\n  background: #ffffff;\n  transition: all 0.2s ease;\n  \n  &:focus {\n    outline: none;\n    border-color: #6366f1;\n    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n  }\n  \n  &::placeholder {\n    color: #94a3b8;\n  }\n"])));
var SearchIconStyled = (0, styled_components_1.default)(lucide_react_1.SearchIcon)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  position: absolute;\n  left: 0.875rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #94a3b8;\n  pointer-events: none;\n"], ["\n  position: absolute;\n  left: 0.875rem;\n  top: 50%;\n  transform: translateY(-50%);\n  color: #94a3b8;\n  pointer-events: none;\n"])));
var FilterControls = styled_components_1.default.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n"])));
var FilterToggle = styled_components_1.default.button(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem;\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: 10px;\n  color: ", ";\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: ", ";\n    border-color: ", ";\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem;\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: 10px;\n  color: ", ";\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: ", ";\n    border-color: ", ";\n  }\n"])), function (props) { return (props.active ? "#6366f1" : "#ffffff"); }, function (props) { return (props.active ? "#6366f1" : "#e2e8f0"); }, function (props) { return (props.active ? "#ffffff" : "#475569"); }, function (props) { return (props.active ? "#5855eb" : "#f8fafc"); }, function (props) { return (props.active ? "#5855eb" : "#cbd5e1"); });
var ActiveFiltersContainer = styled_components_1.default.div(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: 1rem;\n"], ["\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: 1rem;\n"])));
var FilterChip = styled_components_1.default.div(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.75rem;\n  background: #eff6ff;\n  border: 1px solid #bfdbfe;\n  border-radius: 20px;\n  font-size: 13px;\n  color: #1e40af;\n  \n  button {\n    background: none;\n    border: none;\n    cursor: pointer;\n    color: #1e40af;\n    padding: 0;\n    display: flex;\n    align-items: center;\n    \n    &:hover {\n      color: #1e3a8a;\n    }\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.5rem 0.75rem;\n  background: #eff6ff;\n  border: 1px solid #bfdbfe;\n  border-radius: 20px;\n  font-size: 13px;\n  color: #1e40af;\n  \n  button {\n    background: none;\n    border: none;\n    cursor: pointer;\n    color: #1e40af;\n    padding: 0;\n    display: flex;\n    align-items: center;\n    \n    &:hover {\n      color: #1e3a8a;\n    }\n  }\n"])));
var FilterDropdown = styled_components_1.default.div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  position: absolute;\n  top: 100%;\n  right: 0;\n  min-width: 280px;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\n  z-index: 1000;\n  padding: 1rem;\n  margin-top: 0.5rem;\n  max-height: ", ";\n  opacity: ", ";\n  overflow-y: auto;\n  overflow-x: hidden;\n  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  transform-origin: top;\n  transform: ", ";\n  \n  /* Custom scrollbar styling */\n  &::-webkit-scrollbar {\n    width: 4px;\n  }\n  \n  &::-webkit-scrollbar-track {\n    background: transparent;\n  }\n  \n  &::-webkit-scrollbar-thumb {\n    background: rgba(148, 163, 184, 0.3);\n    border-radius: 2px;\n    transition: background 0.2s ease;\n  }\n  \n  &::-webkit-scrollbar-thumb:hover {\n    background: rgba(148, 163, 184, 0.5);\n  }\n  \n  /* Firefox scrollbar */\n  scrollbar-width: thin;\n  scrollbar-color: rgba(148, 163, 184, 0.3) transparent;\n"], ["\n  position: absolute;\n  top: 100%;\n  right: 0;\n  min-width: 280px;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\n  z-index: 1000;\n  padding: 1rem;\n  margin-top: 0.5rem;\n  max-height: ", ";\n  opacity: ", ";\n  overflow-y: auto;\n  overflow-x: hidden;\n  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  transform-origin: top;\n  transform: ", ";\n  \n  /* Custom scrollbar styling */\n  &::-webkit-scrollbar {\n    width: 4px;\n  }\n  \n  &::-webkit-scrollbar-track {\n    background: transparent;\n  }\n  \n  &::-webkit-scrollbar-thumb {\n    background: rgba(148, 163, 184, 0.3);\n    border-radius: 2px;\n    transition: background 0.2s ease;\n  }\n  \n  &::-webkit-scrollbar-thumb:hover {\n    background: rgba(148, 163, 184, 0.5);\n  }\n  \n  /* Firefox scrollbar */\n  scrollbar-width: thin;\n  scrollbar-color: rgba(148, 163, 184, 0.3) transparent;\n"])), function (props) { return (props.isOpen ? "400px" : "0"); }, function (props) { return (props.isOpen ? "1" : "0"); }, function (props) { return (props.isOpen ? "scaleY(1)" : "scaleY(0)"); });
var FilterSection = styled_components_1.default.div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  margin-bottom: 1rem;\n  \n  &:last-child {\n    margin-bottom: 0;\n  }\n"], ["\n  margin-bottom: 1rem;\n  \n  &:last-child {\n    margin-bottom: 0;\n  }\n"])));
var FilterLabel = styled_components_1.default.label(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n  color: #374151;\n  margin-bottom: 0.5rem;\n"], ["\n  display: block;\n  font-size: 13px;\n  font-weight: 600;\n  color: #374151;\n  margin-bottom: 0.5rem;\n"])));
var StyledSelect = styled_components_1.default.select(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  fontSize: 14px;\n  background: #ffffff;\n  color: #374151;\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  appearance: none;\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\");\n  background-position: right 0.75rem center;\n  background-repeat: no-repeat;\n  background-size: 1.5em 1.5em;\n  padding-right: 2.5rem;\n  \n  &:hover {\n    border-color: #cbd5e1;\n    background-color: #f8fafc;\n    transform: translateY(-1px);\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  }\n  \n  &:focus {\n    outline: none;\n    border-color: #6366f1;\n    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n    background-color: #ffffff;\n  }\n  \n  option {\n    padding: 0.75rem;\n    background: #ffffff;\n    color: #374151;\n    transition: all 0.2s ease;\n    \n    &:hover {\n      background: #f8fafc;\n    }\n    \n    &:checked {\n      background: #eff6ff;\n      color: #1e40af;\n    }\n  }\n"], ["\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  fontSize: 14px;\n  background: #ffffff;\n  color: #374151;\n  cursor: pointer;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  appearance: none;\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\");\n  background-position: right 0.75rem center;\n  background-repeat: no-repeat;\n  background-size: 1.5em 1.5em;\n  padding-right: 2.5rem;\n  \n  &:hover {\n    border-color: #cbd5e1;\n    background-color: #f8fafc;\n    transform: translateY(-1px);\n    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);\n  }\n  \n  &:focus {\n    outline: none;\n    border-color: #6366f1;\n    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n    background-color: #ffffff;\n  }\n  \n  option {\n    padding: 0.75rem;\n    background: #ffffff;\n    color: #374151;\n    transition: all 0.2s ease;\n    \n    &:hover {\n      background: #f8fafc;\n    }\n    \n    &:checked {\n      background: #eff6ff;\n      color: #1e40af;\n    }\n  }\n"])));
var TableWrapper = styled_components_1.default.div(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n  position: relative;\n  width: 100%;\n  overflow-x: auto;\n  \n  /* Custom scrollbar styling */\n  &::-webkit-scrollbar {\n    height: 8px;\n  }\n  \n  &::-webkit-scrollbar-track {\n    background: #f1f5f9;\n    border-radius: 4px;\n  }\n  \n  &::-webkit-scrollbar-thumb {\n    background: #cbd5e1;\n    border-radius: 4px;\n    transition: background 0.2s ease;\n  }\n  \n  &::-webkit-scrollbar-thumb:hover {\n    background: #94a3b8;\n  }\n  \n  /* Firefox scrollbar */\n  scrollbar-width: thin;\n  scrollbar-color: #cbd5e1 #f1f5f9;\n"], ["\n  position: relative;\n  width: 100%;\n  overflow-x: auto;\n  \n  /* Custom scrollbar styling */\n  &::-webkit-scrollbar {\n    height: 8px;\n  }\n  \n  &::-webkit-scrollbar-track {\n    background: #f1f5f9;\n    border-radius: 4px;\n  }\n  \n  &::-webkit-scrollbar-thumb {\n    background: #cbd5e1;\n    border-radius: 4px;\n    transition: background 0.2s ease;\n  }\n  \n  &::-webkit-scrollbar-thumb:hover {\n    background: #94a3b8;\n  }\n  \n  /* Firefox scrollbar */\n  scrollbar-width: thin;\n  scrollbar-color: #cbd5e1 #f1f5f9;\n"])));
var StyledTable = styled_components_1.default.table(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n  width: 100%;\n  min-width: 800px; /* Set minimum table width to trigger scrolling earlier */\n  border-collapse: collapse;\n  table-layout: auto;\n  \n  /* Ensure columns have reasonable minimum widths */\n  th, td {\n    min-width: 100px;\n    text-overflow: ellipsis;\n    overflow: hidden;\n  }\n  \n  /* Allow columns with explicit widths to override */\n  th[style*=\"width\"], td[style*=\"width\"] {\n    min-width: unset;\n  }\n"], ["\n  width: 100%;\n  min-width: 800px; /* Set minimum table width to trigger scrolling earlier */\n  border-collapse: collapse;\n  table-layout: auto;\n  \n  /* Ensure columns have reasonable minimum widths */\n  th, td {\n    min-width: 100px;\n    text-overflow: ellipsis;\n    overflow: hidden;\n  }\n  \n  /* Allow columns with explicit widths to override */\n  th[style*=\"width\"], td[style*=\"width\"] {\n    min-width: unset;\n  }\n"])));
var TableHeader = styled_components_1.default.thead(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n  background: ", ";\n  \n  th {\n    color: ", ";\n    font-size: ", ";\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    padding: 1rem;\n    text-align: left;\n    border-bottom: 2px solid #e2e8f0;\n  }\n"], ["\n  background: ", ";\n  \n  th {\n    color: ", ";\n    font-size: ", ";\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    padding: 1rem;\n    text-align: left;\n    border-bottom: 2px solid #e2e8f0;\n  }\n"])), function (props) { return props.headerBg || "#f8fafc"; }, function (props) { return props.headerTextColor || "#374151"; }, function (props) { return props.headerTextSize || "14px"; });
var TableBody = styled_components_1.default.tbody(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n  tr {\n    transition: background-color 0.2s ease;\n    \n    &:hover {\n      background: ", ";\n    }\n  }\n  \n  td {\n    color: ", ";\n    padding: 1rem;\n    border-bottom: 1px solid #f1f5f9;\n    vertical-align: middle;\n  }\n"], ["\n  tr {\n    transition: background-color 0.2s ease;\n    \n    &:hover {\n      background: ", ";\n    }\n  }\n  \n  td {\n    color: ", ";\n    padding: 1rem;\n    border-bottom: 1px solid #f1f5f9;\n    vertical-align: middle;\n  }\n"])), function (props) { return props.rowHoverBg || "#f8fafc"; }, function (props) { return props.textColor || "#374151"; });
var TableRow = styled_components_1.default.tr(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n  border-bottom: 1px solid #f1f5f9;\n  transition: all 0.2s ease;\n  \n  ", "\n  \n  &:hover {\n    background: ", ";\n  }\n  \n  ", "\n"], ["\n  border-bottom: 1px solid #f1f5f9;\n  transition: all 0.2s ease;\n  \n  ", "\n  \n  &:hover {\n    background: ", ";\n  }\n  \n  ", "\n"])), function (props) {
    return props.selected &&
        "\n    background: #eff6ff;\n    border-color: #bfdbfe;\n  ";
}, function (props) { return (props.selected ? "#dbeafe" : "#f8fafc"); }, function (props) {
    return props.accordion &&
        "\n    cursor: pointer;\n  ";
});
var TableCell = styled_components_1.default.td(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n  padding: 1rem 1.5rem;\n  text-align: ", ";\n  font-size: 14px;\n  color: #374151;\n  border-bottom: 1px solid #f1f5f9;\n  vertical-align: middle;\n"], ["\n  padding: 1rem 1.5rem;\n  text-align: ", ";\n  font-size: 14px;\n  color: #374151;\n  border-bottom: 1px solid #f1f5f9;\n  vertical-align: middle;\n"])), function (props) { return props.align || "left"; });
var CellContent = styled_components_1.default.div(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n"], ["\n  display: flex;\n  align-items: center;\n"])));
var Checkbox = styled_components_1.default.input(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n  accent-color: #6366f1;\n"], ["\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n  accent-color: #6366f1;\n"])));
var AccordionRow = styled_components_1.default.tr(templateObject_25 || (templateObject_25 = __makeTemplateObject(["\n  background: #f8fafc;\n"], ["\n  background: #f8fafc;\n"])));
var AccordionContent = styled_components_1.default.div(templateObject_26 || (templateObject_26 = __makeTemplateObject(["\n  padding: ", ";\n  border-top: ", ";\n  overflow: hidden;\n  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  max-height: ", ";\n  opacity: ", ";\n"], ["\n  padding: ", ";\n  border-top: ", ";\n  overflow: hidden;\n  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n  max-height: ", ";\n  opacity: ", ";\n"])), function (props) { return (props.isExpanded ? "1.5rem" : "0"); }, function (props) { return (props.isExpanded ? "1px solid #e2e8f0" : "none"); }, function (props) { return (props.isExpanded ? "500px" : "0"); }, function (props) { return (props.isExpanded ? "1" : "0"); });
var ActionsContainer = styled_components_1.default.div(templateObject_27 || (templateObject_27 = __makeTemplateObject(["\n  position: relative;\n  display: flex;\n  justify-content: flex-end;\n  padding-right: 0.5rem;\n"], ["\n  position: relative;\n  display: flex;\n  justify-content: flex-end;\n  padding-right: 0.5rem;\n"])));
var ActionsTrigger = styled_components_1.default.button(templateObject_28 || (templateObject_28 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  border: none;\n  background: none;\n  border-radius: 6px;\n  cursor: pointer;\n  color: #94a3b8;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: #f1f5f9;\n    color: #475569;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 24px;\n  height: 24px;\n  border: none;\n  background: none;\n  border-radius: 6px;\n  cursor: pointer;\n  color: #94a3b8;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: #f1f5f9;\n    color: #475569;\n  }\n"])));
var ActionsDropdown = styled_components_1.default.div(templateObject_29 || (templateObject_29 = __makeTemplateObject(["\n  position: absolute;\n  top: 100%;\n  right: 0;\n  min-width: 160px;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\n  z-index: 50;\n  overflow: hidden;\n  margin-top: 0.25rem;\n"], ["\n  position: absolute;\n  top: 100%;\n  right: 0;\n  min-width: 160px;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);\n  z-index: 50;\n  overflow: hidden;\n  margin-top: 0.25rem;\n"])));
var ActionItem = styled_components_1.default.button(templateObject_30 || (templateObject_30 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: none;\n  background: none;\n  font-size: 14px;\n  text-align: left;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  \n  ", "\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: none;\n  background: none;\n  font-size: 14px;\n  text-align: left;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  \n  ", "\n"])), function (props) {
    switch (props.variant) {
        case "danger":
            return "\n          color: #dc2626;\n          &:hover { background: #fef2f2; }\n        ";
        case "primary":
            return "\n          color: #6366f1;\n          &:hover { background: #eff6ff; }\n        ";
        default:
            return "\n          color: #374151;\n          &:hover { background: #f8fafc; }\n        ";
    }
});
var PaginationContainer = styled_components_1.default.div(templateObject_31 || (templateObject_31 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.5rem;\n  border-top: 1px solid #f1f5f9;\n  background: #fafbfc;\n  \n  @media (max-width: 640px) {\n    flex-direction: column;\n    gap: 1rem;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.5rem;\n  border-top: 1px solid #f1f5f9;\n  background: #fafbfc;\n  \n  @media (max-width: 640px) {\n    flex-direction: column;\n    gap: 1rem;\n  }\n"])));
var PaginationInfo = styled_components_1.default.div(templateObject_32 || (templateObject_32 = __makeTemplateObject(["\n  font-size: 14px;\n  color: #64748b;\n"], ["\n  font-size: 14px;\n  color: #64748b;\n"])));
var PaginationControls = styled_components_1.default.div(templateObject_33 || (templateObject_33 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n"])));
var PaginationButton = styled_components_1.default.button(templateObject_34 || (templateObject_34 = __makeTemplateObject(["\n  padding: 0.5rem 0.75rem;\n  border: 1px solid ", ";\n  background: ", ";\n  color: ", ";\n  font-size: 14px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  min-width: 40px;\n  \n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n  \n  &:not(:disabled):hover {\n    background: ", ";\n    border-color: ", ";\n  }\n"], ["\n  padding: 0.5rem 0.75rem;\n  border: 1px solid ", ";\n  background: ", ";\n  color: ", ";\n  font-size: 14px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  min-width: 40px;\n  \n  &:disabled {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n  \n  &:not(:disabled):hover {\n    background: ", ";\n    border-color: ", ";\n  }\n"])), function (props) { return (props.active ? "#6366f1" : "#e2e8f0"); }, function (props) { return (props.active ? "#6366f1" : "#ffffff"); }, function (props) { return (props.active ? "#ffffff" : "#475569"); }, function (props) { return (props.active ? "#5855eb" : "#f8fafc"); }, function (props) { return (props.active ? "#5855eb" : "#cbd5e1"); });
var PaginationEllipsis = styled_components_1.default.span(templateObject_35 || (templateObject_35 = __makeTemplateObject(["\n  padding: 0.5rem;\n  color: #94a3b8;\n"], ["\n  padding: 0.5rem;\n  color: #94a3b8;\n"])));
var EmptyStateContainer = styled_components_1.default.div(templateObject_36 || (templateObject_36 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem 1.5rem;\n  text-align: center;\n"], ["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem 1.5rem;\n  text-align: center;\n"])));
var EmptyStateIcon = styled_components_1.default.div(templateObject_37 || (templateObject_37 = __makeTemplateObject(["\n  margin-bottom: 1rem;\n  opacity: 0.4;\n  color: #6366f1;\n"], ["\n  margin-bottom: 1rem;\n  opacity: 0.4;\n  color: #6366f1;\n"])));
var EmptyStateTitle = styled_components_1.default.h3(templateObject_38 || (templateObject_38 = __makeTemplateObject(["\n  margin: 0;\n  margin-bottom: 0.5rem;\n  font-size: 18px;\n  font-weight: 600;\n  color: #374151;\n"], ["\n  margin: 0;\n  margin-bottom: 0.5rem;\n  font-size: 18px;\n  font-weight: 600;\n  color: #374151;\n"])));
var EmptyStateMessage = styled_components_1.default.p(templateObject_39 || (templateObject_39 = __makeTemplateObject(["\n  margin: 0;\n  color: #64748b;\n  font-size: 14px;\n"], ["\n  margin: 0;\n  color: #64748b;\n  font-size: 14px;\n"])));
var ModalOverlay = styled_components_1.default.div(templateObject_40 || (templateObject_40 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2000;\n  opacity: ", ";\n  visibility: ", ";\n  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2000;\n  opacity: ", ";\n  visibility: ", ";\n  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n"])), function (props) { return (props.isOpen ? 1 : 0); }, function (props) { return (props.isOpen ? "visible" : "hidden"); });
var Modal = styled_components_1.default.div(templateObject_41 || (templateObject_41 = __makeTemplateObject(["\n  background: white;\n  border-radius: 16px;\n  padding: 2rem;\n  max-width: 600px;\n  width: 90%;\n  max-height: 80vh;\n  overflow-y: auto;\n  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);\n  transform: ", ";\n  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n"], ["\n  background: white;\n  border-radius: 16px;\n  padding: 2rem;\n  max-width: 600px;\n  width: 90%;\n  max-height: 80vh;\n  overflow-y: auto;\n  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);\n  transform: ", ";\n  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n"])), function (props) { return (props.isOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)"); });
var SlidePanel = styled_components_1.default.div(templateObject_42 || (templateObject_42 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 400px;\n  height: 100vh;\n  background: white;\n  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);\n  z-index: 2000;\n  padding: 2rem;\n  overflow-y: auto;\n  transform: ", ";\n  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 400px;\n  height: 100vh;\n  background: white;\n  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);\n  z-index: 2000;\n  padding: 2rem;\n  overflow-y: auto;\n  transform: ", ";\n  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);\n"])), function (props) { return (props.isOpen ? "translateX(0)" : "translateX(-100%)"); });
var ModalHeader = styled_components_1.default.div(templateObject_43 || (templateObject_43 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid #e2e8f0;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 1.5rem;\n  padding-bottom: 1rem;\n  border-bottom: 1px solid #e2e8f0;\n"])));
var ModalTitle = styled_components_1.default.h2(templateObject_44 || (templateObject_44 = __makeTemplateObject(["\n  margin: 0;\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #374151;\n"], ["\n  margin: 0;\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: #374151;\n"])));
var CloseButton = styled_components_1.default.button(templateObject_45 || (templateObject_45 = __makeTemplateObject(["\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.5rem;\n  border-radius: 8px;\n  color: #6b7280;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: #f3f4f6;\n    color: #374151;\n  }\n"], ["\n  background: none;\n  border: none;\n  cursor: pointer;\n  padding: 0.5rem;\n  border-radius: 8px;\n  color: #6b7280;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: #f3f4f6;\n    color: #374151;\n  }\n"])));
var FormField = styled_components_1.default.div(templateObject_46 || (templateObject_46 = __makeTemplateObject(["\n  margin-bottom: 1.5rem;\n"], ["\n  margin-bottom: 1.5rem;\n"])));
var FormLabel = styled_components_1.default.label(templateObject_47 || (templateObject_47 = __makeTemplateObject(["\n  display: block;\n  font-size: 14px;\n  font-weight: 600;\n  color: #374151;\n  margin-bottom: 0.5rem;\n"], ["\n  display: block;\n  font-size: 14px;\n  font-weight: 600;\n  color: #374151;\n  margin-bottom: 0.5rem;\n"])));
var FormInput = styled_components_1.default.input(templateObject_48 || (templateObject_48 = __makeTemplateObject(["\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s ease;\n  \n  &:focus {\n    outline: none;\n    border-color: #6366f1;\n    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n  }\n"], ["\n  width: 100%;\n  padding: 0.75rem;\n  border: 1px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 14px;\n  transition: all 0.2s ease;\n  \n  &:focus {\n    outline: none;\n    border-color: #6366f1;\n    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);\n  }\n"])));
var ButtonGroup = styled_components_1.default.div(templateObject_49 || (templateObject_49 = __makeTemplateObject(["\n  display: flex;\n  gap: 1rem;\n  justify-content: flex-end;\n  margin-top: 2rem;\n"], ["\n  display: flex;\n  gap: 1rem;\n  justify-content: flex-end;\n  margin-top: 2rem;\n"])));
var Button = styled_components_1.default.button(templateObject_50 || (templateObject_50 = __makeTemplateObject(["\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border: 1px solid;\n  \n  ", "\n"], ["\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  border: 1px solid;\n  \n  ", "\n"])), function (props) {
    return props.variant === "primary"
        ? "\n    background: #6366f1;\n    border-color: #6366f1;\n    color: white;\n    \n    &:hover {\n      background: #5855eb;\n      border-color: #5855eb;\n    }\n  "
        : "\n    background: white;\n    border-color: #e2e8f0;\n    color: #374151;\n    \n    &:hover {\n      background: #f8fafc;\n      border-color: #cbd5e1;\n    }\n  ";
});
var DetailRow = styled_components_1.default.div(templateObject_51 || (templateObject_51 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 0;\n  border-bottom: 1px solid #f1f5f9;\n  \n  &:last-child {\n    border-bottom: none;\n  }\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem 0;\n  border-bottom: 1px solid #f1f5f9;\n  \n  &:last-child {\n    border-bottom: none;\n  }\n"])));
var DetailLabel = styled_components_1.default.span(templateObject_52 || (templateObject_52 = __makeTemplateObject(["\n  font-weight: 600;\n  color: #374151;\n  font-size: 14px;\n"], ["\n  font-weight: 600;\n  color: #374151;\n  font-size: 14px;\n"])));
var DetailValue = styled_components_1.default.span(templateObject_53 || (templateObject_53 = __makeTemplateObject(["\n  color: #6b7280;\n  font-size: 14px;\n"], ["\n  color: #6b7280;\n  font-size: 14px;\n"])));
var ActionButton = styled_components_1.default.button(templateObject_54 || (templateObject_54 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem;\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: 10px;\n  color: ", ";\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: ", ";\n    border-color: ", ";\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  }\n  \n  &:active {\n    transform: translateY(0);\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.75rem 1rem;\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: 10px;\n  color: ", ";\n  font-size: 14px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: ", ";\n    border-color: ", ";\n    transform: translateY(-1px);\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  }\n  \n  &:active {\n    transform: translateY(0);\n  }\n"
    // Special glowing icon component for the tungsten lightbulb
])), function (props) { return props.active ? '#f8fafc' : '#ffffff'; }, function (props) { return props.active ? '#3b82f6' : '#e2e8f0'; }, function (props) { return props.active ? '#3b82f6' : '#475569'; }, function (props) { return props.active ? '#f1f5f9' : '#f8fafc'; }, function (props) { return props.active ? '#2563eb' : '#cbd5e1'; });
// Special glowing icon component for the tungsten lightbulb
var GlowingLightbulb = (0, styled_components_1.default)(lucide_react_1.Lightbulb)(templateObject_55 || (templateObject_55 = __makeTemplateObject(["\n  transition: all 0.3s ease;\n  \n  ", "\n"], ["\n  transition: all 0.3s ease;\n  \n  ", "\n"])), function (props) { return props.active ? "\n    color: #ff8c00;\n    filter: drop-shadow(0 0 8px rgba(255, 140, 0, 0.6))\n            drop-shadow(0 0 16px rgba(255, 140, 0, 0.4))\n            drop-shadow(0 0 24px rgba(255, 165, 0, 0.3));\n    \n    /* Tungsten glow animation for the icon only */\n    animation: iconGlow 2s ease-in-out infinite alternate;\n    \n    @keyframes iconGlow {\n      0% {\n        color: #ff8c00;\n        filter: drop-shadow(0 0 6px rgba(255, 140, 0, 0.5))\n                drop-shadow(0 0 12px rgba(255, 140, 0, 0.3))\n                drop-shadow(0 0 18px rgba(255, 165, 0, 0.2));\n      }\n      100% {\n        color: #ffb347;\n        filter: drop-shadow(0 0 10px rgba(255, 140, 0, 0.7))\n                drop-shadow(0 0 20px rgba(255, 140, 0, 0.5))\n                drop-shadow(0 0 30px rgba(255, 165, 0, 0.4));\n      }\n    }\n  " : "\n    color: inherit;\n    filter: none;\n  "; });
var PrintStyles = styled_components_1.default.div(templateObject_56 || (templateObject_56 = __makeTemplateObject(["\n  @media print {\n    @page {\n      size: landscape;\n      margin: 0.5in;\n    }\n    \n    * {\n      -webkit-print-color-adjust: exact !important;\n      color-adjust: exact !important;\n    }\n    \n    body * {\n      visibility: hidden;\n    }\n    \n    .printable-table, .printable-table * {\n      visibility: visible;\n    }\n    \n    .printable-table {\n      position: absolute;\n      left: 0;\n      top: 0;\n      width: 100% !important;\n    }\n    \n    .no-print {\n      display: none !important;\n    }\n    \n    table {\n      border-collapse: collapse !important;\n      width: 100% !important;\n      font-size: 10px !important;\n    }\n    \n    th, td {\n      border: 1px solid #000 !important;\n      padding: 4px !important;\n      word-wrap: break-word !important;\n    }\n    \n    th {\n      background-color: #f5f5f5 !important;\n      font-weight: bold !important;\n      font-size: 9px !important;\n    }\n  }\n"], ["\n  @media print {\n    @page {\n      size: landscape;\n      margin: 0.5in;\n    }\n    \n    * {\n      -webkit-print-color-adjust: exact !important;\n      color-adjust: exact !important;\n    }\n    \n    body * {\n      visibility: hidden;\n    }\n    \n    .printable-table, .printable-table * {\n      visibility: visible;\n    }\n    \n    .printable-table {\n      position: absolute;\n      left: 0;\n      top: 0;\n      width: 100% !important;\n    }\n    \n    .no-print {\n      display: none !important;\n    }\n    \n    table {\n      border-collapse: collapse !important;\n      width: 100% !important;\n      font-size: 10px !important;\n    }\n    \n    th, td {\n      border: 1px solid #000 !important;\n      padding: 4px !important;\n      word-wrap: break-word !important;\n    }\n    \n    th {\n      background-color: #f5f5f5 !important;\n      font-weight: bold !important;\n      font-size: 9px !important;\n    }\n  }\n"
    // CSV Mode Styled Components
])));
// CSV Mode Styled Components
var CsvModeContainer = styled_components_1.default.div(templateObject_57 || (templateObject_57 = __makeTemplateObject(["\n  background: #f8fafc;\n  border: 2px dashed #cbd5e1;\n  border-radius: 12px;\n  padding: 2rem;\n  text-align: center;\n  margin: 1rem;\n"], ["\n  background: #f8fafc;\n  border: 2px dashed #cbd5e1;\n  border-radius: 12px;\n  padding: 2rem;\n  text-align: center;\n  margin: 1rem;\n"])));
var CsvDropZone = styled_components_1.default.div(templateObject_58 || (templateObject_58 = __makeTemplateObject(["\n  background: ", ";\n  border: 2px dashed ", ";\n  border-radius: 8px;\n  padding: 2rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  margin-bottom: 1rem;\n  \n  &:hover {\n    border-color: #3b82f6;\n    background: #eff6ff;\n  }\n"], ["\n  background: ", ";\n  border: 2px dashed ", ";\n  border-radius: 8px;\n  padding: 2rem;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  margin-bottom: 1rem;\n  \n  &:hover {\n    border-color: #3b82f6;\n    background: #eff6ff;\n  }\n"])), function (props) { return props.isDragging ? '#eff6ff' : '#ffffff'; }, function (props) { return props.isDragging ? '#3b82f6' : '#e2e8f0'; });
var CsvModeToggle = styled_components_1.default.div(templateObject_59 || (templateObject_59 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem;\n  background: #f1f5f9;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem;\n  background: #f1f5f9;\n  border-radius: 8px;\n  margin-bottom: 1rem;\n"])));
var ToggleSwitch = styled_components_1.default.label(templateObject_60 || (templateObject_60 = __makeTemplateObject(["\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n"], ["\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n"])));
var ToggleInput = styled_components_1.default.input(templateObject_61 || (templateObject_61 = __makeTemplateObject(["\n  opacity: 0;\n  width: 0;\n  height: 0;\n"], ["\n  opacity: 0;\n  width: 0;\n  height: 0;\n"])));
var ToggleSlider = styled_components_1.default.span(templateObject_62 || (templateObject_62 = __makeTemplateObject(["\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: ", ";\n  transition: .4s;\n  border-radius: 34px;\n  \n  &:before {\n    position: absolute;\n    content: \"\";\n    height: 26px;\n    width: 26px;\n    left: ", ";\n    bottom: 4px;\n    background-color: white;\n    transition: .4s;\n    border-radius: 50%;\n  }\n"], ["\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: ", ";\n  transition: .4s;\n  border-radius: 34px;\n  \n  &:before {\n    position: absolute;\n    content: \"\";\n    height: 26px;\n    width: 26px;\n    left: ", ";\n    bottom: 4px;\n    background-color: white;\n    transition: .4s;\n    border-radius: 50%;\n  }\n"])), function (props) { return props.checked ? '#3b82f6' : '#ccc'; }, function (props) { return props.checked ? '30px' : '4px'; });
var CsvFileInput = styled_components_1.default.input(templateObject_63 || (templateObject_63 = __makeTemplateObject(["\n  display: none;\n"], ["\n  display: none;\n"])));
var CsvUploadButton = styled_components_1.default.button(templateObject_64 || (templateObject_64 = __makeTemplateObject(["\n  background: #3b82f6;\n  color: white;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-weight: 500;\n  cursor: pointer;\n  margin: 0.5rem;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: #2563eb;\n  }\n"], ["\n  background: #3b82f6;\n  color: white;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-weight: 500;\n  cursor: pointer;\n  margin: 0.5rem;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: #2563eb;\n  }\n"])));
var CsvActions = styled_components_1.default.div(templateObject_65 || (templateObject_65 = __makeTemplateObject(["\n  display: flex;\n  gap: 1rem;\n  justify-content: center;\n  margin-top: 1rem;\n"], ["\n  display: flex;\n  gap: 1rem;\n  justify-content: center;\n  margin-top: 1rem;\n"])));
var CsvSaveButton = styled_components_1.default.button(templateObject_66 || (templateObject_66 = __makeTemplateObject(["\n  background: #10b981;\n  color: white;\n  border: none;\n  padding: 0.75rem 2rem;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: #059669;\n  }\n  \n  &:disabled {\n    background: #9ca3af;\n    cursor: not-allowed;\n  }\n"], ["\n  background: #10b981;\n  color: white;\n  border: none;\n  padding: 0.75rem 2rem;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: #059669;\n  }\n  \n  &:disabled {\n    background: #9ca3af;\n    cursor: not-allowed;\n  }\n"])));
var CsvCancelButton = styled_components_1.default.button(templateObject_67 || (templateObject_67 = __makeTemplateObject(["\n  background: #ef4444;\n  color: white;\n  border: none;\n  padding: 0.75rem 2rem;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: #dc2626;\n  }\n"], ["\n  background: #ef4444;\n  color: white;\n  border: none;\n  padding: 0.75rem 2rem;\n  border-radius: 8px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  \n  &:hover {\n    background: #dc2626;\n  }\n"
    // Main Component
])));
// Main Component
var GridAccordionTable = function (_a) {
    var columns = _a.columns, _b = _a.data, data = _b === void 0 ? [] : _b, _c = _a.loading, loading = _c === void 0 ? false : _c, _d = _a.error, error = _d === void 0 ? null : _d, _e = _a.searchable, searchable = _e === void 0 ? true : _e, _f = _a.filterable, filterable = _f === void 0 ? true : _f, _g = _a.sortable, sortable = _g === void 0 ? true : _g, _h = _a.selectable, selectable = _h === void 0 ? false : _h, _j = _a.multiSelect, multiSelect = _j === void 0 ? false : _j, _k = _a.accordion, accordion = _k === void 0 ? false : _k, renderAccordionContent = _a.renderAccordionContent, CustomAccordionComponent = _a.customAccordionComponent, _l = _a.rowActions, rowActions = _l === void 0 ? [] : _l, pagination = _a.pagination, _m = _a.className, className = _m === void 0 ? "" : _m, _o = _a.emptyMessage, emptyMessage = _o === void 0 ? "No data available" : _o, onSelectionChange = _a.onSelectionChange, onSort = _a.onSort, onFilter = _a.onFilter, onPageChange = _a.onPageChange, _p = _a.headerBg, headerBg = _p === void 0 ? "#f8fafc" : _p, _q = _a.headerTextColor, headerTextColor = _q === void 0 ? "#1e293b" : _q, _r = _a.headerTextSize, headerTextSize = _r === void 0 ? "14px" : _r, _s = _a.textColor, textColor = _s === void 0 ? "#475569" : _s, _t = _a.rowHoverBg, rowHoverBg = _t === void 0 ? "#f8fafc" : _t, 
    // New props for edit/delete permissions
    _u = _a.allowEdit, 
    // New props for edit/delete permissions
    allowEdit = _u === void 0 ? false : _u, _v = _a.allowDelete, allowDelete = _v === void 0 ? false : _v, _w = _a.allowView, allowView = _w === void 0 ? false : _w, _x = _a.onEdit, onEdit = _x === void 0 ? function () { } : _x, _y = _a.onDelete, onDelete = _y === void 0 ? function () { } : _y, _z = _a.onView, onView = _z === void 0 ? function () { } : _z, _0 = _a.onSave, onSave = _0 === void 0 ? function () { } : _0, 
    // Added export and print props with defaults
    _1 = _a.exportable, 
    // Added export and print props with defaults
    exportable = _1 === void 0 ? false : _1, _2 = _a.printable, printable = _2 === void 0 ? false : _2, _3 = _a.onExport, onExport = _3 === void 0 ? function () { } : _3, _4 = _a.exportFileName, exportFileName = _4 === void 0 ? "table-data" : _4, 
    // CSV Mode props
    _5 = _a.csvMode, 
    // CSV Mode props
    csvMode = _5 === void 0 ? false : _5, _6 = _a.onCsvSave, onCsvSave = _6 === void 0 ? function () { } : _6;
    // State
    var _7 = (0, react_1.useState)(""), searchTerm = _7[0], setSearchTerm = _7[1];
    var _8 = (0, react_1.useState)({}), filters = _8[0], setFilters = _8[1];
    var _9 = (0, react_1.useState)(false), showFilters = _9[0], setShowFilters = _9[1];
    var _10 = (0, react_1.useState)(null), sortConfig = _10[0], setSortConfig = _10[1];
    var _11 = (0, react_1.useState)(new Set()), selectedRows = _11[0], setSelectedRows = _11[1];
    var _12 = (0, react_1.useState)(new Set()), expandedRows = _12[0], setExpandedRows = _12[1];
    var _13 = (0, react_1.useState)(1), currentPage = _13[0], setCurrentPage = _13[1];
    var _14 = (0, react_1.useState)(null), activeDropdown = _14[0], setActiveDropdown = _14[1];
    var _15 = (0, react_1.useState)(columns.map(function (_, index) { return index; })), columnOrder = _15[0], setColumnOrder = _15[1];
    // New state for modals and editing
    var _16 = (0, react_1.useState)(false), editModalOpen = _16[0], setEditModalOpen = _16[1];
    var _17 = (0, react_1.useState)(false), viewPanelOpen = _17[0], setViewPanelOpen = _17[1];
    var _18 = (0, react_1.useState)(null), currentEditRow = _18[0], setCurrentEditRow = _18[1];
    var _19 = (0, react_1.useState)(null), currentViewRow = _19[0], setCurrentViewRow = _19[1];
    var _20 = (0, react_1.useState)({}), editFormData = _20[0], setEditFormData = _20[1];
    // CSV Mode state
    var _21 = (0, react_1.useState)(false), csvModeActive = _21[0], setCsvModeActive = _21[1];
    var _22 = (0, react_1.useState)([]), csvData = _22[0], setCsvData = _22[1];
    var _23 = (0, react_1.useState)([]), csvColumns = _23[0], setCsvColumns = _23[1];
    var _24 = (0, react_1.useState)(false), isDragging = _24[0], setIsDragging = _24[1];
    var _25 = (0, react_1.useState)(false), hasUnsavedChanges = _25[0], setHasUnsavedChanges = _25[1];
    var dropdownRef = (0, react_1.useRef)(null);
    var filterDropdownRef = (0, react_1.useRef)(null);
    var fileInputRef = (0, react_1.useRef)(null);
    // Get unique filter options for each column
    var getFilterOptions = function (columnKey) {
        var uniqueValues = Array.from(new Set(data.map(function (row) { return row[columnKey]; }))).filter(Boolean);
        return uniqueValues.sort();
    };
    // Filter and search data
    var filteredData = (0, react_1.useMemo)(function () {
        var sourceData = csvMode && csvModeActive && csvData.length > 0 ? csvData : data;
        var sourceColumns = csvMode && csvModeActive && csvColumns.length > 0 ? csvColumns : columns;
        return sourceData.filter(function (row) {
            // Search filter
            if (searchTerm) {
                var searchMatch = sourceColumns.some(function (col) {
                    var value = row[col.key];
                    return value === null || value === void 0 ? void 0 : value.toString().toLowerCase().includes(searchTerm.toLowerCase());
                });
                if (!searchMatch)
                    return false;
            }
            // Column filters - support multiple selections
            return Object.entries(filters).every(function (_a) {
                var key = _a[0], values = _a[1];
                if (!values || values.length === 0)
                    return true;
                var rowValue = row[key];
                return values.includes(rowValue === null || rowValue === void 0 ? void 0 : rowValue.toString());
            });
        });
    }, [data, searchTerm, filters, columns, csvMode, csvModeActive, csvData, csvColumns]);
    // Active columns (either CSV columns or regular columns)
    var activeColumns = csvMode && csvModeActive && csvColumns.length > 0 ? csvColumns : columns;
    // Sort data
    var sortedData = (0, react_1.useMemo)(function () {
        if (!sortConfig)
            return filteredData;
        return __spreadArray([], filteredData, true).sort(function (a, b) {
            var aValue = a[sortConfig.key];
            var bValue = b[sortConfig.key];
            if (aValue === bValue)
                return 0;
            var comparison = aValue < bValue ? -1 : 1;
            return sortConfig.direction === "desc" ? -comparison : comparison;
        });
    }, [filteredData, sortConfig]);
    // Pagination
    var pageSize = (pagination === null || pagination === void 0 ? void 0 : pagination.pageSize) || sortedData.length;
    var totalPages = Math.ceil(sortedData.length / pageSize);
    var paginatedData = (0, react_1.useMemo)(function () {
        if (!pagination)
            return sortedData;
        var startIndex = (currentPage - 1) * pageSize;
        return sortedData.slice(startIndex, startIndex + pageSize);
    }, [sortedData, currentPage, pageSize, pagination]);
    // Handlers
    var handleSort = function (column) {
        if (!sortable)
            return;
        setSortConfig(function (current) {
            if ((current === null || current === void 0 ? void 0 : current.key) === column) {
                return current.direction === "asc" ? { key: column, direction: "desc" } : null;
            }
            return { key: column, direction: "asc" };
        });
        onSort === null || onSort === void 0 ? void 0 : onSort(column, (sortConfig === null || sortConfig === void 0 ? void 0 : sortConfig.direction) === "asc" ? "desc" : "asc");
    };
    var handleFilterChange = function (column, value) {
        var newFilters = __assign({}, filters);
        if (value === "") {
            delete newFilters[column];
        }
        else {
            newFilters[column] = [value];
        }
        setFilters(newFilters);
        setCurrentPage(1);
        onFilter === null || onFilter === void 0 ? void 0 : onFilter(newFilters);
    };
    var removeFilter = function (column, value) {
        var _a;
        var newFilters = __assign({}, filters);
        if (value) {
            newFilters[column] = ((_a = newFilters[column]) === null || _a === void 0 ? void 0 : _a.filter(function (v) { return v !== value; })) || [];
            if (newFilters[column].length === 0) {
                delete newFilters[column];
            }
        }
        else {
            delete newFilters[column];
        }
        setFilters(newFilters);
        onFilter === null || onFilter === void 0 ? void 0 : onFilter(newFilters);
    };
    var handleRowSelect = function (rowIndex) {
        if (!selectable)
            return;
        var newSelectedRows = new Set(selectedRows);
        if (multiSelect) {
            if (selectedRows.has(rowIndex)) {
                newSelectedRows.delete(rowIndex);
            }
            else {
                newSelectedRows.add(rowIndex);
            }
        }
        else {
            newSelectedRows.clear();
            newSelectedRows.add(rowIndex);
        }
        setSelectedRows(newSelectedRows);
        var selectedData = Array.from(newSelectedRows).map(function (index) { return paginatedData[index]; });
        onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange(selectedData);
    };
    var handleRowDoubleClick = function (rowIndex) {
        if (!accordion)
            return;
        var newExpandedRows = new Set();
        if (!expandedRows.has(rowIndex)) {
            newExpandedRows.add(rowIndex);
        }
        setExpandedRows(newExpandedRows);
    };
    var handlePageChange = function (page) {
        setCurrentPage(page);
        onPageChange === null || onPageChange === void 0 ? void 0 : onPageChange(page);
    };
    var handleColumnDrag = function (fromIndex, toIndex) {
        var newColumnOrder = __spreadArray([], columnOrder, true);
        var movedColumn = newColumnOrder.splice(fromIndex, 1)[0];
        newColumnOrder.splice(toIndex, 0, movedColumn);
        setColumnOrder(newColumnOrder);
    };
    var toggleDropdown = function (rowIndex) {
        setActiveDropdown(activeDropdown === rowIndex ? null : rowIndex);
    };
    var toggleRow = function (rowIndex) {
        var newExpandedRows = new Set();
        if (!expandedRows.has(rowIndex)) {
            newExpandedRows.add(rowIndex);
        }
        setExpandedRows(newExpandedRows);
    };
    var handleSelectAll = function (e) {
        var newSelectedRows = new Set();
        if (e.target.checked) {
            paginatedData.forEach(function (_, index) { return newSelectedRows.add(index); });
        }
        setSelectedRows(newSelectedRows);
        var selectedData = Array.from(newSelectedRows).map(function (index) { return paginatedData[index]; });
        onSelectionChange === null || onSelectionChange === void 0 ? void 0 : onSelectionChange(selectedData);
    };
    // Close dropdowns when clicking outside
    (0, react_1.useEffect)(function () {
        var handleClickOutside = function (event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
                setShowFilters(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return function () { return document.removeEventListener("mousedown", handleClickOutside); };
    }, []);
    var renderCellContent = function (column, value, row) {
        if (column.render) {
            return column.render(value, row);
        }
        if (column.key === "name" && typeof value === "string") {
            return ((0, jsx_runtime_1.jsx)("div", { style: { display: "flex", alignItems: "center", gap: "0.75rem" }, children: (0, jsx_runtime_1.jsx)("span", { style: { fontWeight: "500" }, children: value }) }));
        }
        return value;
    };
    // Error state
    if (error) {
        return ((0, jsx_runtime_1.jsx)(TableContainer, { className: className, children: (0, jsx_runtime_1.jsxs)(ErrorMessage, { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { size: 20 }), (0, jsx_runtime_1.jsx)("span", { children: error })] }) }));
    }
    // Empty state component
    var EmptyState = function () { return ((0, jsx_runtime_1.jsxs)(EmptyStateContainer, { children: [(0, jsx_runtime_1.jsx)(EmptyStateIcon, { children: (0, jsx_runtime_1.jsx)(lucide_react_1.CheckSquare, { size: 48 }) }), (0, jsx_runtime_1.jsx)(EmptyStateTitle, { children: "No data found" }), (0, jsx_runtime_1.jsx)(EmptyStateMessage, { children: emptyMessage })] })); };
    // Pagination component
    var PaginationComponent = function () {
        if (!pagination || totalPages <= 1)
            return null;
        var maxVisiblePages = 5;
        var startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        var endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        var pages = Array.from({ length: endPage - startPage + 1 }, function (_, i) { return startPage + i; });
        return ((0, jsx_runtime_1.jsxs)(PaginationContainer, { children: [(0, jsx_runtime_1.jsxs)(PaginationInfo, { children: ["Showing ", (currentPage - 1) * pageSize + 1, " to ", Math.min(currentPage * pageSize, sortedData.length), " of", " ", sortedData.length, " entries"] }), (0, jsx_runtime_1.jsxs)(PaginationControls, { children: [(0, jsx_runtime_1.jsx)(PaginationButton, { onClick: function () { return handlePageChange(currentPage - 1); }, disabled: currentPage === 1, children: "Previous" }), startPage > 1 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(PaginationButton, { onClick: function () { return handlePageChange(1); }, children: "1" }), startPage > 2 && (0, jsx_runtime_1.jsx)(PaginationEllipsis, { children: "..." })] })), pages.map(function (page) { return ((0, jsx_runtime_1.jsx)(PaginationButton, { active: page === currentPage, onClick: function () { return handlePageChange(page); }, children: page }, page)); }), endPage < totalPages && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [endPage < totalPages - 1 && (0, jsx_runtime_1.jsx)(PaginationEllipsis, { children: "..." }), (0, jsx_runtime_1.jsx)(PaginationButton, { onClick: function () { return handlePageChange(totalPages); }, children: totalPages })] })), (0, jsx_runtime_1.jsx)(PaginationButton, { onClick: function () { return handlePageChange(currentPage + 1); }, disabled: currentPage === totalPages, children: "Next" })] })] }));
    };
    // New handlers for edit, delete, view functionality
    var handleEdit = function (row, index) {
        setCurrentEditRow(__assign(__assign({}, row), { index: index }));
        setEditFormData(__assign({}, row));
        setEditModalOpen(true);
        onEdit(row, index);
    };
    var handleDelete = function (row, index) {
        onDelete(row, index);
    };
    var handleView = function (row, index) {
        setCurrentViewRow(__assign(__assign({}, row), { index: index }));
        setViewPanelOpen(true);
        onView(row, index);
    };
    var handleSave = function () {
        if (currentEditRow) {
            onSave(editFormData, currentEditRow.index);
            setEditModalOpen(false);
            setCurrentEditRow(null);
            setEditFormData({});
        }
    };
    var handleEditFormChange = function (key, value) {
        setEditFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[key] = value, _a)));
        });
    };
    var getDefaultRowActions = function () {
        var actions = [];
        if (allowView) {
            actions.push({
                label: "View Details",
                icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { size: 16 }),
                variant: "default",
                onClick: handleView,
            });
        }
        if (allowEdit) {
            actions.push({
                label: "Edit",
                icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, { size: 16 }),
                variant: "primary",
                onClick: handleEdit,
            });
        }
        if (allowDelete) {
            actions.push({
                label: "Delete",
                icon: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 16 }),
                variant: "danger",
                onClick: handleDelete,
            });
        }
        return __spreadArray(__spreadArray([], actions, true), rowActions, true);
    };
    var finalRowActions = getDefaultRowActions();
    // Added export functionality
    var handleExport = function () {
        var exportData = csvMode && csvModeActive && csvData.length > 0 ? csvData : filteredData;
        var exportColumns = csvMode && csvModeActive && csvColumns.length > 0 ? csvColumns : activeColumns;
        if (onExport && typeof onExport === 'function') {
            onExport(exportData, exportColumns);
        }
        else {
            // Default CSV export
            var csvContent = generateCSV(exportData, exportColumns);
            downloadCSV(csvContent, "".concat(exportFileName, ".csv"));
        }
    };
    var generateCSV = function (data, columns) {
        var headers = columns.map(function (col) { return col.label; }).join(',');
        var rows = data.map(function (row) {
            return columns.map(function (col) {
                var value = row[col.key];
                // Handle commas and quotes in CSV
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return "\"".concat(value.replace(/"/g, '""'), "\"");
                }
                return value || '';
            }).join(',');
        });
        return __spreadArray([headers], rows, true).join('\n');
    };
    var downloadCSV = function (content, filename) {
        var blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        var link = document.createElement('a');
        var url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    // Added print functionality
    var handlePrint = function () {
        window.print();
    };
    // CSV Mode functions
    var parseCSV = function (csvText) {
        var lines = csvText.trim().split('\n');
        if (lines.length === 0)
            return { data: [], columns: [] };
        var headers = lines[0].split(',').map(function (header) { return header.trim().replace(/"/g, ''); });
        var parsedColumns = headers.map(function (header, index) { return ({
            key: header.toLowerCase().replace(/\s+/g, '_'),
            label: header,
            sortable: true,
            filterable: true
        }); });
        var parsedData = lines.slice(1).map(function (line, rowIndex) {
            var values = line.split(',').map(function (value) { return value.trim().replace(/"/g, ''); });
            var rowData = { id: rowIndex + 1 };
            headers.forEach(function (header, colIndex) {
                var key = header.toLowerCase().replace(/\s+/g, '_');
                rowData[key] = values[colIndex] || '';
            });
            return rowData;
        });
        return { data: parsedData, columns: parsedColumns };
    };
    var handleFileUpload = function (event) {
        var _a;
        var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file && file.type === 'text/csv') {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var csvText = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                var _b = parseCSV(csvText), newData = _b.data, newColumns = _b.columns;
                setCsvData(newData);
                setCsvColumns(newColumns);
                setHasUnsavedChanges(false);
            };
            reader.readAsText(file);
        }
    };
    var handleDrop = function (event) {
        event.preventDefault();
        setIsDragging(false);
        var files = Array.from(event.dataTransfer.files);
        var csvFile = files.find(function (file) { return file.type === 'text/csv'; });
        if (csvFile) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var csvText = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                var _b = parseCSV(csvText), newData = _b.data, newColumns = _b.columns;
                setCsvData(newData);
                setCsvColumns(newColumns);
                setHasUnsavedChanges(false);
            };
            reader.readAsText(csvFile);
        }
    };
    var handleDragOver = function (event) {
        event.preventDefault();
        setIsDragging(true);
    };
    var handleDragLeave = function () {
        setIsDragging(false);
    };
    var handleCsvSave = function () {
        if (csvData.length > 0) {
            onCsvSave(csvData);
            setHasUnsavedChanges(false);
        }
    };
    var handleCsvCancel = function () {
        setCsvModeActive(false);
        setCsvData([]);
        setCsvColumns([]);
        setHasUnsavedChanges(false);
    };
    var handleCsvDataEdit = function (rowIndex, columnKey, value) {
        var newData = __spreadArray([], csvData, true);
        newData[rowIndex][columnKey] = value;
        setCsvData(newData);
        setHasUnsavedChanges(true);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(PrintStyles, {}), (0, jsx_runtime_1.jsxs)(TableContainer, { className: "".concat(className, " printable-table"), children: [(searchable || filterable || exportable || printable) && ((0, jsx_runtime_1.jsx)(Header, { children: (0, jsx_runtime_1.jsxs)(SearchFilterContainer, { children: [(0, jsx_runtime_1.jsx)("div", { style: { display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }, children: searchable && ((0, jsx_runtime_1.jsxs)(SearchContainer, { children: [(0, jsx_runtime_1.jsx)(SearchIconStyled, { size: 16 }), (0, jsx_runtime_1.jsx)(StyledSearchInput, { type: "text", placeholder: "Search across all columns...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); } })] })) }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }, children: [exportable && ((0, jsx_runtime_1.jsxs)(ActionButton, { onClick: handleExport, className: "no-print", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { size: 16 }), "Export"] })), printable && ((0, jsx_runtime_1.jsxs)(ActionButton, { onClick: handlePrint, className: "no-print", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Printer, { size: 16 }), "Print"] })), csvMode && ((0, jsx_runtime_1.jsxs)(ActionButton, { active: csvModeActive, onClick: function () { return setCsvModeActive(!csvModeActive); }, className: "no-print", children: [(0, jsx_runtime_1.jsx)(GlowingLightbulb, { size: 16, active: csvModeActive }), csvModeActive ? 'Exit CSV Mode' : 'CSV Mode'] })), filterable && ((0, jsx_runtime_1.jsxs)("div", { style: { position: "relative", zIndex: 1000 }, ref: filterDropdownRef, children: [(0, jsx_runtime_1.jsxs)(FilterToggle, { active: showFilters, onClick: function () { return setShowFilters(!showFilters); }, className: "no-print", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { size: 16 }), "Filters", showFilters ? (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronUp, { size: 16 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { size: 16 })] }), (0, jsx_runtime_1.jsx)(FilterDropdown, { isOpen: showFilters, children: columns
                                                        .filter(function (col) { return col.filterable !== false; })
                                                        .map(function (column) {
                                                        var _a;
                                                        return ((0, jsx_runtime_1.jsxs)(FilterSection, { children: [(0, jsx_runtime_1.jsx)(FilterLabel, { children: column.label }), (0, jsx_runtime_1.jsxs)(StyledSelect, { value: ((_a = filters[column.key]) === null || _a === void 0 ? void 0 : _a[0]) || "", onChange: function (e) { return handleFilterChange(column.key, e.target.value); }, children: [(0, jsx_runtime_1.jsxs)("option", { value: "", children: ["All ", column.label] }), getFilterOptions(column.key).map(function (option) { return ((0, jsx_runtime_1.jsx)("option", { value: option, children: option }, option)); })] })] }, column.key));
                                                    }) })] }))] })] }) })), csvMode && csvModeActive && ((0, jsx_runtime_1.jsxs)(CsvModeContainer, { children: [(0, jsx_runtime_1.jsx)("h3", { style: { margin: '0 0 1rem 0', color: '#1f2937' }, children: "CSV Import Mode" }), csvData.length === 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(CsvDropZone, { isDragging: isDragging, onDrop: handleDrop, onDragOver: handleDragOver, onDragLeave: handleDragLeave, onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { size: 48, style: { color: '#94a3b8', marginBottom: '1rem' } }), (0, jsx_runtime_1.jsx)("h4", { style: { margin: '0 0 0.5rem 0', color: '#374151' }, children: isDragging ? 'Drop CSV file here' : 'Import CSV File' }), (0, jsx_runtime_1.jsx)("p", { style: { margin: '0', color: '#6b7280' }, children: "Drag and drop a CSV file here, or click to browse" })] }) }), (0, jsx_runtime_1.jsx)(CsvFileInput, { ref: fileInputRef, type: "file", accept: ".csv", onChange: handleFileUpload }), (0, jsx_runtime_1.jsx)(CsvUploadButton, { onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, children: "Browse Files" })] })) : ((0, jsx_runtime_1.jsxs)(CsvActions, { children: [(0, jsx_runtime_1.jsxs)(CsvSaveButton, { onClick: handleCsvSave, disabled: csvData.length === 0, children: ["Save to Database (", csvData.length, " rows)"] }), (0, jsx_runtime_1.jsx)(CsvCancelButton, { onClick: handleCsvCancel, children: "Cancel" })] }))] })), (!csvMode || !csvModeActive || csvData.length > 0) && ((0, jsx_runtime_1.jsxs)(TableWrapper, { children: [(0, jsx_runtime_1.jsxs)(StyledTable, { children: [(0, jsx_runtime_1.jsx)(TableHeader, { headerBg: headerBg, headerTextColor: headerTextColor, headerTextSize: headerTextSize, children: (0, jsx_runtime_1.jsxs)("tr", { children: [selectable && ((0, jsx_runtime_1.jsx)("th", { style: { width: "48px" }, children: multiSelect && ((0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: selectedRows.size === filteredData.length && filteredData.length > 0, onChange: handleSelectAll })) })), activeColumns.map(function (column) { return ((0, jsx_runtime_1.jsx)("th", { style: { width: column.width }, children: sortable && column.sortable !== false ? ((0, jsx_runtime_1.jsxs)("div", { onClick: function () { return handleSort(column.key); }, style: { cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }, children: [column.label, (sortConfig === null || sortConfig === void 0 ? void 0 : sortConfig.key) === column.key && ((0, jsx_runtime_1.jsx)(lucide_react_1.ChevronUp, { size: 16, style: {
                                                                    transform: sortConfig.direction === "desc" ? "rotate(180deg)" : "none",
                                                                    transition: "transform 0.2s ease",
                                                                } }))] })) : (column.label) }, column.key)); }), finalRowActions.length > 0 && (0, jsx_runtime_1.jsx)("th", { style: { width: "40px" } })] }) }), (0, jsx_runtime_1.jsx)(TableBody, { textColor: textColor, rowHoverBg: rowHoverBg, children: error ? ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: activeColumns.length + (selectable ? 1 : 0) + (finalRowActions.length > 0 ? 1 : 0), children: (0, jsx_runtime_1.jsx)("div", { style: { textAlign: "center", padding: "2rem", color: "#dc2626" }, children: error }) }) })) : filteredData.length === 0 ? ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: activeColumns.length + (selectable ? 1 : 0) + (finalRowActions.length > 0 ? 1 : 0), children: (0, jsx_runtime_1.jsx)("div", { style: { textAlign: "center", padding: "2rem", color: "#6b7280" }, children: "No data available" }) }) })) : (filteredData.map(function (row, rowIndex) { return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsxs)(TableRow, { onClick: accordion && (CustomAccordionComponent || renderAccordionContent) ? function () { return toggleRow(rowIndex); } : undefined, style: { cursor: accordion && (CustomAccordionComponent || renderAccordionContent) ? "pointer" : "default" }, children: [selectable && ((0, jsx_runtime_1.jsx)(TableCell, { children: (0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: selectedRows.has(rowIndex), onChange: function () { return handleRowSelect(rowIndex); }, onClick: function (e) { return e.stopPropagation(); } }) })), activeColumns.map(function (column) { return ((0, jsx_runtime_1.jsx)(TableCell, { children: renderCellContent(column, row[column.key], row) }, column.key)); }), finalRowActions.length > 0 && ((0, jsx_runtime_1.jsx)(TableCell, { style: { padding: "0.5rem", width: "40px" }, children: (0, jsx_runtime_1.jsxs)(ActionsContainer, { children: [(0, jsx_runtime_1.jsx)(ActionsTrigger, { onClick: function (e) {
                                                                            e.stopPropagation();
                                                                            setActiveDropdown(activeDropdown === rowIndex ? null : rowIndex);
                                                                        }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.MoreHorizontal, { size: 16 }) }), activeDropdown === rowIndex && ((0, jsx_runtime_1.jsx)(ActionsDropdown, { children: finalRowActions.map(function (action, actionIndex) { return ((0, jsx_runtime_1.jsxs)(ActionItem, { variant: action.variant, onClick: function (e) {
                                                                                e.stopPropagation();
                                                                                action.onClick(row, rowIndex);
                                                                                setActiveDropdown(null);
                                                                            }, children: [action.icon, action.label] }, actionIndex)); }) }))] }) }))] }), accordion && (CustomAccordionComponent || renderAccordionContent) && ((0, jsx_runtime_1.jsx)(AccordionRow, { children: (0, jsx_runtime_1.jsx)(TableCell, { colSpan: activeColumns.length + (selectable ? 1 : 0) + (finalRowActions.length > 0 ? 1 : 0), style: { padding: 0 }, children: (0, jsx_runtime_1.jsx)(AccordionContent, { isExpanded: expandedRows.has(rowIndex), children: CustomAccordionComponent ? ((0, jsx_runtime_1.jsx)(CustomAccordionComponent, { columns: activeColumns, data: csvMode && csvModeActive && csvData.length > 0 ? csvData : data })) : renderAccordionContent ? (renderAccordionContent(row, rowIndex)) : null }) }) }))] }, rowIndex)); })) })] }), (0, jsx_runtime_1.jsx)(LoadingOverlay, { isVisible: loading, children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { size: 32, className: "spinner" }), (0, jsx_runtime_1.jsx)("span", { children: "Loading..." })] }) })] })), (0, jsx_runtime_1.jsx)(PaginationComponent, {})] }), (0, jsx_runtime_1.jsx)(ModalOverlay, { isOpen: editModalOpen, onClick: function () { return setEditModalOpen(false); }, children: (0, jsx_runtime_1.jsxs)(Modal, { isOpen: editModalOpen, onClick: function (e) { return e.stopPropagation(); }, children: [(0, jsx_runtime_1.jsxs)(ModalHeader, { children: [(0, jsx_runtime_1.jsx)(ModalTitle, { children: "Edit Item" }), (0, jsx_runtime_1.jsx)(CloseButton, { onClick: function () { return setEditModalOpen(false); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 20 }) })] }), currentEditRow && ((0, jsx_runtime_1.jsxs)("div", { children: [activeColumns.map(function (column) { return ((0, jsx_runtime_1.jsxs)(FormField, { children: [(0, jsx_runtime_1.jsx)(FormLabel, { children: column.label }), (0, jsx_runtime_1.jsx)(FormInput, { type: "text", value: editFormData[column.key] || "", onChange: function (e) {
                                                handleEditFormChange(column.key, e.target.value);
                                                // Handle CSV data editing if in CSV mode
                                                if (csvMode && csvModeActive) {
                                                    handleCsvDataEdit(currentEditRow.index, column.key, e.target.value);
                                                }
                                            } })] }, column.key)); }), (0, jsx_runtime_1.jsxs)(ButtonGroup, { children: [(0, jsx_runtime_1.jsx)(Button, { variant: "secondary", onClick: function () { return setEditModalOpen(false); }, children: "Cancel" }), (0, jsx_runtime_1.jsxs)(Button, { variant: "primary", onClick: handleSave, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Save, { size: 16, style: { marginRight: "0.5rem" } }), "Save Changes"] })] })] }))] }) }), (0, jsx_runtime_1.jsxs)(SlidePanel, { isOpen: viewPanelOpen, children: [(0, jsx_runtime_1.jsxs)(ModalHeader, { children: [(0, jsx_runtime_1.jsx)(ModalTitle, { children: "View Details" }), (0, jsx_runtime_1.jsx)(CloseButton, { onClick: function () { return setViewPanelOpen(false); }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 20 }) })] }), currentViewRow && ((0, jsx_runtime_1.jsx)("div", { children: activeColumns.map(function (column) { return ((0, jsx_runtime_1.jsxs)(DetailRow, { children: [(0, jsx_runtime_1.jsxs)(DetailLabel, { children: [column.label, ":"] }), (0, jsx_runtime_1.jsx)(DetailValue, { children: currentViewRow[column.key] })] }, column.key)); }) }))] })] }));
};
exports.default = GridAccordionTable;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35, templateObject_36, templateObject_37, templateObject_38, templateObject_39, templateObject_40, templateObject_41, templateObject_42, templateObject_43, templateObject_44, templateObject_45, templateObject_46, templateObject_47, templateObject_48, templateObject_49, templateObject_50, templateObject_51, templateObject_52, templateObject_53, templateObject_54, templateObject_55, templateObject_56, templateObject_57, templateObject_58, templateObject_59, templateObject_60, templateObject_61, templateObject_62, templateObject_63, templateObject_64, templateObject_65, templateObject_66, templateObject_67;
//# sourceMappingURL=GridAccordionTable.js.map