import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable} from "rxjs";

import {clockifyConfig} from "src/clockify.config";

import {SummaryReportQuery} from "src/models/summary.report.query";

@Injectable()
export class SummaryReportEndpoint {

  constructor(private httpClient: HttpClient) {
  }

  fetchSummary(query: SummaryReportQuery): Observable<any> {

    const headers: HttpHeaders = new HttpHeaders({
      'X-Api-Key': clockifyConfig.apiKey,
      'Content-Type': 'application/json'
    });

    return this.httpClient.post(
      `https://api.clockify.me/api/workspaces/${clockifyConfig.workspaceId}/reports/summary/`,
      query, {
        headers
      });

  }

}
