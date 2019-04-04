import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {clockifyConfig} from "src/clockify.config";

import {WorkspaceMember} from "src/models/workspace.member";

@Injectable()
export class WorkspaceMembersEndpoint {

  constructor(private httpClient: HttpClient) {

  }

  fetchMembers(): Observable<Array<WorkspaceMember>> {

    const headers: HttpHeaders = new HttpHeaders({
      'X-Api-Key': clockifyConfig.apiKey
    });

    return this.httpClient.get(
      `https://api.clockify.me/api/workspaces/${clockifyConfig.workspaceId}/users`, {
        headers
      })
      .pipe(
        map((rawMembers: Array<any>) => {
          return rawMembers.map((member: any) => {
            return new WorkspaceMember(member.id, member.name);
          });
        })
      );
  }

}
