export const BASIC_CODE = `import { FormComposer } from 'antd-form-composer';
import { Button } from 'antd';

const items = [
  {
    type: 'text',
    col: { xs: 24, md: 16 },
    itemProps: {
      label: 'Article title',
      name: 'title',
      rules: [{ required: true, message: 'Title is required' }],
    },
    inputProps: { placeholder: 'How we rebuilt our CMS editor' },
  },
  {
    type: 'select',
    col: { xs: 24, md: 8 },
    itemProps: {
      label: 'Status',
      name: 'status',
      rules: [{ required: true }],
    },
    inputProps: {
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  },
  {
    type: 'textarea',
    col: 24,
    itemProps: { label: 'Excerpt', name: 'excerpt', rules: [{ required: true }] },
    inputProps: { rows: 3, showCount: true, maxLength: 280 },
  },
];

export default () => (
  <FormComposer layout="vertical" items={items} onFinish={console.log}>
    <Button type="primary" htmlType="submit">
      Save article
    </Button>
  </FormComposer>
);`;

export const REGISTERED_INPUTS_CODE = `// src/register.ts — import once from main.tsx
import { registerInputComponents } from 'antd-form-composer';
import {
  DatePicker,
  InputNumber,
  Rate,
  Select,
  Slider,
  Switch,
} from 'antd';

registerInputComponents({
  select: Select,
  number: InputNumber,
  'date-picker': DatePicker,
  switch: Switch,
  rate: Rate,
  slider: Slider,
});

// Then use types anywhere in your forms:
import { FormComposer } from 'antd-form-composer';
import { Button } from 'antd';

const items = [
  {
    type: 'text',
    itemProps: { label: 'SEO title', name: 'seoTitle', rules: [{ required: true }] },
  },
  {
    type: 'select',
    itemProps: { label: 'Canonical strategy', name: 'canonical' },
    inputProps: {
      options: [
        { label: 'Self', value: 'self' },
        { label: 'Custom URL', value: 'custom' },
      ],
    },
  },
  {
    type: 'date-picker',
    itemProps: { label: 'Publish at', name: 'publishAt' },
    inputProps: { showTime: true, style: { width: '100%' } },
  },
  {
    type: 'switch',
    itemProps: { label: 'Indexable', name: 'indexable', valuePropName: 'checked' },
  },
  {
    type: 'rate',
    itemProps: { label: 'Editorial priority', name: 'priority' },
  },
  {
    type: 'slider',
    itemProps: { label: 'Sitemap priority', name: 'sitemapPriority' },
    inputProps: { min: 0, max: 1, step: 0.1 },
  },
];

export default () => (
  <FormComposer layout="vertical" items={items} onFinish={console.log}>
    <Button type="primary" htmlType="submit">
      Save settings
    </Button>
  </FormComposer>
);`;

export const CONDITIONAL_CODE = `const items = [
  {
    type: 'select',
    itemProps: { label: 'Content type', name: 'contentType', rules: [{ required: true }] },
    inputProps: {
      options: [
        { label: 'Article', value: 'article' },
        { label: 'Landing page', value: 'landing' },
        { label: 'Redirect', value: 'redirect' },
      ],
    },
  },
  {
    type: 'textarea',
    // Hide unless content type is article
    hidden: (_form, values) => values?.contentType !== 'article',
    itemProps: { label: 'Article body', name: 'body', rules: [{ required: true }] },
  },
  {
    type: 'text',
    hidden: (_form, values) => values?.contentType !== 'landing',
    itemProps: { label: 'Hero headline', name: 'heroHeadline', rules: [{ required: true }] },
  },
  {
    type: 'text',
    hidden: (_form, values) => values?.contentType !== 'redirect',
    itemProps: {
      label: 'Redirect target URL',
      name: 'redirectUrl',
      rules: [{ required: true }, { type: 'url' }],
    },
  },
  {
    type: 'switch',
    hidden: (_form, values) => values?.contentType === 'redirect',
    itemProps: { label: 'Show in main navigation', name: 'showInNav', valuePropName: 'checked' },
  },
];`;

export const VALIDATORS_CODE = `const items = [
  {
    type: 'text',
    itemProps: {
      label: 'URL slug',
      name: 'slug',
      validateTrigger: 'onBlur',
      hasFeedback: true,
      rules: [{ validator: validateUniqueSlug }], // async API check
    },
  },
  {
    type: 'password',
    itemProps: {
      label: 'Temporary password',
      name: 'password',
      rules: [{ validator: validateStrongPassword }],
    },
  },
  {
    type: 'password',
    itemProps: {
      label: 'Confirm password',
      name: 'confirmPassword',
      dependencies: ['password'],
      rules: [
        { required: true },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('Passwords do not match'));
          },
        }),
      ],
    },
  },
  {
    type: 'date-picker',
    itemProps: {
      label: 'Campaign end',
      name: 'campaignEnd',
      dependencies: ['campaignStart'],
      rules: [
        { required: true },
        ({ getFieldValue }) => ({
          validator(_, value) {
            const start = getFieldValue('campaignStart');
            if (!value || !start || value.isAfter?.(start)) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('End must be after start'));
          },
        }),
      ],
    },
  },
];`;

export const LIST_CODE = `const items = [
  {
    type: 'list',
    itemProps: { label: 'FAQ items', name: 'faqs', required: true },
    inputProps: {
      listRender: (content, _fields, { add }) => (
        <div>
          {content}
          <Button type="dashed" onClick={() => add()} block>
            + Add FAQ item
          </Button>
        </div>
      ),
      itemRender: (content, field, { remove }) => (
        <Card
          size="small"
          title={\`FAQ #\${field.name + 1}\`}
          extra={
            <Button type="link" danger onClick={() => remove(field.name)}>
              Remove
            </Button>
          }
        >
          {content}
        </Card>
      ),
      items: [
        {
          type: 'text',
          itemProps: { label: 'Question', name: 'question', rules: [{ required: true }] },
        },
        {
          type: 'textarea',
          itemProps: { label: 'Answer', name: 'answer', rules: [{ required: true }] },
        },
      ],
    },
  },
];`;

export const SORTABLE_LIST_CODE = `import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

// Inside listRender — call operation.move on drag end
listRender: (content, fields, operation) => (
  <DndContext onDragEnd={(event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = fields.findIndex((f) => f.key === active.id);
    const newIndex = fields.findIndex((f) => f.key === over.id);
    if (oldIndex >= 0 && newIndex >= 0) {
      operation.move(oldIndex, newIndex);
    }
  }}>
    <SortableContext
      items={fields.map((f) => f.key)}
      strategy={verticalListSortingStrategy}
    >
      {content}
    </SortableContext>
    <Button type="dashed" onClick={() => operation.add()} block>
      + Add hero slide
    </Button>
  </DndContext>
)`;

export const NESTED_LIST_CODE = `const items = [
  {
    type: 'list',
    itemProps: { label: 'Top-level items', name: 'items' },
    inputProps: {
      listRender: (content, _fields, { add }) => (
        <div>
          {content}
          <button onClick={() => add()}>Add top-level item</button>
        </div>
      ),
      itemRender: (content, field, { remove }) => (
        <div>
          {content}
          <button onClick={() => remove(field.name)}>Remove</button>
        </div>
      ),
      items: [
        {
          type: 'text',
          itemProps: { label: 'Label', name: 'label', rules: [{ required: true }] },
        },
        {
          type: 'list',
          itemProps: { label: 'Child links', name: 'children' },
          inputProps: {
            listRender: (content, _fields, { add }) => (
              <div>
                {content}
                <button onClick={() => add()}>Add child link</button>
              </div>
            ),
            itemRender: (content, field, { remove }) => (
              <div>
                {content}
                <button onClick={() => remove(field.name)}>Remove</button>
              </div>
            ),
            items: [
              {
                type: 'text',
                itemProps: { label: 'Label', name: 'label', rules: [{ required: true }] },
              },
              {
                type: 'text',
                itemProps: { label: 'Path', name: 'path', rules: [{ required: true }] },
              },
            ],
          },
        },
      ],
    },
  },
];`;

export const CUSTOM_CODE = `import { Cascader } from 'antd';
import { FormComposer } from 'antd-form-composer';
import { MediaPicker } from './MediaPicker';
import { SlugInput } from './SlugInput';

const items = [
  {
    type: 'custom',
    component: SlugInput,
    itemProps: { label: 'URL slug', name: 'slug', rules: [{ required: true }] },
    inputProps: { sourceTitle: title },
  },
  {
    type: 'custom',
    component: Cascader,
    itemProps: { label: 'Category', name: 'category', rules: [{ required: true }] },
    inputProps: { options: CATEGORY_TREE, style: { width: '100%' } },
  },
  {
    type: 'custom',
    component: MediaPicker,
    itemProps: { label: 'Cover image', name: 'coverImageId', rules: [{ required: true }] },
  },
];

export default () => (
  <FormComposer items={items} onFinish={console.log}>
    <Button type="primary" htmlType="submit">Save page</Button>
  </FormComposer>
);`;

export const FORM_COMPOSER_ITEMS_CODE = `import { FormComposerItems } from 'antd-form-composer';
import { Button, Card, Form, Input } from 'antd';

// Mix FormComposerItems with native Ant Design Form
export default () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical" onFinish={console.log}>
      {/* Section 1 — composed fields */}
      <Card title="Content">
        <FormComposerItems items={contentItems} rowProps={{ gutter: [16, 0] }} />
      </Card>

      {/* Section 2 — another composed block */}
      <Card title="SEO">
        <FormComposerItems items={seoItems} rowProps={{ gutter: [16, 0] }} />
      </Card>

      {/* Section 3 — still the same Form */}
      <Card title="Publish">
        <FormComposerItems items={publishItems} rowProps={{ gutter: [16, 0] }} />
      </Card>

      {/* Native Form.Item alongside composed sections */}
      <Card title="Internal notes">
        <Form.Item label="Editor notes" name="editorNotes">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Card>

      <Button type="primary" htmlType="submit">
        Save content
      </Button>
    </Form>
  );
};`;
