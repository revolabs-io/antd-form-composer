import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { FormComposer, FormComposerItemType } from '@lib';
import {
  Alert,
  Button,
  Card,
  FormListFieldData,
  FormListOperation,
} from 'antd';
import { ReactNode, useMemo, useState } from 'react';

import { SortableListItem } from '../../components/cms/SortableListItem';
import { ExamplePage } from '../../components/ExamplePage';

function SortableHeroList({
  content,
  fields,
  operation,
}: {
  content: ReactNode;
  fields: FormListFieldData[];
  operation: FormListOperation;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = fields.findIndex((field) => field.key === active.id);
    const newIndex = fields.findIndex((field) => field.key === over.id);

    if (oldIndex >= 0 && newIndex >= 0) {
      operation.move(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={fields.map((field) => field.key)}
        strategy={verticalListSortingStrategy}
      >
        {content}
      </SortableContext>
      <Button
        type="dashed"
        onClick={() => operation.add({ headline: '', ctaLabel: 'Learn more' })}
        block
        style={{ marginTop: 8 }}
      >
        + Add hero slide
      </Button>
    </DndContext>
  );
}

export function SortableListPage() {
  const [values, setValues] = useState<unknown>(null);

  const items = useMemo(
    () =>
      [
        {
          type: 'text',
          col: 24,
          itemProps: {
            label: 'Homepage campaign',
            name: 'campaignName',
            rules: [{ required: true, message: 'Campaign name is required' }],
          },
          inputProps: {
            placeholder: 'Spring launch',
          },
        },
        {
          type: 'list',
          col: 24,
          itemProps: {
            label: 'Hero slides (drag to reorder)',
            name: 'slides',
          },
          inputProps: {
            listRender: (
              content: ReactNode,
              fields: FormListFieldData[],
              operation: FormListOperation,
            ) => (
              <SortableHeroList
                content={content}
                fields={fields}
                operation={operation}
              />
            ),
            itemRender: (
              content: ReactNode,
              field: FormListFieldData,
              { remove }: FormListOperation,
            ) => (
              <SortableListItem
                id={field.key}
                title={`Slide ${field.name + 1}`}
                onRemove={() => remove(field.name)}
              >
                {content}
              </SortableListItem>
            ),
            items: [
              {
                type: 'text',
                col: { xs: 24, md: 12 },
                itemProps: {
                  label: 'Headline',
                  name: 'headline',
                  rules: [{ required: true, message: 'Headline is required' }],
                },
                inputProps: {
                  placeholder: 'Build pages without waiting on eng',
                },
              },
              {
                type: 'text',
                col: { xs: 24, md: 12 },
                itemProps: {
                  label: 'CTA label',
                  name: 'ctaLabel',
                  rules: [{ required: true, message: 'CTA label is required' }],
                },
                inputProps: { placeholder: 'Book a demo' },
              },
              {
                type: 'text',
                col: 24,
                itemProps: {
                  label: 'CTA URL',
                  name: 'ctaUrl',
                  rules: [
                    { required: true, message: 'CTA URL is required' },
                    { type: 'url', message: 'Enter a valid URL' },
                  ],
                },
                inputProps: { placeholder: 'https://example.com/demo' },
              },
            ],
          },
        },
      ] as FormComposerItemType[],
    [],
  );

  return (
    <ExamplePage
      title="Sortable hero slides"
      description="Drag and drop homepage hero slides to set display order. Order updates Form.List via operation.move."
      values={values}
    >
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        message="CMS use case"
        description="Marketing editors reorder homepage carousel slides; the saved array order is what the frontend renders."
      />
      <Card>
        <FormComposer
          layout="vertical"
          items={items}
          onFinish={setValues}
          initialValues={{
            campaignName: 'Spring launch',
            slides: [
              {
                headline: 'Ship content in hours',
                ctaLabel: 'Start free',
                ctaUrl: 'https://example.com/signup',
              },
              {
                headline: 'Built for editors',
                ctaLabel: 'See product',
                ctaUrl: 'https://example.com/product',
              },
              {
                headline: 'Enterprise-ready',
                ctaLabel: 'Talk to sales',
                ctaUrl: 'https://example.com/contact',
              },
            ],
          }}
          rowProps={{ gutter: [16, 0] }}
        >
          <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
            Save homepage slides
          </Button>
        </FormComposer>
      </Card>
    </ExamplePage>
  );
}
