import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
// import { LoginService } from 'src/app/login/login.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModaleComponent implements OnInit, AfterViewInit {
  @Input()
  title:string;

  modalInstance:any;
  username;
  // constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
   // this.username = this.loginService.getUsername();

    this.modalInstance = window['$']('#myModal').modal({show:false})
  }
  open(){
    this.modalInstance.modal('show')
  }
  close(){
    this.modalInstance.modal('hide')

  }
}
