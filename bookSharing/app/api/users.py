from . import api
from flask import request,jsonify
from app.models import User, Seekbook
from app.libs.MemberService import MemberService
from werkzeug.security import generate_password_hash
from app import db
from .auth import serializer

session = db.session


@api.route('/user/load',methods=['POST'])
def load():
    '''
    授权登录
    '''
    req = request.values  # 接收数据
    nickname = req['nickName'] if 'nickName' in req else ''  # 获取昵称
    avatar = req['avatarUrl'] if 'avatarUrl' in req else ''  # 获取头像
    # 判断code 是否存在
    code = req['code'] if 'code' in req else ''
    if not code or len(code) < 1:
        result = {
            "code": 201,
            "msg": "需要微信授权code",
            "data": {}
        }
        return jsonify(result)

    # 根据code,获取openid
    openid = MemberService.getWeChatOpenId(code)
    if openid is None:
        result = {
            "code": 202,
            "msg": "调用微信出错",
            "data": {}
        }
        return jsonify(result)

    # 如果用户存在，写入member表中
    user = User.query.filter_by(openid=openid).first()
    if not user:
        user = User(
            openid=openid,
            nickname=nickname,
            avatar=avatar,
        )
        db.session.add(user)
        db.session.commit()
    token = serializer.dumps({'user_id': user.id})  # 生成token
    # 返回结果
    result = {
        "code": 200,
        "msg": "登录成功",
        "data":
            {"userInfo":
                {
                    "nickName": user.nickname,
                    "avatarUrl": user.avatar,
                },
                "token": token.decode(),  # byte 转化为string
            }
    }
    return jsonify(result)

@api.route('/user/regist', methods=['POST'])
def regist():
    '''
    注册
    :return:
    '''
    req = request.values    # 接收数据

    # 检验参数是否完整
    if not req['username'] or not req['phone'] or not req['password'] or not req['password_again']:
        result = {
            "code": 1,
            "msg": "参数不足",
            "data": {}
        }
        return jsonify(result)

    # 检验两次密码是否一致
    if req['password'] != req['password_again']:
        result = {
            "code": 2,
            "msg": "两次密码不一致",
            "data": {}
        }
        return jsonify(result)

    # 检验手机号是否已经被注册
    phone = ""      # 查找数据库
    if phone:
        result = {
            "code": 3,
            "msg": "该手机号已被注册",
            "data": {}
        }
        return jsonify(result)
    else:
        # 更新数据库
        user1 = session.query(User).filter(User.openid == req['openid']).one()
        user1.username=req['username']
        user1.phone = req['phone']
        user1.password = generate_password_hash(req['password'])    # 对密码加密
        user1.wechatID = req['wechatID']
        user1.classroom = req['classroom']
        db.session.commit()

        result = {
            "code": 0,
            "msg": "注册成功",
            "data": {
                "user_id": user1.id,
                "username": user1.username,
                "phone": user1.phone,
                "avatarUrl": user1.avatar,
                "wechatID":user1.wechatID
            }
        }

        return jsonify(result)


@api.route('/user/login', methods=['POST'])
def login():
    '''
    账号密码登录
    :return:
    '''
    req = request.values    # 接收数据
    # 检验参数是否完整
    if not req['phone'] or not req['password'] :
        result = {
            "code": 1,
            "msg": "参数不足",
            "data": {}
        }
        return jsonify(result)

    user = User.query.filter_by(phone=req["phone"]).first()  # 获取用户信息
    if not user:
        result = {
            "code": 2,
            "msg": "手机号未注册",
            "data": {}
        }
        return jsonify(result)
    if not user.check_pwd(req['password']):
        result = {
            "code": 3,
            "msg": "密码错误",
            "data": {}
        }
        return jsonify(result)

    result = {
        "code": 0,
        "msg": "登录成功",
        "data": {}
    }

    return jsonify(result)






