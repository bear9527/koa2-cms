接口网址：http://node.htmldiv.cn/

接口名：用户注册
api: /user/regUser
入参：
{
username: xxx,
password: xxxxxx,
email: xxx.xxx.com
}
响应：
{
username: xxx,
user_pic: 'xxx.jpg',
nickname: xxxx,
email: xxx
}

接口名：用户登录
api: /user/login
入参：
{
username: xxx,
password: xxxxxx
}
响应：
{
status: 0,
message: "登录成功",
data: 'Bearer ' + tokenStr
}

----个人中心----

接口名：修改密码
api: /my/resetPwd
入参：
{
oldPwd: password,
newPwd: password,
}
响应：
{
status: 0,
message: "密码修改成功！"
}

---

接口名：获取当前用户信息
api: /my/userInfo
入参：
无
响应：
{
......
}

-----文章分类-------
接口名：添加分类
api: /article/addCategory
入参：
{
name: xxx,
alias: xxx,
}
响应：
{}

接口名：修改分类
api: /article/editCategory
入参：
{
id: xxx,
name: xxx,
alias: xxx,
}
响应：
{}

---

接口名：删除分类
api: /article/deleteCategory
type: get
入参：
{
id: id //分类的 id
}
响应：
{}

---

接口名：文章动态菜单分类
api: /article/getAllRouterCategory
type: get
入参：
{}
响应：
{
"message": "成功",
"data": [
{
"id": 12,
"title": "新闻",
"description": "所有新闻分类的集合，父类",
"img": "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
"is_delete": 0
}
]
}

接口名：动态菜单分类下的子分类
api: /article/getAllCategory
type: get
入参：
{
id: 12
}
响应：
{
"message": "成功",
"data": [
{
"id": 4,
"name": "前端",
"alias": "QianDuan",
"is_delete": 0,
"cate_id": 12
},
{
"id": 5,
"name": "读者",
"alias": "dz",
"is_delete": 0,
"cate_id": 12
},
{
"id": 6,
"name": "dasdsads",
"alias": "sadsadsad",
"is_delete": 0,
"cate_id": 12
}
]
}

// -----文章部分-----

接口名：新增分类下文章
api: /article/addArticle
入参：
{
categoryId: 12, // 分类 id
title: '',
description: '',
content: '',
categoryId: '',
articlePic: '',

}
响应：
{
"status": 0,
"message": "创建成功"
}
