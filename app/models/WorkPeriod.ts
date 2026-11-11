export class WorkPeriod {
  readonly start: string;
  readonly end?: string;

  constructor(start: string, end?: string) {
    this.start = start;
    this.end = end?.trim() || undefined;
    const startMonth = this.getMonthIndex(start);
    if (this.end && this.getMonthIndex(this.end) < startMonth) {
      throw new Error("Work end date must not precede the start date.");
    }
  }

  get isCurrent(): boolean {
    return this.end === undefined;
  }

  compareRecent(other: WorkPeriod): number {
    if (this.isCurrent !== other.isCurrent) return this.isCurrent ? -1 : 1;
    const endDifference =
      this.end && other.end
        ? this.getMonthIndex(other.end) - this.getMonthIndex(this.end)
        : 0;
    return (
      endDifference ||
      this.getMonthIndex(other.start) - this.getMonthIndex(this.start)
    );
  }

  getStartDateTime(): string {
    return this.toDateTime(this.start);
  }

  getEndDateTime(): string | undefined {
    return this.end ? this.toDateTime(this.end) : undefined;
  }

  private getMonthIndex(value: string): number {
    if (!/^(0[1-9]|1[0-2])\/[1-9]\d{3}$/.test(value)) {
      throw new Error(
        "Work dates must use MM/YYYY with a valid month and year."
      );
    }
    const month = Number(value.slice(0, 2));
    const year = Number(value.slice(3));
    return year * 12 + month;
  }

  private toDateTime(value: string): string {
    const [month, year] = value.split("/");
    return `${year}-${month}`;
  }
}
