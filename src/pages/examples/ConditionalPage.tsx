import { AnyObject, FormComposer, FormComposerItemType } from '@lib';
import { Button, Card, FormInstance } from 'antd';
import { useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';

export function ConditionalPage() {
  const [values, setValues] = useState<unknown>(null);

  const items = useMemo(
    () =>
      [
        {
          type: 'select',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Account type',
            name: 'accountType',
            rules: [
              { required: true, message: 'Please select an account type' },
            ],
          },
          inputProps: {
            placeholder: 'Select account type',
            options: [
              { label: 'Personal', value: 'personal' },
              { label: 'Business', value: 'business' },
            ],
          },
        },
        {
          type: 'text',
          col: { xs: 24, md: 12 },
          hidden: (_form: FormInstance, formValues: AnyObject) =>
            formValues?.accountType !== 'business',
          itemProps: {
            label: 'Company name',
            name: 'companyName',
            rules: [{ required: true, message: 'Please enter a company name' }],
          },
          inputProps: {
            placeholder: 'Enter company name',
          },
        },
        {
          type: 'switch',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Need shipping address',
            name: 'needShipping',
            valuePropName: 'checked',
          },
          inputProps: {},
        },
        {
          type: 'textarea',
          col: 24,
          hidden: (_form: FormInstance, formValues: AnyObject) =>
            !formValues?.needShipping,
          itemProps: {
            label: 'Shipping address',
            name: 'shippingAddress',
            rules: [
              { required: true, message: 'Please enter a shipping address' },
            ],
          },
          inputProps: {
            rows: 3,
            placeholder: 'Enter shipping address',
          },
        },
        {
          type: 'text',
          col: 24,
          itemProps: (_form: FormInstance, formValues: AnyObject) => ({
            label:
              formValues?.accountType === 'business'
                ? 'Billing contact'
                : 'Full name',
            name: 'contactName',
            rules: [{ required: true, message: 'Please enter a contact name' }],
          }),
          inputProps: {
            placeholder: 'Enter name',
          },
        },
      ] as FormComposerItemType[],
    [],
  );

  return (
    <ExamplePage
      title="Conditional rendering"
      description="Switch account type to business or enable shipping to reveal extra fields. Labels can also adapt from form values."
      values={values}
    >
      <Card>
        <FormComposer
          layout="vertical"
          items={items}
          onFinish={setValues}
          initialValues={{ accountType: 'personal', needShipping: false }}
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
