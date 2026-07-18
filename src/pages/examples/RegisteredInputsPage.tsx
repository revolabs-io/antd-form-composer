import { FormComposer, FormComposerItemType } from '@lib';
import { Alert, Button, Card } from 'antd';
import { useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';

export function RegisteredInputsPage() {
  const [values, setValues] = useState<unknown>(null);

  const items = useMemo(
    () =>
      [
        {
          type: 'text',
          col: 24,
          itemProps: {
            label: 'SEO title',
            name: 'seoTitle',
            rules: [{ required: true, message: 'SEO title is required' }],
          },
          inputProps: {
            placeholder: 'Shown in browser tabs and search results',
          },
        },
        {
          type: 'textarea',
          col: 24,
          itemProps: {
            label: 'Meta description',
            name: 'metaDescription',
            rules: [
              { required: true, message: 'Meta description is required' },
              {
                max: 160,
                message: 'Keep meta descriptions under 160 characters',
              },
            ],
          },
          inputProps: {
            rows: 3,
            showCount: true,
            maxLength: 160,
          },
        },
        {
          type: 'select',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Canonical strategy',
            name: 'canonical',
          },
          inputProps: {
            options: [
              { label: 'Self', value: 'self' },
              { label: 'Parent category', value: 'parent' },
              { label: 'Custom URL', value: 'custom' },
            ],
          },
        },
        {
          type: 'date-picker',
          col: { xs: 24, md: 12 },
          itemProps: {
            label: 'Publish at',
            name: 'publishAt',
          },
          inputProps: {
            showTime: true,
            style: { width: '100%' },
          },
        },
        {
          type: 'switch',
          col: { xs: 24, md: 8 },
          itemProps: {
            label: 'Indexable',
            name: 'indexable',
            valuePropName: 'checked',
          },
          inputProps: {},
        },
        {
          type: 'switch',
          col: { xs: 24, md: 8 },
          itemProps: {
            label: 'Featured on homepage',
            name: 'featured',
            valuePropName: 'checked',
          },
          inputProps: {},
        },
        {
          type: 'rate',
          col: { xs: 24, md: 8 },
          itemProps: {
            label: 'Editorial priority',
            name: 'priority',
          },
          inputProps: {},
        },
        {
          type: 'slider',
          col: 24,
          itemProps: {
            label: 'Sitemap priority',
            name: 'sitemapPriority',
            tooltip: 'Used by the CMS sitemap generator (0–1)',
          },
          inputProps: {
            min: 0,
            max: 1,
            step: 0.1,
          },
        },
      ] as FormComposerItemType[],
    [],
  );

  return (
    <ExamplePage
      title="SEO & publish settings"
      description="CMS SEO panel using components registered via registerInputComponents — select, date-picker, switch, rate, and slider."
      values={values}
    >
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="CMS use case"
        description="Content managers configure indexing, publish time, and sitemap priority before a page goes live."
      />
      <Card>
        <FormComposer
          layout="vertical"
          items={items}
          onFinish={setValues}
          initialValues={{
            indexable: true,
            featured: false,
            canonical: 'self',
            sitemapPriority: 0.5,
            priority: 3,
          }}
          rowProps={{ gutter: [16, 0] }}
        >
          <Button type="primary" htmlType="submit">
            Save settings
          </Button>
        </FormComposer>
      </Card>
    </ExamplePage>
  );
}
