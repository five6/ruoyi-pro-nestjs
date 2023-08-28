/*
 Navicat Premium Data Transfer

 Source Server         : ruoyi-nest
 Source Server Type    : MySQL
 Source Server Version : 50737
 Source Host           : localhost:3306
 Source Schema         : ruoyi-nest

 Target Server Type    : MySQL
 Target Server Version : 50737
 File Encoding         : 65001

 Date: 28/08/2023 01:38:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for file_config
-- ----------------------------
DROP TABLE IF EXISTS `file_config`;
CREATE TABLE `file_config`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `config_id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `size` int(11) NOT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of file_config
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for file_content
-- ----------------------------
DROP TABLE IF EXISTS `file_content`;
CREATE TABLE `file_content`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `config_id` int(11) NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of file_content
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for file_files
-- ----------------------------
DROP TABLE IF EXISTS `file_files`;
CREATE TABLE `file_files`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `size` int(11) NOT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of file_files
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for game_activity
-- ----------------------------
DROP TABLE IF EXISTS `game_activity`;
CREATE TABLE `game_activity`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `begin` timestamp(0) NULL DEFAULT NULL,
  `end` timestamp(0) NULL DEFAULT NULL,
  `type` int(11) NOT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_fd903208fcef02e2a7f0827c08`(`title`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of game_activity
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for game_email
-- ----------------------------
DROP TABLE IF EXISTS `game_email`;
CREATE TABLE `game_email`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `props` json NOT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `to` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of game_email
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for game_props
-- ----------------------------
DROP TABLE IF EXISTS `game_props`;
CREATE TABLE `game_props`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of game_props
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for game_user
-- ----------------------------
DROP TABLE IF EXISTS `game_user`;
CREATE TABLE `game_user`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `open_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `gender` int(11) NOT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `union_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT NULL,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_0481a47f1f576dfa0cb9ea133d`(`open_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of game_user
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_dept
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept`  (
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sort` int(11) NOT NULL COMMENT '显示顺序',
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `parent_id` int(11) NULL DEFAULT NULL,
  `leader_user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '负责人',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱',
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建者',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_45bf495156783376b6c205b277`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
BEGIN;
INSERT INTO `sys_dept` VALUES (1, 1, '上海海上科技', 1, NULL, '2023-07-03 09:49:36.551877', '2023-07-17 00:28:18.006453', NULL, NULL, 5, NULL, NULL, NULL, 1), (1, 1, '南京海上科技', 1, NULL, '2023-07-03 09:49:36.551877', '2023-07-17 00:28:18.852514', NULL, NULL, 5, NULL, NULL, NULL, 2), (1, 1, '张家港海上科技', 1, NULL, '2023-07-03 09:49:36.551877', '2023-07-17 00:28:19.589589', NULL, NULL, 5, NULL, NULL, NULL, 3), (1, 1, '测试', 1, NULL, '2023-07-17 00:10:23.237530', '2023-07-17 00:28:40.519975', 'alice', NULL, NULL, '1', '186xxxx6793@qq.com', '186xxxx6793', 4), (1, 1, '海上科技', 0, NULL, '2023-07-03 09:49:36.551877', '2023-07-03 09:49:36.631189', NULL, NULL, NULL, NULL, NULL, NULL, 5), (1, 1, 'aaa', 3, '2023-07-17 00:41:24.000000', '2023-07-17 00:37:38.130540', '2023-07-17 00:41:24.000000', 'alice', NULL, 0, '15', '186xxxx6793@qq.cm', '186xxxx6793', 6);
COMMIT;

-- ----------------------------
-- Table structure for sys_dict_data
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_data`;
CREATE TABLE `sys_dict_data`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '字典排序',
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典标签',
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '字典键值',
  `dict_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '字典类型',
  `color_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '颜色类型',
  `css_class` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'css 样式',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1235 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_dict_data
-- ----------------------------
BEGIN;
INSERT INTO `sys_dict_data` VALUES (1, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 1, '男', '1', 'system_user_sex', 'default', 'A', '性别男'), (2, 1, '2021-01-05 17:03:48.000000', '2022-02-16 01:30:51.000000', 'admin', '1', NULL, 2, '女', '2', 'system_user_sex', 'success', '', '性别女'), (8, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 1, '正常', '1', 'infra_job_status', 'success', '', '正常状态'), (9, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 2, '暂停', '2', 'infra_job_status', 'danger', '', '停用状态'), (12, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 1, '系统内置', '1', 'infra_config_type', 'danger', '', '参数类型 - 系统内置'), (13, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 2, '自定义', '2', 'infra_config_type', 'primary', '', '参数类型 - 自定义'), (14, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 1, '通知', '1', 'system_notice_type', 'success', '', '通知'), (15, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 2, '公告', '2', 'system_notice_type', 'info', '', '公告'), (16, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 0, '其它', '0', 'system_operate_type', 'default', '', '其它操作'), (17, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 1, '查询', '1', 'system_operate_type', 'info', '', '查询操作'), (18, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 2, '新增', '2', 'system_operate_type', 'primary', '', '新增操作'), (19, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 3, '修改', '3', 'system_operate_type', 'warning', '', '修改操作'), (20, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 4, '删除', '4', 'system_operate_type', 'danger', '', '删除操作'), (22, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 5, '导出', '5', 'system_operate_type', 'default', '', '导出操作'), (23, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 6, '导入', '6', 'system_operate_type', 'default', '', '导入操作'), (27, 1, '2021-01-05 17:03:48.000000', '2023-07-08 22:22:45.056926', 'admin', '1', NULL, 1, '开启', '1', 'common_status', 'primary', '', '开启状态'), (28, 1, '2021-01-05 17:03:48.000000', '2023-07-08 22:22:42.536648', 'admin', '1', NULL, 2, '关闭', '0', 'common_status', 'info', '', '关闭状态'), (29, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '', NULL, 1, '目录', '1', 'system_menu_type', '', '', '目录'), (30, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '', NULL, 2, '菜单', '2', 'system_menu_type', '', '', '菜单'), (31, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '', NULL, 3, '按钮', '3', 'system_menu_type', '', '', '按钮'), (32, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 1, '内置', '1', 'system_role_type', 'danger', '', '内置角色'), (33, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '1', NULL, 2, '自定义', '2', 'system_role_type', 'primary', '', '自定义角色'), (34, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '', NULL, 1, '全部数据权限', '1', 'system_data_scope', '', '', '全部数据权限'), (35, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '', NULL, 2, '指定部门数据权限', '2', 'system_data_scope', '', '', '指定部门数据权限'), (36, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '', NULL, 3, '本部门数据权限', '3', 'system_data_scope', '', '', '本部门数据权限'), (37, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '', NULL, 4, '本部门及以下数据权限', '4', 'system_data_scope', '', '', '本部门及以下数据权限'), (38, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:58.789697', 'admin', '', NULL, 5, '仅本人数据权限', '5', 'system_data_scope', '', '', '仅本人数据权限'), (39, 1, '2021-01-18 06:17:36.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 0, '成功', '0', 'system_login_result', 'success', '', '登陆结果 - 成功'), (40, 1, '2021-01-18 06:17:54.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 10, '账号或密码不正确', '10', 'system_login_result', 'primary', '', '登陆结果 - 账号或密码不正确'), (41, 1, '2021-01-18 06:17:54.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 20, '用户被禁用', '20', 'system_login_result', 'warning', '', '登陆结果 - 用户被禁用'), (42, 1, '2021-01-18 06:17:54.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 30, '验证码不存在', '30', 'system_login_result', 'info', '', '登陆结果 - 验证码不存在'), (43, 1, '2021-01-18 06:17:54.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 31, '验证码不正确', '31', 'system_login_result', 'info', '', '登陆结果 - 验证码不正确'), (44, 1, '2021-01-18 06:17:54.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 100, '未知异常', '100', 'system_login_result', 'danger', '', '登陆结果 - 未知异常'), (45, 1, '2021-01-19 03:20:55.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 1, '是', 'true', 'infra_boolean_string', 'danger', '', 'Boolean 是否类型 - 是'), (46, 1, '2021-01-19 03:20:55.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 1, '否', 'false', 'infra_boolean_string', 'info', '', 'Boolean 是否类型 - 否'), (47, 1, '2021-01-26 00:53:17.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 1, '永不超时', '1', 'infra_redis_timeout_type', 'primary', '', 'Redis 未设置超时的情况'), (48, 1, '2021-01-26 00:55:00.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 1, '动态超时', '2', 'infra_redis_timeout_type', 'info', '', '程序里动态传入超时时间，无法固定'), (49, 1, '2021-01-26 00:55:26.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 3, '固定超时', '3', 'infra_redis_timeout_type', 'success', '', 'Redis 设置了过期时间'), (50, 1, '2021-02-05 07:09:06.000000', '2023-07-08 21:22:58.789697', '', '', NULL, 1, '单表（增删改查）', '1', 'infra_codegen_template_type', '', '', NULL), (51, 1, '2021-02-05 07:14:46.000000', '2023-07-08 21:22:58.789697', '', '', NULL, 2, '树表（增删改查）', '2', 'infra_codegen_template_type', '', '', NULL), (53, 1, '2021-02-07 07:46:49.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 0, '初始化中', '0', 'infra_job_status', 'primary', '', NULL), (57, 1, '2021-02-08 10:04:24.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 0, '运行中', '0', 'infra_job_log_status', 'primary', '', 'RUNNING'), (58, 1, '2021-02-08 10:06:57.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 1, '成功', '1', 'infra_job_log_status', 'success', '', NULL), (59, 1, '2021-02-08 10:07:38.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 2, '失败', '2', 'infra_job_log_status', 'warning', '', '失败'), (60, 1, '2021-02-26 00:16:27.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 1, '会员', '1', 'user_type', 'primary', '', NULL), (61, 1, '2021-02-26 00:16:34.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 2, '管理员', '2', 'user_type', 'success', '', NULL), (62, 1, '2021-02-26 07:07:19.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 0, '未处理', '0', 'infra_api_error_log_process_status', 'primary', '', NULL), (63, 1, '2021-02-26 07:07:26.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 1, '已处理', '1', 'infra_api_error_log_process_status', 'success', '', NULL), (64, 1, '2021-02-26 07:07:34.000000', '2023-07-08 21:22:58.789697', '', '1', NULL, 2, '已忽略', '2', 'infra_api_error_log_process_status', 'danger', '', NULL), (66, 1, '2021-04-05 01:05:26.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '阿里云', 'ALIYUN', 'system_sms_channel_code', 'primary', '', NULL), (67, 1, '2021-04-05 21:50:57.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '验证码', '1', 'system_sms_template_type', 'warning', '', NULL), (68, 1, '2021-04-05 21:51:08.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '通知', '2', 'system_sms_template_type', 'primary', '', NULL), (69, 1, '2021-04-05 21:51:15.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, '营销', '3', 'system_sms_template_type', 'danger', '', NULL), (70, 1, '2021-04-11 20:18:33.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, '初始化', '0', 'system_sms_send_status', 'primary', '', NULL), (71, 1, '2021-04-11 20:18:43.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '发送成功', '10', 'system_sms_send_status', 'success', '', NULL), (72, 1, '2021-04-11 20:18:49.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '发送失败', '20', 'system_sms_send_status', 'danger', '', NULL), (73, 1, '2021-04-11 20:19:44.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 3, '不发送', '30', 'system_sms_send_status', 'info', '', NULL), (74, 1, '2021-04-11 20:27:43.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, '等待结果', '0', 'system_sms_receive_status', 'primary', '', NULL), (75, 1, '2021-04-11 20:29:25.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '接收成功', '10', 'system_sms_receive_status', 'success', '', NULL), (76, 1, '2021-04-11 20:29:31.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '接收失败', '20', 'system_sms_receive_status', 'danger', '', NULL), (77, 1, '2021-04-13 00:20:37.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, '调试(钉钉)', 'DEBUG_DING_TALK', 'system_sms_channel_code', 'info', '', NULL), (78, 1, '2021-04-21 00:06:48.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '自动生成', '1', 'system_error_code_type', 'warning', '', NULL), (79, 1, '2021-04-21 00:07:14.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '手动编辑', '2', 'system_error_code_type', 'primary', '', NULL), (80, 1, '2021-10-06 00:52:02.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 100, '账号登录', '100', 'system_login_type', 'primary', '', '账号登录'), (81, 1, '2021-10-06 00:52:17.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 101, '社交登录', '101', 'system_login_type', 'info', '', '社交登录'), (83, 1, '2021-10-06 00:52:58.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 200, '主动登出', '200', 'system_login_type', 'primary', '', '主动登出'), (85, 1, '2021-10-06 00:53:41.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 202, '强制登出', '202', 'system_login_type', 'danger', '', '强制退出'), (86, 1, '2021-09-21 22:35:28.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, '病假', '1', 'bpm_oa_leave_type', 'primary', '', NULL), (87, 1, '2021-09-21 22:36:11.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '事假', '2', 'bpm_oa_leave_type', 'info', '', NULL), (88, 1, '2021-09-21 22:36:38.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '婚假', '3', 'bpm_oa_leave_type', 'warning', '', NULL), (98, 1, '2021-11-08 17:00:58.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, 'v2', 'v2', 'pay_channel_wechat_version', '', '', 'v2版本'), (99, 1, '2021-11-08 17:01:07.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, 'v3', 'v3', 'pay_channel_wechat_version', '', '', 'v3版本'), (108, 1, '2021-11-18 15:39:29.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, 'RSA2', 'RSA2', 'pay_channel_alipay_sign_type', '', '', 'RSA2'), (109, 1, '2021-11-18 15:45:23.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '公钥模式', '1', 'pay_channel_alipay_mode', '', '', '公钥模式：privateKey + alipayPublicKey'), (110, 1, '2021-11-18 15:45:40.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '证书模式', '2', 'pay_channel_alipay_mode', '', '', '证书模式：appCertContent + alipayPublicCertContent + rootCertContent'), (111, 1, '2021-11-18 16:59:32.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '线上', 'https://openapi.alipay.com/gateway.do', 'pay_channel_alipay_server_type', '', '', '网关地址 - 线上'), (112, 1, '2021-11-18 16:59:48.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '沙箱', 'https://openapi.alipaydev.com/gateway.do', 'pay_channel_alipay_server_type', '', '', '网关地址 - 沙箱'), (113, 1, '2021-12-03 10:40:24.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '微信 JSAPI 支付', 'wx_pub', 'pay_channel_code_type', '', '', '微信 JSAPI（公众号） 支付'), (114, 1, '2021-12-03 10:41:06.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '微信小程序支付', 'wx_lite', 'pay_channel_code_type', '', '', '微信小程序支付'), (115, 1, '2021-12-03 10:41:20.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 3, '微信 App 支付', 'wx_app', 'pay_channel_code_type', '', '', '微信 App 支付'), (116, 1, '2021-12-03 10:42:09.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 4, '支付宝 PC 网站支付', 'alipay_pc', 'pay_channel_code_type', '', '', '支付宝 PC 网站支付'), (117, 1, '2021-12-03 10:42:26.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 5, '支付宝 Wap 网站支付', 'alipay_wap', 'pay_channel_code_type', '', '', '支付宝 Wap 网站支付'), (118, 1, '2021-12-03 10:42:55.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 6, '支付宝App 支付', 'alipay_app', 'pay_channel_code_type', '', '', '支付宝App 支付'), (119, 1, '2021-12-03 10:43:10.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 7, '支付宝扫码支付', 'alipay_qr', 'pay_channel_code_type', '', '', '支付宝扫码支付'), (120, 1, '2021-12-03 11:02:41.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '通知成功', '10', 'pay_order_notify_status', 'success', '', '通知成功'), (121, 1, '2021-12-03 11:02:59.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '通知失败', '20', 'pay_order_notify_status', 'danger', '', '通知失败'), (122, 1, '2021-12-03 11:03:10.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 3, '未通知', '0', 'pay_order_notify_status', 'info', '', '未通知'), (123, 1, '2021-12-03 11:18:29.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '支付成功', '10', 'pay_order_status', 'success', '', '支付成功'), (124, 1, '2021-12-03 11:18:42.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '支付关闭', '20', 'pay_order_status', 'danger', '', '支付关闭'), (125, 1, '2021-12-03 11:18:18.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 3, '未支付', '0', 'pay_order_status', 'info', '', '未支付'), (126, 1, '2021-12-03 11:30:35.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '未退款', '0', 'pay_order_refund_status', '', '', '未退款'), (127, 1, '2021-12-03 11:30:44.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '部分退款', '10', 'pay_order_refund_status', '', '', '部分退款'), (128, 1, '2021-12-03 11:30:52.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 3, '全部退款', '20', 'pay_order_refund_status', '', '', '全部退款'), (1117, 1, '2021-12-10 16:44:44.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '退款订单生成', '0', 'pay_refund_order_status', 'primary', '', '退款订单生成'), (1118, 1, '2021-12-10 16:44:59.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '退款成功', '1', 'pay_refund_order_status', 'success', '', '退款成功'), (1119, 1, '2021-12-10 16:45:10.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 3, '退款失败', '2', 'pay_refund_order_status', 'danger', '', '退款失败'), (1124, 1, '2021-12-10 16:46:26.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 8, '退款关闭', '99', 'pay_refund_order_status', 'info', '', '退款关闭'), (1125, 1, '2022-01-02 08:41:11.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, '默认', '1', 'bpm_model_category', 'primary', '', '流程分类 - 默认'), (1126, 1, '2022-01-02 08:41:22.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, 'OA', '2', 'bpm_model_category', 'success', '', '流程分类 - OA'), (1127, 1, '2022-01-07 23:47:22.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, '进行中', '1', 'bpm_process_instance_status', 'primary', '', '流程实例的状态 - 进行中'), (1128, 1, '2022-01-07 23:47:49.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '已完成', '2', 'bpm_process_instance_status', 'success', '', '流程实例的状态 - 已完成'), (1129, 1, '2022-01-07 23:48:32.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '处理中', '1', 'bpm_process_instance_result', 'primary', '', '流程实例的结果 - 处理中'), (1130, 1, '2022-01-07 23:48:45.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '通过', '2', 'bpm_process_instance_result', 'success', '', '流程实例的结果 - 通过'), (1131, 1, '2022-01-07 23:48:55.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 3, '不通过', '3', 'bpm_process_instance_result', 'danger', '', '流程实例的结果 - 不通过'), (1132, 1, '2022-01-07 23:49:06.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 4, '已取消', '4', 'bpm_process_instance_result', 'info', '', '流程实例的结果 - 撤销'), (1133, 1, '2022-01-11 23:51:30.000000', '2023-07-08 21:22:58.789697', '103', '103', NULL, 10, '流程表单', '10', 'bpm_model_form_type', '', '', '流程的表单类型 - 流程表单'), (1134, 1, '2022-01-11 23:51:47.000000', '2023-07-08 21:22:58.789697', '103', '103', NULL, 20, '业务表单', '20', 'bpm_model_form_type', '', '', '流程的表单类型 - 业务表单'), (1135, 1, '2022-01-12 23:21:22.000000', '2023-07-08 21:22:58.789697', '103', '1', NULL, 10, '角色', '10', 'bpm_task_assign_rule_type', 'info', '', '任务分配规则的类型 - 角色'), (1136, 1, '2022-01-12 23:21:47.000000', '2023-07-08 21:22:58.789697', '103', '1', NULL, 20, '部门的成员', '20', 'bpm_task_assign_rule_type', 'primary', '', '任务分配规则的类型 - 部门的成员'), (1137, 1, '2022-01-12 23:33:36.000000', '2023-07-08 21:22:58.789697', '103', '1', NULL, 21, '部门的负责人', '21', 'bpm_task_assign_rule_type', 'primary', '', '任务分配规则的类型 - 部门的负责人'), (1138, 1, '2022-01-12 23:34:02.000000', '2023-07-08 21:22:58.789697', '103', '1', NULL, 30, '用户', '30', 'bpm_task_assign_rule_type', 'info', '', '任务分配规则的类型 - 用户'), (1139, 1, '2022-01-12 23:34:21.000000', '2023-07-08 21:22:58.789697', '103', '1', NULL, 40, '用户组', '40', 'bpm_task_assign_rule_type', 'warning', '', '任务分配规则的类型 - 用户组'), (1140, 1, '2022-01-12 23:34:43.000000', '2023-07-08 21:22:58.789697', '103', '1', NULL, 50, '自定义脚本', '50', 'bpm_task_assign_rule_type', 'danger', '', '任务分配规则的类型 - 自定义脚本'), (1141, 1, '2022-01-14 18:41:55.000000', '2023-07-08 21:22:58.789697', '103', '1', NULL, 22, '岗位', '22', 'bpm_task_assign_rule_type', 'success', '', '任务分配规则的类型 - 岗位'), (1142, 1, '2022-01-15 00:10:57.000000', '2023-07-08 21:22:58.789697', '103', '103', NULL, 10, '流程发起人', '10', 'bpm_task_assign_script', '', '', '任务分配自定义脚本 - 流程发起人'), (1143, 1, '2022-01-15 21:24:31.000000', '2023-07-08 21:22:58.789697', '103', '103', NULL, 20, '流程发起人的一级领导', '20', 'bpm_task_assign_script', '', '', '任务分配自定义脚本 - 流程发起人的一级领导'), (1144, 1, '2022-01-15 21:24:46.000000', '2023-07-08 21:22:58.789697', '103', '103', NULL, 21, '流程发起人的二级领导', '21', 'bpm_task_assign_script', '', '', '任务分配自定义脚本 - 流程发起人的二级领导'), (1145, 1, '2022-02-02 13:15:06.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '管理后台', '1', 'infra_codegen_scene', '', '', '代码生成的场景枚举 - 管理后台'), (1146, 1, '2022-02-02 13:15:19.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '用户 APP', '2', 'infra_codegen_scene', '', '', '代码生成的场景枚举 - 用户 APP'), (1147, 1, '2022-02-16 14:09:01.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, '未退款', '0', 'pay_refund_order_type', 'info', '', '退款类型 - 未退款'), (1148, 1, '2022-02-16 14:09:25.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 10, '部分退款', '10', 'pay_refund_order_type', 'success', '', '退款类型 - 部分退款'), (1149, 1, '2022-02-16 14:11:33.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 20, '全部退款', '20', 'pay_refund_order_type', 'warning', '', '退款类型 - 全部退款'), (1150, 1, '2022-03-15 00:25:28.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '数据库', '1', 'infra_file_storage', 'default', '', NULL), (1151, 1, '2022-03-15 00:25:41.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 10, '本地磁盘', '10', 'infra_file_storage', 'default', '', NULL), (1152, 1, '2022-03-15 00:26:06.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 11, 'FTP 服务器', '11', 'infra_file_storage', 'default', '', NULL), (1153, 1, '2022-03-15 00:26:22.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 12, 'SFTP 服务器', '12', 'infra_file_storage', 'default', '', NULL), (1154, 1, '2022-03-15 00:26:31.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 20, 'S3 对象存储', '20', 'infra_file_storage', 'default', '', NULL), (1155, 1, '2022-05-09 23:57:58.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 103, '短信登录', '103', 'system_login_type', 'default', '', NULL), (1156, 1, '2022-05-12 00:22:05.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, 'password', 'password', 'system_oauth2_grant_type', 'default', '', '密码模式'), (1157, 1, '2022-05-12 00:22:59.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, 'authorization_code', 'authorization_code', 'system_oauth2_grant_type', 'primary', '', '授权码模式'), (1158, 1, '2022-05-12 00:23:40.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 3, 'implicit', 'implicit', 'system_oauth2_grant_type', 'success', '', '简化模式'), (1159, 1, '2022-05-12 00:23:51.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 4, 'client_credentials', 'client_credentials', 'system_oauth2_grant_type', 'default', '', '客户端模式'), (1160, 1, '2022-05-12 00:24:02.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 5, 'refresh_token', 'refresh_token', 'system_oauth2_grant_type', 'info', '', '刷新模式'), (1162, 1, '2022-10-24 21:19:47.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '销售中', '1', 'product_spu_status', 'success', '', '商品 SPU 状态 - 销售中'), (1163, 1, '2022-10-24 21:20:54.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, '仓库中', '0', 'product_spu_status', 'info', '', '商品 SPU 状态 - 仓库中'), (1164, 1, '2022-10-24 21:21:11.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, '回收站', '-1', 'product_spu_status', 'default', '', '商品 SPU 状态 - 回收站'), (1165, 1, '2022-11-01 12:46:41.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '满减', '1', 'promotion_discount_type', 'success', '', '优惠类型 - 满减'), (1166, 1, '2022-11-01 12:46:51.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '折扣', '2', 'promotion_discount_type', 'primary', '', '优惠类型 - 折扣'), (1167, 1, '2022-11-02 00:07:34.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '固定日期', '1', 'promotion_coupon_template_validity_type', 'default', '', '优惠劵模板的有限期类型 - 固定日期'), (1168, 1, '2022-11-02 00:07:54.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '领取之后', '2', 'promotion_coupon_template_validity_type', 'default', '', '优惠劵模板的有限期类型 - 领取之后'), (1169, 1, '2022-11-02 00:28:22.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '全部商品参与', '1', 'promotion_product_scope', 'default', '', '营销的商品范围 - 全部商品参与'), (1170, 1, '2022-11-02 00:28:34.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '指定商品参与', '2', 'promotion_product_scope', 'default', '', '营销的商品范围 - 指定商品参与'), (1171, 1, '2022-11-04 00:15:08.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '已领取', '1', 'promotion_coupon_status', 'primary', '', '优惠劵的状态 - 已领取'), (1172, 1, '2022-11-04 00:15:21.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '已使用', '2', 'promotion_coupon_status', 'success', '', '优惠劵的状态 - 已使用'), (1173, 1, '2022-11-04 00:15:43.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 3, '已过期', '3', 'promotion_coupon_status', 'info', '', '优惠劵的状态 - 已过期'), (1174, 1, '2022-11-04 19:13:00.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '直接领取', '1', 'promotion_coupon_take_type', 'primary', '', '优惠劵的领取方式 - 直接领取'), (1175, 1, '2022-11-04 19:13:13.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '指定发放', '2', 'promotion_coupon_take_type', 'success', '', '优惠劵的领取方式 - 指定发放'), (1176, 1, '2022-11-04 22:54:49.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 10, '未开始', '10', 'promotion_activity_status', 'primary', '', '促销活动的状态枚举 - 未开始'), (1177, 1, '2022-11-04 22:55:06.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 20, '进行中', '20', 'promotion_activity_status', 'success', '', '促销活动的状态枚举 - 进行中'), (1178, 1, '2022-11-04 22:55:41.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 30, '已结束', '30', 'promotion_activity_status', 'info', '', '促销活动的状态枚举 - 已结束'), (1179, 1, '2022-11-04 22:56:10.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 40, '已关闭', '40', 'promotion_activity_status', 'warning', '', '促销活动的状态枚举 - 已关闭'), (1180, 1, '2022-11-04 22:59:45.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 10, '满 N 元', '10', 'promotion_condition_type', 'primary', '', '营销的条件类型 - 满 N 元'), (1181, 1, '2022-11-04 23:00:02.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 20, '满 N 件', '20', 'promotion_condition_type', 'success', '', '营销的条件类型 - 满 N 件'), (1182, 1, '2022-11-19 20:53:33.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 10, '申请售后', '10', 'trade_after_sale_status', 'primary', '', '交易售后状态 - 申请售后'), (1183, 1, '2022-11-19 20:54:36.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 20, '商品待退货', '20', 'trade_after_sale_status', 'primary', '', '交易售后状态 - 商品待退货'), (1184, 1, '2022-11-19 20:56:56.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 30, '商家待收货', '30', 'trade_after_sale_status', 'primary', '', '交易售后状态 - 商家待收货'), (1185, 1, '2022-11-19 20:59:54.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 40, '等待退款', '40', 'trade_after_sale_status', 'primary', '', '交易售后状态 - 等待退款'), (1186, 1, '2022-11-19 21:00:33.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 50, '退款成功', '50', 'trade_after_sale_status', 'default', '', '交易售后状态 - 退款成功'), (1187, 1, '2022-11-19 21:01:29.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 61, '买家取消', '61', 'trade_after_sale_status', 'info', '', '交易售后状态 - 买家取消'), (1188, 1, '2022-11-19 21:02:17.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 62, '商家拒绝', '62', 'trade_after_sale_status', 'info', '', '交易售后状态 - 商家拒绝'), (1189, 1, '2022-11-19 21:02:37.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 63, '商家拒收货', '63', 'trade_after_sale_status', 'info', '', '交易售后状态 - 商家拒收货'), (1190, 1, '2022-11-19 21:05:05.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 10, '售中退款', '10', 'trade_after_sale_type', 'success', '', '交易售后的类型 - 售中退款'), (1191, 1, '2022-11-19 21:05:32.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 20, '售后退款', '20', 'trade_after_sale_type', 'primary', '', '交易售后的类型 - 售后退款'), (1192, 1, '2022-11-19 21:39:19.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 10, '仅退款', '10', 'trade_after_sale_way', 'primary', '', '交易售后的方式 - 仅退款'), (1193, 1, '2022-11-19 21:39:38.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 20, '退货退款', '20', 'trade_after_sale_way', 'success', '', '交易售后的方式 - 退货退款'), (1194, 1, '2022-12-10 10:51:11.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 10, '微信小程序', '10', 'terminal', 'default', '', '终端 - 微信小程序'), (1195, 1, '2022-12-10 10:51:30.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 20, 'H5 网页', '20', 'terminal', 'default', '', '终端 - H5 网页'), (1196, 1, '2022-12-10 10:54:16.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 11, '微信公众号', '11', 'terminal', 'default', '', '终端 - 微信公众号'), (1197, 1, '2022-12-10 10:54:42.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 31, '苹果 App', '31', 'terminal', 'default', '', '终端 - 苹果 App'), (1198, 1, '2022-12-10 10:55:02.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 32, '安卓 App', '32', 'terminal', 'default', '', '终端 - 安卓 App'), (1199, 1, '2022-12-10 16:34:14.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, '普通订单', '0', 'trade_order_type', 'default', '', '交易订单的类型 - 普通订单'), (1200, 1, '2022-12-10 16:34:26.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '秒杀订单', '1', 'trade_order_type', 'default', '', '交易订单的类型 - 秒杀订单'), (1201, 1, '2022-12-10 16:34:36.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '拼团订单', '2', 'trade_order_type', 'default', '', '交易订单的类型 - 拼团订单'), (1202, 1, '2022-12-10 16:34:48.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 3, '砍价订单', '3', 'trade_order_type', 'default', '', '交易订单的类型 - 砍价订单'), (1203, 1, '2022-12-10 16:49:29.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, '待支付', '0', 'trade_order_status', 'default', '', '交易订单状态 - 待支付'), (1204, 1, '2022-12-10 16:49:53.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 10, '待发货', '10', 'trade_order_status', 'primary', '', '交易订单状态 - 待发货'), (1205, 1, '2022-12-10 16:50:13.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 20, '已发货', '20', 'trade_order_status', 'primary', '', '交易订单状态 - 已发货'), (1206, 1, '2022-12-10 16:50:30.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 30, '已完成', '30', 'trade_order_status', 'success', '', '交易订单状态 - 已完成'), (1207, 1, '2022-12-10 16:50:50.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 40, '已取消', '40', 'trade_order_status', 'danger', '', '交易订单状态 - 已取消'), (1208, 1, '2022-12-10 20:58:42.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, '未售后', '0', 'trade_order_item_after_sale_status', 'info', '', '交易订单项的售后状态 - 未售后'), (1209, 1, '2022-12-10 20:59:21.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '售后中', '1', 'trade_order_item_after_sale_status', 'primary', '', '交易订单项的售后状态 - 售后中'), (1210, 1, '2022-12-10 20:59:46.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '已退款', '2', 'trade_order_item_after_sale_status', 'success', '', '交易订单项的售后状态 - 已退款'), (1211, 1, '2023-01-16 23:30:39.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '完全匹配', '1', 'mp_auto_reply_request_match', 'primary', '', '公众号自动回复的请求关键字匹配模式 - 完全匹配'), (1212, 1, '2023-01-16 23:30:55.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '半匹配', '2', 'mp_auto_reply_request_match', 'success', '', '公众号自动回复的请求关键字匹配模式 - 半匹配'), (1213, 1, '2023-01-17 22:17:32.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '文本', 'text', 'mp_message_type', 'default', '', '公众号的消息类型 - 文本'), (1214, 1, '2023-01-17 22:17:32.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '图片', 'image', 'mp_message_type', 'default', '', '公众号的消息类型 - 图片'), (1215, 1, '2023-01-17 22:17:32.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 3, '语音', 'voice', 'mp_message_type', 'default', '', '公众号的消息类型 - 语音'), (1216, 1, '2023-01-17 22:17:32.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 4, '视频', 'video', 'mp_message_type', 'default', '', '公众号的消息类型 - 视频'), (1217, 1, '2023-01-17 22:17:32.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 5, '小视频', 'shortvideo', 'mp_message_type', 'default', '', '公众号的消息类型 - 小视频'), (1218, 1, '2023-01-17 22:17:32.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 6, '图文', 'news', 'mp_message_type', 'default', '', '公众号的消息类型 - 图文'), (1219, 1, '2023-01-17 22:17:32.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 7, '音乐', 'music', 'mp_message_type', 'default', '', '公众号的消息类型 - 音乐'), (1220, 1, '2023-01-17 22:17:32.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 8, '地理位置', 'location', 'mp_message_type', 'default', '', '公众号的消息类型 - 地理位置'), (1221, 1, '2023-01-17 22:17:32.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 9, '链接', 'link', 'mp_message_type', 'default', '', '公众号的消息类型 - 链接'), (1222, 1, '2023-01-17 22:17:32.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 10, '事件', 'event', 'mp_message_type', 'default', '', '公众号的消息类型 - 事件'), (1223, 1, '2023-01-26 09:53:49.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, '初始化', '0', 'system_mail_send_status', 'primary', '', '邮件发送状态 - 初始化\n'), (1224, 1, '2023-01-26 09:54:28.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 10, '发送成功', '10', 'system_mail_send_status', 'success', '', '邮件发送状态 - 发送成功'), (1225, 1, '2023-01-26 09:54:50.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 20, '发送失败', '20', 'system_mail_send_status', 'danger', '', '邮件发送状态 - 发送失败'), (1226, 1, '2023-01-26 09:55:06.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 30, '不发送', '30', 'system_mail_send_status', 'info', '', '邮件发送状态 -  不发送'), (1227, 1, '2023-01-28 10:35:59.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 1, '通知公告', '1', 'system_notify_template_type', 'primary', '', '站内信模版的类型 - 通知公告'), (1228, 1, '2023-01-28 10:36:20.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 2, '系统消息', '2', 'system_notify_template_type', 'success', '', '站内信模版的类型 - 系统消息'), (1229, 1, '2023-02-12 21:50:22.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 0, '模拟支付', 'mock', 'pay_channel_code_type', 'default', '', NULL), (1230, 1, '2023-02-18 23:32:24.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 8, '支付宝条码支付', 'alipay_bar', 'pay_channel_code_type', 'default', '', NULL), (1231, 1, '2023-04-13 00:03:55.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 10, 'Vue2 Element UI 标准模版', '10', 'infra_codegen_front_type', '', '', ''), (1232, 1, '2023-04-13 00:04:08.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 20, 'Vue3 Element Plus 标准模版', '20', 'infra_codegen_front_type', '', '', ''), (1233, 1, '2023-04-13 00:04:26.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 21, 'Vue3 Element Plus Schema 模版', '21', 'infra_codegen_front_type', '', '', ''), (1234, 1, '2023-04-13 00:04:26.000000', '2023-07-08 21:22:58.789697', '1', '1', NULL, 30, 'Vue3 vben 模版', '30', 'infra_codegen_front_type', '', '', '');
COMMIT;

-- ----------------------------
-- Table structure for sys_dict_type
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict_type`;
CREATE TABLE `sys_dict_type`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '字典名称',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '字典类型',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 169 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_dict_type
-- ----------------------------
BEGIN;
INSERT INTO `sys_dict_type` VALUES (1, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:42.033257', 'admin', '1', NULL, '用户性别', 'system_user_sex', NULL), (6, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:42.033257', 'admin', '', NULL, '参数类型', 'infra_config_type', NULL), (7, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:42.033257', 'admin', '', NULL, '通知类型', 'system_notice_type', NULL), (9, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:42.033257', 'admin', '1', NULL, '操作类型', 'system_operate_type', NULL), (10, 1, '2021-01-05 17:03:48.000000', '2023-07-08 21:22:42.033257', 'admin', '', NULL, '系统状态', 'common_status', NULL), (11, 1, '2021-01-19 03:20:08.000000', '2023-07-08 21:22:42.033257', '', '', NULL, 'Boolean 是否类型', 'infra_boolean_string', 'boolean 转是否'), (104, 1, '2021-01-18 06:17:11.000000', '2023-07-08 21:22:42.033257', '', '', NULL, '登陆结果', 'system_login_result', '登陆结果'), (105, 1, '2021-01-26 00:52:50.000000', '2023-07-08 21:22:42.033257', '', '', NULL, 'Redis 超时类型', 'infra_redis_timeout_type', 'RedisKeyDefine.TimeoutTypeEnum'), (106, 1, '2021-02-05 07:08:06.000000', '2023-07-08 21:22:42.033257', '', '1', NULL, '代码生成模板类型', 'infra_codegen_template_type', NULL), (107, 1, '2021-02-07 07:44:16.000000', '2023-07-08 21:22:42.033257', '', '', NULL, '定时任务状态', 'infra_job_status', NULL), (108, 1, '2021-02-08 10:03:51.000000', '2023-07-08 21:22:42.033257', '', '', NULL, '定时任务日志状态', 'infra_job_log_status', NULL), (109, 1, '2021-02-26 00:15:51.000000', '2023-07-08 21:22:42.033257', '', '', NULL, '用户类型', 'user_type', NULL), (110, 1, '2021-02-26 07:07:01.000000', '2023-07-08 21:22:42.033257', '', '', NULL, 'API 异常数据的处理状态', 'infra_api_error_log_process_status', NULL), (111, 1, '2021-04-05 01:04:50.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '短信渠道编码', 'system_sms_channel_code', NULL), (112, 1, '2021-04-05 21:50:43.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '短信模板的类型', 'system_sms_template_type', NULL), (113, 1, '2021-04-11 20:18:03.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '短信发送状态', 'system_sms_send_status', NULL), (114, 1, '2021-04-11 20:27:14.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '短信接收状态', 'system_sms_receive_status', NULL), (115, 1, '2021-04-21 00:06:30.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '错误码的类型', 'system_error_code_type', NULL), (116, 1, '2021-10-06 00:50:46.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '登陆日志的类型', 'system_login_type', '登陆日志的类型'), (117, 1, '2021-09-21 22:34:33.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, 'OA 请假类型', 'bpm_oa_leave_type', NULL), (122, 1, '2021-11-08 17:00:26.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '支付渠道微信版本', 'pay_channel_wechat_version', '支付渠道微信版本'), (127, 1, '2021-11-18 15:39:09.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '支付渠道支付宝算法类型', 'pay_channel_alipay_sign_type', '支付渠道支付宝算法类型'), (128, 1, '2021-11-18 15:44:28.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '支付渠道支付宝公钥类型', 'pay_channel_alipay_mode', '支付渠道支付宝公钥类型'), (129, 1, '2021-11-18 16:58:55.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '支付宝网关地址', 'pay_channel_alipay_server_type', '支付宝网关地址'), (130, 1, '2021-12-03 10:35:08.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '支付渠道编码类型', 'pay_channel_code_type', '支付渠道的编码'), (131, 1, '2021-12-03 10:53:29.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '支付订单回调状态', 'pay_order_notify_status', '支付订单回调状态'), (132, 1, '2021-12-03 11:17:50.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '支付订单状态', 'pay_order_status', '支付订单状态'), (133, 1, '2021-12-03 11:27:31.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '支付订单退款状态', 'pay_order_refund_status', '支付订单退款状态'), (134, 1, '2021-12-10 16:42:50.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '退款订单状态', 'pay_refund_order_status', '退款订单状态'), (135, 1, '2021-12-10 17:14:53.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '退款订单类别', 'pay_refund_order_type', '退款订单类别'), (138, 1, '2022-01-02 08:40:45.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '流程分类', 'bpm_model_category', '流程分类'), (139, 1, '2022-01-07 23:46:42.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '流程实例的状态', 'bpm_process_instance_status', '流程实例的状态'), (140, 1, '2022-01-07 23:48:10.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '流程实例的结果', 'bpm_process_instance_result', '流程实例的结果'), (141, 1, '2022-01-11 23:50:45.000000', '2023-07-08 21:22:42.033257', '103', '103', NULL, '流程的表单类型', 'bpm_model_form_type', '流程的表单类型'), (142, 1, '2022-01-12 23:21:04.000000', '2023-07-08 21:22:42.033257', '103', '103', NULL, '任务分配规则的类型', 'bpm_task_assign_rule_type', '任务分配规则的类型'), (143, 1, '2022-01-15 00:10:35.000000', '2023-07-08 21:22:42.033257', '103', '103', NULL, '任务分配自定义脚本', 'bpm_task_assign_script', '任务分配自定义脚本'), (144, 1, '2022-02-02 13:14:45.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '代码生成的场景枚举', 'infra_codegen_scene', '代码生成的场景枚举'), (145, 1, '2022-02-16 13:01:46.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '角色类型', 'system_role_type', '角色类型'), (146, 1, '2022-03-15 00:24:38.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '文件存储器', 'infra_file_storage', '文件存储器'), (147, 1, '2022-05-12 00:20:52.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, 'OAuth 2.0 授权类型', 'system_oauth2_grant_type', 'OAuth 2.0 授权类型（模式）'), (149, 1, '2022-10-24 21:19:04.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '商品 SPU 状态', 'product_spu_status', '商品 SPU 状态'), (150, 1, '2022-11-01 12:46:06.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '优惠类型', 'promotion_discount_type', '优惠类型'), (151, 1, '2022-11-02 00:06:20.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '优惠劵模板的有限期类型', 'promotion_coupon_template_validity_type', '优惠劵模板的有限期类型'), (152, 1, '2022-11-02 00:28:01.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '营销的商品范围', 'promotion_product_scope', '营销的商品范围'), (153, 1, '2022-11-04 00:14:49.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '优惠劵的状态', 'promotion_coupon_status', '优惠劵的状态'), (154, 1, '2022-11-04 19:12:27.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '优惠劵的领取方式', 'promotion_coupon_take_type', '优惠劵的领取方式'), (155, 1, '2022-11-04 22:54:23.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '促销活动的状态', 'promotion_activity_status', '促销活动的状态'), (156, 1, '2022-11-04 22:59:23.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '营销的条件类型', 'promotion_condition_type', '营销的条件类型'), (157, 1, '2022-11-19 20:52:56.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '交易售后状态', 'trade_after_sale_status', '交易售后状态'), (158, 1, '2022-11-19 21:04:09.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '交易售后的类型', 'trade_after_sale_type', '交易售后的类型'), (159, 1, '2022-11-19 21:39:04.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '交易售后的方式', 'trade_after_sale_way', '交易售后的方式'), (160, 1, '2022-12-10 10:50:50.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '终端', 'terminal', '终端'), (161, 1, '2022-12-10 16:33:54.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '交易订单的类型', 'trade_order_type', '交易订单的类型'), (162, 1, '2022-12-10 16:48:44.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '交易订单的状态', 'trade_order_status', '交易订单的状态'), (163, 1, '2022-12-10 20:58:08.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '交易订单项的售后状态', 'trade_order_item_after_sale_status', '交易订单项的售后状态'), (164, 1, '2023-01-16 23:29:56.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '公众号自动回复的请求关键字匹配模式', 'mp_auto_reply_request_match', '公众号自动回复的请求关键字匹配模式'), (165, 1, '2023-01-17 22:17:09.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '公众号的消息类型', 'mp_message_type', '公众号的消息类型'), (166, 1, '2023-01-26 09:53:13.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '邮件发送状态', 'system_mail_send_status', '邮件发送状态'), (167, 1, '2023-01-28 10:35:10.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '站内信模版的类型', 'system_notify_template_type', '站内信模版的类型'), (168, 1, '2023-04-12 23:57:52.000000', '2023-07-08 21:22:42.033257', '1', '1', NULL, '代码生成的前端类型', 'infra_codegen_front_type', '');
COMMIT;

-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `operator` int(11) NOT NULL,
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `operation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `entity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `entity_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `old_entity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `new_entity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_mail_account
-- ----------------------------
DROP TABLE IF EXISTS `sys_mail_account`;
CREATE TABLE `sys_mail_account`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '邮箱',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `host` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'SMTP 服务器域名',
  `port` int(11) NOT NULL COMMENT 'SMTP 服务器端口',
  `ssl_enable` tinyint(4) NOT NULL COMMENT '是否开启 SSL',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_mail_account
-- ----------------------------
BEGIN;
INSERT INTO `sys_mail_account` VALUES (1, 1, '2023-07-22 23:27:26.734419', '2023-07-22 23:27:37.316719', 'alice', NULL, NULL, '936333511@qq.com', '936333511@qq.com', 'XXXXXXXXXXXXX', 'smtp.qq.com', 465, 1);
COMMIT;

-- ----------------------------
-- Table structure for sys_mail_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_mail_log`;
CREATE TABLE `sys_mail_log`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `user_id` bigint(20) NULL DEFAULT NULL COMMENT '用户编号',
  `user_type` tinyint(4) NULL DEFAULT NULL COMMENT '用户类型',
  `to_mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '接收邮箱地址',
  `account_id` bigint(20) NOT NULL COMMENT '邮箱账号编号',
  `from_mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '发送邮箱地址',
  `template_id` bigint(20) NOT NULL COMMENT '模板编号',
  `template_code` varchar(63) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模板编码',
  `template_nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '模版发送人名称',
  `template_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '邮件标题',
  `template_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '邮件内容',
  `template_params` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '邮件参数',
  `send_status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '发送状态',
  `send_time` datetime(0) NULL DEFAULT NULL COMMENT '发送时间',
  `send_message_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '发送返回的消息 ID',
  `send_exception` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '发送异常',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_mail_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_mail_template
-- ----------------------------
DROP TABLE IF EXISTS `sys_mail_template`;
CREATE TABLE `sys_mail_template`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模板名称',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模板编码',
  `account_id` bigint(20) NOT NULL COMMENT '发送的邮箱账号编号',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '发送人名称',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模板标题',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模板内容',
  `params` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '参数数组',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_mail_template
-- ----------------------------
BEGIN;
INSERT INTO `sys_mail_template` VALUES (1, 1, '2023-07-22 23:28:53.806597', '2023-07-22 23:28:53.806597', NULL, NULL, NULL, 'NEST后台用户短信登录', 'admin-sms-login', 1, 'NEST管理员', 'NESTJS平台', '<p>您的验证码是{code}，名字是{name}</p>', '[\"code\",\"name\"]', NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '路由名称',
  `parent_id` int(11) NOT NULL DEFAULT 0 COMMENT '父级ID',
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `type` int(11) NOT NULL DEFAULT 1 COMMENT '菜单类型: 1.目录，2.菜单,3:按钮',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '路由地址',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '组件名称',
  `permission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '权限标识',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `sort` int(11) NULL DEFAULT 0 COMMENT '排序',
  `component_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '组件名称',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `visible` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否可见',
  `keep_alive` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否缓存组件状态',
  `always_show` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否总是显示',
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 101 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu` VALUES (1, '系统管理', 0, 1, 1, '/system', NULL, '', 'system', 10, NULL, '2023-07-03 09:49:36.697405', '2023-07-03 09:49:36.772401', NULL, NULL, 1, 1, 1, 1, NULL), (2, '基础设施', 0, 1, 1, '/infra', NULL, '', 'monitor', 20, NULL, '2023-07-03 09:49:36.697405', '2023-07-03 09:49:36.772401', NULL, NULL, 1, 1, 1, 1, NULL), (3, '用户管理', 1, 1, 2, 'user', 'system/user/index', 'system:user:list', 'user', 1, 'SystemUser', '2023-07-03 09:49:36.697405', '2023-07-13 09:35:21.756782', NULL, NULL, 1, 1, 1, 1, NULL), (4, '角色管理', 1, 1, 2, 'role', 'system/role/index', '', 'peoples', 2, 'SystemRole', '2023-07-03 09:49:36.697405', '2023-07-13 09:35:21.807869', NULL, NULL, 1, 1, 1, 1, NULL), (5, '菜单管理', 1, 1, 2, 'menu', 'system/menu/index', '', 'tree-table', 3, 'SystemMenu', '2023-07-03 09:49:36.697405', '2023-07-13 09:35:21.855578', NULL, NULL, 1, 1, 1, 1, NULL), (6, '部门管理', 1, 1, 2, 'dept', 'system/dept/index', '', 'tree', 4, 'SystemDept', '2023-07-03 09:49:36.697405', '2023-07-13 09:35:21.935706', NULL, NULL, 1, 1, 1, 1, NULL), (7, '字典管理', 1, 1, 2, 'dict', 'system/dict/index', '', 'dict', 6, 'SystemDictType', '2021-01-05 17:03:48.000000', '2023-07-27 22:35:30.407573', 'admin', '1', 1, 1, 1, 1, NULL), (8, '通知公告', 1, 1, 2, 'notice', 'system/notice/index', '', 'message', 8, 'SystemNotice', '2021-01-05 17:03:48.000000', '2023-07-13 09:35:22.039799', 'admin', '1', 1, 1, 1, 1, NULL), (9, '用户新增', 3, 1, 3, '', '', 'system:user:create', '', 2, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:52:43.634938', NULL, NULL, 1, 1, 1, 1, NULL), (10, '用户修改', 3, 1, 3, '', '', 'system:user:update', '', 3, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:52:44.496236', NULL, NULL, 1, 1, 1, 1, NULL), (11, '用户删除', 3, 1, 3, '', '', 'system:user:delete', '', 4, NULL, '2021-01-05 17:03:48.000000', '2023-07-27 22:35:31.640477', 'admin', '1', 1, 1, 1, 1, NULL), (12, '用户导出', 3, 1, 3, '', '', 'system:user:export', '#', 5, NULL, '2021-01-05 17:03:48.000000', '2023-07-27 22:35:32.161528', 'admin', '', 1, 1, 1, 1, NULL), (13, '用户导入', 3, 1, 3, '', '', 'system:user:import', '#', 6, NULL, '2021-01-05 17:03:48.000000', '2023-07-27 22:35:33.017497', 'admin', '', 1, 1, 1, 1, NULL), (14, '重置密码', 3, 1, 3, '', '', 'system:user:update-password', '', 7, NULL, '2021-01-05 17:03:48.000000', '2023-07-27 22:35:33.740570', 'admin', '1', 1, 1, 1, 1, NULL), (15, '角色查询', 4, 1, 3, '', '', 'system:role:query', '#', 1, NULL, '2021-01-05 17:03:48.000000', '2023-07-27 22:35:34.465487', 'admin', '', 1, 1, 1, 1, NULL), (16, '角色新增', 4, 1, 3, '', '', 'system:role:create', '', 2, NULL, '2021-01-05 17:03:48.000000', '2023-07-27 22:35:35.142547', 'admin', '1', 1, 1, 1, 1, NULL), (17, '角色修改', 4, 1, 3, '', '', 'system:role:update', '', 3, NULL, '2021-01-05 17:03:48.000000', '2023-07-27 22:35:35.815672', 'admin', '1', 1, 1, 1, 1, NULL), (18, '角色删除', 4, 1, 3, '', '', 'system:role:delete', '', 4, NULL, '2021-01-05 17:03:48.000000', '2023-07-27 22:35:36.550748', 'admin', '1', 1, 1, 1, 1, NULL), (19, '角色导出', 4, 1, 3, '', '', 'system:role:export', '#', 5, NULL, '2021-01-05 17:03:48.000000', '2023-07-27 22:35:37.266774', 'admin', '', 1, 1, 1, 1, NULL), (20, '菜单查询', 5, 1, 3, '', '', 'system:menu:query', '#', 1, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:53:11.578765', NULL, NULL, 1, 1, 1, 1, NULL), (21, '菜单新增', 5, 1, 3, '', '', 'system:menu:create', '#', 2, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:53:13.993611', NULL, NULL, 1, 1, 1, 1, NULL), (22, '菜单修改', 5, 1, 3, '', '', 'system:menu:update', '#', 3, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:53:14.770033', NULL, NULL, 1, 1, 1, 1, NULL), (23, '菜单删除', 5, 1, 3, '', '', 'system:menu:delete', '#', 4, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:53:15.512965', NULL, NULL, 1, 1, 1, 1, NULL), (24, '部门查询', 6, 1, 3, '', '', 'system:dept:query', '#', 1, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:53:20.154967', NULL, NULL, 1, 1, 1, 1, NULL), (25, '部门新增', 6, 1, 3, '', '', 'system:dept:create', '', 2, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:53:21.169966', NULL, NULL, 1, 1, 1, 1, NULL), (26, '部门修改', 6, 1, 3, '', '', 'system:dept:update', '', 3, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:53:22.118937', NULL, NULL, 1, 1, 1, 1, NULL), (27, '部门删除', 6, 1, 3, '', '', 'system:dept:delete', '', 4, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:53:23.789716', NULL, NULL, 1, 1, 1, 1, NULL), (28, '字典查询', 7, 1, 3, '#', '', 'system:dict:query', '#', 1, NULL, '2021-01-05 17:03:48.000000', '2023-07-27 22:35:40.071633', 'admin', '1', 1, 1, 1, 1, NULL), (29, '字典新增', 7, 1, 3, '', '', 'system:dict:create', '', 2, NULL, '2021-01-05 17:03:48.000000', '2023-07-27 22:35:40.803749', 'admin', '1', 1, 1, 1, 1, NULL), (30, '字典修改', 7, 1, 3, '', '', 'system:dict:update', '', 3, NULL, '2021-01-05 17:03:48.000000', '2023-07-27 22:35:41.387780', 'admin', '1', 1, 1, 1, 1, NULL), (31, '字典删除', 7, 1, 3, '', '', 'system:dict:delete', '', 4, NULL, '2021-01-05 17:03:48.000000', '2023-07-27 22:35:42.015779', 'admin', '1', 1, 1, 1, 1, NULL), (32, '字典导出', 7, 1, 3, '#', '', 'system:dict:export', '#', 5, NULL, '2021-01-05 17:03:48.000000', '2023-07-27 22:35:42.658747', 'admin', '1', 1, 1, 1, 1, NULL), (33, '公告查询', 8, 1, 3, '#', '', 'system:notice:query', '#', 1, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:53:36.369474', NULL, NULL, 1, 1, 1, 1, NULL), (34, '公告新增', 8, 1, 3, '', '', 'system:notice:create', '', 2, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:53:37.444433', NULL, NULL, 1, 1, 1, 1, NULL), (35, '公告修改', 8, 1, 3, '', '', 'system:notice:update', '', 3, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:53:39.648464', NULL, NULL, 1, 1, 1, 1, NULL), (36, '公告删除', 8, 1, 3, '', '', 'system:notice:delete', '', 4, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:53:40.958450', NULL, NULL, 1, 1, 1, 1, NULL), (37, '设置角色菜单权限', 4, 1, 3, '', '', 'system:permission:assign-role-menu', '', 6, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:53:57.759092', NULL, NULL, 1, 1, 1, 1, NULL), (38, '设置角色数据权限', 4, 1, 3, '', '', 'system:permission:assign-role-data-scope', '', 7, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:53:58.799937', NULL, NULL, 1, 1, 1, 1, NULL), (39, '设置用户角色', 4, 1, 3, '', '', 'system:permission:assign-user-role', '', 8, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:54:00.160966', NULL, NULL, 1, 1, 1, 1, NULL), (40, '文件列表', 77, 1, 2, 'file', 'infra/file/index', '', 'upload', 5, 'InfraFile', '2023-07-03 09:49:36.697405', '2023-07-20 23:54:41.007967', NULL, NULL, 1, 1, 1, 1, NULL), (41, '文件查询', 40, 1, 3, '', '', 'infra:file:query', '', 1, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:54:57.992444', NULL, NULL, 1, 1, 1, 1, NULL), (42, '文件删除', 40, 1, 3, '', '', 'infra:file:delete', '', 4, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:55:34.150203', NULL, NULL, 1, 1, 1, 1, NULL), (43, '短信管理', 1, 1, 1, 'sms', NULL, '', 'validCode', 11, NULL, '2023-07-03 09:49:36.697405', '2023-07-13 09:35:23.359640', NULL, NULL, 1, 1, 1, 1, NULL), (44, '短信渠道', 43, 1, 2, 'sms-channel', 'system/sms/channel/index', '', 'phone', 0, 'SystemSmsChannel', '2023-07-03 09:49:36.697405', '2023-07-20 23:56:23.807447', NULL, NULL, 1, 1, 1, 1, NULL), (45, '短信渠道查询', 44, 1, 3, '', '', 'system:sms-channel:query', '', 1, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:56:29.152717', NULL, NULL, 1, 1, 1, 1, NULL), (46, '短信渠道创建', 44, 1, 3, '', '', 'system:sms-channel:create', '', 2, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:56:30.451755', NULL, NULL, 1, 1, 1, 1, NULL), (47, '短信渠道更新', 44, 1, 3, '', '', 'system:sms-channel:update', '', 3, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:56:32.752795', NULL, NULL, 1, 1, 1, 1, NULL), (48, '短信渠道删除', 44, 1, 3, '', '', 'system:sms-channel:delete', '', 4, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:56:34.943975', NULL, NULL, 1, 1, 1, 1, NULL), (49, '短信模板', 43, 1, 2, 'sms-template', 'system/sms/template/index', '', 'phone', 1, 'SystemSmsTemplate', '2021-04-01 17:35:17.000000', '2023-07-27 22:35:51.125717', '', '1', 1, 1, 1, 1, NULL), (50, '短信模板查询', 49, 1, 3, '', '', 'system:sms-template:query', '', 1, NULL, '2021-04-01 17:35:17.000000', '2023-07-27 22:35:51.552982', '', '', 1, 1, 1, 1, NULL), (51, '短信模板创建', 49, 1, 3, '', '', 'system:sms-template:create', '', 2, NULL, '2021-04-01 17:35:17.000000', '2023-07-27 22:35:52.236942', '', '', 1, 1, 1, 1, NULL), (52, '短信模板更新', 49, 1, 3, '', '', 'system:sms-template:update', '', 3, NULL, '2021-04-01 17:35:17.000000', '2023-07-27 22:35:52.767831', '', '', 1, 1, 1, 1, NULL), (53, '短信模板删除', 49, 1, 3, '', '', 'system:sms-template:delete', '', 4, NULL, '2021-04-01 17:35:17.000000', '2023-07-27 22:35:53.259001', '', '', 1, 1, 1, 1, NULL), (54, '短信模板导出', 49, 1, 3, '', '', 'system:sms-template:export', '', 5, NULL, '2021-04-01 17:35:17.000000', '2023-07-27 22:35:53.866958', '', '', 1, 1, 1, 1, NULL), (55, '发送测试短信', 49, 1, 3, '', '', 'system:sms-template:send-sms', '', 6, NULL, '2021-04-11 00:26:40.000000', '2023-07-27 22:35:54.444071', '1', '1', 1, 1, 1, 1, NULL), (56, '短信日志', 43, 1, 2, 'sms-log', 'system/sms/log/index', '', 'phone', 2, 'SystemSmsLog', '2021-04-11 08:37:05.000000', '2023-07-27 22:35:54.882035', '', '1', 1, 1, 1, 1, NULL), (57, '短信日志查询', 56, 1, 3, '', '', 'system:sms-log:query', '', 1, NULL, '2021-04-11 08:37:05.000000', '2023-07-27 22:35:55.448655', '', '', 1, 1, 1, 1, NULL), (58, '短信日志导出', 56, 1, 3, '', '', 'system:sms-log:export', '', 5, NULL, '2021-04-11 08:37:05.000000', '2023-07-27 22:35:56.033993', '', '', 1, 1, 1, 1, NULL), (59, '租户列表', 65, 1, 2, 'list', 'system/tenant/index', '', 'peoples', 0, 'SystemTenant', '2021-12-14 12:31:43.000000', '2023-07-20 23:58:04.223010', '', '1', 1, 1, 1, 1, NULL), (60, '租户查询', 59, 1, 3, '', '', 'system:tenant:query', '', 1, NULL, '2021-12-14 12:31:44.000000', '2023-07-27 22:35:57.139300', '', '', 1, 1, 1, 1, NULL), (61, '租户创建', 59, 1, 3, '', '', 'system:tenant:create', '', 2, NULL, '2021-12-14 12:31:44.000000', '2023-07-27 22:35:57.593364', '', '', 1, 1, 1, 1, NULL), (62, '租户更新', 59, 1, 3, '', '', 'system:tenant:update', '', 3, NULL, '2021-12-14 12:31:44.000000', '2023-07-27 22:35:58.784250', '', '', 1, 1, 1, 1, NULL), (63, '租户删除', 59, 1, 3, '', '', 'system:tenant:delete', '', 4, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:58:13.453276', NULL, NULL, 1, 1, 1, 1, NULL), (64, '租户导出', 59, 1, 3, '', '', 'system:tenant:export', '', 5, NULL, '2023-07-03 09:49:36.697405', '2023-07-20 23:58:15.060469', NULL, NULL, 1, 1, 1, 1, NULL), (65, '租户管理', 1, 1, 2, 'tenant', NULL, '', 'peoples', 0, NULL, '2023-07-03 09:49:36.697405', '2023-07-13 09:35:24.256139', NULL, NULL, 1, 1, 1, 1, NULL), (66, '租户套餐', 65, 1, 2, 'package', 'system/tenantPackage/index', '', 'eye', 0, 'SystemTenantPackage', '2022-02-19 17:44:06.000000', '2023-07-20 23:58:29.707728', '', '1', 1, 1, 1, 1, NULL), (67, '租户套餐查询', 66, 1, 3, '', '', 'system:tenant-package:query', '', 1, NULL, '2022-02-19 17:44:06.000000', '2023-07-27 22:36:08.358581', '', '', 1, 1, 1, 1, NULL), (68, '租户套餐创建', 66, 1, 3, '', '', 'system:tenant-package:create', '', 2, NULL, '2022-02-19 17:44:06.000000', '2023-07-27 22:36:09.072528', '', '', 1, 1, 1, 1, NULL), (69, '租户套餐更新', 66, 1, 3, '', '', 'system:tenant-package:update', '', 3, NULL, '2022-02-19 17:44:06.000000', '2023-07-27 22:36:09.725538', '', '', 1, 1, 1, 1, NULL), (70, '租户套餐删除', 66, 1, 3, '', '', 'system:tenant-package:delete', '', 4, NULL, '2022-02-19 17:44:06.000000', '2023-07-27 22:36:10.889500', '', '', 1, 1, 1, 1, NULL), (71, '文件配置', 77, 1, 2, 'file-config', 'infra/fileConfig/index', '', 'config', 0, 'InfraFileConfig', '2022-03-15 14:35:28.000000', '2023-07-21 00:43:05.288865', '', '1', 1, 1, 1, 1, NULL), (72, '文件配置查询', 71, 1, 3, '', '', 'infra:file-config:query', '', 1, NULL, '2022-03-15 14:35:28.000000', '2023-07-20 23:59:17.414997', '', '', 1, 1, 1, 1, NULL), (73, '文件配置创建', 71, 1, 3, '', '', 'infra:file-config:create', '', 2, NULL, '2022-03-15 14:35:28.000000', '2023-07-20 23:59:19.752804', '', '', 1, 1, 1, 1, NULL), (74, '文件配置更新', 71, 1, 3, '', '', 'infra:file-config:update', '', 3, NULL, '2022-03-15 14:35:28.000000', '2023-07-20 23:59:22.266814', '', '', 1, 1, 1, 1, NULL), (75, '文件配置删除', 71, 1, 3, '', '', 'infra:file-config:delete', '', 4, NULL, '2022-03-15 14:35:28.000000', '2023-07-20 23:59:24.503214', '', '', 1, 1, 1, 1, NULL), (76, '文件配置导出', 71, 1, 3, '', '', 'infra:file-config:export', '', 5, NULL, '2022-03-15 14:35:28.000000', '2023-07-20 23:59:26.483001', '', '', 1, 1, 1, 1, NULL), (77, '文件管理', 2, 1, 2, 'file', NULL, '', 'download', 5, '', '2023-07-03 09:49:36.697405', '2023-07-13 09:35:24.698868', NULL, NULL, 1, 1, 1, 1, NULL), (78, '邮箱管理', 1, 1, 2, 'mail', NULL, '', 'email', 11, NULL, '2023-07-03 09:49:36.697405', '2023-07-13 09:35:24.731493', NULL, NULL, 1, 1, 1, 1, NULL), (79, '邮箱账号', 78, 1, 2, 'mail-account', 'system/mail/account/index', '', 'user', 0, 'SystemMailAccount', '2023-07-03 09:49:36.697405', '2023-07-20 23:59:48.931694', NULL, NULL, 1, 1, 1, 1, NULL), (80, '账号查询', 79, 1, 3, '', '', 'system:mail-account:query', '', 1, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:00:17.484505', NULL, NULL, 1, 1, 1, 1, NULL), (81, '账号创建', 79, 1, 3, '', '', 'system:mail-account:create', '', 2, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:00:19.045443', NULL, NULL, 1, 1, 1, 1, NULL), (82, '账号更新', 79, 1, 3, '', '', 'system:mail-account:update', '', 3, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:00:21.156482', NULL, NULL, 1, 1, 1, 1, NULL), (83, '账号删除', 79, 1, 3, '', '', 'system:mail-account:delete', '', 4, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:00:23.802450', NULL, NULL, 1, 1, 1, 1, NULL), (84, '邮件模版', 78, 1, 2, 'mail-template', 'system/mail/template/index', '', 'education', 0, 'SystemMailTemplate', '2023-07-03 09:49:36.697405', '2023-07-21 00:00:41.364938', NULL, NULL, 1, 1, 1, 1, NULL), (85, '模版查询', 84, 1, 3, '', '', 'system:mail-template:query', '', 1, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:00:44.598282', NULL, NULL, 1, 1, 1, 1, NULL), (86, '模版创建', 84, 1, 3, '', '', 'system:mail-template:create', '', 2, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:00:45.602345', NULL, NULL, 1, 1, 1, 1, NULL), (87, '模版更新', 84, 1, 3, '', '', 'system:mail-template:update', '', 3, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:00:47.413199', NULL, NULL, 1, 1, 1, 1, NULL), (88, '模版删除', 84, 1, 3, '', '', 'system:mail-template:delete', '', 4, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:00:49.120230', NULL, NULL, 1, 1, 1, 1, NULL), (89, '邮件记录', 78, 1, 2, 'mail-log', 'system/mail/log/index', '', 'log', 0, 'SystemMailLog', '2023-07-03 09:49:36.697405', '2023-07-21 00:01:03.528496', NULL, NULL, 1, 1, 1, 1, NULL), (90, '日志查询', 89, 1, 3, '', '', 'system:mail-log:query', '', 1, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:01:17.592987', NULL, NULL, 1, 1, 1, 1, NULL), (91, '发送测试邮件', 84, 1, 3, '', '', 'system:mail-template:send-mail', '', 5, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:05:04.495799', NULL, NULL, 1, 1, 1, 1, NULL), (92, '站内信管理', 1, 1, 1, 'notify', NULL, '', 'message', 11, NULL, '2023-07-03 09:49:36.697405', '2023-07-13 09:35:25.326231', NULL, NULL, 1, 1, 1, 1, NULL), (93, '模板管理', 92, 1, 2, 'notify-template', 'system/notify/template/index', '', 'education', 0, 'SystemNotifyTemplate', '2023-07-03 09:49:36.697405', '2023-07-21 00:02:42.984039', NULL, NULL, 1, 1, 1, 1, NULL), (94, '站内信模板查询', 93, 1, 3, '', '', 'system:notify-template:query', '', 1, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:02:48.661210', NULL, NULL, 1, 1, 1, 1, NULL), (95, '站内信模板创建', 93, 1, 3, '', '', 'system:notify-template:create', '', 2, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:02:50.240256', NULL, NULL, 1, 1, 1, 1, NULL), (96, '站内信模板更新', 93, 1, 3, '', '', 'system:notify-template:update', '', 3, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:02:51.917247', NULL, NULL, 1, 1, 1, 1, NULL), (97, '站内信模板删除', 93, 1, 3, '', '', 'system:notify-template:delete', '', 4, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:02:53.955252', NULL, NULL, 1, 1, 1, 1, NULL), (98, '发送测试站内信', 93, 1, 3, '', '', 'system:notify-template:send-notify', '', 5, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:03:12.239728', NULL, NULL, 1, 1, 1, 1, NULL), (99, '消息记录', 92, 1, 2, 'notify-message', 'system/notify/message/index', '', 'edit', 0, 'SystemNotifyMessage', '2023-07-03 09:49:36.697405', '2023-07-21 00:03:23.927016', NULL, NULL, 1, 1, 1, 1, NULL), (100, '站内信消息查询', 99, 1, 3, '', '', 'system:notify-message:query', '', 1, NULL, '2023-07-03 09:49:36.697405', '2023-07-21 00:03:29.738123', NULL, NULL, 1, 1, 1, 1, NULL);
COMMIT;

-- ----------------------------
-- Table structure for sys_notice
-- ----------------------------
DROP TABLE IF EXISTS `sys_notice`;
CREATE TABLE `sys_notice`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '公告标题',
  `type` tinyint(4) NOT NULL DEFAULT 1 COMMENT '公告类型（1通知 2公告）',
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '公告内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_notice
-- ----------------------------
BEGIN;
INSERT INTO `sys_notice` VALUES (1, 1, 1, '通知-测试标题', 1, NULL, '2023-07-08 22:16:02.377641', '2023-07-08 22:16:21.446054', '1', '1', '测试内容'), (2, 1, 1, '公告-测试标题', 1, NULL, '2023-07-08 22:16:53.702792', '2023-07-08 22:16:53.702792', '1', '1', '测试内容');
COMMIT;

-- ----------------------------
-- Table structure for sys_notify_message
-- ----------------------------
DROP TABLE IF EXISTS `sys_notify_message`;
CREATE TABLE `sys_notify_message`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `user_id` bigint(20) NOT NULL COMMENT '用户id',
  `user_type` tinyint(4) NOT NULL COMMENT '用户类型',
  `template_id` bigint(20) NOT NULL COMMENT '模版编号',
  `template_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模版编号',
  `template_nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模版发送人名称',
  `template_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模版内容',
  `template_params` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模版参数',
  `read_status` tinyint(4) NOT NULL COMMENT '是否已读',
  `read_time` datetime(0) NOT NULL COMMENT '已读时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_notify_message
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_notify_template
-- ----------------------------
DROP TABLE IF EXISTS `sys_notify_template`;
CREATE TABLE `sys_notify_template`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模板名称',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模版编码',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '发送人名称',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模版内容',
  `type` tinyint(4) NOT NULL COMMENT '类型',
  `params` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '参数数组',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '模版参数',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_notify_template
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_operate_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_operate_log`;
CREATE TABLE `sys_operate_log`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `operator` int(11) NOT NULL,
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `operation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `entity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `entity_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `old_entity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `new_entity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_operate_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_post
-- ----------------------------
DROP TABLE IF EXISTS `sys_post`;
CREATE TABLE `sys_post`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '岗位编码',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '岗位名称',
  `sort` int(11) NOT NULL DEFAULT 1 COMMENT '显示顺序',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_post
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role`  (
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色权限字符串',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '显示顺序',
  `data_scope` tinyint(4) NOT NULL DEFAULT 1 COMMENT '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限） 目前默认1',
  `data_scope_dept_ids` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '数据范围(指定部门数组)',
  `type` tinyint(4) NOT NULL DEFAULT 2 COMMENT '角色类型: 1.内置角色，2.自定义角色',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_223de54d6badbe43a5490450c3`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` VALUES (1, 1, '普通用户', '普通用户', NULL, 'common', '2023-07-03 09:49:37.001783', '2023-07-03 09:49:37.070464', NULL, NULL, 0, 1, '', 0, 1), (1, 1, '测试', '测试', NULL, 'test', '2023-07-16 23:45:13.267677', '2023-07-27 00:06:02.000000', 'alice', NULL, 3, 1, '', 2, 2), (1, 1, '超级管理员', '超级管理员', NULL, 'super_admin', '2023-07-03 09:49:37.001783', '2023-07-03 09:49:37.070464', NULL, NULL, 0, 1, '', 0, 3);
COMMIT;

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu`  (
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `menu_id` int(11) NOT NULL DEFAULT 1 COMMENT '菜单Id',
  `role_id` int(11) NOT NULL DEFAULT 1 COMMENT '角色Id',
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 302 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_menu` VALUES (1, 1, 1, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:12:54.174315', 'alice', 'alice', 1), (1, 1, 2, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:12:54.747566', 'alice', 'alice', 2), (1, 1, 3, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 3), (1, 1, 4, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 4), (1, 1, 5, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 5), (1, 1, 6, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 6), (1, 1, 7, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 7), (1, 1, 8, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 8), (1, 1, 9, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 9), (1, 1, 10, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 10), (1, 1, 11, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 11), (1, 1, 12, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 12), (1, 1, 13, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 13), (1, 1, 14, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 14), (1, 1, 15, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 15), (1, 1, 16, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 16), (1, 1, 17, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 17), (1, 1, 18, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 18), (1, 1, 19, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 19), (1, 1, 20, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 20), (1, 1, 21, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 21), (1, 1, 22, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 22), (1, 1, 23, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 23), (1, 1, 24, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 24), (1, 1, 25, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 25), (1, 1, 26, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 26), (1, 1, 27, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 27), (1, 1, 28, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 28), (1, 1, 29, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 29), (1, 1, 30, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 30), (1, 1, 31, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 31), (1, 1, 32, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 32), (1, 1, 33, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 33), (1, 1, 34, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 34), (1, 1, 35, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 35), (1, 1, 36, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 36), (1, 1, 37, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 37), (1, 1, 38, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 38), (1, 1, 39, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 39), (1, 1, 40, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 40), (1, 1, 41, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 41), (1, 1, 42, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 42), (1, 1, 43, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 43), (1, 1, 44, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 44), (1, 1, 45, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 45), (1, 1, 46, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 46), (1, 1, 47, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 47), (1, 1, 48, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 48), (1, 1, 49, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 49), (1, 1, 50, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 50), (1, 1, 51, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 51), (1, 1, 52, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 52), (1, 1, 53, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 53), (1, 1, 54, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 54), (1, 1, 55, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 55), (1, 1, 56, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 56), (1, 1, 57, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 57), (1, 1, 58, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 58), (1, 1, 59, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 59), (1, 1, 60, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 60), (1, 1, 61, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 61), (1, 1, 62, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 62), (1, 1, 63, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 63), (1, 1, 64, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 64), (1, 1, 65, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 65), (1, 1, 66, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 66), (1, 1, 67, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 67), (1, 1, 68, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 68), (1, 1, 69, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 69), (1, 1, 70, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 70), (1, 1, 71, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 71), (1, 1, 72, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 72), (1, 1, 73, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 73), (1, 1, 74, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 74), (1, 1, 75, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 75), (1, 1, 76, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 76), (1, 1, 77, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 77), (1, 1, 78, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 78), (1, 1, 79, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 79), (1, 1, 80, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 80), (1, 1, 81, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 81), (1, 1, 82, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 82), (1, 1, 83, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 83), (1, 1, 84, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 84), (1, 1, 85, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 85), (1, 1, 86, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 86), (1, 1, 87, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 87), (1, 1, 88, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 88), (1, 1, 89, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 89), (1, 1, 90, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 90), (1, 1, 91, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 91), (1, 1, 92, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 92), (1, 1, 93, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 93), (1, 1, 94, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 94), (1, 1, 95, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 95), (1, 1, 96, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 96), (1, 1, 97, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 97), (1, 1, 98, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 98), (1, 1, 99, 1, NULL, '2023-07-18 20:12:49.654123', '2023-07-21 00:13:39.853855', 'alice', 'alice', 99), (1, 1, 100, 1, NULL, '2023-07-21 00:12:16.000000', '2023-07-21 00:13:39.853855', 'alice', 'alice', 100);
COMMIT;

-- ----------------------------
-- Table structure for sys_sensitive_word
-- ----------------------------
DROP TABLE IF EXISTS `sys_sensitive_word`;
CREATE TABLE `sys_sensitive_word`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_sensitive_word
-- ----------------------------
BEGIN;
INSERT INTO `sys_sensitive_word` VALUES (1, 1, 1, '土豆', '好呀', NULL, '2023-07-09 11:03:58.000000', '2023-07-09 11:04:09.000000', '1', '1'), (2, 1, 1, 'XXX', 'xxx', NULL, '2023-07-09 11:04:02.000000', '2023-07-09 11:04:13.000000', '1', '1'), (3, 1, 1, '白痴', '白痴', NULL, '2023-07-09 11:04:06.000000', '2023-07-09 11:04:16.000000', '1', '1');
COMMIT;

-- ----------------------------
-- Table structure for sys_sms_channel
-- ----------------------------
DROP TABLE IF EXISTS `sys_sms_channel`;
CREATE TABLE `sys_sms_channel`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '短信签名',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '渠道编码',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `api_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '短信 API 的账号',
  `api_secret` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '短信 API 的秘钥',
  `callback_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '短信 API 的秘钥',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_sms_channel
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_sms_code
-- ----------------------------
DROP TABLE IF EXISTS `sys_sms_code`;
CREATE TABLE `sys_sms_code`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '手机号',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '验证码',
  `create_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '创建 IP',
  `scene` tinyint(4) NOT NULL COMMENT '发送场景',
  `today_index` tinyint(4) NOT NULL DEFAULT 0 COMMENT '今日发送的第几条',
  `api_secret` tinyint(4) NULL DEFAULT NULL COMMENT '是否使用',
  `used_time` datetime(0) NULL DEFAULT NULL COMMENT '使用时间',
  `used_ip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '使用 IP',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_sms_code
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_sms_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_sms_log`;
CREATE TABLE `sys_sms_log`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `channel_id` int(11) NOT NULL COMMENT '短信渠道编号',
  `channel_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '短信渠道编码',
  `template_id` int(11) NOT NULL COMMENT '模板编号',
  `template_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模板编码',
  `template_type` tinyint(4) NOT NULL COMMENT '短信类型',
  `template_content` int(11) NOT NULL COMMENT '短信内容',
  `template_params` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '短信参数',
  `api_template_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '短信 API 的模板编号',
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '手机号',
  `user_id` bigint(20) NOT NULL COMMENT '用户编号',
  `user_type` tinyint(4) NOT NULL COMMENT '用户类型',
  `send_status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '发送状态',
  `send_time` datetime(0) NULL DEFAULT NULL COMMENT '发送时间',
  `send_code` int(11) NULL DEFAULT NULL COMMENT '发送结果的编码',
  `send_msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '发送结果的提示',
  `api_send_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '短信 API 发送结果的编码',
  `api_send_msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '短信 API 发送失败的提示',
  `api_request_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '短信 API 发送返回的唯一请求 ID',
  `api_serial_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '短信 API 发送返回的序号',
  `receive_status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '接收状态',
  `receive_time` datetime(0) NULL DEFAULT NULL COMMENT '接收时间',
  `api_receive_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'API 接收结果的编码',
  `api_receive_msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT 'API 接收结果的说明',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_sms_log
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_sms_template
-- ----------------------------
DROP TABLE IF EXISTS `sys_sms_template`;
CREATE TABLE `sys_sms_template`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `type` tinyint(4) NOT NULL COMMENT '短信签名',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模板编码',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模板名称',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '模板内容',
  `params` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '参数数组',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '备注',
  `api_template_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '短信 API 的模板编号',
  `channel_id` bigint(20) NOT NULL DEFAULT 0 COMMENT '今日发送的第几条',
  `channel_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '短信渠道编码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_sms_template
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for sys_tenant
-- ----------------------------
DROP TABLE IF EXISTS `sys_tenant`;
CREATE TABLE `sys_tenant`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '租户名',
  `contact_user_id` bigint(20) NULL DEFAULT NULL COMMENT '联系人的用户编号',
  `contact_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '联系人',
  `contact_mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号码',
  `domain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '绑定域名',
  `package_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '租户套餐编号',
  `expire_time` datetime(0) NULL DEFAULT NULL COMMENT '过期时间',
  `account_count` int(11) NULL DEFAULT NULL COMMENT '账号数量',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_tenant
-- ----------------------------
BEGIN;
INSERT INTO `sys_tenant` VALUES (1, 1, '2023-07-18 23:20:28.692000', '2023-07-19 19:36:27.311000', NULL, 'alice', NULL, 'NEST-系统默认', 1, 'Alice', '186xxxx6793', 'mezhu.cc', '1', '2099-07-18 23:20:20', 20);
COMMIT;

-- ----------------------------
-- Table structure for sys_tenant_package
-- ----------------------------
DROP TABLE IF EXISTS `sys_tenant_package`;
CREATE TABLE `sys_tenant_package`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '套餐名',
  `menu_ids` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '过期时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_tenant_package
-- ----------------------------
BEGIN;
INSERT INTO `sys_tenant_package` VALUES (1, 1, '2023-07-19 20:25:22.106101', '2023-07-19 20:25:22.106101', 'alice', NULL, NULL, '基础套餐', '2,1243,1237,1242,1241,1240,1239,1238,1090,1092,1091,1,2144,2151,2152,2145,2150,2149,2148,2147,2146,2130,2141,2142,2136,2143,2140,2139,2138,2137,2131,2135,2134,2133,2132,1224,1225,1229,1228,1227,1226,1138,1143,1142,1141,1140,1139,1093,1107,1109,1108,1100,1106,1105,1104,1103,1102,1101,1094,1098,1097,1096,1095,107,1039,1038,1037,1036,105,1030,1029,1028,1027,1026,103,1020,1019,1018,1017,102,1016,1015,1014,1013,101,1065,1064,1063,1012,1011,1010,1009,1008,100,1007,1006,1005,1004,1003,1002', '基础套餐');
COMMIT;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `validate_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `salt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dept_id` int(11) NULL DEFAULT NULL,
  `role_id` int(11) NULL DEFAULT NULL,
  `id_card` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `birthday` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sex` int(11) NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `is_super` tinyint(4) NOT NULL DEFAULT 0,
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_9d0ba62d30b6362c5651c6c261`(`user_name`) USING BTREE,
  UNIQUE INDEX `IDX_b4fef78c836a93601e031f4b07`(`mobile`) USING BTREE,
  UNIQUE INDEX `IDX_a78066266d5da92bbaf1f70cf8`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` VALUES (1, 1, 1, 'alice', 'Alice', '9cf96ae1bf65a71d2be71ef8041b65890908d36a', '186xxxx6793', '936333511@qq.com', NULL, 'LY2LT2R5L6BCaoRH5dS9AoSO0S79Xfcf', '1687672029403', 1, 1, '', NULL, 1, NULL, '2023-07-03 09:49:36.393305', '2023-07-21 00:14:20.205429', '1', '1', 0, NULL), (15, 1, 1, 'test123', '测试', 'e3b773f31a33b7790ec60b3f5338a395f0de1414', '186xxxx6793', '186xxxx6793@qq.com', NULL, 'jbkiQ13pKwdeQJ8Pn44eYl8rJYua4umz', '1688916606158', 1, NULL, NULL, NULL, 1, NULL, '2023-07-09 23:30:06.822397', '2023-07-09 23:50:36.000000', 'alice', 'alice', 0, 'sdfsfsdfsf'), (16, 1, 1, 'test', 'test', 'b716eb3572a4c748f2ca68ef865a1e87a369cbcd', '186xxxx6793', '186xxxx6793@qq.com', NULL, 'weq1XHFCBDsBUoMpAFJKlKjlQSGzldSO', '1689690436148', 4, NULL, NULL, NULL, 1, NULL, '2023-07-18 22:27:16.353399', '2023-07-18 22:27:56.000000', 'alice', 'alice', 0, 'test account');
COMMIT;

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `creator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updater` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `deleted` timestamp(6) NULL DEFAULT NULL,
  `tenant_id` int(11) NOT NULL DEFAULT 1,
  `user_id` int(11) NOT NULL DEFAULT 1 COMMENT '用户Id',
  `role_id` int(11) NOT NULL DEFAULT 1 COMMENT '角色Id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_role` VALUES (1, 1, '2022-01-11 13:19:45.000000', '2023-07-21 00:14:33.492751', '1', '1', NULL, 1, 1, 1), (34, 1, '2023-07-18 22:33:03.652957', '2023-07-18 22:33:03.652957', 'alice', 'alice', NULL, 1, 16, 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
