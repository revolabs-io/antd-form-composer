import {
  AppstoreOutlined,
  BuildOutlined,
  CodeOutlined,
  GithubOutlined,
  GlobalOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Card, Flex, Layout, Menu, Space, Typography } from 'antd';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { EXAMPLES } from '../examples';

const { Content, Footer, Sider } = Layout;

const SIDER_WIDTH = 260;
const SIDER_COLLAPSED_WIDTH = 80;

function breadcrumbTitle(icon: ReactNode, label: ReactNode) {
  return (
    <Space size={6}>
      {icon}
      {label}
    </Space>
  );
}

function useBreadcrumbItems(pathname: string) {
  return useMemo(() => {
    const home = {
      title: breadcrumbTitle(
        <HomeOutlined />,
        pathname === '/' ? 'Home' : <Link to="/">Home</Link>,
      ),
    };

    if (pathname === '/') {
      return [home];
    }

    const examples = {
      title: breadcrumbTitle(
        <AppstoreOutlined />,
        pathname === '/examples' ? (
          'Examples'
        ) : (
          <Link to="/examples">Examples</Link>
        ),
      ),
    };

    if (pathname === '/examples') {
      return [home, examples];
    }

    const example = EXAMPLES.find((item) => item.path === pathname);
    if (example) {
      return [
        home,
        examples,
        {
          title: breadcrumbTitle(example.icon, example.title),
        },
      ];
    }

    return [home];
  }, [pathname]);
}

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const breadcrumbItems = useBreadcrumbItems(location.pathname);

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
  const siderWidth = collapsed ? SIDER_COLLAPSED_WIDTH : SIDER_WIDTH;
  const menuMode = isMobile ? 'vertical' : 'inline';

  return (
    <Layout hasSider style={{ minHeight: '100%' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        onBreakpoint={setIsMobile}
        width={SIDER_WIDTH}
        collapsedWidth={SIDER_COLLAPSED_WIDTH}
        theme="light"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Flex align="center" style={{ height: 56, padding: '0 16px' }}>
          <Link
            to="/"
            style={
              collapsed
                ? {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }
                : {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    width: '100%',
                  }
            }
          >
            <BuildOutlined style={{ fontSize: 20 }} />
            {collapsed ? null : (
              <Typography.Text strong>antd-form-composer</Typography.Text>
            )}
          </Link>
        </Flex>
        <Menu
          theme="light"
          mode={menuMode}
          selectedKeys={selectedKeys}
          openKeys={menuMode === 'inline' && !collapsed ? openKeys : undefined}
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
                  icon: <AppstoreOutlined />,
                  label: <Link to="/examples">Overview</Link>,
                },
                ...EXAMPLES.map((example) => ({
                  key: example.key,
                  icon: example.icon,
                  label: <Link to={example.path}>{example.title}</Link>,
                })),
              ],
            },
            { type: 'divider' },
            {
              key: 'github',
              icon: <GithubOutlined />,
              label: (
                <a
                  href="https://github.com/revolabs-io/antd-form-composer"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on GitHub
                </a>
              ),
            },
            {
              key: 'npm',
              icon: <CodeOutlined />,
              label: (
                <a
                  href="https://www.npmjs.com/package/antd-form-composer"
                  target="_blank"
                  rel="noreferrer"
                >
                  View on npm
                </a>
              ),
            },
            {
              key: 'website',
              icon: <GlobalOutlined />,
              label: (
                <a href="https://revolabs.io" target="_blank" rel="noreferrer">
                  About us
                </a>
              ),
            },
          ]}
        />
      </Sider>
      <Layout style={{ marginLeft: siderWidth }}>
        <Content style={{ margin: '24px 24px 0', overflow: 'initial' }}>
          <Breadcrumb style={{ marginBottom: 16 }} items={breadcrumbItems} />
          <Card>
            <Outlet />
          </Card>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Created by{' '}
          <Typography.Link href="https://revolabs.io" target="_blank">
            Revolabs
          </Typography.Link>
        </Footer>
      </Layout>
    </Layout>
  );
}
