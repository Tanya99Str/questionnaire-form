import {HobbyDto} from './hobby.dto';

export class UserDto {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  framework: string;
  frameworkVersion: string;
  email: string;
  hobby: string[];
}
