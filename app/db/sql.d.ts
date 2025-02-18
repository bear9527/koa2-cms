/************************数据库操作相关************************
 * 数据库操作相关 DDL
 *************************************************************/
declare const CREATE_DB: (dbName: string) => string;
declare const SHOW_ALL_DB = "SHOW DATABASES";
declare const DELETE_DB: (dbName: string) => string;
declare const SELECT_DATABASE = "SELECT DATABASE()";
declare const USE_DB: (dbName: string) => string;
/************************数据表操作相关************************
 * 数据表操作相关 DDL
 *************************************************************/
declare const SHOW_ALL_TABLE = "SHOW TABLES";
declare const CREATE_TABLE: (tableName: string) => string;
declare const DROP_TABLE: (tableName: string) => string;
declare var ADD_COLUM: (tableName: string, column_name: string, column_type: string) => string;
declare var DROP_COLUM: (tableName: string, column_name: string) => string;
/************************数据操作相关************************
 * 数据操作相关 DML
 *************************************************************/
declare var QUERY_DATAS: (tableName: string) => string;
declare var INSERT_DATAS: (tableName: string, values: string) => string;
declare var INSERT_DATA: (tableName: string, colums: string, values: string) => string;
declare var DELETE_DATA_BY_ID: (tableName: string, id: string) => string;
declare var UPDATE_DATA_BY_IDS: (tableName: string, colum: string, value: number, ids: []) => string;
declare var DELETE_DATAS: (tableName: string) => string;
declare var UPDATE_DATA: (tableName: string, id: string, colum: string, value: string) => string;
declare var UPDATE_DATAS: (tableName: string, colums: any, id: number) => string;
declare const INSERT_DATA_ROW: (tableName: string) => string;
/************************查询操作相关************************
 * 数据查询相关 DQL
 *************************************************************/
declare const GET_TABLE_INFO: (tableName: string, keys: string) => string;
declare const LOGIN: () => string;
declare const GET_REPEAT: (tableName: string, keys: any) => string;
declare const SAVE_USER: () => string;
declare const UPDATE_USER_INFO: (updateKey: string, whereKey: string) => string;
