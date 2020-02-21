import { Component, OnInit } from '@angular/core';
import { IconosManagerService } from '../iconos-manager.service';

@Component({
  selector: 'app-icono-test',
  templateUrl: './icono-test.component.html',
  styleUrls: ['./icono-test.component.sass']
})
export class IconoTestComponent implements OnInit {

  src:string;

  constructor(private iconosMang:IconosManagerService) { }

  ngOnInit() {
    //this.src = this.iconosMang.getSrc(this.iconosMang.listaIconos[0]);
  }

  
  
}
