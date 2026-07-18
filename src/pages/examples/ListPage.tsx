import { FormComposer, FormComposerItemType } from '@lib';
import { Button, Card, Space } from 'antd';
import { useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';

export function ListPage() {
  const [values, setValues] = useState<unknown>(null);

  const items = useMemo(
    () =>
      [
        {
          type: 'list',
          col: 24,
          itemProps: {
            label: 'Users',
            name: 'users',
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
                <Button type="dashed" onClick={() => add()} block>
                  + Add user
                </Button>
              </Space>
            ),
            itemRender: (content, field, { remove }) => (
              <Card
                size="small"
                title={`User ${field.name + 1}`}
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
              {
                type: 'select',
                col: 24,
                itemProps: {
                  label: 'Role',
                  name: 'role',
                },
                inputProps: {
                  placeholder: 'Select role',
                  options: [
                    { label: 'Admin', value: 'admin' },
                    { label: 'Member', value: 'member' },
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
      title="Form list"
      description="Use type list with listRender and itemRender to add and remove repeatable field groups."
      values={values}
    >
      <Card>
        <FormComposer
          layout="vertical"
          items={items}
          onFinish={setValues}
          initialValues={{
            users: [{ firstName: '', lastName: '', role: 'member' }],
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
