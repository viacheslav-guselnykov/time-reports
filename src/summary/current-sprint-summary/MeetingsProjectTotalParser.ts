import {Summary} from "src/models/summary";
import {TimeEntry, TimeEntryParser} from "src/models/time.entry";
import {Tag} from "src/models/tag";
import {Time} from "src/models/time";

type TimeEntries = Array<TimeEntry>;

export class MeetingsProjectTotalParser {

  static readonly meetingsProjectId = '5c066bf2b0798723e0fb1116';

  private static readonly teamMeetingTagId = '5ca3351169b7cc19c5bc8d8b';

  static fromSummary(data: Summary, membersCount: number): Time {
    const teamMeetings: TimeEntries = [];
    const otherMeetings: TimeEntries = [];

    data.timeEntries.forEach((entry: TimeEntry) => {

      if (!MeetingsProjectTotalParser.isMeeting(entry))
        return;

      if (MeetingsProjectTotalParser.hasTeamMeetingTag(entry)) {
        teamMeetings.push(entry);
      } else {
        otherMeetings.push(entry);
      }

    });

    const teamMeetingsTotalTime = Time.multiply(
      MeetingsProjectTotalParser.sumTimeEntries(teamMeetings),
      membersCount
    );
    const otherMeetingsTotalTime = MeetingsProjectTotalParser.sumTimeEntries(otherMeetings);

    const totalTime: Time = Time.add(teamMeetingsTotalTime, otherMeetingsTotalTime);

    return totalTime;
  }

  private static isMeeting(entry: TimeEntry): boolean {
    return entry.project.id === MeetingsProjectTotalParser.meetingsProjectId;
  }

  private static hasTeamMeetingTag(entry: TimeEntry): boolean {
    if (!entry.tags)
      return false;

    return entry.tags.filter((tag: Tag) => {
      return tag.id === MeetingsProjectTotalParser.teamMeetingTagId
    }).length !== 0;
  }

  private static sumTimeEntries(timeEntries: TimeEntries): Time {
    const time: Array<Time> = timeEntries.map((entry: TimeEntry) => TimeEntryParser.toTime(entry));
    return time.reduce((acc: Time, current: Time) => {
      return Time.add(acc, current);
    });
  }

}
