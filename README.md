# AntD Form Composer

A powerful and flexible form composition library for React applications, built on top of Ant Design Form. It provides an
intuitive way to create complex forms with dynamic rendering and configuration.

✅ Fully compatible with Ant Design versions **4**, **5**, and **6**.

## ✨ Features
- 🔄 Dynamic form fields with flexible configurations
- 🎨 Built-in support for common Ant Design form components
- 📝 Form list support for repeatable fields
- 🎭 Conditional Rendering: Hide or modify form fields based on runtime conditions
- 🧩 Custom component integration
- 📱 Responsive layout support
- 🔍 TypeScript support with full type definitions

## 📦 Installation

```bash
npm install antd-form-composer
# or
yarn add antd-form-composer
# or
pnpm install antd-form-composer
```

### Peer dependencies

| Package | Supported versions | Notes |
|---------|-------------------|-------|
| `antd` | `^4.24.0 \|\| ^5.0.0 \|\| ^6.0.0` | Install the Ant Design major your app already uses |
| `react` | `>=16` | **antd 6 requires React >= 18** |

Styles are not bundled. Import Ant Design CSS/reset according to your antd major (for example `antd/dist/antd.css` on v4, or CSS-in-JS / reset on v5+).

## 🚀 Quick Start

### Basic Usage

```tsx
import { FormComposer } from 'antd-form-composer';
import { Button } from 'antd';

const App = () => {
  const items = [
    {
      type: 'text',
      col: 12,
      itemProps: {
        label: 'Username',
        name: 'username',
        rules: [{ required: true }],
      },
      inputProps: {
        placeholder: 'Enter username',
      },
    },
    {
      type: 'password',
      col: 12,
      itemProps: {
        label: 'Password',
        name: 'password',
        rules: [{ required: true }],
      },
      inputProps: {
        placeholder: 'Enter password',
      },
    },
  ];

  return (
    <FormComposer
      items={items}
      onFinish={(values) => console.log(values)}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </FormComposer>
  );
};
```

### Form Lists

```tsx
import { FormComposer } from 'antd-form-composer';
import { Button } from 'antd';

const DynamicUserForm = () => {
  const items = [
    {
      type: 'list',
      name: 'users',
      listRender: (fieldItems, fields, { add }) => (
        <div>
          {fieldItems}
          <button onClick={() => add()}>Add User</button>
        </div>
      ),
      itemRender: (itemContent, field, { remove }) => (
        <div>
          {itemContent}
          <button onClick={() => remove(field.name)}>Remove</button>
        </div>
      ),
      items: [
        {
          type: 'text',
          itemProps: { label: 'First Name', name: 'first-name' },
          inputProps: { placeholder: 'Enter first name' },
        },
        {
          type: 'text',
          itemProps: { label: 'Last Name', name: 'last-name' },
          inputProps: { placeholder: 'Enter last name' },
        },
      ],
    },
  ];

  return (
    <FormComposer
      items={items}
      onFinish={(values) => console.log(values)}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </FormComposer>
  );
};
```


### Nested Form Lists

```tsx
import { FormComposer } from 'antd-form-composer';
import { Button } from 'antd';

const NestedCompanyForm = () => {
  const items = [
    {
      type: 'list',
      name: 'departments',
      listRender: (fieldItems, fields, { add }) => (
        <div>
          {fieldItems}
          <button onClick={() => add()}>Add department</button>
        </div>
      ),
      itemRender: (itemContent, field, { remove }) => (
        <div>
          {itemContent}
          <button onClick={() => remove(field.name)}>Remove</button>
        </div>
      ),
      items: [
        {
          type: 'text',
          itemProps: { label: 'Department Name', name: 'name' },
        },
        {
          type: 'list',
          name: 'employees',
          listRender: (fieldItems, fields, { add, remove }) => (
            <div>
              {fieldItems}
              <button onClick={() => add()}>Add employee</button>
            </div>
          ),
          itemRender: (itemContent, field, { remove }) => (
            <div>
              {itemContent}
              <button onClick={() => remove(field.name)}>Remove</button>
            </div>
          ),
          items: [
            {
              type: 'text',
              itemProps: { label: 'Employee Name', name: 'name' },
            },
            {
              type: 'text',
              itemProps: { label: 'Position', name: 'position' },
            },
          ],
        },
      ],
    },
  ];

  return (
    <FormComposer
      items={items}
      onFinish={(values) => console.log(values)}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </FormComposer>
  );
};
```

### Directly use a custom component.

You can directly use your custom components without needing to register them:

```tsx
import { FormComposer } from 'antd-form-composer';
import { Cascader } from 'antd';

import { CustomInput } from './CustomInput';

const App = () => {
  const items = [
    {
      type: 'custom',
      component: Cascader,
      itemProps: { label: 'Cascader', name: 'cascader' },
      inputProps: { isLeaf: false },
    },
    {
      type: 'custom',
      component: CustomInput,
      itemProps: { label: 'Custom input', name: 'custom' },
      inputProps: {
        // your custom props
      },
    },
  ];

  return (
    <FormComposer
      items={items}
      onFinish={(values) => console.log(values)}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </FormComposer>
  );
};
```

## 🧩 Component registration

This library comes with a carefully selected set of pre-registered components:

- `text`: Ant Design Input
- `textarea`: Ant Design Input.TextArea
- `password`: Ant Design Input.Password
- `list`: Dynamic Form List

### Registering Additional Components

You can easily register additional components based on your needs:

```typescript
import { registerInputComponents } from 'antd-form-composer';
import { DatePicker, InputNumber, Select } from 'antd';

registerInputComponents({
  'date-picker': DatePicker,
  select: Select,
  number: InputNumber,
  // Add more components as needed
});
```

Then use in your form:

```tsx
const items = [
  {
    type: 'date-picker',
    itemProps: {
      name: 'date',
      label: 'Date Picker',
    },
    inputProps: {
      // your custom props
    },
  },
];
```

### Component Type Definitions

| Type             | Component                | Type Defined | Registered |
|------------------|--------------------------|--------------|------------|
| `text`           | `Input`                  | ✅            | ✅          |
| `password`       | `Input.Password`         | ✅            | ✅          |
| `search`         | `Input.Search`           | ✅            | ❌          |
| `textarea`       | `Input.TextArea`         | ✅            | ✅          |
| `number`         | `InputNumber`            | ✅            | ❌          |
| `select`         | `Select`                 | ✅            | ❌          |
| `date-picker`    | `DatePicker`             | ✅            | ❌          |
| `range-picker`   | `DatePicker.RangePicker` | ✅            | ❌          |
| `time-picker`    | `TimePicker`             | ✅            | ❌          |
| `radio`          | `Radio`                  | ✅            | ❌          |
| `radio-group`    | `Radio.Group`            | ✅            | ❌          |
| `checkbox`       | `Checkbox`               | ✅            | ❌          |
| `checkbox-group` | `Checkbox.Group`         | ✅            | ❌          |
| `switch`         | `Switch`                 | ✅            | ❌          |
| `slider`         | `Slider`                 | ✅            | ❌          |
| `rate`           | `Rate`                   | ✅            | ❌          |
| `mentions`       | `Mentions`               | ✅            | ❌          |
| `autocomplete`   | `AutoComplete`           | ✅            | ❌          |
| `cascader`       | `Cascader`               | ✅            | ❌          |
| `transfer`       | `Transfer`               | ✅            | ❌          |
| `tree-select`    | `TreeSelect`             | ✅            | ❌          |
| `list`           | `Form.List`              | ✅            | ✅          |
| `hidden`         | Hidden field             | ✅            | ✅          |
| `custom`         | Custom Component         | ✅            |            |

#### To use the above components with defined types, ensure that the required components are properly registered.

```typescript
import {
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  Mentions,
  Radio,
  Rate,
  Slider,
  TimePicker,
  Transfer,
  TreeSelect,
} from 'antd';
import { registerInputComponents } from 'ant-form-composer';

registerInputComponents({
  // Input related
  search: Input.Search,
  number: InputNumber,

  // Selection components
  select: Select,
  radio: Radio,
  'radio-group': Radio.Group,
  checkbox: Checkbox,
  'checkbox-group': Checkbox.Group,
  switch: Switch,

  // Date & Time
  'date-picker': DatePicker,
  'range-picker': DatePicker.RangePicker,
  'time-picker': TimePicker,

  // Advanced components
  slider: Slider,
  rate: Rate,
  mentions: Mentions,
  autocomplete: AutoComplete,
  cascader: Cascader,
  transfer: Transfer,
  'tree-select': TreeSelect,
});
```

### Why Limited Pre-registered Components?

We intentionally limit pre-registered components for several important reasons:

1. **Performance Optimization**

- Reduces initial bundle size
- Allows tree-shaking for unused components
- Minimizes memory footprint

3. **Flexibility**

- You can register your optimized components
- Allows custom styling and behavior
- Supports project-specific requirements

### Use FormComposerItems within the native Ant Design Form.

- Flexibility: Mix `FormComposerItems` with regular `Form.Item` components
- Control: Full control over the Form component and its props
- Compatibility: Works with any Ant Design Form features and configurations

#### With Custom Form Layout

```tsx
<Form
  form={form}
  layout="inline"
  size="small"
>
  <FormComposerItems
    items={searchItems}
    rowProps={{ gutter: [8, 8] }}
  />
  <Button type="primary">Search</Button>
</Form>
```

#### Multiple Sections

```tsx
<Form form={form}>
  <Card title="Basic Information">
    <FormComposerItems items={basicItems} />
  </Card>

  <Card title="Additional Details">
    <FormComposerItems items={detailItems} />
  </Card>

  <Card title="Custom Section">
    <Form.Item name="custom">
      <CustomComponent />
    </Form.Item>
  </Card>
</Form>
```

## 📖 API Reference

### FormComposerProps

| Property | Type                                                 | Required | Description                             |
|----------|------------------------------------------------------|----------|-----------------------------------------|
| `items`  | `FormComposerItem[]`                                 | Yes      | Array of form items to render           |
| `...`    | [FormProps](https://ant.design/components/form#form) |          | All Ant Design Form props are supported |

### FormComposerItemsProps

| Property | Type                                               | Required | Description                                                                                                                   |
|----------|----------------------------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------|
| `items`  | `FormComposerItem[]`                               | Yes      | Array of form items to render                                                                                                 |
| rowProps | [RowProps](https://ant.design/components/grid#row) | No       | Configuration for grid columns, with full support for all [Ant Design Row](https://ant.design/components/grid#row) properties |

### FormComposerListProps

`FormComposerList` is a component that wraps Ant Design's Form.List to provide dynamic form arrays with composition
features.

| Property     | Type                                                                                           | Required | Description                                |
|--------------|------------------------------------------------------------------------------------------------|----------|--------------------------------------------|
| `items`      | `FormComposerItem[]`                                                                           | Yes      | Array of form items to render              |
| `listRender` | `(content: ReactNode, fields: FormListFieldData[], operation: FormListOperation) => ReactNode` | Yes      | Custom render function for the entire list |
| `itemRender` | `(content: ReactNode, field: FormListFieldData, operation: FormListOperation) => ReactNode`    | Yes      | Custom render function for each list item  |

### FormComposerItem

Common properties for all item types:

| Property   | Type                                                 | Required | Description                                                                                                                           |
|------------|------------------------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------|
| type       | `string`                                             | Yes      | Input component type (e.g., 'text', 'custom', 'list', ...)                                                                            |
| col        | `number \| ColProps \| ((form, values) => ColProps)` | No       | Configuration for grid columns, with full support for all [Ant Design Column](https://ant.design/components/grid#col) properties      |
| itemProps  | `FormItemProps \| ((form, values) => FormItemProps)` | Yes      | Configuration for form item, with full support for all [Ant Design Form.Item](https://ant.design/components/form#formitem) properties |
| hidden     | `boolean \| ((form, values) => boolean)`             | No       | Conditionally hide the field                                                                                                          |
| inputProps | `object \| ((form, values) => object)`               | No       | Props for the input component                                                                                                         |

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your PR:

- Follows the existing code style
- Includes appropriate tests
- Updates documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact & Support

- GitHub Issues: [Create an issue](https://github.com/RevoLabs-IO/antd-form-composer/issues)
- Email: [info@revolabs.io](mailto:info@revolabs.io)

## 🙏 Acknowledgments

- Built on top of [Ant Design](https://ant.design/)
