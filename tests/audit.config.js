/**
 * audit.config.js
 *
 * Single source of truth for the generic component audit suite.
 *
 * REQUIRED_PROPS  — minimal props needed to render without throwing.
 *                   Keys are the exported symbol name (string).
 *                   Value is a props object (or a function returning one
 *                   so lazy values like mock functions work).
 *
 * NEEDS_ROUTER    — components that call useNavigate / Link and need
 *                   a MemoryRouter wrapper.
 *
 * SKIP            — components that cannot be meaningfully tested in
 *                   jsdom for reasons documented inline.
 *
 * CHILDREN_SKIP   — components that should NOT receive a generic child
 *                   node in the passthrough props test (e.g. they accept
 *                   only specific child component types).
 */

// ─── Classification report ────────────────────────────────────────────────────
//
// COMPONENTS (capitalized, renderable — covered by this suite):
//   Button, IconButton, Badge, Spinner, Divider, Avatar
//   Section, PageHeader, Toolbar
//   Field, FieldInput, Input, Textarea, Select, Checkbox, RadioGroup, RadioItem
//   Switch, Combobox, DatePicker, OtpInput, FileUpload, FilterChip
//   SegmentedControl, ValidationSummary
//   Alert, ErrorBanner, Progress, Skeleton, SkeletonText, SkeletonAvatar
//   SkeletonCard, SkeletonTableRow, StatusBadge
//   Modal, Dialog, DialogBody, DialogFooter, Drawer
//   Popover, PopoverTrigger, PopoverContent
//   Tooltip, ConfirmDialog, ConfirmAction, CommandPalette
//   Breadcrumb, Tabs, TabList, Tab, TabPanels, TabPanel
//   Pagination, Stepper
//   SidebarNav, SidebarSection, SidebarGroup, SidebarItem
//   Dropdown, Menu
//   Card, CardHeader, CardContent, CardFooter
//   Accordion, AccordionItem, AccordionTrigger, AccordionContent
//   DescriptionList, DescriptionItem
//   ActivityFeed, ApprovalTimeline, Timeline, TimelineItem
//   TimelineValueCard, TimelineFooter, TimelineEmptyState
//   EmptyState, EmployeeCard, TreeView, Kanban, PermissionMatrix
//   Calendar, BarChart, LineChart, Heatmap, OrgChart, OrgUnitTree
//   PafTemplate, PayslipTemplate, ReportTemplate, TimekeepingTemplate
//   Statistic, StatusDot
//   Toaster (third-party re-export)
//
// UTILITIES / FUNCTIONS (not renderable — excluded from suite):
//   toast, statusMenuItems, useFieldContext, FieldContext
//
// DESIGN TOKENS (constants — excluded):
//   Everything from tokens/index (color strings, spacing values, etc.)
//
// ICONS (lucide-react re-exports — excluded, 400+ symbols):
//   All capitalized lucide icon components are excluded via SKIP_PATTERNS
// ─────────────────────────────────────────────────────────────────────────────

const React = require('react');

// Helpers for required props
const noop = () => {};
const asyncNoop = async () => {};

/**
 * Minimal props per component — only what's needed to render without throwing.
 * Omit optional props unless the component throws without them.
 */
const REQUIRED_PROPS = {
  // ── Button ──────────────────────────────────────────────────────────────
  Button: { children: 'Click' },

  // ── IconButton ──────────────────────────────────────────────────────────
  IconButton: { 'aria-label': 'Action', icon: React.createElement('span', null, '×') },

  // ── Badge ───────────────────────────────────────────────────────────────
  Badge: { children: 'Label' },

  // ── Spinner ─────────────────────────────────────────────────────────────
  Spinner: { size: 'md' },

  // ── Divider ─────────────────────────────────────────────────────────────
  Divider: {},

  // ── Avatar ──────────────────────────────────────────────────────────────
  Avatar: { name: 'Maria Santos' },

  // ── Section ─────────────────────────────────────────────────────────────
  Section: { title: 'Section', children: React.createElement('p', null, 'body') },

  // ── PageHeader ──────────────────────────────────────────────────────────
  PageHeader: { title: 'Page Title' },

  // ── Toolbar ─────────────────────────────────────────────────────────────
  Toolbar: { left: React.createElement('span', null, 'left') },

  // ── Field ───────────────────────────────────────────────────────────────
  // The label text is connected via htmlFor/id — provide a labelled input
  Field: { label: 'Name', children: React.createElement('input', { type: 'text', 'aria-label': 'Name' }) },

  // ── FieldInput ──────────────────────────────────────────────────────────
  FieldInput: { placeholder: 'Enter value' },

  // ── Input ───────────────────────────────────────────────────────────────
  Input: { 'aria-label': 'Input' },

  // ── Textarea ────────────────────────────────────────────────────────────
  Textarea: { 'aria-label': 'Textarea' },

  // ── Select ──────────────────────────────────────────────────────────────
  Select: {
    items: [{ value: 'a', label: 'Option A' }],
    'aria-label': 'Select',
  },

  // ── Checkbox ────────────────────────────────────────────────────────────
  // Checkbox renders <input type="checkbox"> — void element, no children allowed.
  // Uses `label` prop, not children.
  Checkbox: { label: 'Accept terms' },

  // ── RadioGroup ──────────────────────────────────────────────────────────
  RadioGroup: {
    'aria-label': 'Options',
    children: null,
  },

  // ── RadioItem ───────────────────────────────────────────────────────────
  RadioItem: { value: 'a', label: 'Option A' },

  // ── Switch ──────────────────────────────────────────────────────────────
  Switch: { 'aria-label': 'Toggle', onChange: noop, checked: false },

  // ── Combobox ────────────────────────────────────────────────────────────
  Combobox: {
    value: '',
    onChange: noop,
    options: [{ value: 'a', label: 'Option A' }],
    'aria-label': 'Search options',
  },

  // ── DatePicker ──────────────────────────────────────────────────────────
  DatePicker: { 'aria-label': 'Pick date' },

  // ── OtpInput ────────────────────────────────────────────────────────────
  OtpInput: { value: ['', '', '', '', '', ''], onChange: noop, length: 6 },

  // ── FileUpload ──────────────────────────────────────────────────────────
  FileUpload: { 'aria-label': 'Upload file' },

  // ── FilterChip ──────────────────────────────────────────────────────────
  FilterChip: { label: 'Department: HR' },

  // ── SegmentedControl ────────────────────────────────────────────────────
  SegmentedControl: {
    options: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }],
    value: 'a',
    onValueChange: noop,
    'aria-label': 'View',
  },

  // ── ValidationSummary ───────────────────────────────────────────────────
  ValidationSummary: {
    issues: [{ field: 'Name', message: 'Required' }],
  },

  // ── Alert ───────────────────────────────────────────────────────────────
  Alert: { tone: 'info', children: 'Alert message' },

  // ── ErrorBanner ─────────────────────────────────────────────────────────
  ErrorBanner: { message: 'Something went wrong.' },

  // ── Progress ────────────────────────────────────────────────────────────
  Progress: { value: 50, max: 100, 'aria-label': 'Loading' },

  // ── Skeleton ────────────────────────────────────────────────────────────
  Skeleton: {},
  SkeletonText: {},
  SkeletonAvatar: {},
  SkeletonCard: {},
  SkeletonTableRow: {},

  // ── StatusBadge ─────────────────────────────────────────────────────────
  StatusBadge: { tone: 'success', children: 'Active' },

  // ── Modal ───────────────────────────────────────────────────────────────
  Modal: { isOpen: false, onClose: noop, title: 'Dialog', children: React.createElement('p', null, 'body') },

  // ── Dialog ──────────────────────────────────────────────────────────────
  Dialog: { open: false, onClose: noop, title: 'Dialog' },

  // ── DialogBody ──────────────────────────────────────────────────────────
  DialogBody: { children: React.createElement('p', null, 'body') },

  // ── DialogFooter ────────────────────────────────────────────────────────
  DialogFooter: { children: React.createElement('button', null, 'OK') },

  // ── Drawer ──────────────────────────────────────────────────────────────
  Drawer: { open: false, onClose: noop, title: 'Drawer', children: React.createElement('p', null, 'body') },

  // ── Popover ─────────────────────────────────────────────────────────────
  Popover: { children: null },

  // ── PopoverTrigger ──────────────────────────────────────────────────────
  PopoverTrigger: { children: React.createElement('span', null, 'Open') },

  // ── PopoverContent ──────────────────────────────────────────────────────
  PopoverContent: { children: React.createElement('p', null, 'content') },

  // ── Tooltip ─────────────────────────────────────────────────────────────
  Tooltip: {
    content: 'Tooltip text',
    children: React.createElement('button', null, 'Hover me'),
  },

  // ── ConfirmDialog ───────────────────────────────────────────────────────
  ConfirmDialog: { open: false, onClose: noop, onConfirm: asyncNoop, title: 'Confirm?' },

  // ── ConfirmAction ───────────────────────────────────────────────────────
  ConfirmAction: {
    onConfirm: asyncNoop,
    children: React.createElement('button', null, 'Delete'),
  },

  // ── CommandPalette ──────────────────────────────────────────────────────
  CommandPalette: {
    open: false,
    onClose: noop,
    items: [],
    query: '',
    onQueryChange: noop,
  },

  // ── Breadcrumb ──────────────────────────────────────────────────────────
  Breadcrumb: {
    items: [{ label: 'Home', to: '/' }, { label: 'Settings' }],
  },

  // ── Tabs / TabList / Tab / TabPanels / TabPanel ──────────────────────────
  Tabs: { defaultValue: 'a', children: null },
  TabList: { children: null, 'aria-label': 'Tabs' },
  Tab: { value: 'a', children: 'Tab A' },
  TabPanels: { children: null },
  TabPanel: { value: 'a', children: React.createElement('p', null, 'Panel') },

  // ── Pagination ──────────────────────────────────────────────────────────
  Pagination: { page: 1, totalPages: 5, onPageChange: noop },

  // ── Stepper ─────────────────────────────────────────────────────────────
  Stepper: {
    steps: [
      { id: '1', label: 'Step 1' },
      { id: '2', label: 'Step 2' },
    ],
    currentStep: '1',
  },

  // ── SidebarNav ──────────────────────────────────────────────────────────
  SidebarNav: { children: null, 'aria-label': 'Navigation' },
  SidebarSection: { children: null },
  SidebarGroup: { label: 'Group', children: null },
  SidebarItem: { children: 'Item', onClick: noop },

  // ── Dropdown ────────────────────────────────────────────────────────────
  Dropdown: {
    trigger: React.createElement('span', null, 'Open'),
    isOpen: false,
    onToggle: noop,
    onClose: noop,
    children: React.createElement('span', null, 'Option'),
  },

  // ── Menu ────────────────────────────────────────────────────────────────
  Menu: {
    trigger: React.createElement('button', null, 'Actions'),
    items: [{ label: 'Edit', onClick: noop }],
  },

  // ── Card / CardHeader / CardContent / CardFooter ────────────────────────
  Card: { children: null },
  CardHeader: { title: 'Card Title' },
  CardContent: { children: React.createElement('p', null, 'content') },
  CardFooter: { children: React.createElement('button', null, 'OK') },

  // ── Accordion ───────────────────────────────────────────────────────────
  Accordion: { type: 'single', children: null },
  AccordionItem: { value: 'item-1', children: null },
  AccordionTrigger: { children: 'Trigger' },
  AccordionContent: { children: React.createElement('p', null, 'Content') },

  // ── DescriptionList / DescriptionItem ───────────────────────────────────
  DescriptionList: { children: null },
  DescriptionItem: { label: 'Employee ID', value: 'DL-0001' },

  // ── ActivityFeed ────────────────────────────────────────────────────────
  ActivityFeed: {
    events: [
      { id: '1', label: 'Created', timestamp: '2025-01-01', actor: 'HR Admin' },
    ],
  },

  // ── ApprovalTimeline ────────────────────────────────────────────────────
  ApprovalTimeline: {
    steps: [
      { id: '1', title: 'Submit', status: 'completed', timestamp: '2025-01-01' },
      { id: '2', title: 'Review', status: 'current' },
    ],
  },

  // ── Timeline / TimelineItem / etc. ──────────────────────────────────────
  Timeline: { children: null },
  TimelineItem: {
    title: 'Event',
    timestamp: '2025-01-01',
    children: React.createElement('p', null, 'detail'),
  },
  TimelineValueCard: { label: 'Amount', value: '₱14,200' },
  TimelineFooter: { children: React.createElement('p', null, 'footer') },
  TimelineEmptyState: { message: 'No events yet.' },

  // ── EmptyState ──────────────────────────────────────────────────────────
  EmptyState: { title: 'No results' },

  // ── EmployeeCard ────────────────────────────────────────────────────────
  EmployeeCard: {
    name: 'Maria Santos',
    role: 'Senior Accountant',
    department: 'Finance',
  },

  // ── TreeView ────────────────────────────────────────────────────────────
  TreeView: {
    items: [{ id: '1', label: 'Root', children: [] }],
    'aria-label': 'Tree',
  },

  // ── Kanban ──────────────────────────────────────────────────────────────
  Kanban: {
    columns: [{ id: 'todo', label: 'To Do', cards: [] }],
  },

  // ── PermissionMatrix ────────────────────────────────────────────────────
  // roles: string[], permissions: Array<{ label, cells: PermissionMatrixCell[] }>
  PermissionMatrix: {
    roles: ['Admin', 'HR Staff'],
    permissions: [
      { label: 'View Employees', cells: [{ granted: true }, { granted: false }] },
    ],
    caption: 'Role permissions',
  },

  // ── Calendar ────────────────────────────────────────────────────────────
  Calendar: { 'aria-label': 'Calendar' },

  // ── BarChart ────────────────────────────────────────────────────────────
  BarChart: {
    data: [{ label: 'Jan', value: 42 }],
    'aria-label': 'Monthly data',
  },

  // ── LineChart ────────────────────────────────────────────────────────────
  LineChart: {
    data: [{ label: 'Jan', value: 42 }, { label: 'Feb', value: 65 }],
    'aria-label': 'Trend',
  },

  // ── Heatmap ─────────────────────────────────────────────────────────────
  Heatmap: {
    data: [{ date: '2025-01-01', value: 3 }],
    'aria-label': 'Activity',
  },

  // ── OrgChart ────────────────────────────────────────────────────────────
  OrgChart: {
    nodes: [{ id: '1', label: 'CEO' }],
    'aria-label': 'Org chart',
  },

  // ── OrgUnitTree ─────────────────────────────────────────────────────────
  OrgUnitTree: {
    nodes: [{ id: '1', label: 'Finance' }],
    'aria-label': 'Org units',
  },

  // ── IsoCubeBlock ────────────────────────────────────────────────────────
  IsoCubeBlock: {},

  // ── PafTemplate ─────────────────────────────────────────────────────────
  PafTemplate: {
    data: {
      id: 'PAF-001',
      type: 'Promotion',
      date: '2025-01-01',
      effectiveDate: '2025-02-01',
      fromTemplate: 'Staff L1',
      toTemplate: 'Staff L2',
      employee: { name: 'Maria Santos', idNo: 'DL-0001', position: 'Accountant', department: 'Finance', dateHired: '2021-01-01' },
      from: { rank: 'Staff', status: 'Regular', position: 'Accountant', department: 'Finance', company: 'DIWA', supervisor: 'J. Reyes', departmentHead: 'C. Mendoza', basicSalary: '20,000.00' },
      to: { rank: 'Senior', status: 'Regular', position: 'Senior Accountant', department: 'Finance', company: 'DIWA', supervisor: 'J. Reyes', departmentHead: 'C. Mendoza', basicSalary: '26,000.00' },
      reason: 'Outstanding performance.',
      preparedBy: 'HR Manager',
      salaryComponents: [{ label: 'Basic', from: '20,000.00', to: '26,000.00' }],
    },
  },

  // ── PayslipTemplate ─────────────────────────────────────────────────────
  PayslipTemplate: {
    data: { id: 'DL-0001', name: 'Maria Santos', role: 'Accountant', department: 'Finance' },
  },

  // ── ReportTemplate ──────────────────────────────────────────────────────
  ReportTemplate: {
    data: { title: 'Employee Report', company: 'DIWA' },
  },

  // ── TimekeepingTemplate ─────────────────────────────────────────────────
  TimekeepingTemplate: {
    data: {
      employee: { name: 'Maria Santos', role: 'Accountant', department: 'Finance' },
      period: 'Jan 1–15, 2025',
    },
  },

  // ── Statistic ───────────────────────────────────────────────────────────
  Statistic: { label: 'Total Employees', value: 142 },

  // ── StatusDot ───────────────────────────────────────────────────────────
  StatusDot: { status: 'active' },

  // ── Toaster (sonner re-export) ───────────────────────────────────────────
  Toaster: {},
};

/**
 * Components that use react-router-dom (Link / useNavigate / NavLink)
 * and must be wrapped in MemoryRouter.
 */
const NEEDS_ROUTER = new Set([
  'Breadcrumb',
  'SidebarNav',
  'SidebarSection',
  'SidebarGroup',
  'SidebarItem',
]);

/**
 * Components that render inside a Radix Popover/Dialog tree and need
 * their parent context. These are composition children, not standalone.
 * They are still tested, but wrapped in their parent.
 */
const NEEDS_PARENT = {
  // Radix Dialog context
  DialogBody: (children) => React.createElement(
    require('../src/ui-library/index').Dialog,
    { open: true, onClose: noop, title: 'Test' },
    children
  ),
  DialogFooter: (children) => React.createElement(
    require('../src/ui-library/index').Dialog,
    { open: true, onClose: noop, title: 'Test' },
    children
  ),
  // Popover context (Radix)
  PopoverTrigger: (children) => React.createElement(
    require('../src/ui-library/index').Popover,
    null,
    children
  ),
  PopoverContent: (children) => React.createElement(
    require('../src/ui-library/index').Popover,
    { defaultOpen: true },
    React.createElement(require('../src/ui-library/index').PopoverTrigger, null,
      React.createElement('span', null, 'Open')
    ),
    children
  ),
  // RadioItem must be inside RadioGroup (enforced via context)
  RadioItem: (children) => React.createElement(
    require('../src/ui-library/index').RadioGroup,
    { 'aria-label': 'Options', value: 'a', onValueChange: () => {} },
    children
  ),
  // DescriptionItem must be inside a DescriptionList (<dl>)
  DescriptionItem: (children) => React.createElement(
    require('../src/ui-library/index').DescriptionList,
    null,
    children
  ),
  // Accordion composition children
  AccordionItem: (children) => React.createElement(
    require('../src/ui-library/index').Accordion,
    { type: 'single' },
    children
  ),
  AccordionTrigger: (children) => React.createElement(
    require('../src/ui-library/index').Accordion,
    { type: 'single' },
    React.createElement(require('../src/ui-library/index').AccordionItem, { value: 'i1' }, children)
  ),
  AccordionContent: (children) => React.createElement(
    require('../src/ui-library/index').Accordion,
    { type: 'single', defaultValue: 'i1' },
    React.createElement(require('../src/ui-library/index').AccordionItem, { value: 'i1' }, children)
  ),
  // SidebarItem renders <li> and must be inside a <ul>/<ol>
  SidebarItem: (children) => React.createElement(
    require('../src/ui-library/index').SidebarNav,
    { 'aria-label': 'Nav' },
    React.createElement(
      require('../src/ui-library/index').SidebarSection,
      null,
      children
    )
  ),
  TabList: (children) => React.createElement(
    require('../src/ui-library/index').Tabs,
    { defaultValue: 'a' },
    children
  ),
  Tab: (children) => {
    const { Tabs, TabList, TabPanels, TabPanel } = require('../src/ui-library/index');
    return React.createElement(Tabs, { defaultValue: 'a' },
      React.createElement(TabList, { 'aria-label': 't' }, children),
      React.createElement(TabPanels, null,
        React.createElement(TabPanel, { value: 'a' }, React.createElement('p', null, 'panel'))
      )
    );
  },
  TabPanels: (children) => React.createElement(
    require('../src/ui-library/index').Tabs,
    { defaultValue: 'a' },
    children
  ),
  TabPanel: (children) => React.createElement(
    require('../src/ui-library/index').Tabs,
    { defaultValue: 'a' },
    children
  ),
};

/**
 * Components that cannot be meaningfully tested in jsdom.
 * Each entry has a reason string.
 */
const SKIP = {
  // D3 uses browser-only SVG measurement APIs that jsdom cannot polyfill.
  // The component does NOT crash (has a W===0/H===0 guard) but the tree is
  // empty — zoom controls render, node positions don't.
  OrgChart: 'D3 SVG layout requires real browser geometry. Tree content is empty in jsdom (W/H=0 guard fires), but zoom buttons render. Structural-only test is possible but misleading — skip for now.',
};

/**
 * Components where generic children injection should be skipped
 * (they accept only specific sub-component children, not arbitrary nodes,
 *  OR they render void HTML elements like <input> that cannot have children).
 */
const CHILDREN_SKIP = new Set([
  // Void element wrappers — <input> cannot have children
  'Checkbox', 'Input', 'FieldInput', 'Textarea', 'Select',
  'Switch', 'OtpInput', 'Combobox', 'DatePicker', 'FileUpload',
  'RadioItem',
  // Specific composition containers
  'Accordion', 'Tabs', 'TabList', 'TabPanels',
  'SidebarNav', 'SidebarSection',
  'RadioGroup',
  'DescriptionList',
  'Timeline',
  'Popover',
]);

module.exports = { REQUIRED_PROPS, NEEDS_ROUTER, NEEDS_PARENT, SKIP, CHILDREN_SKIP };
