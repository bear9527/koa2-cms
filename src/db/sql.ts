/************************数据库操作相关************************
 * 数据库操作相关 DDL
 *************************************************************/
//(1) 创建数据库
const CREATE_DB = (dbName: string) => `CREATE DATABASE IF NOT EXISTS ${dbName};`;
//(2) 查询所有数据库
const SHOW_ALL_DB = `SHOW DATABASES`;
//(3) 删除数据库
const DELETE_DB = (dbName: string) => `DROP DATABASE IF EXISTS ${dbName};`;
//(4) 查询正在使用的数据库
const SELECT_DATABASE = `SELECT DATABASE()`;
//(5) 使用数据库
const USE_DB = (dbName: string) => `USE ${dbName};`;

/************************数据表操作相关************************
 * 数据表操作相关 DDL
 *************************************************************/
//(1) 查询所有数据表
const SHOW_ALL_TABLE = `SHOW TABLES`;
//(2) 添加数据表
const CREATE_TABLE = (tableName: string) =>
  `CREATE TABLE IF NOT EXISTS ${tableName} (id int NOT NULL primary key AUTO_INCREMENT comment 'primary key',created_time TIMESTAMP COMMENT 'created time',updated_time TIMESTAMP COMMENT 'updated time')`;
//(3) 删除表
const DROP_TABLE = (tableName: string) => `DROP TABLE IF EXISTS ${tableName};`;
//(4) 添加字段
var ADD_COLUM = (tableName: string, column_name: string, column_type: string) =>
  `ALTER TABLE ${tableName} ADD ${column_name} ${column_type};`;
//(5) 删除字段
var DROP_COLUM = (tableName: string, column_name: string) =>
  `ALTER TABLE ${tableName} DROP ${column_name};`;
/************************数据操作相关************************
 * 数据操作相关 DML
 *************************************************************/
//(1) 查询表中所有数据
var QUERY_DATAS = (tableName: string) => `SELECT * FROM ${tableName}`;
//(2) 插入数据(全部列)
var INSERT_DATAS = (tableName: string, values: string) =>
  `INSERT INTO ${tableName} VALUES (${values});`;
//(3) 插入数据(部分列)
var INSERT_DATA = (tableName: string, colums: string, values: string) =>
  `INSERT INTO ${tableName}(${colums}) VALUES (${values});`;
//(4) 删除数据(根据id)
var DELETE_DATA_BY_ID = (tableName: string, id: string) =>
  `DELETE FROM ${tableName} WHERE id = ${id};`;
//(5) 删除所有数据
var DELETE_DATAS = (tableName: string) => `DELETE FROM ${tableName};`;
//(6) 更新数据条目
var UPDATE_DATA = (tableName: string, id: string, colum: string, value: string) =>
  `UPDATE ${tableName} SET ${colum} = ${value} WHERE id = ${id};`;
//(7) 新增表里的行
const INSERT_DATA_ROW = (tableName: string) => `INSERT INTO ${tableName} SET ?`;
/************************查询操作相关************************
 * 数据查询相关 DQL
 *************************************************************/
//(1) 获取用户信息
// const GET_USER_INFO = `SELECT * FROM users WHERE username=?`
const GET_TABLE_INFO = (tableName: string, keys: string) => `SELECT * FROM ${tableName} WHERE ${ Array.isArray(keys) ? keys.join('=? and ') : keys }=?`;

//(2) 登录
const LOGIN = () => `SELECT * FROM users WHERE username=?`;

//(3) 查询是否已有重复的
const GET_REPEAT = (tableName: string, keys: any) => `SELECT * FROM ${tableName} WHERE ${ Array.isArray(keys) ? keys.join('=? or ') : keys }=?`;
//(4) 注册-保存用户
const SAVE_USER = () => `INSERT INTO users SET ?`;
//(5) 修改密码
const UPDATE_USER_INFO = (updateKey: string, whereKey: string) => `UPDATE users set ${updateKey}=? WHERE ${whereKey}=?`;

/************************约束/外键/字符集相关************************
 * 约束/外键/字符集相关
 *************************************************************/
//(1)
/************************视图/索引相关************************
 *  视图/索引相关
 *************************************************************/
//(1)
/************************事务相关************************
 *  事务相关
 *************************************************************/
//(1)

module.exports = {
  //数据库操作相关 DDL
  CREATE_DB,
  SHOW_ALL_DB,
  DELETE_DB,
  SELECT_DATABASE,
  USE_DB,
  //数据表操作相关 DDL
  SHOW_ALL_TABLE,
  CREATE_TABLE,
  DROP_TABLE,
  ADD_COLUM,
  DROP_COLUM,
  //数据操作相关 DML
  QUERY_DATAS,
  INSERT_DATAS,
  INSERT_DATA,
  DELETE_DATA_BY_ID,
  DELETE_DATAS,
  UPDATE_DATA,
  INSERT_DATA_ROW,
  //查询相关
  GET_TABLE_INFO,
  LOGIN,
  GET_REPEAT,
  SAVE_USER,
  UPDATE_USER_INFO
};
// export {}