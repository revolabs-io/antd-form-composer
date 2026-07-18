export type ExampleMeta = {
  key: string;
  path: string;
  title: string;
  description: string;
};

export const EXAMPLES: ExampleMeta[] = [
  {
    key: 'basic',
    path: '/examples/basic',
    title: 'Basic form',
    description:
      'Build a simple form with text/password fields, validation rules, and responsive grid columns.',
  },
  {
    key: 'registered-inputs',
    path: '/examples/registered-inputs',
    title: 'Registered inputs',
    description:
      'Register Ant Design inputs once with registerInputComponents, then use them by type string.',
  },
  {
    key: 'conditional',
    path: '/examples/conditional',
    title: 'Conditional rendering',
    description:
      'Hide or change fields at runtime using hidden / itemProps / inputProps as functions of form values.',
  },
  {
    key: 'list',
    path: '/examples/list',
    title: 'Form list',
    description:
      'Repeatable field groups with type list, listRender, and itemRender for add/remove UX.',
  },
  {
    key: 'nested-list',
    path: '/examples/nested-list',
    title: 'Nested form list',
    description:
      'Nest list items inside other lists for hierarchical data such as departments and employees.',
  },
  {
    key: 'custom',
    path: '/examples/custom',
    title: 'Custom components',
    description:
      'Use type custom with any React component without registering it globally.',
  },
  {
    key: 'form-composer-items',
    path: '/examples/form-composer-items',
    title: 'FormComposerItems',
    description:
      'Mix FormComposerItems with a native Ant Design Form for multi-section layouts.',
  },
];
