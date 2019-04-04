import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {clockifyConfig} from "src/clockify.config";

import {Project} from "src/models/project";

@Injectable()
export class ProjectsEndpoint {

	constructor(private httpClient: HttpClient) {}

	fetchProjects(): Observable<Array<Project>> {

    const headers: HttpHeaders = new HttpHeaders({
      'X-Api-Key': clockifyConfig.apiKey
    });

    return this.httpClient.get(
      `https://api.clockify.me/api/workspaces/${clockifyConfig.workspaceId}/projects/`, {
        headers
      })
      .pipe(
        map((rawProjects: Array<any>) => {
          return rawProjects.map((project: any) => {
            return new Project(project.id, project.name);
          });
        })
      );

  }

}
