import { FormComposer, FormComposerItemType } from '@lib';
import { Button, Card } from 'antd';
import { useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';

export function RegisteredInputsPage() {
  const [values, setValues] = useState<unknown>(null);

  const items = useMemo(
    () =>
      [
        {
          type: 'select',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Role',
            name: 'role',
            rules: [{ required: true, message: 'Please select a role' }],
          },
          inputProps: {
            placeholder: 'Select role',
            options: [
              { label: 'Admin', value: 'admin' },
              { label: 'Editor', value: 'editor' },
              { label: 'Viewer', value: 'viewer' },
            ],
          },
        },
        {
          type: 'number',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Age',
            name: 'age',
          },
          inputProps: {
            min: 0,
            style: { width: '100%' },
            placeholder: 'Enter age',
          },
        },
        {
          type: 'date-picker',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Start date',
            name: 'startDate',
          },
          inputProps: {
            style: { width: '100%' },
          },
        },
        {
          type: 'switch',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Active',
            name: 'active',
            valuePropName: 'checked',
          },
          inputProps: {},
        },
        {
          type: 'slider',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Priority',
            name: 'priority',
          },
          inputProps: {
            min: 0,
            max: 10,
          },
        },
        {
          type: 'rate',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Rating',
            name: 'rating',
          },
          inputProps: {},
        },
        {
          type: 'radio-group',
          col: 24,
          itemProps: {
            label: 'Plan',
            name: 'plan',
          },
          inputProps: {
            options: [
              { label: 'Free', value: 'free' },
              { label: 'Pro', value: 'pro' },
              { label: 'Enterprise', value: 'enterprise' },
            ],
          },
        },
      ] as FormComposerItemType[],
    [],
  );

  return (
    <ExamplePage
      title="Registered inputs"
      description="Components registered via registerInputComponents can be referenced by type (select, number, date-picker, switch, and more)."
      values={values}
    >
      <Card>
        <FormComposer
          layout="vertical"
          items={items}
          onFinish={setValues}
          initialValues={{ active: true, priority: 5, plan: 'pro' }}
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
