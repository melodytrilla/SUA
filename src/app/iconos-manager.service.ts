import { Injectable } from '@angular/core';

export interface iconoData{
  categoria:string;
  estado: number;
  codigo:string;
}

@Injectable({
  providedIn: 'root'
})
export class IconosManagerService {

  iconosFolder:string = "/assets/iconos/";
  listaIconos:iconoData[] = [
    {categoria:"categoria", estado:0 ,codigo:"g3795.png"},
    {categoria:"categoria", estado:2 ,codigo:"g3951.png"},
    {categoria:"categoria", estado:1 ,codigo:"g3956.png"},
    {categoria:"categoria", estado:0 ,codigo:"g3961.png"},
    {categoria:"categoria", estado:2 ,codigo:"g3966.png"},
    {categoria:"categoria", estado:1 ,codigo:"g3971.png"},
    {categoria:"categoria", estado:0 ,codigo:"g3976.png"},
    {categoria:"categoria", estado:2 ,codigo:"g3981.png"},
    {categoria:"categoria", estado:1 ,codigo:"g3986.png"},
    {categoria:"categoria", estado:0 ,codigo:"g3991.png"},
    {categoria:"categoria", estado:2 ,codigo:"g3996.png"},
    {categoria:"categoria", estado:1 ,codigo:"g4002.png"},
    {categoria:"categoria", estado:2 ,codigo:"g4007.png"},
    {categoria:"categoria", estado:1 ,codigo:"g4012.png"},
    {categoria:"categoria", estado:0 ,codigo:"g4017.png"},
    {categoria:"categoria", estado:2 ,codigo:"g4023.png"},
    {categoria:"categoria", estado:1 ,codigo:"g4029.png"},
    {categoria:"categoria", estado:0 ,codigo:"g4035.png"},
    {categoria:"categoria", estado:2 ,codigo:"g4041.png"},
    {categoria:"categoria", estado:1 ,codigo:"g4047.png"},
    {categoria:"categoria", estado:0 ,codigo:"g4053.png"},
    {categoria:"Categoria", estado:2 ,codigo:"g4451.png"},
    {categoria:"Columna", estado:2 ,codigo:"g4456.png"},
    {categoria:"Transversal", estado:2 ,codigo:"g4461.png"},
    {categoria:"Tablero", estado:2 ,codigo:"g4466.png"},
    {categoria:"Categoria", estado:1 ,codigo:"g4471.png"},
    {categoria:"Columna", estado:1 ,codigo:"g4476.png"},
    {categoria:"Transversal", estado:1 ,codigo:"g4481.png"},
    {categoria:"Tablero", estado:1 ,codigo:"g4487.png"},
    {categoria:"Categoria", estado:0 ,codigo:"g4492.png"},
    {categoria:"Columna", estado:0 ,codigo:"g4497.png"},
    {categoria:"Transversal", estado:0 ,codigo:"g4502.png"},
    {categoria:"Tablero", estado:0 ,codigo:"g4508.png"},
    {categoria:"Alimentos", estado:2 ,codigo:"g5305.png"},
    {categoria:"Alimentos", estado:1 ,codigo:"g5310.png"},
    {categoria:"Animales", estado:2 ,codigo:"g5321.png"},
    {categoria:"Cloacas y Zanjas", estado:2 ,codigo:"g5326.png"},
    {categoria:"Convivencia", estado:2 ,codigo:"g5331.png"},
    {categoria:"Desmalezado", estado:2 ,codigo:"g5337.png"},
    {categoria:"Comercio", estado:2 ,codigo:"g5342.png"},
    {categoria:"Contaminacion", estado:2 ,codigo:"g5347.png"},
    {categoria:"cPlagas y Vectores", estado:2 ,codigo:"g5353.png"},
    {categoria:"Construccion, casas", estado:2 ,codigo:"g5359.png"},
    {categoria:"Tasas e impuestos", estado:2 ,codigo:"g5364.png"},
    {categoria:"Parques y plazas", estado:2 ,codigo:"g5369.png"},
    {categoria:"Calzadas y veredas", estado:2 ,codigo:"g5402.png"},
    {categoria:"Animales", estado:1 ,codigo:"g5485.png"},
    {categoria:"Cloacas y Zanjas", estado:1 ,codigo:"g5491.png"},
    {categoria:"Convivencia", estado:1 ,codigo:"g5497.png"},
    {categoria:"Desmalezado", estado:1 ,codigo:"g5503.png"},
    {categoria:"Comercio", estado:1 ,codigo:"g5513.png"},
    {categoria:"Contaminacion", estado:1 ,codigo:"g5519.png"},
    {categoria:"Plagas y Vectores", estado:1 ,codigo:"g5525.png"},
    {categoria:"Construccion, casas", estado:1 ,codigo:"g5531.png"},
    {categoria:"Tasas e impuestos", estado:1 ,codigo:"g5536.png"},
    {categoria:"Parques y plazas", estado:1 ,codigo:"g5547.png"},
    {categoria:"Calzadas y veredas", estado:1 ,codigo:"g5565.png"},
    {categoria:"Alimentos", estado:0 ,codigo:"g5646.png"},
    {categoria:"Animales", estado:0 ,codigo:"g5654.png"},
    {categoria:"Cloacas y Zanjas", estado:0 ,codigo:"g5663.png"},
    {categoria:"Convivencia", estado:0 ,codigo:"g5670.png"},
    {categoria:"Desmalezado", estado:0 ,codigo:"g5678.png"},
    {categoria:"Comercio", estado:0 ,codigo:"g5683.png"},
    {categoria:"Contaminacion", estado:0 ,codigo:"g5688.png"},
    {categoria:"Plagas y Vectores", estado:0 ,codigo:"g5698.png"},
    {categoria:"Construccion, casas", estado:0 ,codigo:"g5707.png"},
    {categoria:"Tasas e impuestos", estado:0 ,codigo:"g5712.png"},
    {categoria:"Parques y plazas", estado:0 ,codigo:"g5720.png"},
    {categoria:"Calzadas y veredas", estado:0 ,codigo:"g5738.png"}
  ];
  

  constructor() {}

  getSrc( data:iconoData):string{
    //console.log(data);
    return this.iconosFolder + data.codigo;
  }
}
