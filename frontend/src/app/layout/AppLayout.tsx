import { Layout, Menu, Typography, type MenuProps } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const { Header, Content, Footer } = Layout;

const AppLayout = () => {
  const location = useLocation();

  const selectedKey = useMemo(() => {
    if (location.pathname.startsWith('/posts/new')) {
      return 'create';
    }
    return 'posts';
  }, [location.pathname]);

  const menuItems: MenuProps['items'] = [
    {
      key: 'posts',
      label: <Link to="/">Posts</Link>
    },
    {
      key: 'create',
      label: <Link to="/posts/new">Create Post</Link>
    }
  ];

  return (
    <Layout className="layout">
      <Header className="layout__header">
        <Typography.Title level={3} className="layout__logo">
          Post Manager
        </Typography.Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
        />
      </Header>
      <Content className="layout__content">
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Built with React, Ant Design & ASP.NET Core
      </Footer>
    </Layout>
  );
};

export default AppLayout;
