import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../services/data-service";
import {User} from "../shared/User";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  users!: User[];

  isSelectedUser!: boolean;
  isActiveIndex: number | undefined;

  constructor(private router: Router, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.users = this.dataService.users;
    this.isSelectedUser = false;
    console.log(this.dataService)
  }

  choiceUser(user: User, index: number) {
    this.dataService.setWorkingUser(user)
    this.isActiveIndex = index;
    this.isSelectedUser = true;
  }

  viewMode() {
    this.dataService.isEdit = false;
    this.navigateToUser();
  }

  editMode() {
    this.dataService.isEdit = true;
    this.navigateToUser();
  }

  navigateToUser(): void {
    this.router.navigate(['detail'])
  }

  navigateToCreate(): void {
    this.dataService.isCreate = true;
    this.dataService.isEdit = true;

    this.router.navigate(['detail'])
  }

  deleteProfile() {
    this.dataService.users = this.dataService.users.filter(userItem => userItem.userId != this.dataService.workingUser.userId)
    this.users = this.dataService.users;
    console.log(this.dataService)
  };

}
