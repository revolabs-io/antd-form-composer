import { FormComposer, FormComposerItemType } from '@lib';
import { Button, Card } from 'antd';
import { useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';

export function BasicPage() {
  const [values, setValues] = useState<unknown>(null);

  const items = useMemo(
    () =>
      [
        {
          type: 'text',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Username',
            name: 'username',
            rules: [{ required: true, message: 'Please enter a username' }],
          },
          inputProps: {
            placeholder: 'Enter username',
          },
        },
        {
          type: 'password',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Password',
            name: 'password',
            rules: [{ required: true, message: 'Please enter a password' }],
          },
          inputProps: {
            placeholder: 'Enter password',
          },
        },
        {
          type: 'textarea',
          col: 24,
          itemProps: {
            label: 'Bio',
            name: 'bio',
          },
          inputProps: {
            rows: 3,
            placeholder: 'Tell us about yourself',
          },
        },
      ] as FormComposerItemType[],
    [],
  );

  return (
    <ExamplePage
      title="Basic form"
      description="Compose a form from declarative items with text, password, and textarea fields, validation rules, and responsive columns."
      values={values}
    >
      <Card>
        <FormComposer
          layout="vertical"
          items={items}
          onFinish={setValues}
          rowProps={{ gutter: [16, 0] }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormComposer>
      </Card>
    </ExamplePage>
  );
}
