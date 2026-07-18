import { FormComposerItems, FormComposerItemType } from '@lib';
import { Alert, Button, Card, Form, Input, Space } from 'antd';
import { useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';

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
      title="Multi-section editor"
      description="A full CMS content editor: Content, SEO, and Publish sections via FormComposerItems inside a native Ant Design Form, plus a regular Form.Item for notes."
      values={values}
    >
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="CMS use case"
        description="Editors work through clearly separated sections in one save action — composition where it helps, native Form.Item where you need full control."
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
          <Card title="Content" size="small">
            <FormComposerItems
              items={contentItems}
              rowProps={{ gutter: [16, 0] }}
            />
          </Card>

          <Card title="SEO" size="small">
            <FormComposerItems
              items={seoItems}
              rowProps={{ gutter: [16, 0] }}
            />
          </Card>

          <Card title="Publish" size="small">
            <FormComposerItems
              items={publishItems}
              rowProps={{ gutter: [16, 0] }}
            />
          </Card>

          <Card title="Internal notes" size="small">
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
