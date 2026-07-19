import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { FormComposer, FormComposerItemType } from '@lib';
import { Button, Card, Space } from 'antd';
import { useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';
import { EXAMPLES } from '../../examples';
import { NESTED_LIST_CODE } from './code-snippets';

const meta = EXAMPLES.find((item) => item.key === 'nested-list')!;

export function NestedListPage() {
  const [values, setValues] = useState<unknown>(null);

  const items = useMemo(
    () =>
      [
        {
          type: 'text',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Menu name',
            name: 'menuName',
            rules: [{ required: true, message: 'Menu name is required' }],
          },
          inputProps: {
            placeholder: 'Primary header',
          },
        },
        {
          type: 'select',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Placement',
            name: 'placement',
          },
          inputProps: {
            options: [
              { label: 'Header', value: 'header' },
              { label: 'Footer', value: 'footer' },
              { label: 'Sidebar', value: 'sidebar' },
            ],
          },
        },
        {
          type: 'list',
          col: 24,
          itemProps: {
            label: 'Top-level items',
            name: 'items',
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
                  Add top-level item
                </Button>
              </Space>
            ),
            itemRender: (content, field, { remove }) => (
              <Card
                size="small"
                title={`Nav item ${field.name + 1}`}
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
                col: { xs: 24, md: 12 },
                itemProps: {
                  label: 'Label',
                  name: 'label',
                  rules: [{ required: true, message: 'Label is required' }],
                },
                inputProps: { placeholder: 'Product' },
              },
              {
                type: 'text',
                col: { xs: 24, md: 12 },
                itemProps: {
                  label: 'Path',
                  name: 'path',
                  rules: [{ required: true, message: 'Path is required' }],
                },
                inputProps: { placeholder: '/product' },
              },
              {
                type: 'list',
                col: 24,
                itemProps: {
                  label: 'Child links',
                  name: 'children',
                },
                inputProps: {
                  listRender: (content, _fields, { add }) => (
                    <Space
                      direction="vertical"
                      style={{ width: '100%' }}
                      size="small"
                    >
                      {content}
                      <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={() => add()}
                        block
                      >
                        Add child link
                      </Button>
                    </Space>
                  ),
                  itemRender: (content, field, { remove }) => (
                    <Card
                      size="small"
                      type="inner"
                      title={`Child ${field.name + 1}`}
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
                      col: { xs: 24, md: 12 },
                      itemProps: {
                        label: 'Label',
                        name: 'label',
                        rules: [
                          { required: true, message: 'Label is required' },
                        ],
                      },
                      inputProps: { placeholder: 'Features' },
                    },
                    {
                      type: 'text',
                      col: { xs: 24, md: 12 },
                      itemProps: {
                        label: 'Path',
                        name: 'path',
                        rules: [
                          { required: true, message: 'Path is required' },
                        ],
                      },
                      inputProps: { placeholder: '/product/features' },
                    },
                  ],
                },
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
      code={NESTED_LIST_CODE}
      values={values}
    >
      <FormComposer
        layout="vertical"
        items={items}
        onFinish={setValues}
        initialValues={{
          menuName: 'Primary header',
          placement: 'header',
          items: [
            {
              label: 'Product',
              path: '/product',
              children: [
                { label: 'Features', path: '/product/features' },
                { label: 'Pricing', path: '/pricing' },
              ],
            },
          ],
        }}
        rowProps={{ gutter: [16, 0] }}
      >
        <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
          Save navigation
        </Button>
      </FormComposer>
    </ExamplePage>
  );
}
