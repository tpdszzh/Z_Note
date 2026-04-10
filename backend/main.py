# 导入必要的模块
from fastapi import FastAPI  # FastAPI 框架，用于构建 API
from sqlalchemy import create_engine, Column, Integer, String, Text  # SQLAlchemy ORM 相关
from sqlalchemy.ext.declarative import declarative_base  # 声明式基类
from sqlalchemy.orm import sessionmaker  # 会话工厂
import os  # 操作系统模块，用于环境变量

# 获取数据库 URL，如果没有则使用默认值
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://notebook_user:notebook_pass@db:5432/notebook")

# 创建数据库引擎
engine = create_engine(DATABASE_URL)
# 创建会话工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# 创建声明式基类
Base = declarative_base()

# 定义 Note 模型，对应数据库表
class Note(Base):
    __tablename__ = "notes"  # 表名
    id = Column(Integer, primary_key=True, index=True)  # 主键 ID
    title = Column(String, index=True)  # 标题
    content = Column(Text)  # 内容

# 创建所有表
Base.metadata.create_all(bind=engine)

# 创建 FastAPI 应用实例
app = FastAPI()

# 根路径路由
@app.get("/")
def read_root():
    return {"message": "Z_Note API"}

# 获取所有笔记的路由
@app.get("/notes")
def get_notes():
    db = SessionLocal()  # 创建数据库会话
    notes = db.query(Note).all()  # 查询所有笔记
    db.close()  # 关闭会话
    return notes

# 创建新笔记的路由
@app.post("/notes")
def create_note(title: str, content: str):
    db = SessionLocal()  # 创建数据库会话
    note = Note(title=title, content=content)  # 创建笔记实例
    db.add(note)  # 添加到会话
    db.commit()  # 提交事务
    db.refresh(note)  # 刷新实例
    db.close()  # 关闭会话
    return note