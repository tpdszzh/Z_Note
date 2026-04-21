import React, { useState } from 'react';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState('👤');
  const [userName, setUserName] = useState('用户名');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAvatarClick = () => {
    // 允许用户修改头像 Emoji 或图片
    const newAvatar = prompt('输入新的头像 Emoji (如: 😀)', userAvatar);
    if (newAvatar) {
      setUserAvatar(newAvatar);
    }
  };

  const handleNameClick = () => {
    // 允许用户修改用户名
    const newName = prompt('输入新的用户名', userName);
    if (newName) {
      setUserName(newName);
    }
  };

  return (
    <div className="App">
      <aside className={`sidebar ${menuOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-top">
          <div className="user-profile">
            <div className="avatar" onClick={handleAvatarClick} title="点击修改头像">
              {userAvatar}
            </div>
            <div className="user-info">
              <p className="user-name" onClick={handleNameClick} title="点击修改用户名">
                {userName}
              </p>
            </div>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        </div>

        <nav className="menu-content">
          <ul>
            <li><a href="#notes">📝 我的笔记</a></li>
            <li><a href="#tasks">✓ 任务列表</a></li>
            <li><a href="#tags">🏷️ 标签</a></li>
            <li><a href="#settings">⚙️ 设置</a></li>
          </ul>
        </nav>
      </aside>
      
      <header className="App-header">
        <h1>Z_Note</h1>
        <p>你的笔记应用</p>
      </header>
    </div>
  );
}

export default App;