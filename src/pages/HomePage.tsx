import { Button, Card, Col, List, Row, Space, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';

const FEATURES = [
  {
    title: 'Dynamic form fields',
    description:
      'Compose forms from a declarative items config with flexible Ant Design Form.Item props.',
  },
  {
    title: 'Built-in & registered inputs',
    description:
      'Use text, password, textarea out of the box, or register Select, DatePicker, and more.',
  },
  {
    title: 'Form lists',
    description:
      'Build repeatable and nested field groups with custom listRender and itemRender.',
  },
  {
    title: 'Conditional rendering',
    description:
      'Hide or adapt fields based on runtime form values using function-based props.',
  },
  {
    title: 'Custom components',
    description:
      'Drop in any React component with type custom — no global registration required.',
  },
  {
    title: 'Native Form integration',
    description:
      'Use FormComposerItems inside a standard Ant Design Form for full layout control.',
  },
];

export function HomePage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Space size="middle" wrap>
          <Typography.Title level={2} style={{ margin: 0 }}>
            antd-form-composer
          </Typography.Title>
          <Tag color="blue">Ant Design 4 & 5</Tag>
        </Space>
        <Typography.Paragraph
          type="secondary"
          style={{ marginTop: 12, marginBottom: 0, maxWidth: 720 }}
        >
          A flexible form composition library for React, built on top of Ant
          Design Form. Configure complex forms with dynamic rendering, lists,
          and conditional fields.
        </Typography.Paragraph>
      </div>

      <Space>
        <Link to="/examples">
          <Button type="primary" size="large">
            Browse examples
          </Button>
        </Link>
        <Link to="/examples/basic">
          <Button size="large">Start with basic form</Button>
        </Link>
      </Space>

      <Row gutter={[16, 16]}>
        {FEATURES.map((feature) => (
          <Col xs={24} md={12} xl={8} key={feature.title}>
            <Card
              size="small"
              title={feature.title}
              styles={{ body: { minHeight: 88 } }}
            >
              <Typography.Paragraph
                type="secondary"
                style={{ marginBottom: 0 }}
              >
                {feature.description}
              </Typography.Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="What you can try" size="small">
        <List
          dataSource={[
            'Submit a basic login-style form with validation',
            'Register extra Ant Design inputs and use them by type',
            'Toggle fields with conditional hidden logic',
            'Add and remove nested list items',
            'Compose multi-section forms with FormComposerItems',
          ]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Card>
    </Space>
  );
}
