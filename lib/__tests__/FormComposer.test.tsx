import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from 'antd';
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { FormComposer } from '../Form';
import {
  registeredComponents,
  registerInputComponents,
} from '../register-component';
import type { FormComposerItemType } from '../types';

describe('FormComposer', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    // Keep built-in text/password/textarea/list; clear custom registrations
    Object.keys(registeredComponents).forEach((key) => {
      if (!['text', 'password', 'textarea', 'list'].includes(key)) {
        delete registeredComponents[key];
      }
    });
  });

  it('submits basic text and password values', async () => {
    const user = userEvent.setup();
    const onFinish = vi.fn();

    const items: FormComposerItemType[] = [
      {
        type: 'text',
        col: 12,
        itemProps: {
          label: 'Username',
          name: 'username',
          rules: [{ required: true }],
        },
        inputProps: {
          placeholder: 'Enter username',
        },
      },
      {
        type: 'password',
        col: 12,
        itemProps: {
          label: 'Password',
          name: 'password',
        },
        inputProps: {
          placeholder: 'Enter password',
        },
      },
    ];

    render(
      <FormComposer items={items} onFinish={onFinish}>
        <Button htmlType="submit">Submit</Button>
      </FormComposer>,
    );

    await user.type(screen.getByPlaceholderText('Enter username'), 'alice');
    await user.type(screen.getByPlaceholderText('Enter password'), 'secret');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledTimes(1);
      expect(onFinish.mock.calls[0][0]).toEqual({
        username: 'alice',
        password: 'secret',
      });
    });
  });

  it('hides fields when hidden resolves to true', async () => {
    const user = userEvent.setup();

    const items: FormComposerItemType[] = [
      {
        type: 'text',
        col: 24,
        itemProps: {
          label: 'Role',
          name: 'role',
        },
        inputProps: {
          placeholder: 'Role',
        },
      },
      {
        type: 'text',
        col: 24,
        hidden: (_form, values) => values.role !== 'admin',
        itemProps: {
          label: 'Admin code',
          name: 'adminCode',
        },
        inputProps: {
          placeholder: 'Admin code',
        },
      },
    ];

    render(<FormComposer items={items} />);

    expect(screen.queryByPlaceholderText('Admin code')).not.toBeInTheDocument();

    await user.type(screen.getByPlaceholderText('Role'), 'admin');

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Admin code')).toBeInTheDocument();
    });
  });

  it('supports FormComposerList add and name paths', async () => {
    const user = userEvent.setup();
    const onFinish = vi.fn();

    const items: FormComposerItemType[] = [
      {
        type: 'list',
        col: 24,
        itemProps: {},
        inputProps: {
          name: 'contacts',
          items: [
            {
              type: 'text',
              col: 24,
              itemProps: {
                label: 'Email',
                name: 'email',
              },
              inputProps: {
                placeholder: 'Email',
              },
            },
          ],
          listRender: (content, _fields, { add }) => (
            <>
              {content}
              <Button type="dashed" onClick={() => add()}>
                Add contact
              </Button>
            </>
          ),
          itemRender: (content) => content,
        },
      },
    ];

    render(
      <FormComposer items={items} onFinish={onFinish}>
        <Button htmlType="submit">Submit</Button>
      </FormComposer>,
    );

    await user.click(screen.getByRole('button', { name: 'Add contact' }));
    await user.type(screen.getByPlaceholderText('Email'), 'a@example.com');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledTimes(1);
      expect(onFinish.mock.calls[0][0]).toEqual({
        contacts: [{ email: 'a@example.com' }],
      });
    });
  });

  it('uses components registered via registerInputComponents', async () => {
    const user = userEvent.setup();
    const onFinish = vi.fn();

    const NativeSelect = ({
      value,
      onChange,
      ...rest
    }: {
      value?: string;
      onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    }) => (
      <select aria-label="Country" value={value} onChange={onChange} {...rest}>
        <option value="">Select country</option>
        <option value="vn">Vietnam</option>
        <option value="jp">Japan</option>
      </select>
    );

    registerInputComponents({
      select: NativeSelect,
    });

    const items: FormComposerItemType[] = [
      {
        type: 'select',
        col: 24,
        itemProps: {
          label: 'Country',
          name: 'country',
        },
        inputProps: {},
      },
    ];

    render(
      <FormComposer items={items} onFinish={onFinish}>
        <Button htmlType="submit">Submit</Button>
      </FormComposer>,
    );

    await user.selectOptions(screen.getByLabelText('Country'), 'vn');
    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledTimes(1);
      expect(onFinish.mock.calls[0][0]).toEqual({ country: 'vn' });
    });
  });
});
