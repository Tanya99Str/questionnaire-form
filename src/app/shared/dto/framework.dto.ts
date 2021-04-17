import {FrameworkVersionDto} from './frameworkVersion.dto';

export class FrameworkDto {
  id: number;
  name: string;
  frameworkVersion: FrameworkVersionDto[];
}
