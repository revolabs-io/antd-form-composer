import {
  DesktopOutlined,
  LaptopOutlined,
  MobileOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import {
  AnyObject,
  ColSpanType,
  FormComposer,
  FormComposerItemType,
} from '@lib';
import {
  Alert,
  Button,
  Flex,
  FormInstance,
  Segmented,
  Space,
  Tag,
  Typography,
} from 'antd';
import { type ReactNode, useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';
import { EXAMPLES } from '../../examples';
import { RESPONSIVE_LAYOUT_CODE } from './code-snippets';

const meta = EXAMPLES.find((item) => item.key === 'responsive-layout')!;

type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const BREAKPOINT_ORDER: BreakpointKey[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

/** Typical preview widths (px) for each Ant Design breakpoint. */
const BREAKPOINT_PRESETS: Record<
  BreakpointKey,
  { label: string; width: number; minWidth: number; icon: ReactNode }
> = {
  xs: {
    label: 'xs',
    width: 375,
    minWidth: 0,
    icon: <MobileOutlined />,
  },
  sm: {
    label: 'sm',
    width: 576,
    minWidth: 576,
    icon: <MobileOutlined />,
  },
  md: {
    label: 'md',
    width: 768,
    minWidth: 768,
    icon: <TabletOutlined />,
  },
  lg: {
    label: 'lg',
    width: 992,
    minWidth: 992,
    icon: <LaptopOutlined />,
  },
  xl: {
    label: 'xl',
    width: 1200,
    minWidth: 1200,
    icon: <DesktopOutlined />,
  },
  xxl: {
    label: 'xxl',
    width: 1600,
    minWidth: 1600,
    icon: <DesktopOutlined />,
  },
};

/**
 * Resolve Ant Design Col responsive props to a single span for the
 * simulated breakpoint (same cascade: nearest defined ≤ current).
 */
function resolveColSpan(col: ColSpanType, breakpoint: BreakpointKey): number {
  if (typeof col === 'number' || typeof col === 'string') {
    const span = Number(col);
    return Number.isFinite(span) ? span : 24;
  }

  if (!col || typeof col !== 'object') {
    return 24;
  }

  const idx = BREAKPOINT_ORDER.indexOf(breakpoint);
  let span =
    typeof col.span === 'number' || typeof col.span === 'string'
      ? Number(col.span)
      : 24;

  for (let i = 0; i <= idx; i += 1) {
    const key = BREAKPOINT_ORDER[i];
    const value = col[key];
    if (value === undefined || value === null) {
      continue;
    }
    if (typeof value === 'object') {
      if (value.span !== undefined) {
        span = Number(value.span);
      }
    } else {
      span = Number(value);
    }
  }

  return Number.isFinite(span) ? span : 24;
}

function fieldCol(
  _form: FormInstance,
  formValues: AnyObject,
): { xs: number; sm: number; md: number; lg: number } {
  if (formValues?.density === 'compact') {
    return { xs: 24, sm: 12, md: 8, lg: 8 };
  }
  return { xs: 24, sm: 12, md: 12, lg: 12 };
}

const RAW_ITEMS: FormComposerItemType[] = [
  {
    type: 'select',
    col: 24,
    itemProps: {
      label: 'Density',
      name: 'density',
      extra:
        'Dynamic col() for name fields — Compact = 3 columns on md+, Comfortable = 2.',
      rules: [{ required: true, message: 'Select a density' }],
    },
    inputProps: {
      options: [
        { label: 'Comfortable (2 columns on md+)', value: 'comfortable' },
        { label: 'Compact (3 columns on md+)', value: 'compact' },
      ],
    },
  },
  {
    type: 'text',
    col: 8,
    itemProps: {
      label: 'Static span 8',
      name: 'staticA',
      extra: 'col: 8',
      rules: [{ required: true, message: 'Required' }],
    },
    inputProps: { placeholder: 'Always 1/3 width' },
  },
  {
    type: 'text',
    col: 8,
    itemProps: {
      label: 'Static span 8',
      name: 'staticB',
      extra: 'col: 8',
      rules: [{ required: true, message: 'Required' }],
    },
    inputProps: { placeholder: 'Always 1/3 width' },
  },
  {
    type: 'text',
    col: 8,
    itemProps: {
      label: 'Static span 8',
      name: 'staticC',
      extra: 'col: 8',
      rules: [{ required: true, message: 'Required' }],
    },
    inputProps: { placeholder: 'Always 1/3 width' },
  },
  {
    type: 'text',
    col: { xs: 24, sm: 12, md: 8, lg: 6 },
    itemProps: {
      label: 'City',
      name: 'city',
      extra: 'col: { xs: 24, sm: 12, md: 8, lg: 6 }',
      rules: [{ required: true, message: 'City is required' }],
    },
    inputProps: { placeholder: 'City' },
  },
  {
    type: 'text',
    col: { xs: 24, sm: 12, md: 8, lg: 6 },
    itemProps: {
      label: 'State',
      name: 'state',
      extra: 'col: { xs: 24, sm: 12, md: 8, lg: 6 }',
      rules: [{ required: true, message: 'State is required' }],
    },
    inputProps: { placeholder: 'State / province' },
  },
  {
    type: 'text',
    col: { xs: 24, sm: 12, md: 8, lg: 6 },
    itemProps: {
      label: 'Postal',
      name: 'postal',
      extra: 'col: { xs: 24, sm: 12, md: 8, lg: 6 }',
      rules: [{ required: true, message: 'Postal code is required' }],
    },
    inputProps: { placeholder: 'Postal code' },
  },
  {
    type: 'text',
    col: { xs: 24, sm: 12, md: 8, lg: 6 },
    itemProps: {
      label: 'Country',
      name: 'country',
      extra: 'col: { xs: 24, sm: 12, md: 8, lg: 6 }',
      rules: [{ required: true, message: 'Country is required' }],
    },
    inputProps: { placeholder: 'Country' },
  },
  {
    type: 'text',
    col: fieldCol,
    itemProps: {
      label: 'First name',
      name: 'firstName',
      extra: 'col: (form, values) => … based on density',
      rules: [{ required: true, message: 'First name is required' }],
    },
    inputProps: { placeholder: 'First name' },
  },
  {
    type: 'text',
    col: fieldCol,
    itemProps: {
      label: 'Last name',
      name: 'lastName',
      extra: 'col: (form, values) => … based on density',
      rules: [{ required: true, message: 'Last name is required' }],
    },
    inputProps: { placeholder: 'Last name' },
  },
  {
    type: 'text',
    col: fieldCol,
    itemProps: {
      label: 'Email',
      name: 'email',
      extra: 'col: (form, values) => … based on density',
      rules: [
        { required: true, message: 'Email is required' },
        { type: 'email', message: 'Enter a valid email' },
      ],
    },
    inputProps: { placeholder: 'you@example.com' },
  },
  {
    type: 'textarea',
    col: 24,
    itemProps: {
      label: 'Notes',
      name: 'notes',
      extra: 'col: 24 — full width',
    },
    inputProps: {
      rows: 3,
      placeholder: 'Optional notes (always full width)',
    },
  },
];

export function ResponsiveLayoutPage() {
  const [values, setValues] = useState<unknown>(null);
  const [breakpoint, setBreakpoint] = useState<BreakpointKey>('md');

  const preset = BREAKPOINT_PRESETS[breakpoint];

  const items = useMemo(
    () =>
      RAW_ITEMS.map((item) => ({
        ...item,
        // Resolve responsive ColProps to a span for the simulated breakpoint.
        // Ant Design Col uses viewport media queries — a narrower wrapper alone
        // would not change layout, so the demo remaps col here.
        col: (form: FormInstance, formValues: AnyObject) => {
          const rawCol =
            typeof item.col === 'function'
              ? item.col(form, formValues)
              : item.col;
          return resolveColSpan(rawCol as ColSpanType, breakpoint);
        },
      })) as FormComposerItemType[],
    [breakpoint],
  );

  return (
    <ExamplePage
      title={meta.title}
      description={meta.description}
      whenToUse={meta.whenToUse}
      icon={meta.icon}
      code={RESPONSIVE_LAYOUT_CODE}
      values={values}
      beforeExamples={
        <Alert
          type="info"
          showIcon
          message="Breakpoint simulator"
          description={
            <Typography.Paragraph style={{ marginBottom: 0 }}>
              Pick a breakpoint below to preview how{' '}
              <Typography.Text code>col</Typography.Text> resolves. Static{' '}
              <Typography.Text code>col: number</Typography.Text>, responsive{' '}
              <Typography.Text code>ColProps</Typography.Text>, and dynamic{' '}
              <Typography.Text code>col()</Typography.Text> all go through the
              same cascade Ant Design uses (nearest defined ≤ current). See the{' '}
              <Typography.Link
                href="https://ant.design/components/grid"
                target="_blank"
                rel="noreferrer"
              >
                Ant Design Grid
              </Typography.Link>{' '}
              docs for the 24-column system and breakpoints.
            </Typography.Paragraph>
          }
        />
      }
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Flex align="center" gap="small" wrap>
            <Typography.Text strong>Simulate screen size</Typography.Text>
            <Tag color="blue">
              {preset.label} · {preset.width}px
              {preset.minWidth > 0 ? ` (≥ ${preset.minWidth}px)` : ' (< 576px)'}
            </Tag>
          </Flex>
          <Segmented
            value={breakpoint}
            onChange={(value) => setBreakpoint(value as BreakpointKey)}
            options={BREAKPOINT_ORDER.map((key) => ({
              value: key,
              icon: BREAKPOINT_PRESETS[key].icon,
              label: (
                <span>
                  {BREAKPOINT_PRESETS[key].label}
                  <Typography.Text
                    type="secondary"
                    style={{ marginLeft: 6, fontSize: 12 }}
                  >
                    {BREAKPOINT_PRESETS[key].width}
                  </Typography.Text>
                </span>
              ),
            }))}
          />
        </Space>

        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            background:
              'repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(0,0,0,0.03) 8px, rgba(0,0,0,0.03) 16px)',
            borderRadius: 8,
            padding: 16,
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: preset.width,
              transition: 'max-width 0.25s ease',
              background: 'var(--ant-color-bg-container, #fff)',
              border: '1px solid var(--ant-color-border, #d9d9d9)',
              borderRadius: 8,
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              padding: 16,
            }}
          >
            <Flex
              justify="space-between"
              align="center"
              style={{ marginBottom: 12 }}
              wrap
              gap="small"
            >
              <Typography.Text type="secondary">
                Preview frame · {preset.width}px
              </Typography.Text>
              <Tag icon={preset.icon}>{preset.label}</Tag>
            </Flex>

            <FormComposer
              layout="vertical"
              items={items}
              onFinish={setValues}
              initialValues={{ density: 'comfortable' }}
              rowProps={{ gutter: [16, 0] }}
            >
              <Button type="primary" htmlType="submit">
                Save profile
              </Button>
            </FormComposer>
          </div>
        </div>
      </Space>
    </ExamplePage>
  );
}
