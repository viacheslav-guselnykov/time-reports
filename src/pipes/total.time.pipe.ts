import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'clTotalTime'
})
export class TotalTimePipe implements PipeTransform {

  transform(total: string): number {
    const hours = this.retrieveTimeValue(total, 'H');
    const minutes = this.retrieveTimeValue(total, 'M');
    const seconds = this.retrieveTimeValue(total, 'S');

    const totalSeconds = this.hoursToSeconds(hours) + this.minutesToSeconds(minutes) + seconds;

    return this.secondsToHours(totalSeconds);
  }

  private retrieveTimeValue(text: string, type: string): number {
    return parseInt(
      text
        .match(
          `${new RegExp(/[0-9]*/).source}[${type}]`
        )[0]
        .replace(type, ''));
  }

  private hoursToSeconds(hours: number): number {
    return hours * 3600;
  }

  private minutesToSeconds(minutes: number): number {
    return minutes * 60;
  }

  private secondsToHours(seconds: number): number {
    return Math.round(seconds / 3600);
  }

}
