import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

// ── Gallery Home ──────────────────────────────────────────────────────────────
const GalleryHomePage = lazy(() => import('./ui-library/gallery/GalleryHomePage'));

// ── Foundations ───────────────────────────────────────────────────────────────
const BrandStrategyPage   = lazy(() => import('./ui-library/gallery/brand-strategy/BrandStrategyPage'));
const BrandNarrativePage  = lazy(() => import('./ui-library/gallery/brand-narrative/BrandNarrativePage'));
const VoiceTonePage       = lazy(() => import('./ui-library/gallery/voice-tone/VoiceTonePage'));
const WritingExamplesPage = lazy(() => import('./ui-library/gallery/writing-examples/WritingExamplesPage'));
const ResponsivePage       = lazy(() => import('./ui-library/gallery/responsive/ResponsivePage'));
const InstallationPage = lazy(() => import('./ui-library/gallery/installation/InstallationPage'));
const LogoPage        = lazy(() => import('./ui-library/gallery/logo/LogoPage'));
const ColorsPage      = lazy(() => import('./ui-library/gallery/colors/ColorsPage'));
const TypographyPage  = lazy(() => import('./ui-library/gallery/typography/TypographyPage'));
const SpacingPage     = lazy(() => import('./ui-library/gallery/spacing/SpacingPage'));
const RadiusPage      = lazy(() => import('./ui-library/gallery/radius/RadiusPage'));
const ElevationPage   = lazy(() => import('./ui-library/gallery/elevation/ElevationPage'));
const MotionPage      = lazy(() => import('./ui-library/gallery/motion/MotionPage'));
const IconsPage       = lazy(() => import('./ui-library/gallery/icons/IconsPage'));

// ── Inputs ────────────────────────────────────────────────────────────────────
const ButtonPage          = lazy(() => import('./ui-library/gallery/button/ButtonPage'));
const IconButtonPage      = lazy(() => import('./ui-library/gallery/icon-button/IconButtonPage'));
const InputPage           = lazy(() => import('./ui-library/gallery/input/InputPage'));
const TextareaPage        = lazy(() => import('./ui-library/gallery/textarea/TextareaPage'));
const FieldPage           = lazy(() => import('./ui-library/gallery/field/FieldPage'));
const FieldInputPage      = lazy(() => import('./ui-library/gallery/field-input/FieldInputPage'));
const SegmentedControlPage = lazy(() => import('./ui-library/gallery/segmented-control/SegmentedControlPage'));
const CheckboxPage        = lazy(() => import('./ui-library/gallery/checkbox/CheckboxPage'));
const RadioGroupPage      = lazy(() => import('./ui-library/gallery/radio-group/RadioGroupPage'));
const SwitchPage          = lazy(() => import('./ui-library/gallery/switch/SwitchPage'));
const SelectPage          = lazy(() => import('./ui-library/gallery/select/SelectPage'));
const ComboboxPage        = lazy(() => import('./ui-library/gallery/combobox/ComboboxPage'));
const DatePickerPage      = lazy(() => import('./ui-library/gallery/date-picker/DatePickerPage'));
const FileUploadPage      = lazy(() => import('./ui-library/gallery/file-upload/FileUploadPage'));
const OtpInputPage        = lazy(() => import('./ui-library/gallery/otp-input/OtpInputPage'));
const FilterChipPage      = lazy(() => import('./ui-library/gallery/filter-chip/FilterChipPage'));
const SearchPage          = lazy(() => import('./ui-library/gallery/search/SearchPage'));

// ── Display ───────────────────────────────────────────────────────────────────
const CardPage            = lazy(() => import('./ui-library/gallery/card/CardPage'));
const BadgePage           = lazy(() => import('./ui-library/gallery/badge/BadgePage'));
const AvatarPage          = lazy(() => import('./ui-library/gallery/avatar/AvatarPage'));
const StatusDotPage       = lazy(() => import('./ui-library/gallery/status-dot/StatusDotPage'));
const AlertPage           = lazy(() => import('./ui-library/gallery/alert/AlertPage'));
const ToastPage           = lazy(() => import('./ui-library/gallery/toast/ToastPage'));
const SpinnerPage         = lazy(() => import('./ui-library/gallery/spinner/SpinnerPage'));
const SkeletonPage        = lazy(() => import('./ui-library/gallery/skeleton/SkeletonPage'));
const EmptyStatePage      = lazy(() => import('./ui-library/gallery/empty-state/EmptyStatePage'));
const StatusPagePage      = lazy(() => import('./ui-library/gallery/status-page/StatusPagePage'));
const StatCardPage        = lazy(() => import('./ui-library/gallery/stat-card/StatCardPage'));
const DescriptionListPage = lazy(() => import('./ui-library/gallery/description-list/DescriptionListPage'));
const StatusBadgePage     = lazy(() => import('./ui-library/gallery/status-badge/StatusBadgePage'));
const TimelinePage        = lazy(() => import('./ui-library/gallery/timeline/TimelinePage'));
const ProgressPage        = lazy(() => import('./ui-library/gallery/progress/ProgressPage'));
const ErrorBannerPage     = lazy(() => import('./ui-library/gallery/error-banner/ErrorBannerPage'));
const ValidationSummaryPage = lazy(() => import('./ui-library/gallery/validation-summary/ValidationSummaryPage'));

// ── Navigation ────────────────────────────────────────────────────────────────
const TabsPage            = lazy(() => import('./ui-library/gallery/tabs/TabsPage'));
const BreadcrumbPage      = lazy(() => import('./ui-library/gallery/breadcrumb/BreadcrumbPage'));
const PaginationPage      = lazy(() => import('./ui-library/gallery/pagination/PaginationPage'));
const MenuPage            = lazy(() => import('./ui-library/gallery/menu/MenuPage'));
const StatusActionsPage   = lazy(() => import('./ui-library/gallery/status-actions/StatusActionsPage'));
const SidebarPage         = lazy(() => import('./ui-library/gallery/sidebar/SidebarPage'));
const DropdownPage        = lazy(() => import('./ui-library/gallery/dropdown/DropdownPage'));
const StepperPage         = lazy(() => import('./ui-library/gallery/stepper/StepperPage'));

// ── Overlay ───────────────────────────────────────────────────────────────────
const ModalPage           = lazy(() => import('./ui-library/gallery/modal/ModalPage'));
const ConfirmActionPage   = lazy(() => import('./ui-library/gallery/confirm-action/ConfirmActionPage'));
const ConfirmDialogPage   = lazy(() => import('./ui-library/gallery/confirm-dialog/ConfirmDialogPage'));
const DrawerPage          = lazy(() => import('./ui-library/gallery/drawer/DrawerPage'));
const DialogPage          = lazy(() => import('./ui-library/gallery/dialog/DialogPage'));
const PopoverPage         = lazy(() => import('./ui-library/gallery/popover/PopoverPage'));
const TooltipPage         = lazy(() => import('./ui-library/gallery/tooltip/TooltipPage'));
const CommandPalettePage  = lazy(() => import('./ui-library/gallery/command-palette/CommandPalettePage'));
const AccordionPage       = lazy(() => import('./ui-library/gallery/accordion/AccordionPage'));

// ── Layout ────────────────────────────────────────────────────────────────────
const LayoutPatternsPage  = lazy(() => import('./ui-library/gallery/layout-patterns/LayoutPatternsPage'));
const ToolbarPage         = lazy(() => import('./ui-library/gallery/toolbar/ToolbarPage'));
const SectionPage         = lazy(() => import('./ui-library/gallery/section/SectionPage'));
const DividerPage         = lazy(() => import('./ui-library/gallery/divider/DividerPage'));
const PageHeaderPage      = lazy(() => import('./ui-library/gallery/page-header/PageHeaderPage'));
const WizardLayoutPage    = lazy(() => import('./ui-library/gallery/wizard-layout/WizardLayoutPage'));
const PageSamplePage      = lazy(() => import('./ui-library/gallery/page-sample/PageSamplePage'));
const FormSamplePage      = lazy(() => import('./ui-library/gallery/form-sample/FormSamplePage'));
const BannerPage          = lazy(() => import('./ui-library/gallery/banner/BannerPage'));
const PanelPage           = lazy(() => import('./ui-library/gallery/panel/PanelPage'));
const HeatmapPage         = lazy(() => import('./ui-library/gallery/heatmap/HeatmapPage'));
const EmployeeSchedulePage = lazy(() => import('./ui-library/gallery/employee-schedule/EmployeeSchedulePage'));
// ── Data Display ──────────────────────────────────────────────────────────────
const TablePage           = lazy(() => import('./ui-library/gallery/table/TablePage'));
const TreeViewPage        = lazy(() => import('./ui-library/gallery/tree-view/TreeViewPage'));
const CalendarPage        = lazy(() => import('./ui-library/gallery/calendar/CalendarPage'));
const ChartsPage          = lazy(() => import('./ui-library/gallery/charts/ChartsPage'));
const ColumnManagerPage   = lazy(() => import('./ui-library/gallery/column-manager/ColumnManagerPage'));
const ActivityFeedPage    = lazy(() => import('./ui-library/gallery/activity-feed/ActivityFeedPage'));
const KanbanPage          = lazy(() => import('./ui-library/gallery/kanban/KanbanPage'));

// ── Enterprise ────────────────────────────────────────────────────────────────
const EmployeeCardPage    = lazy(() => import('./ui-library/gallery/employee-card/EmployeeCardPage'));
const ApprovalTimelinePage = lazy(() => import('./ui-library/gallery/approval-timeline/ApprovalTimelinePage'));
const OrganizationTreePage = lazy(() => import('./ui-library/gallery/organization-tree/OrganizationTreePage'));
const OrgUnitTreePage     = lazy(() => import('./ui-library/gallery/org-unit-tree/OrgUnitTreePage'));
const OrgChartPage        = lazy(() => import('./ui-library/gallery/org-chart/OrgChartPage'));
const PermissionMatrixPage = lazy(() => import('./ui-library/gallery/permission-matrix/PermissionMatrixPage'));
const PayrollSummaryPage  = lazy(() => import('./ui-library/gallery/payroll-summary/PayrollSummaryPage'));
const LeaveBalancePage    = lazy(() => import('./ui-library/gallery/leave-balance/LeaveBalancePage'));
const TemplateSamplesPage = lazy(() => import('./ui-library/gallery/template-samples/TemplateSamplesPage'));
const EmailNotificationPage   = lazy(() => import('./ui-library/gallery/notifications/EmailNotificationPage'));
const SystemNotificationPage  = lazy(() => import('./ui-library/gallery/notifications/SystemNotificationPage'));
const PayrollLedgerPage       = lazy(() => import('./ui-library/gallery/payroll-ledger/PayrollLedgerPage'));
const ToggleTablePage         = lazy(() => import('./ui-library/gallery/toggle-table/ToggleTablePage'));
const CompanyPolicyPage       = lazy(() => import('./ui-library/gallery/company-policy/CompanyPolicyPage'));
const BatchProcessingPage     = lazy(() => import('./ui-library/gallery/batch-processing/BatchProcessingPage'));
const ApprovalRequestPage     = lazy(() => import('./ui-library/gallery/approval-request/ApprovalRequestPage'));

// ── Router ────────────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/ui-library" replace /> },
  { path: '/ui-library', element: <GalleryHomePage /> },

  // Foundations
  { path: '/ui-library/brand-strategy',     element: <BrandStrategyPage /> },
  { path: '/ui-library/brand-narrative',    element: <BrandNarrativePage /> },
  { path: '/ui-library/voice-tone',         element: <VoiceTonePage /> },
  { path: '/ui-library/writing-examples',   element: <WritingExamplesPage /> },
  { path: '/ui-library/responsive',           element: <ResponsivePage /> },
  { path: '/ui-library/installation', element: <InstallationPage /> },
  { path: '/ui-library/logo',       element: <LogoPage /> },
  { path: '/ui-library/colors',     element: <ColorsPage /> },
  { path: '/ui-library/typography', element: <TypographyPage /> },
  { path: '/ui-library/spacing',    element: <SpacingPage /> },
  { path: '/ui-library/radius',     element: <RadiusPage /> },
  { path: '/ui-library/elevation',  element: <ElevationPage /> },
  { path: '/ui-library/motion',     element: <MotionPage /> },
  { path: '/ui-library/icons',      element: <IconsPage /> },

  // Inputs
  { path: '/ui-library/button',           element: <ButtonPage /> },
  { path: '/ui-library/icon-button',      element: <IconButtonPage /> },
  { path: '/ui-library/input',            element: <InputPage /> },
  { path: '/ui-library/textarea',         element: <TextareaPage /> },
  { path: '/ui-library/field',            element: <FieldPage /> },
  { path: '/ui-library/field-input',      element: <FieldInputPage /> },
  { path: '/ui-library/segmented-control', element: <SegmentedControlPage /> },
  { path: '/ui-library/checkbox',         element: <CheckboxPage /> },
  { path: '/ui-library/radio-group',      element: <RadioGroupPage /> },
  { path: '/ui-library/switch',           element: <SwitchPage /> },
  { path: '/ui-library/select',           element: <SelectPage /> },
  { path: '/ui-library/combobox',         element: <ComboboxPage /> },
  { path: '/ui-library/date-picker',      element: <DatePickerPage /> },
  { path: '/ui-library/file-upload',      element: <FileUploadPage /> },
  { path: '/ui-library/otp-input',        element: <OtpInputPage /> },
  { path: '/ui-library/filter-chip',      element: <FilterChipPage /> },
  { path: '/ui-library/search',           element: <SearchPage /> },

  // Display
  { path: '/ui-library/card',              element: <CardPage /> },
  { path: '/ui-library/badge',             element: <BadgePage /> },
  { path: '/ui-library/avatar',            element: <AvatarPage /> },
  { path: '/ui-library/status-dot',        element: <StatusDotPage /> },
  { path: '/ui-library/alert',             element: <AlertPage /> },
  { path: '/ui-library/toast',             element: <ToastPage /> },
  { path: '/ui-library/spinner',           element: <SpinnerPage /> },
  { path: '/ui-library/skeleton',          element: <SkeletonPage /> },
  { path: '/ui-library/empty-state',       element: <EmptyStatePage /> },
  { path: '/ui-library/status-page',       element: <StatusPagePage /> },
  { path: '/ui-library/statistic',         element: <StatCardPage /> },
  { path: '/ui-library/description-list',  element: <DescriptionListPage /> },
  { path: '/ui-library/status-badge',      element: <StatusBadgePage /> },
  { path: '/ui-library/timeline',          element: <TimelinePage /> },
  { path: '/ui-library/progress',          element: <ProgressPage /> },
  { path: '/ui-library/error-banner',      element: <ErrorBannerPage /> },
  { path: '/ui-library/validation-summary', element: <ValidationSummaryPage /> },

  // Navigation
  { path: '/ui-library/tabs',           element: <TabsPage /> },
  { path: '/ui-library/breadcrumb',     element: <BreadcrumbPage /> },
  { path: '/ui-library/pagination',     element: <PaginationPage /> },
  { path: '/ui-library/menu',           element: <MenuPage /> },
  { path: '/ui-library/status-actions', element: <StatusActionsPage /> },
  { path: '/ui-library/sidebar',        element: <SidebarPage /> },
  { path: '/ui-library/dropdown',       element: <DropdownPage /> },
  { path: '/ui-library/stepper',        element: <StepperPage /> },

  // Overlay
  { path: '/ui-library/modal',           element: <ModalPage /> },
  { path: '/ui-library/confirm-action',  element: <ConfirmActionPage /> },
  { path: '/ui-library/confirm-dialog',  element: <ConfirmDialogPage /> },
  { path: '/ui-library/drawer',          element: <DrawerPage /> },
  { path: '/ui-library/dialog',          element: <DialogPage /> },
  { path: '/ui-library/popover',         element: <PopoverPage /> },
  { path: '/ui-library/tooltip',         element: <TooltipPage /> },
  { path: '/ui-library/command-palette', element: <CommandPalettePage /> },
  { path: '/ui-library/accordion',       element: <AccordionPage /> },

  // Layout
  { path: '/ui-library/layout-patterns', element: <LayoutPatternsPage /> },
  { path: '/ui-library/toolbar',         element: <ToolbarPage /> },
  { path: '/ui-library/section',         element: <SectionPage /> },
  { path: '/ui-library/divider',         element: <DividerPage /> },
  { path: '/ui-library/page-header',     element: <PageHeaderPage /> },
  { path: '/ui-library/wizard-layout',   element: <WizardLayoutPage /> },
  { path: '/ui-library/page-sample',    element: <PageSamplePage /> },
  { path: '/ui-library/form-sample',    element: <FormSamplePage /> },
  { path: '/ui-library/banner',         element: <BannerPage /> },
  { path: '/ui-library/panel',          element: <PanelPage /> },

  // Data Display
  { path: '/ui-library/table',        element: <TablePage /> },
  { path: '/ui-library/heatmap',           element: <HeatmapPage /> },
  { path: '/ui-library/employee-schedule', element: <EmployeeSchedulePage /> },
  { path: '/ui-library/tree-view',    element: <TreeViewPage /> },
  { path: '/ui-library/calendar',     element: <CalendarPage /> },
  { path: '/ui-library/charts',          element: <ChartsPage /> },
  { path: '/ui-library/column-manager',  element: <ColumnManagerPage /> },
  { path: '/ui-library/activity-feed', element: <ActivityFeedPage /> },
  { path: '/ui-library/kanban',       element: <KanbanPage /> },

  // Enterprise
  { path: '/ui-library/employee-card',     element: <EmployeeCardPage /> },
  { path: '/ui-library/approval-timeline', element: <ApprovalTimelinePage /> },
  { path: '/ui-library/organization-tree', element: <OrganizationTreePage /> },
  { path: '/ui-library/org-unit-tree',     element: <OrgUnitTreePage /> },
  { path: '/ui-library/org-chart',         element: <OrgChartPage /> },
  { path: '/ui-library/permission-matrix', element: <PermissionMatrixPage /> },
  { path: '/ui-library/payroll-summary',   element: <PayrollSummaryPage /> },
  { path: '/ui-library/leave-balance',     element: <LeaveBalancePage /> },
  { path: '/ui-library/email-notifications',  element: <EmailNotificationPage /> },
  { path: '/ui-library/system-notifications', element: <SystemNotificationPage /> },
  { path: '/ui-library/payroll-ledger',        element: <PayrollLedgerPage /> },
  { path: '/ui-library/toggle-table',          element: <ToggleTablePage /> },
  { path: '/ui-library/company-policy',        element: <CompanyPolicyPage /> },
  { path: '/ui-library/batch-processing',      element: <BatchProcessingPage /> },
  { path: '/ui-library/approval-request',      element: <ApprovalRequestPage /> },
  { path: '/ui-library/template-samples',  element: <TemplateSamplesPage /> },

  { path: '*', element: <Navigate to="/ui-library" replace /> },
]);

export default function App() {
  return (
    <>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-slate-400 text-sm">Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster
        position="top-right"
        theme="light"
        richColors
        toastOptions={{
          duration: 4000,
          classNames: {
            toast: 'font-body',
          },
        }}
      />
    </>
  );
}
