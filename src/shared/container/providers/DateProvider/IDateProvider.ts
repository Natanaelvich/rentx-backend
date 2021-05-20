interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number, reference_date: Date | null): Date;
  addHours(hours: number, reference_date: Date | null): Date;
  checkIsBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
