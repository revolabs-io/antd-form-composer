import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { FormComposer, FormComposerItemType } from '@lib';
import { Button, Card, Space } from 'antd';
import { useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';
import { EXAMPLES } from '../../examples';
import { LIST_CODE } from './code-snippets';

const meta = EXAMPLES.find((item) => item.key === 'list')!;

export function ListPage() {
  const [values, setValues] = useState<unknown>(null);

  const items = useMemo(
    () =>
      [
        {
          type: 'text',
          col: 24,
          itemProps: {
            label: 'Page title',
            name: 'pageTitle',
            rules: [{ required: true, message: 'Page title is required' }],
          },
          inputProps: {
            placeholder: 'Pricing FAQ',
          },
        },
        {
          type: 'list',
          col: 24,
          itemProps: {
            label: 'FAQ items',
            name: 'faqs',
            required: true,
          },
          inputProps: {
            listRender: (content, _fields, { add }) => (
              <Space
                direction="vertical"
                style={{ width: '100%' }}
                size="middle"
              >
                {content}
                <Button
                  type="dashed"
                  icon={<PlusOutlined />}
                  onClick={() => add()}
                  block
                >
                  Add FAQ item
                </Button>
              </Space>
            ),
            itemRender: (content, field, { remove }) => (
              <Card
                size="small"
                title={`FAQ #${field.name + 1}`}
                key={field.key}
                extra={
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(field.name)}
                  >
                    Remove
                  </Button>
                }
              >
                {content}
              </Card>
            ),
            items: [
              {
                type: 'text',
                col: 24,
                itemProps: {
                  label: 'Question',
                  name: 'question',
                  rules: [{ required: true, message: 'Question is required' }],
                },
                inputProps: { placeholder: 'Can I change plans later?' },
              },
              {
                type: 'textarea',
                col: 24,
                itemProps: {
                  label: 'Answer',
                  name: 'answer',
                  rules: [{ required: true, message: 'Answer is required' }],
                },
                inputProps: {
                  rows: 3,
                  placeholder:
                    'Yes — upgrade or downgrade anytime from billing.',
                },
              },
              {
                type: 'select',
                col: { xs: 24, md: 12 },
                itemProps: {
                  label: 'Audience',
                  name: 'audience',
                },
                inputProps: {
                  options: [
                    { label: 'All visitors', value: 'all' },
                    { label: 'Logged-in users', value: 'users' },
                    { label: 'Enterprise only', value: 'enterprise' },
                  ],
                },
              },
              {
                type: 'switch',
                col: { xs: 24, md: 12 },
                itemProps: {
                  label: 'Highlight on page',
                  name: 'highlighted',
                  valuePropName: 'checked',
                },
                inputProps: {},
              },
            ],
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
      code={LIST_CODE}
      values={values}
    >
      <FormComposer
        layout="vertical"
        items={items}
        onFinish={setValues}
        initialValues={{
          pageTitle: 'Pricing FAQ',
          faqs: [
            {
              question: 'Do you offer annual billing?',
              answer: 'Yes, with two months free.',
              audience: 'all',
              highlighted: true,
            },
          ],
        }}
        rowProps={{ gutter: [16, 0] }}
      >
        <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
          Save FAQ section
        </Button>
      </FormComposer>
    </ExamplePage>
  );
}
