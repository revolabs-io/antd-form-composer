import { FormComposer, FormComposerItemType } from '@lib';
import { Button, Card, Cascader, Input } from 'antd';
import { useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';

type ColorInputProps = {
  value?: string;
  onChange?: (value: string) => void;
};

function ColorInput({ value, onChange }: ColorInputProps) {
  return (
    <Input
      type="color"
      value={value || '#1677ff'}
      onChange={(event) => onChange?.(event.target.value)}
      style={{ width: 80, padding: 4 }}
    />
  );
}

const cascaderOptions = [
  {
    value: 'asia',
    label: 'Asia',
    children: [
      { value: 'vietnam', label: 'Vietnam' },
      { value: 'japan', label: 'Japan' },
    ],
  },
  {
    value: 'europe',
    label: 'Europe',
    children: [
      { value: 'france', label: 'France' },
      { value: 'germany', label: 'Germany' },
    ],
  },
];

export function CustomPage() {
  const [values, setValues] = useState<unknown>(null);

  const items = useMemo(
    () =>
      [
        {
          type: 'custom',
          col: { xs: 24, md: 12 },
          component: Cascader,
          itemProps: {
            label: 'Region',
            name: 'region',
            rules: [{ required: true, message: 'Please select a region' }],
          },
          inputProps: {
            options: cascaderOptions,
            placeholder: 'Select region',
            style: { width: '100%' },
          },
        },
        {
          type: 'custom',
          col: { xs: 24, md: 12 },
          component: ColorInput,
          itemProps: {
            label: 'Brand color',
            name: 'brandColor',
          },
          inputProps: {},
        },
        {
          type: 'text',
          col: 24,
          itemProps: {
            label: 'Label',
            name: 'label',
          },
          inputProps: {
            placeholder: 'Optional label',
          },
        },
      ] as FormComposerItemType[],
    [],
  );

  return (
    <ExamplePage
      title="Custom components"
      description="Pass any React component with type custom — including Ant Design Cascader or your own inputs — without global registration."
      values={values}
    >
      <Card>
        <FormComposer
          layout="vertical"
          items={items}
          onFinish={setValues}
          initialValues={{ brandColor: '#1677ff' }}
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
