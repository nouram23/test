import React, { ReactNode, useState } from "react";
import {  MailOutlined} from '@ant-design/icons';

import { Breadcrumb,  Layout, Menu, theme } from "antd";
import type { MenuProps } from 'antd';
import Logo from "../logo";
import Link from "next/link";

type MenuItem = Required<MenuProps>['items'][number];

const { Header, Content, Footer, Sider } = Layout;

// console.log("this is items type" + typeof items);
export default function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();



  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
  const items: MenuProps['items'] = [
    getItem(<Link href={'/reg'}>Бүртгэх</Link>, 'reg', <MailOutlined />, null),
    getItem(<Link href={'/shipment'}>Ачилт</Link>, 'as', <MailOutlined />, null),
    getItem(<Link href={'/arrival'}>Хүлээн авсан</Link>, 'rec', <MailOutlined />, null),
  ];
  
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Logo collapsed={collapsed} />


        <Menu
          theme="dark"
          mode="inline"
          items={items}
          // onClick={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex justify-end items-center "
        >
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          AdminPanel
        </Footer>
      </Layout>
    </Layout>
  );
}
