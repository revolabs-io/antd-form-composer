import { FormComposer, FormComposerItemType } from '@lib';
import { Alert, Button, Card, Cascader, Form } from 'antd';
import { useMemo, useState } from 'react';

import { CATEGORY_TREE } from '../../cms/mockApi';
import { MediaPicker } from '../../components/cms/MediaPicker';
import { SlugInput } from '../../components/cms/SlugInput';
import { ExamplePage } from '../../components/ExamplePage';

export function CustomPage() {
  const [form] = Form.useForm();
  const [values, setValues] = useState<unknown>(null);
  const title = Form.useWatch('title', form);

  const items = useMemo(
    () =>
      [
        {
          type: 'text',
          col: 24,
          itemProps: {
            label: 'Page title',
            name: 'title',
            rules: [{ required: true, message: 'Page title is required' }],
          },
          inputProps: {
            placeholder: 'Customer stories',
          },
        },
        {
          type: 'custom',
          col: 24,
          component: SlugInput,
          itemProps: {
            label: 'URL slug',
            name: 'slug',
            rules: [
              { required: true, message: 'Slug is required' },
              {
                pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                message: 'Use lowercase letters, numbers, and hyphens',
              },
            ],
            extra: 'Custom SlugInput can generate a slug from the title.',
          },
          inputProps: {
            sourceTitle: title,
          },
        },
        {
          type: 'custom',
          col: { xs: 24, md: 12 },
          component: Cascader,
          itemProps: {
            label: 'Category',
            name: 'category',
            rules: [{ required: true, message: 'Select a category' }],
          },
          inputProps: {
            options: CATEGORY_TREE,
            placeholder: 'Select category path',
            style: { width: '100%' },
            changeOnSelect: false,
          },
        },
        {
          type: 'custom',
          col: 24,
          component: MediaPicker,
          itemProps: {
            label: 'Cover image',
            name: 'coverImageId',
            rules: [{ required: true, message: 'Pick a cover image' }],
            extra: 'MediaPicker is a custom CMS field over the media library.',
          },
          inputProps: {},
        },
      ] as FormComposerItemType[],
    [title],
  );

  return (
    <ExamplePage
      title="Custom CMS fields"
      description="CMS-specific inputs via type custom: slug generator, category cascader, and media library picker — no global registration required."
      values={values}
    >
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="CMS use case"
        description="When creating a resource page, editors generate a slug, pick a taxonomy path, and choose a cover from the media library."
      />
      <Card>
        <FormComposer
          form={form}
          layout="vertical"
          items={items}
          onFinish={setValues}
          initialValues={{ title: 'Customer stories' }}
          rowProps={{ gutter: [16, 0] }}
        >
          <Button type="primary" htmlType="submit">
            Save page
          </Button>
        </FormComposer>
      </Card>
    </ExamplePage>
  );
}
