import { Button, Input, Space } from 'antd';

export type SlugInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  sourceTitle?: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function SlugInput({ value, onChange, sourceTitle }: SlugInputProps) {
  return (
    <Space.Compact style={{ width: '100%' }}>
      <Input
        value={value}
        onChange={(event) => onChange?.(slugify(event.target.value))}
        placeholder="my-cms-page"
        addonBefore="/"
      />
      <Button
        type="default"
        disabled={!sourceTitle}
        onClick={() => onChange?.(slugify(sourceTitle || ''))}
      >
        Generate from title
      </Button>
    </Space.Compact>
  );
}
