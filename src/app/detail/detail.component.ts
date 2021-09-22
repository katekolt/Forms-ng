import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DataService} from "../services/data-service";
import {User} from "../shared/User";
import {Car} from "../shared/Car";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  cars!: Car[];
  newCars: Car[] = [];
  isEditMode!: boolean;
  userId!: number;


  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    fatherName: new FormControl('', Validators.required),
  });

  activeUser!: User;

  constructor(private router: Router,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.isEditMode = this.dataService.isEdit;
    if (!this.dataService.getWorkingUser() && !this.dataService.isCreate) {
      this.navigateToHome()
    }
    this.activeUser = this.dataService.getWorkingUser();
    if (!this.activeUser) {
      this.userId = this.dataService.users[this.dataService.users.length - 1].userId + 1;
    }
    this.userId = this.activeUser?.userId;
    this.getUserCar(this.activeUser?.userId);

    console.log(this.activeUser)
  }

  onSubmit() {
  }

  getUserCar(userId: number) {
    this.cars = this.dataService.cars.filter(car => car.userId === userId)
  }

  navigateToHome(): void {
    this.dataService.clearWorkingUser();
    this.router.navigate(['home'])
  }

  saveCar(carNumber: any, carBrand: any, carModel: any, carYear: any) {
    this.newCars.push(
      {
        userId: this.userId,
        carNumber,
        carBrand,
        carModel,
        carYear
      })
    this.cars = [...this.cars, ...this.newCars]
  }

  addProfile() {

  };

  saveProfile() {
    const formState = this.profileForm.value;
    this.dataService.users.push({
      firstName: formState.firstName,
      lastName: formState.lastName,
      fatherName: formState.fatherName,
      carCount: this.cars.length,
      userId: this.userId
    })
    this.dataService.cars = [...this.dataService.cars, ...this.cars]
    console.log(this.dataService.cars)

  };

  btnDelete(index: number, car: Car) {
    this.cars.splice(index, 1)
    this.dataService.cars = this.dataService.cars.filter(carItem => carItem != car)
    console.log(this.dataService)
  };
}
