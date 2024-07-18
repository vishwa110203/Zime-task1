import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const Header = () => {
  return (
    <div style={{ backgroundColor: '#f0f2f5', padding: '20px', textAlign: 'center', marginBottom: '20px' }}>
      <Title level={2} style={{ margin: 0 }}>List of Posts</Title>
    </div>
  );
};

export default Header;
