export interface FormStatement {
  name: string;
  initDate: string | Date;
  endDate: string | Date | DateConstructor | null;
}