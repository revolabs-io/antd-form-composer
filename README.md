# AntD Form Composer

A powerful and flexible form composition library for React applications, built on top of Ant Design Form. It provides an intuitive way to create complex forms with dynamic rendering and configuration.

## ✅ Ant Design compatibility

Works with **Ant Design 4, 5, and 6** in the same package — no major-specific forks or deep `antd/es/*` imports.

| Ant Design | Supported | React |
|------------|-----------|-------|
| **v4** (`^4.24.0`) | ✅ | React ≥ 16 |
| **v5** (`^5.0.0`) | ✅ | React ≥ 16 |
| **v6** (`^6.0.0`) | ✅ | React ≥ 18 (required by antd 6) |

CI runs type-check, tests, and build against each major. Peer range:

```text
antd: ^4.24.0 || ^5.0.0 || ^6.0.0
```

Styles are not bundled. Import Ant Design CSS/reset according to your major (for example `antd/dist/antd.css` on v4, or CSS-in-JS / reset on v5+).

## ✨ Features

- 🔄 Dynamic form fields with flexible configurations
- 🎨 Built-in support for common Ant Design form components
- 📝 Form list support for repeatable fields
- 🎭 Conditional rendering based on runtime form state
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
| `antd` | `^4.24.0 \|\| ^5.0.0 \|\| ^6.0.0` | Use the Ant Design major your app already uses |
| `react` | `>=16` | **antd 6 requires React >= 18** |
| `react-dom` | `>=16` | Match your React major |

## 🚀 Quick Start

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

### More examples

See live demos (lists, nested lists, conditional fields, custom components, and more) at:

**[https://antd-form-composer.vercel.app/](https://antd-form-composer.vercel.app/)**

## 🧩 Component registration

Pre-registered by default:

- `text` — `Input`
- `textarea` — `Input.TextArea`
- `password` — `Input.Password`
- `list` — dynamic `Form.List`

Register more components as needed:

```ts
import { registerInputComponents } from 'antd-form-composer';
import { DatePicker, InputNumber, Select } from 'antd';

registerInputComponents({
  'date-picker': DatePicker,
  select: Select,
  number: InputNumber,
});
```

| Type | Component | Typed | Pre-registered |
|------|-----------|-------|----------------|
| `text` | `Input` | ✅ | ✅ |
| `password` | `Input.Password` | ✅ | ✅ |
| `search` | `Input.Search` | ✅ | ❌ |
| `textarea` | `Input.TextArea` | ✅ | ✅ |
| `number` | `InputNumber` | ✅ | ❌ |
| `select` | `Select` | ✅ | ❌ |
| `date-picker` | `DatePicker` | ✅ | ❌ |
| `range-picker` | `DatePicker.RangePicker` | ✅ | ❌ |
| `time-picker` | `TimePicker` | ✅ | ❌ |
| `radio` | `Radio` | ✅ | ❌ |
| `radio-group` | `Radio.Group` | ✅ | ❌ |
| `checkbox` | `Checkbox` | ✅ | ❌ |
| `checkbox-group` | `Checkbox.Group` | ✅ | ❌ |
| `switch` | `Switch` | ✅ | ❌ |
| `slider` | `Slider` | ✅ | ❌ |
| `rate` | `Rate` | ✅ | ❌ |
| `mentions` | `Mentions` | ✅ | ❌ |
| `autocomplete` | `AutoComplete` | ✅ | ❌ |
| `cascader` | `Cascader` | ✅ | ❌ |
| `transfer` | `Transfer` | ✅ | ❌ |
| `tree-select` | `TreeSelect` | ✅ | ❌ |
| `list` | `Form.List` | ✅ | ✅ |
| `hidden` | Hidden field | ✅ | ✅ |
| `custom` | Custom component | ✅ | — |

Only a few inputs ship pre-registered to keep the bundle small and allow tree-shaking. Register the rest (or your own components) in your app.

You can also use `FormComposerItems` inside a native Ant Design `Form` and mix with regular `Form.Item`s.

## 📖 API Reference

### FormComposerProps

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `items` | `FormComposerItem[]` | Yes | Array of form items to render |
| `...` | [FormProps](https://ant.design/components/form#form) | | All Ant Design Form props are supported |

### FormComposerItemsProps

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `items` | `FormComposerItem[]` | Yes | Array of form items to render |
| `rowProps` | [RowProps](https://ant.design/components/grid#row) | No | Props for the wrapping `Row` |

### FormComposerListProps

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `items` | `FormComposerItem[]` | Yes | Items for each list row |
| `listRender` | `(content, fields, operation) => ReactNode` | Yes | Render the list container |
| `itemRender` | `(content, field, operation) => ReactNode` | Yes | Render each list item |

### FormComposerItem

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `string` | Yes | Input type (`text`, `custom`, `list`, …) |
| `col` | `number \| ColProps \| ((form, values) => …)` | No | Column / grid config |
| `itemProps` | `FormItemProps \| ((form, values) => …)` | Yes | Ant Design `Form.Item` props |
| `hidden` | `boolean \| ((form, values) => boolean)` | No | Conditionally hide the field |
| `inputProps` | `object \| ((form, values) => object)` | No | Props for the input component |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please follow the existing code style, include tests when relevant, and update docs as needed.

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 📬 Contact & Support

- Demo: [https://antd-form-composer.vercel.app/](https://antd-form-composer.vercel.app/)
- GitHub Issues: [Create an issue](https://github.com/revolabs-io/antd-form-composer/issues)
- Email: [info@revolabs.io](mailto:info@revolabs.io)

## 🙏 Acknowledgments

Built on top of [Ant Design](https://ant.design/).
