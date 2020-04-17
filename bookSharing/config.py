# -*- coding=utf-8 -*-
import os
class Config:
    SECRET_KEY = 'chaozhou'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    UP_DIR = os.path.join(os.path.abspath(os.path.dirname(__file__)), "app/static/uploads/")  # 文件上传路径
    # 小程序配置信息
    AppID = 'wxdd9fc2ca011a71fa'
    AppSecret = 'ad4773e4547c4625f5c640067c61c002'

    @staticmethod
    def init_app(app):
        pass

# the config for development
class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:123456@127.0.0.1:3306/booksharing'
    DEBUG = True

# define the config
config = {
    'default': DevelopmentConfig
}
