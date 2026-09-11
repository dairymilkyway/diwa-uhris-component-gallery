/**
 * DIWA UHRIS UI — Library Entry Point
 *
 * This file is the single entry point for the published npm package.
 * Import from here in consuming projects:
 *
 *   import { Button, Badge, Modal } from '@diwa/uhris-ui';
 */

// ── Primitives ────────────────────────────────────────────────────────────────

export { Button } from './gallery/button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './gallery/button/Button';

export { IconButton } from './gallery/icon-button/IconButton';
export type { IconButtonProps, IconButtonVariant } from './gallery/icon-button/IconButton';

export { Badge } from './gallery/badge/Badge';
export type { BadgeProps, BadgeTone, BadgeSize } from './gallery/badge/Badge';

export { Spinner } from './gallery/spinner/Spinner';
export type { SpinnerProps, SpinnerSize } from './gallery/spinner/Spinner';

export { Divider } from './gallery/divider/Divider';
export type { DividerProps } from './gallery/divider/Divider';

export { Avatar } from './gallery/avatar/Avatar';
export type { AvatarProps, AvatarSize } from './gallery/avatar/Avatar';

// ── Typography / Layout ───────────────────────────────────────────────────────

export { Section } from './gallery/section/Section';
export type { SectionProps } from './gallery/section/Section';

export { PageHeader } from './gallery/page-header/PageHeader';
export type { PageHeaderProps } from './gallery/page-header/PageHeader';

export { Toolbar } from './gallery/toolbar/Toolbar';
export type { ToolbarProps } from './gallery/toolbar/Toolbar';

// ── Form controls ─────────────────────────────────────────────────────────────

export { Field } from './gallery/field/Field';
export { FieldContext, useFieldContext } from './gallery/field/FieldContext';
export type { FieldContextValue } from './gallery/field/FieldContext';

export { FieldInput } from './gallery/field-input/FieldInput';

export { Input } from './gallery/input/Input';
export type { InputProps, InputStatus } from './gallery/input/Input';

export { Textarea } from './gallery/textarea/Textarea';
export type { TextareaProps, TextareaStatus, TextareaResize } from './gallery/textarea/Textarea';

export { Select } from './gallery/select/Select';
export type { SelectProps, SelectOption, SelectGroup, SelectItem, SelectStatus } from './gallery/select/Select';

export { Checkbox } from './gallery/checkbox/Checkbox';
export type { CheckboxProps } from './gallery/checkbox/Checkbox';

export { RadioGroup, RadioItem } from './gallery/radio-group/RadioGroup';
export type { RadioGroupProps, RadioItemProps } from './gallery/radio-group/RadioGroup';

export { Switch } from './gallery/switch/Switch';
export type { SwitchProps } from './gallery/switch/Switch';

export { Combobox } from './gallery/combobox/Combobox';
export type { ComboboxProps, ComboboxOption } from './gallery/combobox/Combobox';

export { DatePicker } from './gallery/date-picker/DatePicker';

export { OtpInput } from './gallery/otp-input/OtpInput';
export type { OtpInputProps } from './gallery/otp-input/OtpInput';

export { FileUpload } from './gallery/file-upload/FileUpload';
export type { FileUploadProps } from './gallery/file-upload/FileUpload';

export { FilterChip } from './gallery/filter-chip/FilterChip';
export type { FilterChipProps } from './gallery/filter-chip/FilterChip';

export { Search } from './gallery/search/Search';
export type { SearchProps } from './gallery/search/Search';

export { SegmentedControl } from './gallery/segmented-control/SegmentedControl';
export type { SegmentedControlProps, SegmentedControlOption } from './gallery/segmented-control/SegmentedControl';

export { ValidationSummary } from './gallery/validation-summary/ValidationSummary';
export type { ValidationSummaryProps, ValidationIssue, ValidationSummaryIssue } from './gallery/validation-summary/ValidationSummary';

// ── Feedback ──────────────────────────────────────────────────────────────────

export { Alert } from './gallery/alert/Alert';
export type { AlertProps, AlertTone } from './gallery/alert/Alert';

export { ErrorBanner } from './gallery/error-banner/ErrorBanner';
export type { ErrorBannerProps, ErrorBannerTone } from './gallery/error-banner/ErrorBanner';

export { Progress } from './gallery/progress/Progress';
export type { ProgressProps } from './gallery/progress/Progress';

export { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTableRow } from './gallery/skeleton/Skeleton';
export type { SkeletonProps, SkeletonTextProps, SkeletonAvatarProps, SkeletonCardProps, SkeletonTableRowProps, SkeletonVariant } from './gallery/skeleton/Skeleton';

export { StatusBadge } from './gallery/status-badge/StatusBadge';
export type { StatusBadgeProps, StatusBadgeTone } from './gallery/status-badge/StatusBadge';

// ── Overlays ──────────────────────────────────────────────────────────────────

export { default as Modal } from './gallery/modal/Modal';
export type { ModalProps } from './gallery/modal/Modal';

export { Dialog, DialogBody, DialogFooter } from './gallery/dialog/Dialog';
export type { DialogProps, DialogSize, DialogBodyProps, DialogFooterProps } from './gallery/dialog/Dialog';

export { Drawer } from './gallery/drawer/Drawer';
export type { DrawerProps, DrawerPlacement } from './gallery/drawer/Drawer';

export { Popover, PopoverTrigger, PopoverContent } from './gallery/popover/Popover';
export type { PopoverProps, PopoverPlacement, PopoverTriggerProps, PopoverContentProps } from './gallery/popover/Popover';

export { Tooltip } from './gallery/tooltip/Tooltip';
export type { TooltipProps, TooltipPlacement } from './gallery/tooltip/Tooltip';

export { ConfirmDialog } from './gallery/confirm-dialog/ConfirmDialog';
export type { ConfirmDialogProps, ConfirmDialogTone } from './gallery/confirm-dialog/ConfirmDialog';

export { ConfirmAction } from './gallery/confirm-action/ConfirmAction';

export { CommandPalette } from './gallery/command-palette/CommandPalette';
export type { CommandPaletteProps, CommandItem } from './gallery/command-palette/CommandPalette';

// ── Navigation ────────────────────────────────────────────────────────────────

export { Breadcrumb } from './gallery/breadcrumb/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem } from './gallery/breadcrumb/Breadcrumb';

export { Tabs, TabList, Tab, TabPanels, TabPanel } from './gallery/tabs/Tabs';
export type { TabsProps, TabListProps, TabProps, TabPanelsProps, TabPanelProps } from './gallery/tabs/Tabs';

export { Pagination } from './gallery/pagination/Pagination';
export type { PaginationProps } from './gallery/pagination/Pagination';

export { Stepper } from './gallery/stepper/Stepper';
export type { StepperProps, StepDef, StepState } from './gallery/stepper/Stepper';

export { SidebarNav, SidebarSection, SidebarGroup, SidebarItem } from './gallery/sidebar/Sidebar';
export type { SidebarNavProps, SidebarSectionProps, SidebarGroupProps, SidebarItemProps } from './gallery/sidebar/Sidebar';

export { Dropdown } from './gallery/dropdown/Dropdown';
export type { DropdownProps } from './gallery/dropdown/Dropdown';

export { Menu } from './gallery/menu/Menu';
export type { MenuProps, MenuItem, MenuItemTone } from './gallery/menu/Menu';

// ── Data display ──────────────────────────────────────────────────────────────

export { Card, CardHeader, CardContent, CardFooter } from './gallery/card/Card';
export type { CardProps, CardVariant, CardHeaderProps, CardContentProps, CardFooterProps } from './gallery/card/Card';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './gallery/accordion/Accordion';
export type { AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps } from './gallery/accordion/Accordion';

export { DescriptionList, DescriptionItem } from './gallery/description-list/DescriptionList';
export type { DescriptionListProps, DescriptionListLayout, DescriptionItemProps } from './gallery/description-list/DescriptionList';

export { ActivityFeed } from './gallery/activity-feed/ActivityFeed';
export type { ActivityFeedProps, ActivityEvent } from './gallery/activity-feed/ActivityFeed';

export { ApprovalTimeline } from './gallery/approval-timeline/ApprovalTimeline';
export type { ApprovalTimelineProps, ApprovalStep, ApprovalStepStatus } from './gallery/approval-timeline/ApprovalTimeline';

export { Timeline, TimelineItem, TimelineValueCard, TimelineFooter, TimelineEmptyState } from './gallery/timeline/Timeline';
export type { TimelineProps, TimelineItemProps, TimelineValueCardProps, TimelineFooterProps, TimelineEmptyStateProps } from './gallery/timeline/Timeline';

export { EmptyState } from './gallery/empty-state/EmptyState';
export type { EmptyStateProps } from './gallery/empty-state/EmptyState';

export { StatusPage, STATUS_PAGE_PRESETS } from './gallery/status-page/StatusPage';
export type { StatusPageProps, StatusPageAction } from './gallery/status-page/StatusPage';

export { NotFoundError } from './gallery/not-found-error/NotFoundError';
export type { NotFoundErrorProps } from './gallery/not-found-error/NotFoundError';

export { ForbiddenError } from './gallery/forbidden-error/ForbiddenError';
export type { ForbiddenErrorProps } from './gallery/forbidden-error/ForbiddenError';

export { ApplicationError, ApplicationErrorFallback } from './gallery/application-error/ApplicationError';
export type { ApplicationErrorProps, ApplicationErrorFallbackProps } from './gallery/application-error/ApplicationError';

export { EmployeeCard } from './gallery/employee-card/EmployeeCard';
export type { EmployeeCardProps, EmployeeCardMeta } from './gallery/employee-card/EmployeeCard';

export { TreeView } from './gallery/tree-view/TreeView';
export type { TreeViewProps, TreeItem } from './gallery/tree-view/TreeView';

export { Kanban } from './gallery/kanban/Kanban';
export type { KanbanProps, KanbanColumn, KanbanCard } from './gallery/kanban/Kanban';

export { PermissionMatrix } from './gallery/permission-matrix/PermissionMatrix';
export type { PermissionMatrixProps, PermissionMatrixCell } from './gallery/permission-matrix/PermissionMatrix';

export { Calendar } from './gallery/calendar/Calendar';
export type { CalendarProps } from './gallery/calendar/Calendar';

export { BarChart, LineChart, CHART_PALETTE } from './gallery/charts/Charts';
export type { BarChartProps, LineChartProps, ChartDataPoint } from './gallery/charts/Charts';

export { AreaChart } from './gallery/charts/AreaChart';
export type { AreaChartProps, AreaChartSeries, AreaChartDataPoint, GradientOpacity, ThresholdLine, ChartAnnotation, HighlightRegion } from './gallery/charts/AreaChart';

export { BarList } from './gallery/charts/BarList';
export type { BarListProps, BarListItem, BarHeight } from './gallery/charts/BarList';

export { Heatmap } from './gallery/heatmap/Heatmap';
export type { HeatmapProps, HeatmapDataPoint, HeatmapScale } from './gallery/heatmap/Heatmap';

export { OrgChart } from './gallery/org-chart/OrgChart';
export type { OrgChartProps, OrgChartNode } from './gallery/org-chart/OrgChart';

export { OrgUnitTree } from './gallery/org-unit-tree/OrgUnitTree';
export type { OrgUnitTreeProps, OrgUnitNode } from './gallery/org-unit-tree/OrgUnitTree';

export { PafTemplate } from './gallery/template-samples/templates/PafTemplate';
export type { PafPreviewData } from './gallery/template-samples/templates/PafTemplate';

export { IsoCubeBlock } from './gallery/page-sample/IsoCubeBlock';
export type { IsoCubeBlockProps } from './gallery/page-sample/IsoCubeBlock';

export { PayslipTemplate } from './gallery/template-samples/templates/PayslipTemplate';
export type { PayslipPreviewData } from './gallery/template-samples/templates/PayslipTemplate';

export { ReportTemplate } from './gallery/template-samples/templates/ReportTemplate';
export type { ReportPreviewData } from './gallery/template-samples/templates/ReportTemplate';

export { TimekeepingTemplate } from './gallery/template-samples/templates/TimekeepingTemplate';
export type { TimekeepingPreviewData } from './gallery/template-samples/templates/TimekeepingTemplate';

export { Statistic } from './gallery/stat-card/Statistic';
export type { StatisticProps, StatisticTrend, StatisticVariant } from './gallery/stat-card/Statistic';

export { StatusDot } from './gallery/status-dot/StatusDot';
export type { StatusDotProps, StatusDotStatus } from './gallery/status-dot/StatusDot';

export { ColumnManager, applyColumnOrder } from './gallery/column-manager/ColumnManager';
export type { ColumnManagerProps, ColumnManagerColumn } from './gallery/column-manager/ColumnManager';

export { MaskedValue } from './gallery/status-dot/MaskedValue';
export type { MaskedValueProps } from './gallery/status-dot/MaskedValue';

// ── Third-party re-exports ────────────────────────────────────────────────────
// Re-exported so consumers don't need separate installs for common dependencies
export { Toaster, toast } from 'sonner';

// ── Utilities ─────────────────────────────────────────────────────────────────

export { statusMenuItems } from './gallery/status-actions/statusActions';
export type { ActionMenuItem, Lifecycle, StatusTransitionRequest, StatusMenuOptions } from './gallery/status-actions/statusActions';

// ── Design tokens ─────────────────────────────────────────────────────────────

export * from './tokens/index';


// ── Icons (re-exported from lucide-react) ─────────────────────────────────────
// Consumers can import icons directly from @diwauhris/ui instead of installing
// lucide-react separately:
//
//   import { Plus, Trash2, ChevronDown } from '@diwauhris/ui';
//
// Note: `Search` from @diwauhris/ui resolves to the Search INPUT component,
// not the lucide Search icon. To use the icon, import from lucide-react directly:
//   import { Search as SearchIcon } from 'lucide-react';

export * from 'lucide-react';
