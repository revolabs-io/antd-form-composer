import { Card, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { EXAMPLES } from '../../examples';

export function ExamplesIndexPage() {
  return (
    <div>
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        CMS examples
      </Typography.Title>
      <Typography.Paragraph type="secondary">
        Real admin-form scenarios for building a content management system with
        antd-form-composer. Open any example from the sidebar or the cards
        below.
      </Typography.Paragraph>

      <Row gutter={[16, 16]}>
        {EXAMPLES.map((example) => (
          <Col xs={24} md={12} xl={8} key={example.key}>
            <Link
              to={example.path}
              style={{ display: 'block', height: '100%' }}
            >
              <Card hoverable title={example.title} style={{ height: '100%' }}>
                <Typography.Paragraph
                  type="secondary"
                  style={{ marginBottom: 0 }}
                >
                  {example.description}
                </Typography.Paragraph>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
