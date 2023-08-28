import { File } from '../../entity/file/fileEntity';
import { FileConfig } from '../../entity/file/fileConfigEntity';
import { FileContent } from '../../entity/file/fileContentEntity';
import { Admin } from '../../entity/system/adminEntity';
import { Dept } from '../../entity/system/deptEntity';
import { Menu } from '../../entity/system/menuEntity';
import { Notice } from '../../entity/system/noticeEntity';
import { OperationLog } from '../../entity/system/operationLogEntity';
import { Role } from '../../entity/system/roleEntity';
import { RoleMenu } from '../../entity/system/roleMenuEntity';
import { SensitiveWord } from '../../entity/system/sensitiveEntity';
import { Activity } from '../../entity/game/activityEntity';
import { Email } from '../../entity/game/emailEntity';
import { Player } from '../../entity/game/playerEntity';
import { Props } from '../../entity/game/propsEntity';
import { UserRole } from '../../entity/system/userRoleEntity';
import { Tenant } from '../../entity/system/tenantEntity';
import { TenantPackage } from '../../entity/system/tenantPackageEntity';
import { SmsChannel } from '../../entity/system/smsChannelEntity';
import { SmsTemplate } from '../../entity/system/smsTemplateEntity';
import { SmsCode } from '../../entity/system/smsCodeEntity';
import { SmsLog } from '../../entity/system/smsLogEntity';
import { NotifyMessage } from '../../entity/system/notifyMessageEntity';
import { NotifyTemplate } from '../../entity/system/notifyTemplateEntity';
import { DictType } from '../../entity/system/dictTypeEntity';
import { DictData } from '../../entity/system/dictDataEntity';
import { Post } from '../../entity/system/postEntity';
import { mailAccount } from 'src/entity/system/mailAcountEntity';
import { MailLog } from '../../entity/system/mailLogEntity';
import { MailTemplate } from '../../entity/system/mailTemplateEntity';


export function loadEntity() {
  return [
    File,
    FileConfig,
    FileContent,
    Role,
    UserRole,
    Admin,
    Dept,
    Menu,
    Notice,
    OperationLog,
    RoleMenu,
    SensitiveWord,
    Activity,
    Email,
    Player,
    Props,
    Tenant,
    SmsChannel,
    SmsTemplate,
    SmsCode,
    SmsLog,
    NotifyMessage,
    NotifyTemplate,
    DictType,
    DictData,
    Post,
    TenantPackage,
    mailAccount,
    MailLog,
    MailTemplate,
  ];
}
