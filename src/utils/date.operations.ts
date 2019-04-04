export class DateOperations {

  static incrementDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate()+days);
    return newDate;
  }

  static decrementDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate()-days);
    return newDate;
  }

}
