import {
  ApiOutlined,
  AppstoreAddOutlined,
  BlockOutlined,
  BranchesOutlined,
  ColumnWidthOutlined,
  DragOutlined,
  FormOutlined,
  LayoutOutlined,
  PartitionOutlined,
  SafetyCertificateOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';

export type ExampleMeta = {
  key: string;
  path: string;
  title: string;
  description: string;
  whenToUse: string;
  icon: ReactNode;
};

export const EXAMPLES: ExampleMeta[] = [
  {
    key: 'basic',
    path: '/examples/basic',
    title: 'Basic Usage',
    description:
      'Compose a form from item configs with text, select, textarea, rules, and responsive columns.',
    whenToUse:
      'Use when you want to declare form fields as configuration instead of hand-wiring every Form.Item. Ideal for standard create/edit screens with validation and responsive layout.',
    icon: <FormOutlined />,
  },
  {
    key: 'responsive-layout',
    path: '/examples/responsive-layout',
    title: 'Responsive Layout',
    description:
      'Grid columns via Ant Design Row/Col with static or dynamic col props.',
    whenToUse:
      'Use when fields should share a row on large screens and stack on mobile, or when column width should change from form values (for example a density toggle). Set col to a number, a ColProps breakpoint object, or a function returning either — same 24-column Grid as Ant Design Row/Col.',
    icon: <ColumnWidthOutlined />,
  },
  {
    key: 'registered-inputs',
    path: '/examples/registered-inputs',
    title: 'Component Registration',
    description:
      'Register Ant Design inputs once at app entry with registerInputComponents, then reference them by type (e.g. checkbox vs checkbox-group).',
    whenToUse:
      'Use when you need Ant Design inputs beyond the built-in text, password, textarea, list, and hidden types. Call registerInputComponents once (e.g. in src/register.ts from main.tsx), then reference them by type string — including distinct types like checkbox / checkbox-group and radio / radio-group — for a smaller default bundle and full control over which components ship.',
    icon: <AppstoreAddOutlined />,
  },
  {
    key: 'conditional',
    path: '/examples/conditional',
    title: 'Conditional Rendering',
    description:
      'Hide or modify form fields at runtime with hidden and dynamic itemProps based on form values.',
    whenToUse:
      'Use when fields should appear, hide, or change props depending on other values — for example content-type-specific fields or settings that only apply in certain modes.',
    icon: <BranchesOutlined />,
  },
  {
    key: 'validators',
    path: '/examples/validators',
    title: 'Form Validation',
    description:
      'Async validators, password policy, confirm-password dependency, and cross-field date rules via itemProps.rules.',
    whenToUse:
      'Use when Ant Design Form rules are enough: unique checks, patterns, dependencies, and cross-field validation — all declared on FormComposer items.',
    icon: <SafetyCertificateOutlined />,
  },
  {
    key: 'list',
    path: '/examples/list',
    title: 'Form Lists',
    description:
      'Repeatable fields with type list, custom listRender, and itemRender for add/remove UX.',
    whenToUse:
      'Use when users need to add, edit, and remove repeating groups of fields — FAQ items, contacts, tags, or any dynamic array of objects.',
    icon: <UnorderedListOutlined />,
  },
  {
    key: 'sortable-list',
    path: '/examples/sortable-list',
    title: 'Sortable Form Lists',
    description:
      'Reorder Form.List items with drag and drop while keeping values in sync via operation.move.',
    whenToUse:
      'Use when list order matters — carousels, menus, or priority queues — and editors should drag items to set display order.',
    icon: <DragOutlined />,
  },
  {
    key: 'nested-list',
    path: '/examples/nested-list',
    title: 'Nested Form Lists',
    description:
      'Nested type list items for hierarchical data such as menus with child links.',
    whenToUse:
      'Use when each list item itself contains another dynamic list — departments with employees, nav items with children, or similar tree-shaped forms.',
    icon: <PartitionOutlined />,
  },
  {
    key: 'custom',
    path: '/examples/custom',
    title: 'Custom Components',
    description:
      'Use type custom with any React component (Cascader, SlugInput, MediaPicker) without global registration.',
    whenToUse:
      'Use when a field needs a one-off or project-specific component. Pass component directly on the item — no registerInputComponents required.',
    icon: <BlockOutlined />,
  },
  {
    key: 'form-composer-items',
    path: '/examples/form-composer-items',
    title: 'Mix',
    description:
      'Use FormComposerItems inside a native Ant Design Form — multi-section layouts mixed with regular Form.Item.',
    whenToUse:
      'Use when you need the native Form component for layout control: multiple sections, mixing FormComposerItems with Form.Item, or any Ant Design Form props and features.',
    icon: <LayoutOutlined />,
  },
];

export type HomeFeature = {
  title: string;
  description: string;
  icon: ReactNode;
  path?: string;
};

export const HOME_FEATURES: HomeFeature[] = [
  {
    title: 'Dynamic form fields',
    description:
      'Flexible item configurations for labels, rules, columns, and input props.',
    icon: <FormOutlined />,
  },
  {
    title: 'Ant Design components',
    description:
      'Built-in support for common Ant Design inputs; register more as needed.',
    icon: <AppstoreAddOutlined />,
  },
  {
    title: 'Form lists',
    description:
      'Repeatable and nested lists with custom listRender and itemRender.',
    icon: <UnorderedListOutlined />,
  },
  {
    title: 'Conditional rendering',
    description:
      'Hide or modify fields based on runtime form values and conditions.',
    icon: <BranchesOutlined />,
  },
  {
    title: 'Custom components',
    description:
      'Integrate any React component via type custom without registration.',
    icon: <BlockOutlined />,
  },
  {
    title: 'Responsive layout',
    description:
      'Grid columns via Ant Design Row/Col with static or dynamic col props.',
    icon: <ColumnWidthOutlined />,
    path: '/examples/responsive-layout',
  },
  {
    title: 'TypeScript support',
    description:
      'Full type definitions for items, lists, and registered inputs.',
    icon: <ApiOutlined />,
  },
];
