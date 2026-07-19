import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { FormComposer, FormComposerItemType } from '@lib';
import {
  Alert,
  Button,
  Card,
  Col,
  List,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import { useMemo, useState } from 'react';

import { CodeBlock } from '../../components/CodeBlock';
import { ExamplePage } from '../../components/ExamplePage';
import { EXAMPLES } from '../../examples';
import { REGISTERED_INPUTS_CODE } from './code-snippets';

const meta = EXAMPLES.find((item) => item.key === 'registered-inputs')!;

const COMPONENT_TYPES = [
  { type: 'text', component: 'Input', typed: true, registered: true },
  {
    type: 'password',
    component: 'Input.Password',
    typed: true,
    registered: true,
  },
  { type: 'search', component: 'Input.Search', typed: true, registered: false },
  {
    type: 'textarea',
    component: 'Input.TextArea',
    typed: true,
    registered: true,
  },
  { type: 'number', component: 'InputNumber', typed: true, registered: false },
  { type: 'select', component: 'Select', typed: true, registered: false },
  {
    type: 'date-picker',
    component: 'DatePicker',
    typed: true,
    registered: false,
  },
  {
    type: 'range-picker',
    component: 'DatePicker.RangePicker',
    typed: true,
    registered: false,
  },
  {
    type: 'time-picker',
    component: 'TimePicker',
    typed: true,
    registered: false,
  },
  { type: 'radio', component: 'Radio', typed: true, registered: false },
  {
    type: 'radio-group',
    component: 'Radio.Group',
    typed: true,
    registered: false,
  },
  { type: 'checkbox', component: 'Checkbox', typed: true, registered: false },
  {
    type: 'checkbox-group',
    component: 'Checkbox.Group',
    typed: true,
    registered: false,
  },
  { type: 'switch', component: 'Switch', typed: true, registered: false },
  { type: 'slider', component: 'Slider', typed: true, registered: false },
  { type: 'rate', component: 'Rate', typed: true, registered: false },
  { type: 'mentions', component: 'Mentions', typed: true, registered: false },
  {
    type: 'autocomplete',
    component: 'AutoComplete',
    typed: true,
    registered: false,
  },
  { type: 'cascader', component: 'Cascader', typed: true, registered: false },
  { type: 'transfer', component: 'Transfer', typed: true, registered: false },
  {
    type: 'tree-select',
    component: 'TreeSelect',
    typed: true,
    registered: false,
  },
  { type: 'list', component: 'Form.List', typed: true, registered: true },
  { type: 'hidden', component: 'Hidden field', typed: true, registered: true },
  {
    type: 'custom',
    component: 'Custom Component',
    typed: true,
    registered: false,
  },
];

const REGISTER_SNIPPET = `// src/register.ts — import this once from your app entry (e.g. main.tsx)
import { registerInputComponents } from 'antd-form-composer';
import {
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
} from 'antd';

registerInputComponents({
  // Input related
  search: Input.Search,
  number: InputNumber,

  // Selection components
  select: Select,
  radio: Radio,
  'radio-group': Radio.Group,
  checkbox: Checkbox,
  'checkbox-group': Checkbox.Group,
  switch: Switch,

  // Date & Time
  'date-picker': DatePicker,
  'range-picker': DatePicker.RangePicker,
  'time-picker': TimePicker,

  // Advanced components
  slider: Slider,
  rate: Rate,
  mentions: Mentions,
  autocomplete: AutoComplete,
  cascader: Cascader,
  transfer: Transfer,
  'tree-select': TreeSelect,
});`;

function StatusTag({ ok }: { ok: boolean }) {
  return ok ? (
    <Tag icon={<CheckCircleOutlined />} color="success">
      Yes
    </Tag>
  ) : (
    <Tag icon={<CloseCircleOutlined />} color="default">
      No
    </Tag>
  );
}

export function RegisteredInputsPage() {
  const [values, setValues] = useState<unknown>(null);

  const items = useMemo(
    () =>
      [
        {
          type: 'text',
          col: 24,
          itemProps: {
            label: 'SEO title',
            name: 'seoTitle',
            rules: [{ required: true, message: 'SEO title is required' }],
          },
          inputProps: {
            placeholder: 'Shown in browser tabs and search results',
          },
        },
        {
          type: 'textarea',
          col: 24,
          itemProps: {
            label: 'Meta description',
            name: 'metaDescription',
            rules: [
              { required: true, message: 'Meta description is required' },
              {
                max: 160,
                message: 'Keep meta descriptions under 160 characters',
              },
            ],
          },
          inputProps: {
            rows: 3,
            showCount: true,
            maxLength: 160,
          },
        },
        {
          type: 'select',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Canonical strategy',
            name: 'canonical',
          },
          inputProps: {
            options: [
              { label: 'Self', value: 'self' },
              { label: 'Parent category', value: 'parent' },
              { label: 'Custom URL', value: 'custom' },
            ],
          },
        },
        {
          type: 'date-picker',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Publish at',
            name: 'publishAt',
          },
          inputProps: {
            showTime: true,
            style: { width: '100%' },
          },
        },
        {
          type: 'switch',
          col: { xs: 24, md: 8 },
          itemProps: {
            label: 'Indexable',
            name: 'indexable',
            valuePropName: 'checked',
          },
          inputProps: {},
        },
        {
          type: 'checkbox',
          col: { xs: 24, md: 8 },
          itemProps: {
            label: 'Featured on homepage',
            name: 'featured',
            valuePropName: 'checked',
          },
          inputProps: {},
        },
        {
          type: 'rate',
          col: { xs: 24, md: 8 },
          itemProps: {
            label: 'Editorial priority',
            name: 'priority',
          },
          inputProps: {},
        },
        {
          type: 'checkbox-group',
          col: 24,
          itemProps: {
            label: 'Distribution channels',
            name: 'channels',
          },
          inputProps: {
            options: [
              { label: 'Email', value: 'email' },
              { label: 'Push', value: 'push' },
              { label: 'RSS', value: 'rss' },
            ],
          },
        },
        {
          type: 'slider',
          col: 24,
          itemProps: {
            label: 'Sitemap priority',
            name: 'sitemapPriority',
            tooltip: 'Used by the CMS sitemap generator (0–1)',
          },
          inputProps: {
            min: 0,
            max: 1,
            step: 0.1,
          },
        },
      ] as FormComposerItemType[],
    [],
  );

  return (
    <ExamplePage
      title={meta.title}
      description={meta.description}
      whenToUse={meta.whenToUse}
      icon={meta.icon}
      code={REGISTERED_INPUTS_CODE}
      values={values}
      beforeExamples={
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              Where to register
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              Call{' '}
              <Typography.Text code>registerInputComponents</Typography.Text>{' '}
              <Typography.Text strong>once</Typography.Text> at app startup —
              typically in a dedicated module like{' '}
              <Typography.Text code>src/register.ts</Typography.Text> imported
              from <Typography.Text code>main.tsx</Typography.Text>. Do not
              register inside page components or on every render; re-registering
              the same type logs a warning. After that, reference components by{' '}
              <Typography.Text code>type</Typography.Text> in your form items.
            </Typography.Paragraph>
            <CodeBlock code={REGISTER_SNIPPET} language="typescript" />
          </Space>

          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              Component type definitions
            </Typography.Title>
            <Table
              size="small"
              pagination={false}
              rowKey="type"
              scroll={{ x: true }}
              dataSource={COMPONENT_TYPES}
              columns={[
                {
                  title: 'Type',
                  dataIndex: 'type',
                  render: (value: string) => (
                    <Typography.Text code>{value}</Typography.Text>
                  ),
                },
                {
                  title: 'Component',
                  dataIndex: 'component',
                },
                {
                  title: 'Type defined',
                  dataIndex: 'typed',
                  width: 120,
                  render: (value: boolean) => <StatusTag ok={value} />,
                },
                {
                  title: 'Registered',
                  dataIndex: 'registered',
                  width: 120,
                  render: (value: boolean) => <StatusTag ok={value} />,
                },
              ]}
            />
          </Space>

          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              Why register only what you need?
            </Typography.Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card size="small" title="Performance optimization">
                  <List
                    size="small"
                    dataSource={[
                      'Reduces initial bundle size',
                      'Allows tree-shaking for unused components',
                      'Minimizes memory footprint',
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <ThunderboltOutlined style={{ marginRight: 8 }} />
                        {item}
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card size="small" title="Flexibility">
                  <List
                    size="small"
                    dataSource={[
                      'Register your optimized components',
                      'Allow custom styling and behavior',
                      'Support project-specific requirements',
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <ThunderboltOutlined style={{ marginRight: 8 }} />
                        {item}
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            </Row>
          </Space>

          <Alert
            type="info"
            showIcon
            message="Demo note"
            description="This demo registers additional inputs once in src/register.ts (imported from main.tsx). The live form below uses those types — no per-page registration."
          />
        </Space>
      }
    >
      <FormComposer
        layout="vertical"
        items={items}
        onFinish={setValues}
        initialValues={{
          indexable: true,
          featured: false,
          channels: ['email'],
          canonical: 'self',
          sitemapPriority: 0.5,
          priority: 3,
        }}
        rowProps={{ gutter: [16, 0] }}
      >
        <Button type="primary" htmlType="submit">
          Save settings
        </Button>
      </FormComposer>
    </ExamplePage>
  );
}
