import {
  BookOutlined,
  CheckCircleOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import { Link } from 'react-router-dom';

import { CodeBlock } from '../components/CodeBlock';
import { EXAMPLES, HOME_FEATURES } from '../examples';

const INSTALL_CODE = `npm install antd-form-composer
# or
yarn add antd-form-composer
# or
pnpm install antd-form-composer`;

export function HomePage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Flex align="center" gap="middle" wrap>
          <Typography.Title level={2} style={{ margin: 0 }}>
            AntD Form Composer
          </Typography.Title>
          <Tag color="processing" icon={<CheckCircleOutlined />}>
            Ant Design 4 & 5
          </Tag>
        </Flex>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          A powerful and flexible form composition library for React
          applications, built on top of Ant Design Form. It provides an
          intuitive way to create complex forms with dynamic rendering and
          configuration.
        </Typography.Paragraph>
      </Space>

      <Space wrap size="middle">
        <Link to="/examples">
          <Button type="primary" size="large" icon={<RocketOutlined />}>
            Browse examples
          </Button>
        </Link>
        <Link to="/examples/basic">
          <Button size="large" icon={<BookOutlined />}>
            Quick start
          </Button>
        </Link>
      </Space>

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Features
        </Typography.Title>
        <Row gutter={[16, 16]}>
          {HOME_FEATURES.map((feature) => (
            <Col xs={24} md={12} xl={8} key={feature.title}>
              <Card size="small">
                <Card.Meta
                  avatar={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Space>

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Installation
        </Typography.Title>
        <CodeBlock code={INSTALL_CODE} language="shell" height={140} />
      </Space>

      <Divider />

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Examples
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          Explore the same capabilities documented in the README — basic usage,
          form lists, nested lists, conditional rendering, custom components,
          registration, and mixing FormComposerItems with Ant Design Form.
        </Typography.Paragraph>
        <Row gutter={[16, 16]}>
          {EXAMPLES.map((example) => (
            <Col xs={24} md={12} xl={8} key={example.key}>
              <Link to={example.path}>
                <Card hoverable size="small" style={{ height: '100%' }}>
                  <Card.Meta
                    avatar={example.icon}
                    title={example.title}
                    description={example.description}
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Space>
    </Space>
  );
}
