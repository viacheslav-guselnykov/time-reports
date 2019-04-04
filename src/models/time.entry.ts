import {Project} from "src/models/project";
import {Tag} from "src/models/tag";
import {ClockifyUser} from "src/models/clockify.user";
import {Time} from "src/models/time";

export type TimeEntry = {
  project: Project;
  timeInterval: {
    duration: string;
  }
  tags: Array<Tag>;
  user: ClockifyUser;
};

export class TimeEntryParser {

  static toTime(entry: TimeEntry): Time {

    return new Time(
      TimeEntryParser.retrieveTimeValue(entry.timeInterval.duration, 'H'),
      TimeEntryParser.retrieveTimeValue(entry.timeInterval.duration, 'M'),
      TimeEntryParser.retrieveTimeValue(entry.timeInterval.duration, 'S')
    );

  }

  private static retrieveTimeValue(text: string, type: string): number | null {
    const match = text.match(
        `${new RegExp(/[0-9]*/).source}[${type}]`
      );

    if (!match)
      return null;

    return parseInt(match[0].replace(type, ''));
  }

}
