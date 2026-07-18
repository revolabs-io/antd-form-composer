import { Space, Typography } from 'antd';
import { ReactNode } from 'react';

import { ResultPanel } from './ResultPanel';

type ExamplePageProps = {
  title: string;
  description: string;
  children: ReactNode;
  values: unknown;
};

export function ExamplePage({
  title,
  description,
  children,
  values,
}: ExamplePageProps) {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          {title}
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          {description}
        </Typography.Paragraph>
      </div>
      {children}
      <ResultPanel values={values} />
    </Space>
  );
}
