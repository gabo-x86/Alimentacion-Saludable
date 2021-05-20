import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() input:boolean;
  public user;
  constructor() { }

  ngOnInit(): void {
    /* this.user=JSON.parse(localStorage.getItem('user')); */
    if(localStorage.getItem('user')=="undefined" || localStorage.getItem('user')==null){
      //this.user=undefined;
      this.user=false;
    }else{
      this.user=true;
      //this.user=JSON.parse(localStorage.getItem('user'));
    } 
    console.log("DEBUG: "+localStorage.getItem('user'));
    
  }
  

  refresh(){
    if(this.input){
      window.location.reload();
    }    
  }

  onLogOut(){
    //this.auth.auth.signOut();
    localStorage.setItem("user", undefined);
    window.location.reload();
  }
}
