import { DeleteOutlined, HolderOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Card, Space } from 'antd';
import { CSSProperties, ReactNode } from 'react';

type SortableListItemProps = {
  id: string | number;
  title: string;
  onRemove: () => void;
  children: ReactNode;
};

export function SortableListItem({
  id,
  title,
  onRemove,
  children,
}: SortableListItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.75 : 1,
    marginBottom: 12,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        size="small"
        title={
          <Space>
            <Button
              type="text"
              size="small"
              icon={<HolderOutlined />}
              aria-label="Drag to reorder"
              style={{ cursor: 'grab' }}
              {...attributes}
              {...listeners}
            />
            <span>{title}</span>
          </Space>
        }
        extra={
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={onRemove}
          >
            Remove
          </Button>
        }
      >
        {children}
      </Card>
    </div>
  );
}
