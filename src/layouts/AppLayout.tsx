import {
  AppstoreOutlined,
  FormOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { EXAMPLES } from '../examples';

const { Header, Content, Sider } = Layout;

function useBreadcrumbItems(pathname: string) {
  return useMemo(() => {
    if (pathname === '/') {
      return [{ title: 'Home' }];
    }

    if (pathname === '/examples') {
      return [{ title: <Link to="/">Home</Link> }, { title: 'Examples' }];
    }

    const example = EXAMPLES.find((item) => item.path === pathname);
    if (example) {
      return [
        { title: <Link to="/">Home</Link> },
        { title: <Link to="/examples">Examples</Link> },
        { title: example.title },
      ];
    }

    return [{ title: 'Home' }];
  }, [pathname]);
}

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const breadcrumbItems = useBreadcrumbItems(location.pathname);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const selectedKeys = useMemo(() => {
    if (location.pathname === '/') {
      return ['home'];
    }
    if (location.pathname === '/examples') {
      return ['examples'];
    }
    const example = EXAMPLES.find((item) => item.path === location.pathname);
    return example ? [example.key] : [];
  }, [location.pathname]);

  const [openKeys, setOpenKeys] = useState<string[]>(['examples-group']);

  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        width={240}
      >
        <div className="app-logo">
          {collapsed ? 'AFC' : 'antd-form-composer'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={collapsed ? [] : openKeys}
          onOpenChange={setOpenKeys}
          items={[
            {
              key: 'home',
              icon: <HomeOutlined />,
              label: <Link to="/">Home</Link>,
            },
            {
              key: 'examples-group',
              icon: <AppstoreOutlined />,
              label: 'Examples',
              children: [
                {
                  key: 'examples',
                  icon: <FormOutlined />,
                  label: <Link to="/examples">Overview</Link>,
                },
                ...EXAMPLES.map((example) => ({
                  key: example.key,
                  label: <Link to={example.path}>{example.title}</Link>,
                })),
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography.Title level={4} style={{ margin: 0 }}>
            Form Composer Demo
          </Typography.Title>
        </Header>
        <Content className="app-content">
          <Breadcrumb style={{ marginBottom: 16 }} items={breadcrumbItems} />
          <div className="app-content-inner">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
