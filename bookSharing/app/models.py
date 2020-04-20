from datetime import datetime
from . import db


# 用户
class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)                         # 编号
    openid = db.Column(db.String(50),)                                   # 微信用户id
    nickname = db.Column(db.String(100))                                 # 微信昵称
    username = db.Column(db.String(100))                                 # 用户名
    phone = db.Column(db.String(11), unique=True)                        # 手机号
    wechatID = db.Column(db.String(100))                                 # 微信号
    classroom = db.Column(db.String(100))                                # 年级专业
    password = db.Column(db.String(100))                                 # 密码
    avatar = db.Column(db.String(200))                                   # 微信头像
    addtime = db.Column(db.DateTime, index=True, default=datetime.now)   # 注册时间

    seekbook = db.relationship('Seekbook', backref='user')  # 寻书外键关系关联

    def __repr__(self):
        return '<User %r>' % self.nickname

    def check_pwd(self, pwd):
        """
        检测密码是否正确
        :param pwd: 密码
        :return: 返回布尔值
        """
        from werkzeug.security import check_password_hash
        return check_password_hash(self.password, pwd)


# 寻书动态表
class Seekbook(db.Model):
    __tablename__ = "seekbook"
    id = db.Column(db.Integer, primary_key=True)                         # 编号
    username = db.Column(db.String(100))                                 # 用户名
    avatar = db.Column(db.String(200))                                   # 微信头像
    bookname = db.Column(db.String(100))    # 书名
    classroom = db.Column(db.String(100))                                # 年级专业
    photo = db.Column(db.String(200))                                    # 图片
    content = db.Column(db.Text)                                         # 内容
    sendtime = db.Column(db.DateTime, index=True, default=datetime.now)  # 注册时间

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))            # 所属用户

    def __repr__(self):
        return '<Seekbook %r>' % self.username


# 出借动态表
class Lendbook(db.Model):
    __tablename__ = "lendbook"
    id = db.Column(db.Integer, primary_key=True)  # 编号
    username = db.Column(db.String(100))  # 用户名
    bookname = db.Column(db.String(100))    # 书名
    avatar = db.Column(db.String(200))                                   # 微信头像
    classroom = db.Column(db.String(100))  # 年级专业
    photo = db.Column(db.String(200))  # 图片
    content = db.Column(db.Text)  # 内容
    type = db.Column(db.String(200))  # 类型
    sendtime = db.Column(db.DateTime, index=True, default=datetime.now)  # 注册时间

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # 所属用户

    def __repr__(self):
        return '<Lendbook %r>' % self.username


# 书籍
class Book(db.Model):
    __tablename__ = "book"
    id = db.Column(db.Integer, primary_key=True)  # 编号
    bookname = db.Column(db.String(100))    # 书名
    content = db.Column(db.Text)  # 内容
    type = db.Column(db.String(200))  # 类型
    addtime = db.Column(db.DateTime, index=True, default=datetime.now)   # 添加时间

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # 所属用户

    def __repr__(self):
        return '<Book %r>' % self.bookname
