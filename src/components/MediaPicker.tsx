import { Image, Radio, Space, Typography } from 'antd';

import { MEDIA_LIBRARY } from '../mockApi';

export type MediaPickerProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export function MediaPicker({ value, onChange }: MediaPickerProps) {
  return (
    <Radio.Group
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      style={{ width: '100%' }}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        {MEDIA_LIBRARY.map((asset) => (
          <Radio
            key={asset.id}
            value={asset.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              height: 'auto',
              padding: 8,
              border:
                value === asset.id ? '1px solid #1677ff' : '1px solid #f0f0f0',
              borderRadius: 8,
              width: '100%',
            }}
          >
            <Space align="start">
              <Image
                src={asset.url}
                alt={asset.label}
                width={120}
                height={68}
                style={{ objectFit: 'cover', borderRadius: 4 }}
                preview={false}
              />
              <div>
                <Typography.Text strong>{asset.label}</Typography.Text>
                <br />
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {asset.id}
                </Typography.Text>
              </div>
            </Space>
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
}
