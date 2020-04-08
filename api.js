import axios from './http'
// 生成时间:Thu Nov 15 2018 12:57:44 GMT+0800 (GMT+08:00)
const api = {
  // 角色管理
  roleController: {
    // 新增角色
    appRoleAdd: data => axios.post('/sss/b/p/v1/app/role/add', data),
    // 删除角色
    appRoleDelete: param => axios.delete('/sss/b/p/v1/app/role/delete', {params: param}),
    // 禁用角色
    appRoleDisable: data => axios.put('/sss/b/p/v1/app/role/disable', data),
    // 启用角色
    appRoleEnable: data => axios.put('/sss/b/p/v1/app/role/enable', data),
    // 查找角色列表
    appRoleFind: params => axios.get('/sss/b/p/v1/app/role/find', {params: params}),
    // 分页查找角色列表
    appRoleFindPage: params => axios.get('/sss/b/p/v1/app/role/find/page', {params: params}),
    // 为角色增加菜单功能关联
    appRoleMenuFeatureAdd: data => axios.post('/sss/b/p/v1/app/role/menu/feature/add', data),
    // 为角色删除菜单功能关联
    appRoleMenuFeatureDelete: param => axios.delete('/sss/b/p/v1/app/role/menu/feature/delete', {params: param}),
    // 获取角色菜单功能关联
    appRoleMenuFeatureList: params => axios.get('/sss/b/p/v1/app/role/menu/feature/list', {params: params}),
    // 为角色设置菜单功能关联
    appRoleMenuFeatureSet: data => axios.post('/sss/b/p/v1/app/role/menu/feature/set', data),
    // 修改角色
    appRoleUpdate: data => axios.put('/sss/b/p/v1/app/role/update', data),
  },
  // 扩展-账户管理
  accountControllerEx: {
    // 修改密码-获取(或设置)短信验证码(不发送短信)
    accountPasswordGetOrSetModifySmsCode: params => axios.get('/sss/b/p/v1/account/password/get/or/set/modify/sms/code', {params: params}),
  },
  // 共同组件-技术组件-操作记录&修订记录相关接口
  recordController: {
    // 全部操作记录接口
    compOptRecordAllList: params => axios.get('/sss/v1/comp/opt-record/all-list', {params: params}),
    // 操作记录查询接口
    compOptRecordListDataKey: (dataKey) => axios.get('/sss/v1/comp/opt-record/list/' + dataKey),
    // 操作记录查询接口(比较两个operateKey[操作Key])
    compOptRecord2ListDataKey: (dataKey) => axios.get('/sss/v1/comp/opt-record2/list/' + dataKey),
    // 修订记录查询接口
    compRevsRecord: params => axios.get('/sss/v1/comp/revs-record', {params: params}),
  },
  // 命令管理
  cmdController: {
    // 获取全部应用启动信息
    cmdAppInfoAll: params => axios.get('/sss/b/v1/cmd/app/info/all', {params: params}),
    // 获取应用启动信息
    cmdAppInfos: params => axios.get('/sss/b/v1/cmd/app/infos', {params: params}),
    // 设置应用启动时间
    cmdAppReset: data => axios.post('/sss/b/v1/cmd/app/reset', data),
    // 启动应用
    cmdAppStart: data => axios.put('/sss/b/v1/cmd/app/start', data),
    // 停止应用
    cmdAppStop: data => axios.put('/sss/b/v1/cmd/app/stop', data),
  },
  // 站内消息模版管理接口
  messageTemplateController: {
    // 列表页面-添加数据
    msgTpAdd: data => axios.post('/sss/b/p/v1/msg-tp/add', data),
    // 列表页面-删除数据
    msgTpDeleteId: param => axios.delete('/sss/b/p/v1/msg-tp/delete/{id}', {params: param}),
    // 列表页面-禁用
    msgTpDisableId: param => axios.put('/sss/b/p/v1/msg-tp/disable/{id}', '', {params: param}),
    // 列表页面-启用
    msgTpEnableId: param => axios.put('/sss/b/p/v1/msg-tp/enable/{id}', '', {params: param}),
    // 列表页面-获取参数设置的列表数据
    msgTpGetId: (id) => axios.get('/sss/b/p/v1/msg-tp/get/' + id),
    // 列表页面-依据条件查询列表数据
    msgTpList: data => axios.post('/sss/b/p/v1/msg-tp/list', data),
    // 列表页面-修改数据
    msgTpUpdate: data => axios.put('/sss/b/p/v1/msg-tp/update', data),
  },
  // 扩展-多表查询
  multiSelectControllerEx: {
    // 查询员工和菜单功能的所有关联
    appSelectEmployeeAllMenuFeatureRelation: data => axios.post('/sss/b/p/v1/app/select/employee/all/menu/feature/relation', data),
    // 查询员工关联菜单,含间接关联的菜单
    appSelectEmployeeAllmenuStrfeatureRelation: data => axios.post('/sss/b/p/v1/app/select/employee/allmenu/strfeature/relation', data),
    // 查询员工和菜单功能的直接关联
    appSelectEmployeeMenuFeatureRelation: data => axios.post('/sss/b/p/v1/app/select/employee/menu/feature/relation', data),
    // 查询员工的上级员工
    appSelectEmployeeUpEmployee: data => axios.post('/sss/b/p/v1/app/select/employee/up/employee', data),
    // 查询菜单直接关联人（不含间接关联的人）和角色
    appSelectMenuEmployeeRoleRelation: data => axios.post('/sss/b/p/v1/app/select/menu/employee/role/relation', data),
    // 查询角色和菜单关联
    appSelectRoleMenuRelation: data => axios.post('/sss/b/p/v1/app/select/role/menu/relation', data),
  },
  // 微信交互接口
  wechatController: {
    // 微信消息跳转接口
    wechatSuccess: params => axios.get('/sss/b/p/v1/wechat/success', {params: params}),
    // 微信消息测试接
    wechatTest: params => axios.get('/sss/b/p/v1/wechat/test', {params: params}),
    // 微信发送的Token验证接口
    wechatTokenCheck: params => axios.get('/sss/b/p/v1/wechat/token-check', {params: params}),
  },
  // 应用系统
  appController: {
    // 获取应用的功能列表
    appApiListGet: params => axios.get('/sss/b/p/v1/app/api/list/get', {params: params}),
    // 强制更新应用的功能列表
    appApiListRefresh: param => axios.put('/sss/b/p/v1/app/api/list/refresh', '', {params: param}),
    // 增加应用
    appInfoAdd: data => axios.post('/sss/b/p/v1/app/info/add', data),
    // 删除应用
    appInfoDelete: param => axios.delete('/sss/b/p/v1/app/info/delete', {params: param}),
    // 获取应用详情
    appInfoDetail: params => axios.get('/sss/b/p/v1/app/info/detail', {params: params}),
    // 获取全部应用列表
    appInfoList: params => axios.get('/sss/b/p/v1/app/info/list', {params: params}),
    // 修改应用（不支持修改APPKEY）
    appInfoUpdate: data => axios.put('/sss/b/p/v1/app/info/update', data),
  },
  // Api管理
  apiController: {
    // 强制更新Api列表
    appApiFlush: param => axios.post('/sss/b/p/v1/app/api/flush', '', {params: param}),
    // 获取Api列表
    appApiList: params => axios.get('/sss/b/p/v1/app/api/list', {params: params}),
  },
  // 组织机构系统
  orgController: {
    // 新增组织机构
    orgAdd: data => axios.post('/sss/b/p/v1/org/add', data),
    // 全部组织机构列表
    orgAllList: params => axios.get('/sss/b/p/v1/org/all/list', {params: params}),
    // 删除组织机构
    orgDelete: param => axios.delete('/sss/b/p/v1/org/delete', {params: param}),
    // 添加组织机构员工
    orgEmployeeAddList: data => axios.put('/sss/b/p/v1/org/employee/add/list', data),
    // 组织机构员工列表
    orgEmployeeList: params => axios.get('/sss/b/p/v1/org/employee/list', {params: params}),
    // 移除组织机构员工
    orgEmployeeRemove: param => axios.put('/sss/b/p/v1/org/employee/remove', '', {params: param}),
    // 设置员工的组织结构
    orgForEmployeeSetList: data => axios.put('/sss/b/p/v1/org/for/employee/set/list', data),
    // 获取组织机构
    orgGet: params => axios.get('/sss/b/p/v1/org/get', {params: params}),
    // 组织机构列表
    orgList: params => axios.get('/sss/b/p/v1/org/list', {params: params}),
    // 员工的组织机构列表
    orgListByEmployee: params => axios.get('/sss/b/p/v1/org/list/by/employee', {params: params}),
    // 组织机构列表-分页
    orgPage: params => axios.get('/sss/b/p/v1/org/page', {params: params}),
    // 设置组织机构员工
    orgToEmployeeSetList: data => axios.put('/sss/b/p/v1/org/to/employee/set/list', data),
    // 修改组织机构
    orgUpdate: data => axios.post('/sss/b/p/v1/org/update', data),
  },
  // 扩展-组织机构系统
  orgControllerEx: {
    // 查询组织机构列表-分页
    orgFindPage: params => axios.get('/sss/b/p/v1/org/find/page', {params: params}),
  },
  // 我的站内消息管理接口
  myInnerMessageController: {
    // 列表页面-返回消息类型
    imsgListMsgType: params => axios.get('/sss/b/v1/imsg/list/msg-type', {params: params}),
    // 列表页面-获取我的站内消息
    imsgMyList: params => axios.get('/sss/b/v1/imsg/my-list', {params: params}),
    // 列表页面-设置全部消息状态（已读）
    imsgReadDoneAllUserId: param => axios.put('/sss/b/v1/imsg/read-done/all/{userId}', '', {params: param}),
    // 列表页面-设置消息状态（已读）
    imsgReadDoneMsgId: param => axios.put('/sss/b/v1/imsg/read-done/{msgId}', '', {params: param}),
    // 列表页面-获取当前用户未读消息数量
    imsgUnreadCnt: params => axios.get('/sss/b/v1/imsg/unread/cnt', {params: params}),
    // 列表页面-获取当前用户未读消息数量
    imsgUnreadCntUserId: (userId) => axios.get('/sss/b/v1/imsg/unread/cnt/' + userId),
  },
  // 扩展-角色管理
  roleControllerEx: {
    // 按条件查询角色-菜单关系表
    appRoleMenuPageFind: data => axios.post('/sss/b/p/v1/app/role/menu/page/find', data),
    // 按条件查询角色
    appRolePageFind: data => axios.post('/sss/b/p/v1/app/role/page/find', data),
  },
  // 开放接口
  openApiController: {
    // 统计应用的接口权限
    appOpenCheckApiIf: param => axios.post('/sss/b/v1/app/open/check/api/if', '', {params: param}),
    // 更新应用的Api列表
    appOpenCheckAppApiListIf: param => axios.post('/sss/b/v1/app/open/check/app/api/list/if', '', {params: param}),
    // 校验用户是否可以访问app
    appOpenCheckAppPermission: param => axios.post('/sss/b/v1/app/open/check/app/permission', '', {params: param}),
  },
  // 通用固定参数信息设置接口
  paramFinalSettingController: {
    // 参数设置-列表页面-网易邮件参数设置列表
    paramStFinal163Mail: params => axios.get('/sss/b/p/v1/param/st-final/163-mail', {params: params}),
    // 参数设置-列表页面-阿里邮件参数设置列表
    paramStFinalAliMail: params => axios.get('/sss/b/p/v1/param/st-final/ali-mail', {params: params}),
    // 参数设置-列表页面-阿里短信参数设置列表
    paramStFinalAliSms: params => axios.get('/sss/b/p/v1/param/st-final/ali-sms', {params: params}),
    // 参数设置-列表页面-亿美软通短信参数设置列表
    paramStFinalEmaySms: params => axios.get('/sss/b/p/v1/param/st-final/emay-sms', {params: params}),
    // 参数设置-列表页面-腾讯邮件参数设置列表
    paramStFinalTctMail: params => axios.get('/sss/b/p/v1/param/st-final/tct-mail', {params: params}),
  },
  // 扩展-员工系统
  employeeControllerEx: {
    // 移除员工关联的菜单的所有功能列表
    employeeMenuAllFeatureRemove: param => axios.delete('/sss/b/p/v1/employee/menu/all/feature/remove', {params: param}),
    // 增加员工关联的菜单功能列表
    employeeMenuFeatureAdd: data => axios.post('/sss/b/p/v1/employee/menu/feature/add', data),
    // 获取员工关联的菜单功能列表
    employeeMenuFeatureList: params => axios.get('/sss/b/p/v1/employee/menu/feature/list', {params: params}),
    // 移除员工关联的菜单功能列表
    employeeMenuFeatureRemove: param => axios.delete('/sss/b/p/v1/employee/menu/feature/remove', {params: param}),
    // 设置员工关联的菜单功能列表
    employeeMenuFeatureSet: data => axios.post('/sss/b/p/v1/employee/menu/feature/set', data),
    // 添加员工关联角色菜单功能关系
    employeeRoleMenuFeatureAdd: data => axios.post('/sss/b/p/v1/employee/role/menu/feature/add', data),
    // 删除员工关联角色菜单功能关系
    employeeRoleMenuFeatureDelete: param => axios.delete('/sss/b/p/v1/employee/role/menu/feature/delete', {params: param}),
    // 获取员工关联角色菜单功能关系
    employeeRoleMenuFeatureList: params => axios.get('/sss/b/p/v1/employee/role/menu/feature/list', {params: params}),
    // 设置员工关联角色菜单功能关系
    employeeRoleMenuFeatureSet: data => axios.post('/sss/b/p/v1/employee/role/menu/feature/set', data),
    // 同时删除员工和用户
    employeeUserDelete: param => axios.delete('/sss/b/p/v1/employee/user/delete', {params: param}),
    // 同时禁用员工和用户
    employeeUserDisable: param => axios.put('/sss/b/p/v1/employee/user/disable', '', {params: param}),
    // 同时启用员工和用户
    employeeUserEnable: param => axios.put('/sss/b/p/v1/employee/user/enable', '', {params: param}),
  },
  // 参数接受测试Controller
  testController: {
    // 参数接受测试接口
    compTest: params => axios.get('/sss/v1/comp/test', {params: params}),
  },
  // 邮件模版管理接口
  mailTemplateController: {
    // 列表页面-添加数据
    msgMailTpAdd: data => axios.post('/sss/b/p/v1/msg-mail-tp/add', data),
    // 列表页面-删除数据
    msgMailTpDeleteId: param => axios.delete('/sss/b/p/v1/msg-mail-tp/delete/{id}', {params: param}),
    // 列表页面-禁用
    msgMailTpDisableId: param => axios.put('/sss/b/p/v1/msg-mail-tp/disable/{id}', '', {params: param}),
    // 列表页面-启用
    msgMailTpEnableId: param => axios.put('/sss/b/p/v1/msg-mail-tp/enable/{id}', '', {params: param}),
    // 列表页面-获取参数设置的列表数据
    msgMailTpGetId: (id) => axios.get('/sss/b/p/v1/msg-mail-tp/get/' + id),
    // 列表页面-依据条件查询列表数据
    msgMailTpList: data => axios.post('/sss/b/p/v1/msg-mail-tp/list', data),
    // 列表页面-修改数据
    msgMailTpUpdate: data => axios.put('/sss/b/p/v1/msg-mail-tp/update', data),
  },
  // 站内消息类别管理接口
  messageTypeController: {
    // 列表页面-添加数据
    msgTypeAdd: data => axios.post('/sss/b/p/v1/msg-type/add', data),
    // 列表页面-删除数据
    msgTypeDeleteId: param => axios.delete('/sss/b/p/v1/msg-type/delete/{id}', {params: param}),
    // 列表页面-禁用
    msgTypeDisableId: param => axios.put('/sss/b/p/v1/msg-type/disable/{id}', '', {params: param}),
    // 列表页面-启用
    msgTypeEnableId: param => axios.put('/sss/b/p/v1/msg-type/enable/{id}', '', {params: param}),
    // 列表页面-获取参数设置的列表数据
    msgTypeGetId: (id) => axios.get('/sss/b/p/v1/msg-type/get/' + id),
    // 列表页面-依据条件查询列表数据
    msgTypeList: data => axios.post('/sss/b/p/v1/msg-type/list', data),
    // 列表页面-获取所有消息类别
    msgTypeListAll: params => axios.get('/sss/b/p/v1/msg-type/list-all', {params: params}),
    // 列表页面-修改数据
    msgTypeUpdate: data => axios.put('/sss/b/p/v1/msg-type/update', data),
  },
  // 菜单系统
  menuController: {
    // 增加菜单
    appMenuAdd: data => axios.post('/sss/b/p/v1/app/menu/add', data),
    // 全部菜单列表
    appMenuAllFeatureList: params => axios.get('/sss/b/p/v1/app/menu/all/feature/list', {params: params}),
    // 全部菜单列表
    appMenuAllList: params => axios.get('/sss/b/p/v1/app/menu/all/list', {params: params}),
    // 子菜单列表
    appMenuChildList: params => axios.get('/sss/b/p/v1/app/menu/child/list', {params: params}),
    // 删除菜单
    appMenuDelete: param => axios.delete('/sss/b/p/v1/app/menu/delete', {params: param}),
    // 从菜单直接删除功能
    appMenuFeatureDelete: param => axios.post('/sss/b/p/v1/app/menu/feature/delete', '', {params: param}),
    // 获取菜单功能关联
    appMenuFeatureList: params => axios.get('/sss/b/p/v1/app/menu/feature/list', {params: params}),
    // 从菜单直接添加功能
    appMenuFeatureSet: data => axios.post('/sss/b/p/v1/app/menu/feature/set', data),
    // 从菜单直接修改功能
    appMenuFeatureUpdate: data => axios.post('/sss/b/p/v1/app/menu/feature/update', data),
    // 查看菜单详情
    appMenuGet: params => axios.get('/sss/b/p/v1/app/menu/get', {params: params}),
    // 获取父级菜单的子菜单中最大排序的菜单
    appMenuMaxSort: params => axios.get('/sss/b/p/v1/app/menu/max/sort', {params: params}),
    // 修改菜单
    appMenuUpdate: data => axios.put('/sss/b/p/v1/app/menu/update', data),
    // 批量修改菜单排序
    appMenuUpdateOrder: data => axios.put('/sss/b/p/v1/app/menu/update/order', data),
  },
  // 参数信息设置接口
  paramSettingController: {
    // 参数设置-列表页面-获取参数设置的列表数据
    paramStList: params => axios.get('/sss/b/p/v1/param/st/list', {params: params}),
    // 参数设置-列表页面-获取参数设置的一条数据
    paramStListOne: params => axios.get('/sss/b/p/v1/param/st/list-one', {params: params}),
    // 参数设置-列表页面-获取参数设置的列表数据
    paramStListSub: params => axios.get('/sss/b/p/v1/param/st/list-sub', {params: params}),
    // 参数设置-列表页面-参数值设置
    paramStUpdate: data => axios.put('/sss/b/p/v1/param/st/update', data),
  },
  // 功能管理
  featureController: {
    // 获取功能Api关联
    appFeatureApiList: params => axios.get('/sss/b/p/v1/app/feature/api/list', {params: params}),
    // 设置功能Api关联
    appFeatureApiSet: data => axios.post('/sss/b/p/v1/app/feature/api/set', data),
  },
  // 工具类接口
  utilsController: {
    // 读取应用配置信息
    utilsAppConfigureDataGet: params => axios.get('/sss/b/p/v1/utils/app/configure/data/get', {params: params}),
    // 写入应用配置信息
    utilsAppConfigureDataSet: data => axios.post('/sss/b/p/v1/utils/app/configure/data/set', data),
    // 上传文件
    utilsUploadFile: param => axios.post('/sss/b/p/v1/utils/upload/file', '', {params: param}),
  },
  // 参数模版设置接口
  paramTemplateController: {
    // 参数模版-列表页面-添加一级参数节点模版
    paramTemplateAddL1: data => axios.post('/sss/b/p/v1/param/template/add-l1', data),
    // 参数模版-列表页面-添加二级参数节点模版
    paramTemplateAddL2: data => axios.post('/sss/b/p/v1/param/template/add-l2', data),
    // 参数模版-列表页面-添加三级参数节点模版
    paramTemplateAddL3: data => axios.post('/sss/b/p/v1/param/template/add-l3', data),
    // 参数模版-列表页面-添加参数节点
    paramTemplateAddParam: data => axios.post('/sss/b/p/v1/param/template/add-param', data),
    // 参数模版-列表页面-删除参数节点
    paramTemplateDelete: param => axios.delete('/sss/b/p/v1/param/template/delete', {params: param}),
    // 参数模版-列表页面-禁用参数模版
    paramTemplateDisable: param => axios.put('/sss/b/p/v1/param/template/disable', '', {params: param}),
    // 参数模版-列表页面-启用参数模版
    paramTemplateEnable: param => axios.put('/sss/b/p/v1/param/template/enable', '', {params: param}),
    // 参数模版-列表页面-获取数据
    paramTemplateGet: params => axios.get('/sss/b/p/v1/param/template/get', {params: params}),
    // 参数模版-列表页面-获取参数模版列表数据
    paramTemplateList: params => axios.get('/sss/b/p/v1/param/template/list', {params: params}),
    // 参数模版-列表页面-参数分组列表
    paramTemplateListGrp: params => axios.get('/sss/b/p/v1/param/template/list-grp', {params: params}),
    // 参数模版-列表页面-更新参数模版
    paramTemplatePut: data => axios.put('/sss/b/p/v1/param/template/put', data),
  },
  // 通用消息——发送消息接口
  sendMessageController: {
    // 站内消息—删除站内消息
    msgDelMessage: data => axios.post('/sss/b/v1/msg/del/message', data),
    // 站内消息—查询列表
    msgListMsg: data => axios.post('/sss/b/v1/msg/list-msg', data),
    // 站内消息—读取全部站内消息（将我的全部站内消息设置成已读）
    msgReadAllMsgUserId: param => axios.put('/sss/b/v1/msg/read-all-msg/{userId}', '', {params: param}),
    // 站内消息—读取站内消息（将消息设置成已读）
    msgReadMsgMessageId: param => axios.put('/sss/b/v1/msg/read-msg/{messageId}', '', {params: param}),
    // 消息发送接口
    msgSendMsg: data => axios.post('/sss/b/v1/msg/send-msg', data),
    // 站内消息—用户读取未读消息个数
    msgUnReadCntUserId: param => axios.put('/sss/b/v1/msg/un-read/cnt/{userId}', '', {params: param}),
    // 站内消息—读取全部站内消息（将我的全部站内消息设置成未读）
    msgUnreadAllMsgUserId: param => axios.put('/sss/b/v1/msg/unread-all-msg/{userId}', '', {params: param}),
    // 站内消息—读取站内消息（将消息设置成未读读）
    msgUnreadMsgMessageId: param => axios.put('/sss/b/v1/msg/unread-msg/{messageId}', '', {params: param}),
  },
  // 用户系统
  userController: {
    // 获取我的应用列表
    userAppList: params => axios.get('/sss/b/v1/user/app/list', {params: params}),
    // 获取用户信息
    userDetail: params => axios.get('/sss/b/v1/user/detail', {params: params}),
    // 我的全部功能
    userFeatureAlllist: params => axios.get('/sss/b/v1/user/feature/alllist', {params: params}),
    // 获取菜单的功能关联
    userFeatureList: params => axios.get('/sss/b/v1/user/feature/list', {params: params}),
    // 用户登录
    userLogin: data => axios.put('/sss/b/v1/user/login', data),
    // 修改密码-校验验证码
    userLoginCheckModifySmsCode: data => axios.post('/sss/b/v1/user/login/check/modify/sms/code', data),
    // 登录-获取验证码
    userLoginGetImageCode: params => axios.get('/sss/b/v1/user/login/get/image/code', {params: params}),
    // 用户登录(返回带菜单功能)
    userLoginMenuFeature: data => axios.put('/sss/b/v1/user/login/menu/feature', data),
    // 用户登录-验证码(返回带菜单功能)
    userLoginMfByImageCode: data => axios.put('/sss/b/v1/user/login/mf/by/image/code', data),
    // 修改密码-使用短信直接修改密码
    userLoginModifyPasswordBySmsCode: data => axios.post('/sss/b/v1/user/login/modify/password/by/sms/code', data),
    // 修改密码-使用短信码令牌修改密码
    userLoginModifyPasswordBySmsToken: data => axios.post('/sss/b/v1/user/login/modify/password/by/sms/token', data),
    // 注销登录
    userLogout: param => axios.put('/sss/b/v1/user/logout', '', {params: param}),
    // 我的菜单和功能列表
    userMenuFeatureList: params => axios.get('/sss/b/v1/user/menu/feature/list', {params: params}),
    // 我的菜单列表
    userMenuList: params => axios.get('/sss/b/v1/user/menu/list', {params: params}),
    // 修改登录密码
    userUpdatePassword: data => axios.put('/sss/b/v1/user/update/password', data),
  },
  // sys-zuul-route-controller
  sysZuulRouteController: {
    // 添加一条路由规则
    sysRouteAdd: data => axios.post('/sss/b/p/v1/sys/route/add', data),
    // 根据Id获取一条的路由规则
    sysRouteGet: params => axios.get('/sss/b/p/v1/sys/route/get', {params: params}),
    // 获取全部的路由规则
    sysRouteListAll: params => axios.get('/sss/b/p/v1/sys/route/list-all', {params: params}),
    // 根据Id获取一条的路由规则
    sysRouteListPage: params => axios.get('/sss/b/p/v1/sys/route/list-page', {params: params}),
    // 根据Id获取一条的路由规则
    sysRouteUpdate: data => axios.put('/sss/b/p/v1/sys/route/update', data),
    // 根据Id获取一条的路由规则
    sysRouteUpdate: param => axios.delete('/sss/b/p/v1/sys/route/update', {params: param}),
  },
  // 员工系统
  employeeController: {
    // 新增员工多个信息
    employeeAddMore: data => axios.post('/sss/b/p/v1/employee/add/more', data),
    // 新增角色关联的员工
    employeeAddToRole: data => axios.post('/sss/b/p/v1/employee/add/to/role', data),
    // 查询员工对应接口权限的关系
    employeeApiCheck: params => axios.get('/sss/b/p/v1/employee/api/check', {params: params}),
    // 获取员工的应用列表
    employeeAppList: params => axios.get('/sss/b/p/v1/employee/app/list', {params: params}),
    // 删除员工
    employeeDelete: param => axios.delete('/sss/b/p/v1/employee/delete', {params: param}),
    // 禁用员工
    employeeDisable: data => axios.put('/sss/b/p/v1/employee/disable', data),
    // 启用员工
    employeeEnable: data => axios.put('/sss/b/p/v1/employee/enable', data),
    // 查询员工
    employeeFind: params => axios.get('/sss/b/p/v1/employee/find', {params: params}),
    // 查询员工
    employeeFindByParam: data => axios.post('/sss/b/p/v1/employee/find/by/param', data),
    // 获取员工
    employeeGet: params => axios.get('/sss/b/p/v1/employee/get', {params: params}),
    // 获取员工全部关联信息
    employeeGetAll: params => axios.get('/sss/b/p/v1/employee/get/all', {params: params}),
    // 获取全部员工列表
    employeeList: params => axios.get('/sss/b/p/v1/employee/list', {params: params}),
    // 获取角色关联的员工
    employeeListByRole: params => axios.get('/sss/b/p/v1/employee/list/by/role', {params: params}),
    // 新增员工角色关联
    employeeRoleAdd: data => axios.post('/sss/b/p/v1/employee/role/add', data),
    // 删除员工角色关联
    employeeRoleDelete: param => axios.delete('/sss/b/p/v1/employee/role/delete', {params: param}),
    // 获取员工角色关联
    employeeRoleList: params => axios.get('/sss/b/p/v1/employee/role/list', {params: params}),
    // 修改员工多个信息
    employeeUpdataMore: data => axios.post('/sss/b/p/v1/employee/updata/more', data),
  },
  // 账户管理
  accountController: {
    // 增加用户
    accountAdd: data => axios.post('/sss/b/p/v1/account/add', data),
    // 删除用户
    accountDelete: param => axios.delete('/sss/b/p/v1/account/delete', {params: param}),
    // 获取用户详细
    accountDetailGet: params => axios.get('/sss/b/p/v1/account/detail/get', {params: params}),
    // 获取用户的员工
    accountEmployeeGet: params => axios.get('/sss/b/p/v1/account/employee/get', {params: params}),
    // 查询用户
    accountFind: params => axios.get('/sss/b/p/v1/account/find', {params: params}),
    // 获取用户
    accountGet: params => axios.get('/sss/b/p/v1/account/get', {params: params}),
    // 修改用户
    accountUpdate: data => axios.put('/sss/b/p/v1/account/update', data),
  },
  // 文件管理
  fileManagementController: {
    // 批量删除管理或拥有者权限下载的链接Token
    fileManagementDownTokenAoDelete: param => axios.delete('/sss/b/p/v1/file/management/down/token/ao/delete', {params: param}),
    // 批量更新管理或拥有者权限的下载链接Token时效
    fileManagementDownTokenAoRefresh: param => axios.put('/sss/b/p/v1/file/management/down/token/ao/refresh', '', {params: param}),
    // 生成下载链接
    fileManagementDownTokenCreate: data => axios.post('/sss/b/p/v1/file/management/down/token/create', data),
    // 生成下载链接（linkAuth）
    fileManagementDownTokenCreateByLinkAuth: data => axios.post('/sss/b/p/v1/file/management/down/token/create/by/linkAuth', data),
    // 生成下载链接（token）
    fileManagementDownTokenCreateByToken: data => axios.post('/sss/b/p/v1/file/management/down/token/create/by/token', data),
    // 删除下载的链接Token
    fileManagementDownTokenDelete: param => axios.delete('/sss/b/p/v1/file/management/down/token/delete', {params: param}),
    // 更新下载链接Token时效
    fileManagementDownTokenRefresh: data => axios.put('/sss/b/p/v1/file/management/down/token/refresh', data),
    // 关联文件
    fileManagementLinkCreate: param => axios.post('/sss/b/p/v1/file/management/link/create', '', {params: param}),
    // 删除关联文件
    fileManagementLinkDelete: param => axios.delete('/sss/b/p/v1/file/management/link/delete', {params: param}),
    // 获取目标的所有文件列表(downToken)
    fileManagementLinkOwnerListByDownToken: params => axios.get('/sss/b/p/v1/file/management/link/owner/list/by/downToken', {params: params}),
    // 获取目标的所有文件列表(linkAuth)
    fileManagementLinkOwnerListByLinkAuth: params => axios.get('/sss/b/p/v1/file/management/link/owner/list/by/linkAuth', {params: params}),
    // 获取目标的所有文件列表(token)
    fileManagementLinkOwnerListByToken: params => axios.get('/sss/b/p/v1/file/management/link/owner/list/by/token', {params: params}),
    // 更新文件信息
    fileManagementLinkUpdate: data => axios.put('/sss/b/p/v1/file/management/link/update', data),
    // 获取上传文件临时token，有效时间1分钟,单次有效。 注意使用合适的上传文件的接口
    fileManagementUploadTokenGet: params => axios.get('/sss/b/p/v1/file/management/upload/token/get', {params: params}),
    // 文件水印详细
    fileManagementWatermarkGet: params => axios.get('/sss/b/p/v1/file/management/watermark/get', {params: params}),
    // 配置文件水印（新增和修改接口合一）
    fileManagementWatermarkSet: param => axios.post('/sss/b/p/v1/file/management/watermark/set', '', {params: param}),
  },
  // 站内消息管理接口
  innerMessageController: {
    // 列表页面-添加数据
    imsgAdd: data => axios.post('/sss/b/p/v1/imsg/add', data),
    // 列表页面-删除数据
    imsgDeleteId: param => axios.delete('/sss/b/p/v1/imsg/delete/{id}', {params: param}),
    // 列表页面-禁用
    imsgDisableId: param => axios.put('/sss/b/p/v1/imsg/disable/{id}', '', {params: param}),
    // 列表页面-启用
    imsgEnableId: param => axios.put('/sss/b/p/v1/imsg/enable/{id}', '', {params: param}),
    // 列表页面-获取参数设置的列表数据
    imsgGetId: (id) => axios.get('/sss/b/p/v1/imsg/get/' + id),
    // 列表页面-依据条件查询列表数据
    imsgList: data => axios.post('/sss/b/p/v1/imsg/list', data),
    // 列表页面-修改数据
    imsgUpdate: data => axios.put('/sss/b/p/v1/imsg/update', data),
  },
  // 文件服务
  fileController: {
    // 上传附件文件 - 校验统一登录
    bFilePublicRichTextUpload: param => axios.post('/sss/b/file/public/rich/text/upload', '', {params: param}),
    // 上传公开文件 - 校验统一登录
    bFilePublicUpload: param => axios.post('/sss/b/file/public/upload', '', {params: param}),
    // 批量删除管理或拥有者权限下载的链接Token
    bMyDownTokenAoDelete: param => axios.delete('/sss/b/my/down/token/ao/delete', {params: param}),
    // 批量更新我的管理或拥有者权限的下载链接Token时效
    bMyDownTokenAoRefresh: param => axios.put('/sss/b/my/down/token/ao/refresh', '', {params: param}),
    // 生成我的文件下载链接（token） - 校验统一登录
    bMyDownTokenCreate: data => axios.post('/sss/b/my/down/token/create', data),
    // 删除我的下载的链接Token
    bMyDownTokenDelete: param => axios.delete('/sss/b/my/down/token/delete', {params: param}),
    // 更新我的下载链接Token时效
    bMyDownTokenRefresh: data => axios.put('/sss/b/my/down/token/refresh', data),
    // 关联我的文件 - 校验统一登录
    bMyFileLinkCreate: param => axios.post('/sss/b/my/file/link/create', '', {params: param}),
    // 上传权限文件（临时） - 校验统一登录
    bMyFileUpload: param => axios.post('/sss/b/my/file/upload', '', {params: param}),
    // 删除我的文件 - 校验统一登录
    bMyLinkDelete: param => axios.delete('/sss/b/my/link/delete', {params: param}),
    // 获取我的所有文件列表(token)
    bMyLinkOwnerListByToken: params => axios.get('/sss/b/my/link/owner/list/by/token', {params: params}),
    // 更新我的文件信息 - 校验统一登录
    bMyLinkUpdate: data => axios.put('/sss/b/my/link/update', data),
    // 删除权限文件（临时）
    fileDelete: param => axios.delete('/sss/file/delete/', {params: param}),
    // 下载文件(校验权限url中获取downToken，或则从session获取DownToken)
    fileDownLinkUuidDownToken: (linkUuid ,downToken) => axios.get('/sss/file/down/' + linkUuid + '/' + downToken),
    // 上传公开文件
    filePublicUpload: param => axios.post('/sss/file/public/upload', '', {params: param}),
    // 上传权限文件（临时）
    fileUpload: param => axios.post('/sss/file/upload', '', {params: param}),
  }
}
export default api
