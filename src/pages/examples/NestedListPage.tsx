import { FormComposer, FormComposerItemType } from '@lib';
import { Button, Card, Space } from 'antd';
import { useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';

export function NestedListPage() {
  const [values, setValues] = useState<unknown>(null);

  const items = useMemo(
    () =>
      [
        {
          type: 'list',
          col: 24,
          itemProps: {
            label: 'Departments',
            name: 'departments',
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
                  + Add department
                </Button>
              </Space>
            ),
            itemRender: (content, field, { remove }) => (
              <Card
                size="small"
                title={`Department ${field.name + 1}`}
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
                col: 24,
                itemProps: {
                  label: 'Department name',
                  name: 'name',
                  rules: [{ required: true, message: 'Required' }],
                },
                inputProps: { placeholder: 'Engineering' },
              },
              {
                type: 'list',
                col: 24,
                itemProps: {
                  label: 'Employees',
                  name: 'employees',
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
                        + Add employee
                      </Button>
                    </Space>
                  ),
                  itemRender: (content, field, { remove }) => (
                    <Card
                      size="small"
                      type="inner"
                      title={`Employee ${field.name + 1}`}
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
                        label: 'Name',
                        name: 'name',
                        rules: [{ required: true, message: 'Required' }],
                      },
                      inputProps: { placeholder: 'Full name' },
                    },
                    {
                      type: 'text',
                      col: { xs: 24, md: 12 },
                      itemProps: {
                        label: 'Position',
                        name: 'position',
                      },
                      inputProps: { placeholder: 'Software engineer' },
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
      title="Nested form list"
      description="Nest list fields inside other lists to model hierarchical data such as departments and employees."
      values={values}
    >
      <Card>
        <FormComposer
          layout="vertical"
          items={items}
          onFinish={setValues}
          initialValues={{
            departments: [
              {
                name: 'Engineering',
                employees: [{ name: '', position: '' }],
              },
            ],
          }}
          rowProps={{ gutter: [16, 0] }}
        >
          <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
            Submit
          </Button>
        </FormComposer>
      </Card>
    </ExamplePage>
  );
}
