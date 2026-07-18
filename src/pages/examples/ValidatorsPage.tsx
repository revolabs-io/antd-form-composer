import { FormComposer, FormComposerItemType } from '@lib';
import { Alert, Button, Card } from 'antd';
import type { RuleObject } from 'antd/es/form';
import { useMemo, useState } from 'react';

import { checkSlugAvailable } from '../../cms/mockApi';
import { ExamplePage } from '../../components/ExamplePage';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function validateUniqueSlug(_rule: RuleObject, value: string) {
  if (!value) {
    return Promise.reject(new Error('Slug is required'));
  }

  if (!SLUG_PATTERN.test(value)) {
    return Promise.reject(
      new Error('Use lowercase letters, numbers, and hyphens only'),
    );
  }

  const result = await checkSlugAvailable(value);
  if (!result.available) {
    return Promise.reject(new Error(result.reason));
  }

  return Promise.resolve();
}

function validateStrongPassword(_rule: RuleObject, value: string) {
  if (!value) {
    return Promise.reject(new Error('Password is required'));
  }

  const checks = [
    { ok: value.length >= 10, message: 'at least 10 characters' },
    { ok: /[A-Z]/.test(value), message: 'one uppercase letter' },
    { ok: /[a-z]/.test(value), message: 'one lowercase letter' },
    { ok: /\d/.test(value), message: 'one number' },
    { ok: /[^A-Za-z0-9]/.test(value), message: 'one special character' },
  ];

  const failed = checks
    .filter((check) => !check.ok)
    .map((check) => check.message);
  if (failed.length) {
    return Promise.reject(
      new Error(`Password must include ${failed.join(', ')}`),
    );
  }

  return Promise.resolve();
}

export function ValidatorsPage() {
  const [values, setValues] = useState<unknown>(null);

  const items = useMemo(
    () =>
      [
        {
          type: 'text',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Page title',
            name: 'title',
            rules: [{ required: true, message: 'Page title is required' }],
          },
          inputProps: {
            placeholder: 'Pricing',
          },
        },
        {
          type: 'text',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'URL slug',
            name: 'slug',
            validateTrigger: 'onBlur',
            hasFeedback: true,
            extra: 'Try home, admin, or blog to see async / reserved failures.',
            rules: [{ validator: validateUniqueSlug }],
          },
          inputProps: {
            placeholder: 'pricing',
            addonBefore: '/',
          },
        },
        {
          type: 'text',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Editor email',
            name: 'editorEmail',
            rules: [
              { required: true, message: 'Editor email is required' },
              { type: 'email', message: 'Enter a valid email' },
              {
                pattern: /@company\.com$/i,
                message: 'CMS accounts must use an @company.com address',
              },
            ],
          },
          inputProps: {
            placeholder: 'editor@company.com',
          },
        },
        {
          type: 'password',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Temporary password',
            name: 'password',
            rules: [{ validator: validateStrongPassword }],
          },
          inputProps: {
            placeholder: 'Set invite password',
          },
        },
        {
          type: 'password',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Confirm password',
            name: 'confirmPassword',
            dependencies: ['password'],
            rules: [
              { required: true, message: 'Confirm the password' },
              ({ getFieldValue }) => ({
                validator(_: RuleObject, value: string) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ],
          },
          inputProps: {
            placeholder: 'Repeat password',
          },
        },
        {
          type: 'date-picker',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Campaign start',
            name: 'campaignStart',
            rules: [{ required: true, message: 'Start date is required' }],
          },
          inputProps: {
            showTime: true,
            style: { width: '100%' },
          },
        },
        {
          type: 'date-picker',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Campaign end',
            name: 'campaignEnd',
            dependencies: ['campaignStart'],
            rules: [
              { required: true, message: 'End date is required' },
              ({ getFieldValue }) => ({
                validator(_: RuleObject, value: unknown) {
                  const start = getFieldValue('campaignStart');
                  if (
                    !value ||
                    !start ||
                    // dayjs-compatible comparison used by Ant Design DatePicker
                    (value as { isAfter?: (v: unknown) => boolean }).isAfter?.(
                      start,
                    ) ||
                    (value as { valueOf: () => number }).valueOf() >
                      (start as { valueOf: () => number }).valueOf()
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Campaign end must be after the start date'),
                  );
                },
              }),
            ],
          },
          inputProps: {
            showTime: true,
            style: { width: '100%' },
          },
        },
      ] as FormComposerItemType[],
    [],
  );

  return (
    <ExamplePage
      title="Validators"
      description="CMS validation patterns: async unique-slug lookup, reserved paths, complex password policy, confirm-password dependency, and cross-field campaign dates."
      values={values}
    >
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="CMS use case"
        description="When creating a marketed landing page, the CMS must guarantee a unique slug, invite an internal editor, and ensure the campaign window is valid before publish."
      />
      <Card>
        <FormComposer
          layout="vertical"
          items={items}
          onFinish={setValues}
          rowProps={{ gutter: [16, 0] }}
        >
          <Button type="primary" htmlType="submit">
            Create page & invite editor
          </Button>
        </FormComposer>
      </Card>
    </ExamplePage>
  );
}
