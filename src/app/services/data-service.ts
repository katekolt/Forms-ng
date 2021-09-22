import {Injectable} from '@angular/core';
import {User} from "../shared/User";
import {Car} from "../shared/Car";

@Injectable()

export class DataService {
  workingUser: any;
  isEdit!: boolean;
  isCreate!: boolean;

  users: User[] =
    [
      {userId: 1, firstName: "Петр", lastName: 'Сидоров', fatherName: 'Иванович', carCount: 1},
      {userId: 2,firstName: "Даниил", lastName: 'Брусник', fatherName: 'Олександрович', carCount: 2},
      {userId: 3,firstName: "Илья", lastName: 'Филимонов', fatherName: 'Степанович', carCount: 1}
];

  cars: Car[] = [
    {userId: 1 ,carNumber: "КА6788ГО", carBrand: 'Toyota', carModel: 'Rav4', carYear: "2018"},
    {userId: 2 ,carNumber: "АА6588ГО", carBrand: 'BMW', carModel: 'X7', carYear: "2020"},
    {userId: 2 ,carNumber: "АА6778HО", carBrand: 'Audi', carModel: 'Q8', carYear: "2021"},
    {userId: 3 ,carNumber: "ОЛ9788АО", carBrand: 'Cupra', carModel: 'Formentor', carYear: "2021"}
  ];

  constructor() {
  }

  setWorkingUser(user: User) {
    this.workingUser = user;
    console.log(this.workingUser)
  }

  getWorkingUser() {
    return this.workingUser;
  }

  clearWorkingUser() {
    this.workingUser = null;
  }

}
