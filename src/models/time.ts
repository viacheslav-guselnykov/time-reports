export class Time {

  constructor(public readonly hours: number,
              public readonly minutes: number,
              public readonly seconds: number) {}

  static add(a: Time, b: Time): Time {

    let hours: number = 0;
    let minutes: number = 0;
    let seconds: number = 0;

    if (a.hours)
      hours += a.hours;

    if (a.minutes)
      minutes += a.minutes;

    if (a.seconds)
      seconds += a.seconds;

    if (b.hours)
      hours += b.hours;

    if (b.minutes)
      minutes += b.minutes;

    if (b.seconds)
      seconds += b.seconds;

    const secondsProcessingResult = this.processSeconds(seconds);
    if (secondsProcessingResult.minutes)
      minutes += secondsProcessingResult.minutes;

    seconds = secondsProcessingResult.seconds;

    const minutesProcessingResult = this.processMinutes(minutes);
    if (minutesProcessingResult.hours)
      hours += minutesProcessingResult.hours;

    minutes = minutesProcessingResult.minutes;

    return new Time(hours, minutes, seconds);

  }

  static multiply(a: Time, multiplier: number): Time {

    let hours = a.hours * multiplier;
    let minutes = a.minutes * multiplier;
    let seconds = a.seconds * multiplier;

    const secondsProcessingResult = this.processSeconds(seconds);
    if (secondsProcessingResult.minutes)
      minutes += secondsProcessingResult.minutes;

    seconds = secondsProcessingResult.seconds;

    const minutesProcessingResult = this.processMinutes(minutes);
    if (minutesProcessingResult.hours)
      hours += minutesProcessingResult.hours;

    minutes = minutesProcessingResult.minutes;

    return new Time(hours, minutes, seconds);

  }

  private static processSeconds(seconds: number): { minutes: number, seconds: number } {
    if (seconds > 60) {
      const fullMinutes = Math.floor(seconds / 60);
      const secondsLeftOver = seconds % 60;

      return {
        minutes: fullMinutes,
        seconds: secondsLeftOver
      };
    } else {
      return {
        minutes: null,
        seconds: seconds
      };
    }
  }

  private static processMinutes(minutes: number): { hours: number, minutes: number } {
    if (minutes > 60) {
      const fullHours = Math.floor(minutes / 60);
      const minutesLeftOver = minutes % 60;

      return {
        hours: fullHours,
        minutes: minutesLeftOver
      };
    } else {
      return {
        hours: null,
        minutes: minutes
      };
    }
  }

}
