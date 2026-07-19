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
  Table,
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

const ANTD_COMPAT_ROWS = [
  {
    key: 'v4',
    version: 'v4',
    range: '^4.0.0',
    react: 'React ≥ 16',
  },
  {
    key: 'v5',
    version: 'v5',
    range: '^5.0.0',
    react: 'React ≥ 16',
  },
  {
    key: 'v6',
    version: 'v6',
    range: '^6.0.0',
    react: 'React ≥ 18 (required by antd 6)',
  },
];

export function HomePage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Flex align="center" gap="middle" wrap>
          <Typography.Title level={2} style={{ margin: 0 }}>
            AntD Form Composer
          </Typography.Title>
          <Tag color="success" icon={<CheckCircleOutlined />}>
            Ant Design 4 · 5 · 6
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
          Ant Design compatibility
        </Typography.Title>
        <Table
          size="small"
          pagination={false}
          dataSource={ANTD_COMPAT_ROWS}
          columns={[
            {
              title: 'Ant Design',
              dataIndex: 'version',
              key: 'version',
              render: (version: string) => <Tag color="blue">{version}</Tag>,
            },
            {
              title: 'Supported range',
              dataIndex: 'range',
              key: 'range',
              render: (range: string) => (
                <Typography.Text code>{range}</Typography.Text>
              ),
            },
            {
              title: 'React',
              dataIndex: 'react',
              key: 'react',
            },
            {
              title: 'Status',
              key: 'status',
              render: () => (
                <Tag color="success" icon={<CheckCircleOutlined />}>
                  Supported
                </Tag>
              ),
            },
          ]}
        />
        <Typography.Paragraph type="secondary" style={{ marginBottom: 8 }}>
          Peer dependency range:{' '}
          <Typography.Text code copyable>
            antd: ^4.0.0 || ^5.0.0 || ^6.0.0
          </Typography.Text>
        </Typography.Paragraph>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          Styles are not bundled. Import Ant Design CSS/reset for your major
          (for example{' '}
          <Typography.Text code>antd/dist/antd.css</Typography.Text> on v4, or
          CSS-in-JS / reset on v5+).
        </Typography.Paragraph>
      </Space>

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Features
        </Typography.Title>
        <Row gutter={[16, 16]}>
          {HOME_FEATURES.map((feature) => (
            <Col xs={24} md={12} xl={8} key={feature.title}>
              {feature.path ? (
                <Link to={feature.path}>
                  <Card hoverable size="small" style={{ height: '100%' }}>
                    <Card.Meta
                      avatar={feature.icon}
                      title={feature.title}
                      description={feature.description}
                    />
                  </Card>
                </Link>
              ) : (
                <Card size="small" style={{ height: '100%' }}>
                  <Card.Meta
                    avatar={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                </Card>
              )}
            </Col>
          ))}
        </Row>
      </Space>

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Installation
        </Typography.Title>
        <CodeBlock code={INSTALL_CODE} language="shell" height={140} />
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          Requires peer <Typography.Text code>antd</Typography.Text>{' '}
          <Typography.Text code>^4.0.0 || ^5.0.0 || ^6.0.0</Typography.Text>.
          Use the Ant Design major your app already uses — antd 6 needs React ≥
          18.
        </Typography.Paragraph>
      </Space>

      <Divider />

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Examples
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          Explore the same capabilities documented in the README — basic usage,
          responsive layout, form lists, nested lists, conditional rendering,
          custom components, registration, and mixing FormComposerItems with Ant
          Design Form.
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
