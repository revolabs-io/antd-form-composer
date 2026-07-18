import { FormComposer, FormComposerItemType } from '@lib';
import { Alert, Button, Card } from 'antd';
import { useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';

export function BasicPage() {
  const [values, setValues] = useState<unknown>(null);

  const items = useMemo(
    () =>
      [
        {
          type: 'text',
          col: { xs: 24, md: 16 },
          itemProps: {
            label: 'Article title',
            name: 'title',
            rules: [
              { required: true, message: 'Title is required' },
              { max: 120, message: 'Keep titles under 120 characters' },
            ],
          },
          inputProps: {
            placeholder: 'How we rebuilt our CMS editor',
          },
        },
        {
          type: 'select',
          col: { xs: 24, md: 8 },
          itemProps: {
            label: 'Status',
            name: 'status',
            rules: [{ required: true, message: 'Select a status' }],
          },
          inputProps: {
            options: [
              { label: 'Draft', value: 'draft' },
              { label: 'In review', value: 'review' },
              { label: 'Published', value: 'published' },
            ],
          },
        },
        {
          type: 'textarea',
          col: 24,
          itemProps: {
            label: 'Excerpt',
            name: 'excerpt',
            rules: [
              {
                required: true,
                message: 'Excerpt is required for listing cards',
              },
              { max: 280, message: 'Excerpt must be 280 characters or less' },
            ],
          },
          inputProps: {
            rows: 3,
            showCount: true,
            maxLength: 280,
            placeholder: 'Short summary shown on the blog index and SEO cards',
          },
        },
        {
          type: 'textarea',
          col: 24,
          itemProps: {
            label: 'Body',
            name: 'body',
            rules: [{ required: true, message: 'Article body is required' }],
          },
          inputProps: {
            rows: 6,
            placeholder: 'Write the full article content…',
          },
        },
      ] as FormComposerItemType[],
    [],
  );

  return (
    <ExamplePage
      title="Create article"
      description="Typical CMS create-article screen: title, workflow status, excerpt for cards, and body content — composed with FormComposer items."
      values={values}
    >
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="CMS use case"
        description="Editors create a new blog article before it moves through draft → review → published."
      />
      <Card>
        <FormComposer
          layout="vertical"
          items={items}
          onFinish={setValues}
          initialValues={{ status: 'draft' }}
          rowProps={{ gutter: [16, 0] }}
        >
          <Button type="primary" htmlType="submit">
            Save article
          </Button>
        </FormComposer>
      </Card>
    </ExamplePage>
  );
}
