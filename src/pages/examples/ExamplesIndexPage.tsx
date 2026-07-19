import { Card, Col, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { EXAMPLES } from '../../examples';

export function ExamplesIndexPage() {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Examples
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          Interactive demos for every core capability of antd-form-composer —
          aligned with the library README. Each page includes When to use, plus
          Live view and Code tabs.
        </Typography.Paragraph>
      </Space>

      <Row gutter={[16, 16]}>
        {EXAMPLES.map((example) => (
          <Col xs={24} md={12} xl={8} key={example.key}>
            <Link to={example.path}>
              <Card hoverable style={{ height: '100%' }}>
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
  );
}
