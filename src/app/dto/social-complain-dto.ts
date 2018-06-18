import {BaseDto} from './base-dto';
import {SystemAccountUserDto} from './system-account-user-dto';
import {SocialDynamicDto} from './social-dynamic-dto';

export class SocialComplainDto extends BaseDto {
  AddId: string;

  AddTime: string;

  UpdateId: string;

  UpdateTime: string;

  LogicallyDelete: boolean;

  AccountUser: SystemAccountUserDto;

  DynamicId: number;

  ComplainAccountId: number;

  Type: string;

  TypeStrList: string[];

  ComplainContent: string;

  Dynamic: SocialDynamicDto;

  IsDynamicDelete: boolean;
  IsDynamicDeleteStr: string;
}
