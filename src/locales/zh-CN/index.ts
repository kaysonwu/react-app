/* eslint-disable no-template-curly-in-string */
import antd from 'antd/lib/locale-provider/zh_CN';

const typeTemplate = '${label} 必须是 ${type} 类型';
const validateMessages = {
  default: '${label} 不符合规则',
  required: '${label} 不能为空',
  enum: '${label} 没有在 [${enum}] 中',
  whitespace: '${label} 不能包含空格',
  date: {
    format: '${label} 不是一个有效的日期',
    parse: '${label} 不是一个有效的日期',
    invalid: '${label} 不是一个有效的日期',
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: '${label} 必须是 ${len} 个字符',
    min: '${label} 至少为 ${min} 个字符',
    max: '${label} 不能大于 ${max} 个字符',
    range: '${label} 必须介于 ${min} - ${max} 个字符之间',
  },
  number: {
    len: '${label} 大小必须为 ${len}',
    min: '${label} 必须大于等于 ${min}',
    max: '${label} 不能大于 ${max}',
    range: '${label} 必须介于 ${min} - ${max} 之间',
  },
  array: {
    len: '${label} 必须为 ${len} 个单元',
    min: '${label} 至少有 ${min} 个单元',
    max: '${label} 最多只有 ${max} 个单元',
    range: '${label} 须只有 ${min} - ${max} 个单元',
  },
  pattern: {
    mismatch: '${label} 的格式错误',
  },
};

const zhCN: Locale = {
  antd,
  validateMessages,
  'Submit': '提交',
  'Cancel': '取消',
  'Submit And Continue': '提交并继续',
  'New': '新建',
  'Import': '导入',
  'Export': '导出',
  'Reset': '重置',
  'Edit': '编辑',
  'Delete': '删除',
  'Action': '操作',
  'Setting Column': '自定义列',
  'Column Display': '列展示',
  'Pin Left': '向左固定',
  'Unpin': '取消固定',
  'Pin Right': '向右固定',
  'Left Fixed': '固定在左侧',
  'Unfixed': '不固定',
  'Right Fixed': '固定在右侧',

  'Download': '下载',
  'Home': '首页',
  'User': '用户',
  'User Level': '用户等级',
  'User Manage': '用户管理',

  // Toolbar
  'Tools': '工具箱',
};

export default zhCN;
