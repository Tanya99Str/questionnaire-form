import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {UserDto} from '../dto/user.dto';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {
  constructor() {
  }

  createDb() {
    let  users =  [
      {id: 1, firstName: 'Petro', lastName: 'Pupkin', dateOfBirth: '23-11-1990', framework: 'angular',
        frameworkVersion: '1.2.1', email: 'test2@test.test', hobby: ['football', 'tennis']}
    ];

    let frameworks = [
      {id: 1, name: 'angular', frameworkVersion: [
        {version: '1.1.1', id: 1},
        {version: '1.2.1', id: 2},
        {version: '1.3.3', id: 3},
        ]},
      {id: 2, name: 'react', frameworkVersion: [
        {version: '2.1.2', id: 1},
        {version: '3.2.4', id: 2},
        {version: '4.3.1', id: 3},
        ]},
      {id: 3, name: 'vue', frameworkVersion: [
        {version: '3.3.1', id: 1},
        {version: '5.2.1', id: 2},
        {version: '5.1.3', id: 3},
        ]}
    ];

    return {users, frameworks};

  }

}
