export class Person {
  public firstName: string;
  public middleName: string;
  public lastName: string;

  constructor(data?: any) {
    this.firstName = data.firstName || "Thanh";
    this.middleName = data.middleName || "Diem";
    this.lastName = data.lastName || "Nguyen";
  }
}
