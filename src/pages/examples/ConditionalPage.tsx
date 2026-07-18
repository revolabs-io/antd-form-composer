import { AnyObject, FormComposer, FormComposerItemType } from '@lib';
import { Alert, Button, Card, FormInstance } from 'antd';
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
            label: 'Content type',
            name: 'contentType',
            rules: [{ required: true, message: 'Select a content type' }],
          },
          inputProps: {
            options: [
              { label: 'Article', value: 'article' },
              { label: 'Landing page', value: 'landing' },
              { label: 'Redirect', value: 'redirect' },
            ],
          },
        },
        {
          type: 'text',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Internal name',
            name: 'internalName',
            rules: [{ required: true, message: 'Internal name is required' }],
          },
          inputProps: {
            placeholder: 'Used only in the CMS admin',
          },
        },
        {
          type: 'textarea',
          col: 24,
          hidden: (_form: FormInstance, formValues: AnyObject) =>
            formValues?.contentType !== 'article',
          itemProps: {
            label: 'Article body',
            name: 'body',
            rules: [{ required: true, message: 'Article body is required' }],
          },
          inputProps: {
            rows: 5,
            placeholder: 'Long-form article content',
          },
        },
        {
          type: 'text',
          col: { xs: 24, md: 12 },
          hidden: (_form: FormInstance, formValues: AnyObject) =>
            formValues?.contentType !== 'landing',
          itemProps: {
            label: 'Hero headline',
            name: 'heroHeadline',
            rules: [{ required: true, message: 'Hero headline is required' }],
          },
          inputProps: {
            placeholder: 'Ship content faster',
          },
        },
        {
          type: 'text',
          col: { xs: 24, md: 12 },
          hidden: (_form: FormInstance, formValues: AnyObject) =>
            formValues?.contentType !== 'landing',
          itemProps: {
            label: 'Primary CTA label',
            name: 'ctaLabel',
            rules: [{ required: true, message: 'CTA label is required' }],
          },
          inputProps: {
            placeholder: 'Start free trial',
          },
        },
        {
          type: 'text',
          col: 24,
          hidden: (_form: FormInstance, formValues: AnyObject) =>
            formValues?.contentType !== 'redirect',
          itemProps: {
            label: 'Redirect target URL',
            name: 'redirectUrl',
            rules: [
              { required: true, message: 'Redirect URL is required' },
              { type: 'url', message: 'Enter a valid URL' },
            ],
          },
          inputProps: {
            placeholder: 'https://example.com/new-path',
          },
        },
        {
          type: 'switch',
          col: { xs: 24, md: 12 },
          hidden: (_form: FormInstance, formValues: AnyObject) =>
            formValues?.contentType === 'redirect',
          itemProps: {
            label: 'Show in main navigation',
            name: 'showInNav',
            valuePropName: 'checked',
          },
          inputProps: {},
        },
        {
          type: 'text',
          col: { xs: 24, md: 12 },
          hidden: (_form: FormInstance, formValues: AnyObject) =>
            formValues?.contentType === 'redirect' || !formValues?.showInNav,
          itemProps: (_form: FormInstance, formValues: AnyObject) => ({
            label: 'Nav label',
            name: 'navLabel',
            rules: [{ required: true, message: 'Nav label is required' }],
            extra:
              formValues?.contentType === 'landing'
                ? 'Landing pages often use shorter nav labels than the H1.'
                : undefined,
          }),
          inputProps: {
            placeholder: 'Label in the site header',
          },
        },
      ] as FormComposerItemType[],
    [],
  );

  return (
    <ExamplePage
      title="Content type fields"
      description="Conditional CMS fields: Article, Landing page, and Redirect each reveal a different field set. Nav settings appear only when relevant."
      values={values}
    >
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="CMS use case"
        description="A single “create content” form adapts to the selected content type so editors only see fields they need."
      />
      <Card>
        <FormComposer
          layout="vertical"
          items={items}
          onFinish={setValues}
          initialValues={{ contentType: 'article', showInNav: false }}
          rowProps={{ gutter: [16, 0] }}
        >
          <Button type="primary" htmlType="submit">
            Save content
          </Button>
        </FormComposer>
      </Card>
    </ExamplePage>
  );
}
