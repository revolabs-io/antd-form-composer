import { Button, Card, Col, List, Row, Space, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { EXAMPLES } from '../examples';

const FEATURES = [
  {
    title: 'CMS-ready composition',
    description:
      'Declare article, SEO, and publish forms as item configs instead of hand-wiring every Form.Item.',
  },
  {
    title: 'Async & complex validators',
    description:
      'Unique slug checks, reserved paths, password policy, and cross-field campaign windows.',
  },
  {
    title: 'Sortable lists',
    description:
      'Reorder hero slides or nav items with drag and drop while Form.List stays in sync.',
  },
  {
    title: 'Conditional content types',
    description:
      'Show article, landing, or redirect fields based on the selected CMS content type.',
  },
  {
    title: 'Custom CMS fields',
    description:
      'Slug generators, media pickers, and taxonomy cascaders via type custom.',
  },
  {
    title: 'Multi-section editors',
    description:
      'Mix FormComposerItems with native Ant Design Form for Content / SEO / Publish layouts.',
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
          <Tag color="blue">CMS demos</Tag>
          <Tag>Ant Design 4 & 5</Tag>
        </Space>
        <Typography.Paragraph
          type="secondary"
          style={{ marginTop: 12, marginBottom: 0, maxWidth: 720 }}
        >
          Interactive examples of composing CMS admin forms — articles, SEO,
          navigation, validators, sortable hero slides, and custom fields —
          built with FormComposer on top of Ant Design Form.
        </Typography.Paragraph>
      </div>

      <Space>
        <Link to="/examples">
          <Button type="primary" size="large">
            Browse CMS examples
          </Button>
        </Link>
        <Link to="/examples/validators">
          <Button size="large">Try validators</Button>
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

      <Card title="CMS scenarios covered" size="small">
        <List
          dataSource={EXAMPLES.map(
            (example) => `${example.title} — ${example.description}`,
          )}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Card>
    </Space>
  );
}
