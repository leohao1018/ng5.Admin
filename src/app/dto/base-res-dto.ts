export class BaseResDto {
  Token: string;

  StatusCode: number;

  StatusDescription: string;

  Result: object;

  // 总数
  TotalCount: number;

  // 页数
  PageIndex: number;

  // 每页数量
  PageSize: number;
}
