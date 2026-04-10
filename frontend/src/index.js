// 导入 React 库
import React from 'react';
// 导入 ReactDOM 客户端，用于渲染
import ReactDOM from 'react-dom/client';
// 导入 CSS 样式
import './index.css';
// 导入 App 组件
import App from './App';

// 获取根元素
const root = ReactDOM.createRoot(document.getElementById('root'));
// 渲染应用，启用严格模式
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);