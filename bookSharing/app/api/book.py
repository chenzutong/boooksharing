import os
import uuid
from datetime import datetime
from . import api
from flask import request, jsonify
from app.models import Book,Lendbook
from app import db
from .auth import serializer, token_auth

session = db.session


@api.route('/book/all_list', methods=['GET'])
def all_list():
    """
    全部书籍
    :return:
    """



    data = []

    books = Book.query.all()  # 查询书籍信息
    for item in books:
        temp = {
            "id": item.id,
            "bookname": item.bookname,
            "content": item.content,
            "type": item.type,
            "photo": item.photo,


        }
        data.append(temp)

    print(data)

    result = {
        "code": 0,
        "msg": "请求成功",
        "data": data
    }
    return jsonify(result)

@api.route('/book/person_list', methods=['POST'])
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
            "type": item.type,
            "photo": item.photo,
        }
        data.append(temp)

    print(data)

    result = {
        "code": 0,
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
    print("******\n", req)

    user_id = req['user_id'] if 'user_id' in req else ''  #
    bookname = req['bookname'] if 'bookname' in req else ''  #
    content = req['content'] if 'content' in req else ''  #
    type = req['type'] if 'type' in req else ''  #
    photo = req['photo'] if 'photo' in req else ''  #
    addcircle = req['addcircle'] if 'addcircle' in req else False  #
    classroom = req['classroom'] if 'classroom' in req else ''  #
    avatarUrl = req['avatarUrl'] if 'avatarUrl' in req else ''  #
    username = req['username'] if 'username' in req else False  #
    openid = req['openid'] if 'openid' in req else False  #

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
        photo=photo,
    )
    db.session.add(book)
    db.session.commit()

    token = serializer.dumps({'user_id': book.user_id})  # 生成token
    # 返回结果
    result = {
        "code": 0,
        "msg": "添加成功",
        "data":
            {
                "token": token.decode(),  # byte 转化为string
            }
    }

    # 添加出借动态
    if addcircle:
        lendbook = Lendbook(
            user_id=user_id,
            username=username,
            avatar=avatarUrl,
            bookname=bookname,
            classroom=classroom,
            content=content,
            photo=photo,
            type=type,
        )
        db.session.add(lendbook)
        db.session.commit()

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
