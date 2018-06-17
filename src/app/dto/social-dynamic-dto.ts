import {BaseDto} from './base-dto';
import {SystemAccountUserDto} from './system-account-user-dto';

export class SocialDynamicDto extends BaseDto {
  AddId: string;

  AddTime: string;

  UpdateId: string;

  UpdateTime: string;

  LogicallyDelete: boolean;

  AccountId: number;

  Subject: string;

  PicId: string;

  MusicId: string;

  VideoId: string;


  Musics: string[];
  Pics: string[];
  Videos: string[];

  Scope: number;

  AccountUser: SystemAccountUserDto;

  AccountUserName: string;
}
