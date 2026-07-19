import { ChromeOutlined, CodeOutlined } from '@ant-design/icons';
import { Flex, Space, Tabs, Typography } from 'antd';
import type { ReactNode } from 'react';

import { CodeBlock } from './CodeBlock';
import { ResultPanel } from './ResultPanel';

type ExamplePageProps = {
  title: string;
  whenToUse: ReactNode;
  code: string;
  children: ReactNode;
  values: unknown;
  icon?: ReactNode;
  beforeExamples?: ReactNode;
};

export function ExamplePage({
  title,
  whenToUse,
  code,
  children,
  values,
  icon,
  beforeExamples,
}: ExamplePageProps) {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Flex align="center" gap="small">
        {icon}
        <Typography.Title level={3} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
      </Flex>

      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          When to use
        </Typography.Title>
        {typeof whenToUse === 'string' ? (
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {whenToUse}
          </Typography.Paragraph>
        ) : (
          whenToUse
        )}
      </Space>

      {beforeExamples}

      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Examples
        </Typography.Title>
        <Tabs
          defaultActiveKey="demo"
          type="card"
          items={[
            {
              key: 'demo',
              label: (
                <span>
                  <ChromeOutlined /> Live view
                </span>
              ),
              children: (
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: '100%' }}
                >
                  {children}
                  <ResultPanel values={values} />
                </Space>
              ),
            },
            {
              key: 'code',
              label: (
                <span>
                  <CodeOutlined /> Code
                </span>
              ),
              children: <CodeBlock code={code} language="typescript" />,
            },
          ]}
        />
      </Space>
    </Space>
  );
}
