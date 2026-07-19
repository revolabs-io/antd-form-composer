import { FormComposer, FormComposerItemType } from '@lib';
import { Button } from 'antd';
import { useMemo, useState } from 'react';

import { ExamplePage } from '../../components/ExamplePage';
import { EXAMPLES } from '../../examples';
import { BASIC_CODE } from './code-snippets';

const meta = EXAMPLES.find((item) => item.key === 'basic')!;

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
      title={meta.title}
      description={meta.description}
      whenToUse={meta.whenToUse}
      icon={meta.icon}
      code={BASIC_CODE}
      values={values}
    >
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
    </ExamplePage>
  );
}
