import { FormComposerItems, FormComposerItemType } from '@lib';
import { Button, Card, Form, Input, Space } from 'antd';
import { useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';

export function FormComposerItemsPage() {
  const [form] = Form.useForm();
  const [values, setValues] = useState<unknown>(null);

  const basicItems = useMemo(
    () =>
      [
        {
          type: 'text',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'First name',
            name: 'firstName',
            rules: [{ required: true, message: 'Required' }],
          },
          inputProps: { placeholder: 'First name' },
        },
        {
          type: 'text',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Last name',
            name: 'lastName',
            rules: [{ required: true, message: 'Required' }],
          },
          inputProps: { placeholder: 'Last name' },
        },
      ] as FormComposerItemType[],
    [],
  );

  const detailItems = useMemo(
    () =>
      [
        {
          type: 'select',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Country',
            name: 'country',
          },
          inputProps: {
            placeholder: 'Select country',
            options: [
              { label: 'United States', value: 'us' },
              { label: 'Vietnam', value: 'vn' },
              { label: 'Japan', value: 'jp' },
            ],
          },
        },
        {
          type: 'number',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Years of experience',
            name: 'experience',
          },
          inputProps: {
            min: 0,
            style: { width: '100%' },
          },
        },
        {
          type: 'textarea',
          col: 24,
          itemProps: {
            label: 'Notes',
            name: 'notes',
          },
          inputProps: {
            rows: 3,
            placeholder: 'Additional details',
          },
        },
      ] as FormComposerItemType[],
    [],
  );

  return (
    <ExamplePage
      title="FormComposerItems"
      description="Use FormComposerItems inside a native Ant Design Form to split sections and mix with regular Form.Item components."
      values={values}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={setValues}
        initialValues={{ country: 'us' }}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Card title="Basic information" size="small">
            <FormComposerItems
              items={basicItems}
              rowProps={{ gutter: [16, 0] }}
            />
          </Card>

          <Card title="Additional details" size="small">
            <FormComposerItems
              items={detailItems}
              rowProps={{ gutter: [16, 0] }}
            />
          </Card>

          <Card title="Native Form.Item" size="small">
            <Form.Item
              label="Reference code"
              name="referenceCode"
              rules={[{ required: true, message: 'Required' }]}
            >
              <Input placeholder="Mix native Form.Item with composer items" />
            </Form.Item>
          </Card>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form>
    </ExamplePage>
  );
}
