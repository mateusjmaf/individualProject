import { Component, OnInit } from '@angular/core';

import { Staff } from './staff.object';
import { ServerHttpService } from '../../service/server.http.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  staff: Staff;
  staffList: Staff[];
  staffSerachValue = '';
  restRoute = 'staffRest';

  constructor(private serverHttp: ServerHttpService) {
    this.staff = new Staff();
  }

  ngOnInit() {
    this.searchStaff();
  }

  onSubmit() {
    if (this.staff.idStaff) {
      return this.serverHttp.update(this.staff, this.restRoute + '/editarStaff').subscribe(response => {
        alert(response);
        this.resetForm();
      });
    } else {
      return this.serverHttp.create(this.staff, this.restRoute + '/addStaff').subscribe(
        response => {
          this.searchStaff();
          this.resetForm();
        }
      );
    }
  }

  deleteStaff(id: number) {
    return this.serverHttp.delete(id, this.restRoute + '/deletarStaff').subscribe( response => {
      this.searchStaff();
    });
  }

  searchStaff() {
    return this.serverHttp.readByName(this.staffSerachValue, this.restRoute + '/buscarStaffsPorNome').subscribe( response => {
      response.length > 0 ? this.staffList = response : this.staffList = undefined;
    });
  }

  editStaff(staffParam: Staff) {
    this.staff = staffParam;
  }

  resetForm() {
    this.staff = new Staff();
  }

}
