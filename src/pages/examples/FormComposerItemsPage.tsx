import {
  AppstoreOutlined,
  FormOutlined,
  MergeCellsOutlined,
} from '@ant-design/icons';
import { FormComposerItems, FormComposerItemType } from '@lib';
import { Alert, Button, Card, Form, Input, Space, Tag, Typography } from 'antd';
import { useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';
import { EXAMPLES } from '../../examples';
import { FORM_COMPOSER_ITEMS_CODE } from './code-snippets';

const meta = EXAMPLES.find((item) => item.key === 'form-composer-items')!;

export function FormComposerItemsPage() {
  const [form] = Form.useForm();
  const [values, setValues] = useState<unknown>(null);

  const contentItems = useMemo(
    () =>
      [
        {
          type: 'text',
          col: { xs: 24, md: 16 },
          itemProps: {
            label: 'Title',
            name: 'title',
            rules: [{ required: true, message: 'Title is required' }],
          },
          inputProps: { placeholder: 'Q3 product update' },
        },
        {
          type: 'select',
          col: { xs: 24, md: 8 },
          itemProps: {
            label: 'Locale',
            name: 'locale',
            rules: [{ required: true, message: 'Locale is required' }],
          },
          inputProps: {
            options: [
              { label: 'English', value: 'en' },
              { label: 'Vietnamese', value: 'vi' },
              { label: 'Japanese', value: 'ja' },
            ],
          },
        },
        {
          type: 'textarea',
          col: 24,
          itemProps: {
            label: 'Body',
            name: 'body',
            rules: [{ required: true, message: 'Body is required' }],
          },
          inputProps: {
            rows: 5,
            placeholder: 'Main content for this locale…',
          },
        },
      ] as FormComposerItemType[],
    [],
  );

  const seoItems = useMemo(
    () =>
      [
        {
          type: 'text',
          col: 24,
          itemProps: {
            label: 'SEO title',
            name: ['seo', 'title'],
          },
          inputProps: { placeholder: 'Overrides the browser title' },
        },
        {
          type: 'textarea',
          col: 24,
          itemProps: {
            label: 'Meta description',
            name: ['seo', 'description'],
            rules: [{ max: 160, message: 'Max 160 characters' }],
          },
          inputProps: { rows: 2, showCount: true, maxLength: 160 },
        },
        {
          type: 'switch',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'No index',
            name: ['seo', 'noIndex'],
            valuePropName: 'checked',
          },
          inputProps: {},
        },
      ] as FormComposerItemType[],
    [],
  );

  const publishItems = useMemo(
    () =>
      [
        {
          type: 'select',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Visibility',
            name: ['publish', 'visibility'],
          },
          inputProps: {
            options: [
              { label: 'Public', value: 'public' },
              { label: 'Private link', value: 'private' },
              { label: 'Password gated', value: 'password' },
            ],
          },
        },
        {
          type: 'date-picker',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Schedule publish',
            name: ['publish', 'scheduledAt'],
          },
          inputProps: {
            showTime: true,
            style: { width: '100%' },
          },
        },
      ] as FormComposerItemType[],
    [],
  );

  return (
    <ExamplePage
      title={meta.title}
      whenToUse={meta.whenToUse}
      icon={meta.icon}
      code={FORM_COMPOSER_ITEMS_CODE}
      values={values}
    >
      <Alert
        type="info"
        showIcon
        icon={<MergeCellsOutlined />}
        message="Feature: FormComposerItems inside native Form"
        description={
          <Typography.Paragraph style={{ marginBottom: 0 }}>
            Keep a full Ant Design <Typography.Text code>Form</Typography.Text>{' '}
            for layout and props, then drop in{' '}
            <Typography.Text code>FormComposerItems</Typography.Text> for
            composed sections and regular{' '}
            <Typography.Text code>Form.Item</Typography.Text> where you need
            full control.
          </Typography.Paragraph>
        }
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={setValues}
        initialValues={{
          locale: 'en',
          publish: { visibility: 'public' },
          seo: { noIndex: false },
        }}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Card
            size="small"
            title={
              <Space>
                <AppstoreOutlined />
                Content section
                <Tag color="blue">FormComposerItems</Tag>
              </Space>
            }
          >
            <Typography.Paragraph type="secondary">
              Composed fields rendered by FormComposerItems — title, locale, and
              body.
            </Typography.Paragraph>
            <FormComposerItems
              items={contentItems}
              rowProps={{ gutter: [16, 0] }}
            />
          </Card>

          <Card
            size="small"
            title={
              <Space>
                <AppstoreOutlined />
                SEO section
                <Tag color="blue">FormComposerItems</Tag>
              </Space>
            }
          >
            <Typography.Paragraph type="secondary">
              Another FormComposerItems block in the same Form instance.
            </Typography.Paragraph>
            <FormComposerItems
              items={seoItems}
              rowProps={{ gutter: [16, 0] }}
            />
          </Card>

          <Card
            size="small"
            title={
              <Space>
                <AppstoreOutlined />
                Publish section
                <Tag color="blue">FormComposerItems</Tag>
              </Space>
            }
          >
            <Typography.Paragraph type="secondary">
              Composed publish settings still share one form submit.
            </Typography.Paragraph>
            <FormComposerItems
              items={publishItems}
              rowProps={{ gutter: [16, 0] }}
            />
          </Card>

          <Card
            size="small"
            title={
              <Space>
                <FormOutlined />
                Native Form.Item
                <Tag>Form.Item</Tag>
              </Space>
            }
          >
            <Typography.Paragraph type="secondary">
              Mix a regular Ant Design Form.Item alongside composed sections.
            </Typography.Paragraph>
            <Form.Item label="Editor notes" name="editorNotes">
              <Input.TextArea
                rows={3}
                placeholder="Visible only in the CMS admin"
              />
            </Form.Item>
          </Card>

          <Button type="primary" htmlType="submit">
            Save content
          </Button>
        </Space>
      </Form>
    </ExamplePage>
  );
}
