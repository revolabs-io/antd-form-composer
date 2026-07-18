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
    title: 'Create article',
    description:
      'CMS article create form — title, excerpt, and body with required rules and responsive columns.',
  },
  {
    key: 'registered-inputs',
    path: '/examples/registered-inputs',
    title: 'SEO & publish settings',
    description:
      'Configure SEO metadata and publish options using registered Ant Design inputs (select, date, switch, rate).',
  },
  {
    key: 'conditional',
    path: '/examples/conditional',
    title: 'Content type fields',
    description:
      'Switch between Article and Landing page content types to show or hide CMS-specific fields.',
  },
  {
    key: 'validators',
    path: '/examples/validators',
    title: 'Validators',
    description:
      'Async unique-slug checks, reserved paths, complex password rules, and cross-field publish window validation.',
  },
  {
    key: 'list',
    path: '/examples/list',
    title: 'FAQ blocks',
    description:
      'Manage repeatable FAQ items on a CMS page with add/remove list rendering.',
  },
  {
    key: 'sortable-list',
    path: '/examples/sortable-list',
    title: 'Sortable hero slides',
    description:
      'Drag and drop to reorder homepage hero slides while keeping Form.List values in sync.',
  },
  {
    key: 'nested-list',
    path: '/examples/nested-list',
    title: 'Navigation menu',
    description:
      'Build nested CMS navigation — top-level menus with child links.',
  },
  {
    key: 'custom',
    path: '/examples/custom',
    title: 'Custom CMS fields',
    description:
      'Custom slug generator, media picker, and category cascader wired through type custom.',
  },
  {
    key: 'form-composer-items',
    path: '/examples/form-composer-items',
    title: 'Multi-section editor',
    description:
      'Full CMS content editor with FormComposerItems sections mixed into a native Ant Design Form.',
  },
];
