import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-side-bar-login',
  templateUrl: './side-bar-login.component.html',
  styleUrls: ['./side-bar-login.component.sass']
})
export class SideBarLoginComponent implements OnInit {

  public ScreenDarkAmount = 0;

  constructor() { 
  }

  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  
  ngOnInit() {
    document.getElementById("screenDarkener").style.backgroundColor = "rgba(0, 0, 0, " + this.ScreenDarkAmount.toString + ")";
    document.getElementById("screenDarkener").style.display = "none";
  }

  Close() {
    document.getElementById("screenDarkener").style.animationName = "transparent"
    document.getElementById("screenDarkener").style.webkitAnimationName = "transparent"
    setTimeout(function() {
      document.getElementById("screenDarkener").style.display = "none";
    }, 500)
    //this.darkenerToAlpha(0);
    this.sidenav.close();
  }

  Open(){

    document.getElementById("screenDarkener").style.display = "block";
    document.getElementById("screenDarkener").style.animationName = "color"
    document.getElementById("screenDarkener").style.webkitAnimationName = "color"
    //this.darkenerToAlpha(0.6);
    this.sidenav.open();
  }

/*
  darkenerToAlpha = function (color: number) {
    let sign = Math.sign(color - this.ScreenDarkAmount);
    this.ScreenDarkAmount += 0.1 * sign;
    document.getElementById("screenDarkener").style.backgroundColor = "rgba(0, 0, 0, " + this.ScreenDarkAmount.toString + ")";
    if(color != this.ScreenDarkAmount){
      setTimeout(
        function () {
          this.darkenerToAlpha(color)          
        }, 600);
    }
  }
*/


}
