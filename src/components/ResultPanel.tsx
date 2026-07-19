import { Card, Empty, Typography } from 'antd';

type ResultPanelProps = {
  values: unknown;
};

export function ResultPanel({ values }: ResultPanelProps) {
  const hasValues = values !== null && values !== undefined;

  return (
    <Card size="small" title="Submitted values" type="inner">
      {hasValues ? (
        <Typography.Paragraph style={{ marginBottom: 0 }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(values, null, 2)}
          </pre>
        </Typography.Paragraph>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Submit the form to see values here"
        />
      )}
    </Card>
  );
}
