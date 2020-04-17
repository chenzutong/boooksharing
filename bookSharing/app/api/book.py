import os
import uuid
from datetime import datetime
from . import api
from flask import request, jsonify
from app.models import Book
from app import db
from .auth import serializer, token_auth

session = db.session


@api.route('/book/select_list', methods=['POST'])
def select_list():
    """
    添加书籍
    :return:
    """
    req = request.values  # 接收数据

    user_id = req["user_id"] if "user_id" in req else ""  # 获取用户id

    if not user_id:
        result = {
            "code": 1,
            "msg": "未收到用户id",
            "data": {}
        }
        return jsonify(result)

    data = []

    books = Book.query.filter_by(user_id=user_id).all()  # 查询书籍信息
    for item in books:
        temp = {
            "id": item.id,
            "bookname": item.bookname,
            "content": item.content,
            "type": item.type
        }
        data.append(temp)

    print(data)

    result = {
        "code": 200,
        "msg": "请求成功",
        "data": data
    }
    return jsonify(result)


@api.route('/book/add', methods=['POST'])
def add():
    """
    添加书籍
    :return:
    """
    req = request.values  # 接收数据

    user_id = req['user_id'] if 'user_id' in req else ''  # 获取昵称
    bookname = req['bookname'] if 'bookname' in req else ''  # 获取书名
    content = req['content'] if 'content' in req else ''  # 获取内容描述
    type = req['type'] if 'type' in req else ''  # 获取类型

    if not user_id or not bookname or not content or not type:
        result = {
            "code": 201,
            "msg": "参数不足",
            "data": {
                "test": "user_id:" + user_id + ", username:" + ", bookname:" + bookname + ", type:" + type
            }
        }
        return jsonify(result)

    book = Book(
        user_id=user_id,
        bookname=bookname,
        content=content,
        type=type,
    )
    db.session.add(book)
    db.session.commit()

    token = serializer.dumps({'user_id': book.user_id})  # 生成token
    # 返回结果
    result = {
        "code": 200,
        "msg": "添加成功",
        "data":
            {
                "token": token.decode(),  # byte 转化为string
            }
    }
    return jsonify(result)


@api.route('/book/delete', methods=['POST'])
def delete():
    """
    删除书籍
    :return:
    """
    req = request.values  # 接收数据

    id = req["id"] if "id" in req else ""

    if not id:
        result = {
            "code": 1,
            "msg": "未传入参数",
            "data":
                {}
        }
        return jsonify(result)

    session.query(Book).filter(Book.id == id).delete()
    session.commit()
    result = {
        "code": 0,
        "msg": "删除成功",
        "data": {}
    }
    return jsonify(result)


@api.route('/book/update', methods=['POST'])
def update():
    """
    更新书籍
    :return:
    """
    req = request.values  # 接收数据

    id = req["id"] if "id" in req else ""
    bookname = req['bookname'] if 'bookname' in req else ''  # 获取书名
    content = req['content'] if 'content' in req else ''  # 获取内容描述
    type = req['type'] if 'type' in req else ''  # 获取类型

    if not id or not bookname or not content or not type:
        result = {
            "code": 201,
            "msg": "参数不足",
            "data": {
                "test": "user_id:" + id + ", username:" + ", bookname:" + bookname + ", type:" + type
            }
        }
        return jsonify(result)

    book1 = session.query(Book).filter(Book.id == req['id']).one()
    book1.bookname = bookname
    book1.content = content
    book1.type = type
    session.commit()

    result = {
        "code": 0,
        "msg": "更新成功",
        "data": {}
    }
    return jsonify(result)
