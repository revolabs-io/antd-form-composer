import { FormComposer, FormComposerItemType } from '@lib';
import { Alert, Button, Card, Space } from 'antd';
import { useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';

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
                <Button type="dashed" onClick={() => add()} block>
                  + Add top-level item
                </Button>
              </Space>
            ),
            itemRender: (content, field, { remove }) => (
              <Card
                size="small"
                title={`Nav item ${field.name + 1}`}
                key={field.key}
                extra={
                  <Button type="link" danger onClick={() => remove(field.name)}>
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
                      <Button type="dashed" onClick={() => add()} block>
                        + Add child link
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
      title="Navigation menu"
      description="Nested Form.List for a CMS navigation builder — top-level items with optional child links."
      values={values}
    >
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="CMS use case"
        description="Site admins maintain header/footer menus as nested structures that map 1:1 to the frontend nav tree."
      />
      <Card>
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
      </Card>
    </ExamplePage>
  );
}
