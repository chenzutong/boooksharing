import os
import uuid
from datetime import datetime
from . import api
from flask import request, jsonify, current_app
from werkzeug.utils import secure_filename
from app.models import Seekbook, Lendbook, Book
from app import db
from .auth import serializer, token_auth


def gen_rnd_filename():
    return datetime.now().strftime("%Y%m%d%H%M%S") + str(uuid.uuid4().hex)


def change_filename(filename):
    """
    修改文件名称
    """
    fileinfo = os.path.splitext(filename)
    filename = gen_rnd_filename() + fileinfo[-1]
    return filename


@api.route('/circle/commit_seek', methods=['POST'])
def commit_seek():
    """
    发布寻书动态
    :return:
    """
    req = request.values  # 接收数据


    user_id = req['user_id'] if 'user_id' in req else ''  # 获取昵称
    username = req['username'] if 'username' in req else ''  # 获取昵称
    avatar = req['avatarUrl'] if 'avatarUrl' in req else ''  # 获取头像
    bookname = req['bookname'] if 'bookname' in req else ''  # 获取书名
    classroom = req['classroom'] if 'classroom' in req else ''  # 获取专业班级
    content = req['content'] if 'content' in req else ''  # 获取内容
    photo = req['photo'] if 'photo' in req else ''  # 获取图片

    # if not os.path.exists(current_app.config["UP_DIR"]):
    #     # 创建一个多级目录
    #     os.makedirs(current_app.config["UP_DIR"])  # 创建文件夹
    #     os.chmod(current_app.config["UP_DIR"], "rw")  # 设置权限

    if not user_id or not username or not avatar or not bookname:
        result = {
            "code": 201,
            "msg": "参数不足",
            "data": {
                "test": ", username:" + username + ", avatar:" + avatar + ", bookname:" + bookname
            }
        }
        return jsonify(result)

    seekbook = Seekbook(
        user_id=user_id,
        username=username,
        avatar=avatar,
        bookname=bookname,
        classroom=classroom,
        content=content,
        photo=photo,
    )
    db.session.add(seekbook)
    db.session.commit()
    token = serializer.dumps({'user_id': seekbook.user_id})  # 生成token
    # 返回结果
    result = {
        "code": 0,
        "msg": "发布成功",
        "data":
            {
                "token": token.decode(),  # byte 转化为string
            }
    }
    return jsonify(result)


@api.route('/circle/commit_lend', methods=['POST'])
def commit_lend():
    """
    发布可出借书动态
    :return:
    """
    req = request.values  # 接收数据
    print("******\n", req)
    user_id = req['user_id'] if 'user_id' in req else ''  # 获取昵称
    username = req['username'] if 'username' in req else ''  # 获取昵称
    avatar = req['avatarUrl'] if 'avatarUrl' in req else ''  # 获取头像
    bookname = req['bookname'] if 'bookname' in req else ''  # 获取书名
    classroom = req['classroom'] if 'classroom' in req else ''  # 获取专业班级
    content = req['content'] if 'content' in req else ''  # 获取内容
    type = req['type'] if 'type' in req else ''  # 获取类型
    photo = req['photo'] if 'photo' in req else ''  # 获取图片
    addbook = req['addbook'] if 'addbook' in req else False  # 获取是否要添加书籍表中

    # if not os.path.exists(current_app.config["UP_DIR"]):
    #     # 创建一个多级目录
    #     os.makedirs(current_app.config["UP_DIR"])  # 创建文件夹
    #     os.chmod(current_app.config["UP_DIR"], "rw")  # 设置权限

    if not user_id or not username or not avatar or not bookname or not type:
        result = {
            "code": 201,
            "msg": "参数不足",
            "data": {
                "test": "user_id:" + user_id + ", username:" + username + ", avatar:" + avatar + ", bookname:" + bookname + ", type:" + type
            }
        }
        return jsonify(result)

    lendbook = Lendbook(
        user_id=user_id,
        username=username,
        avatar=avatar,
        bookname=bookname,
        classroom=classroom,
        content=content,
        photo=photo,
        type=type,
    )
    db.session.add(lendbook)
    db.session.commit()

    # 添加入书籍表
    if addbook:
        book = Book(
            user_id=user_id,
            bookname=bookname,
            content=content,
            type=type,
            photo=photo,
        )
        db.session.add(book)
        db.session.commit()

    token = serializer.dumps({'user_id': lendbook.user_id})  # 生成token
    # 返回结果
    result = {
        "code": 0,
        "msg": "发布成功",
        "data":
            {
                "token": token.decode(),  # byte 转化为string
            }
    }
    return jsonify(result)


@api.route('/circle/circle_lend', methods=['GET'])
def circle_lend():
    data = []
    lendbook = Lendbook.query.filter_by().all()  # 查询书籍信息
    for item in lendbook:
        temp = {
            "username": item.username,
            "avatar": item.avatar,
            "bookname": item.bookname,
            "classroom": item.classroom,
            "photo": item.photo,
            "content": item.content,
            "sendtime": item.sendtime,
            "type": item.type,
            "user_id": item.user_id,

        }
        data.append(temp)
    result = {
        "code": 0,
        "msg": "请求成功",
        "data": data[::-1]
    }
    return jsonify(result)


@api.route('/circle/circle_seek', methods=['GET'])
def circle_seek():
    data = []
    seekbook = Seekbook.query.filter_by().all()  # 查询书籍信息
    for item in seekbook:
        temp = {
            "username": item.username,
            "avatar": item.avatar,
            "bookname": item.bookname,
            "classroom": item.classroom,
            "photo": item.photo,
            "content": item.content,
            "sendtime": item.sendtime,
            "user_id": item.user_id,

        }
        data.append(temp)
    result = {
        "code": 0,
        "msg": "请求成功",
        "data": data[::-1]
    }
    return  jsonify(result)


@api.route('/circle/mine', methods=['GET'])
def mine():
    pass
