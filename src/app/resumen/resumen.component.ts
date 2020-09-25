import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FiltersService } from '../filters.service';
import { BusquedaService } from '../busqueda.service';
import { Busqueda } from '../busqueda.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.sass']
})
export class ResumenComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 4, rows: 1 },
          { title: 'Card 5', cols: 2, rows: 2 },
          { title: 'Card 6', cols: 2, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 2, rows: 1 },
        { title: 'Card 4', cols: 1, rows: 1 },
        { title: 'Card 5', cols: 2, rows: 1 },
        { title: 'Card 6', cols: 1, rows: 1 }
      ];
    })
  );

  busquedaCompleta: Busqueda;
  //no se si busqueda se usa en algun otro lado, si no hay que borrarlo
  busqueda: any
  constructor(private breakpointObserver: BreakpointObserver, 
    private filterService: FiltersService,
    private bus: BusquedaService) {}


  ngOnInit() {
    this.Init();
    }
    
    Init(){
      // busca si hay una busqueda previa en sesion si no la inicializa de cero

      if(window.sessionStorage['busqueda']){
        this.busquedaCompleta = JSON.parse(window.sessionStorage['busqueda']);
      }else{
        this.busquedaCompleta = {
          dateRange_begin: null,
          dateRange_end: null,
          Id_solicitud: "",
          año: null,
          Dir: null,
          radio: 0,
          Id_solicitante: "",
          advSearch: {
            //-----Busqueda Reporte ----------------------------------------------
            reiteraciones_con:true,
            reiteraciones_sin:true,
            prioridad:undefined,
        
            //--------------------------------------------------------------------
        
            //-----Busqueda Clasificacion ----------------------------------------
            clasificacion_subtipo: [],
            clasificacion_tipo:undefined,
            clasificacion_origenes: [],
            clasificacion_registro:true,
            clasificacion_reiteracion :true,
        
            //--------------------------------------------------------------------
        
            //-----Busqueda Area -------------------------------------------------
            area_origen:undefined,
            area_destino:undefined,
            area_reiteracion:undefined,
        
            //--------------------------------------------------------------------
          
            //-----Busqueda Adjunto ----------------------------------------------
            adjunto_tiene:"no",
            adjunto_regReit: false,
            adjunto_intervencion: false,
            adjunto_resolucion: false,
            
            //--------------------------------------------------------------------
        
            //-----Busqueda Opinion ----------------------------------------------
            opinion_tiene:"no",
            opinion_positivo:false,
            opinion_negative:false,
            opinion_neutro:false,
        
            //--------------------------------------------------------------------
        
            //-----Busqueda Estado ----------------------------------------------
            estado_estados:[],
            estado_detallado: "",
            estado_fecha_start: null,
            estado_fecha_end: null,
        
            //--------------------------------------------------------------------
        
            //-----Busqueda Distrito ----------------------------------------------
            distrito_vecinales: [],
        
            //--------------------------------------------------------------------
        
            //-----Busqueda Intervenciones ---------------------------------------
            intervenciones_seleccionadas:[],
            intervenciones_suaMovile:false,
            intervenciones_tipo:"",
            intervenciones_fecha_begin:null,
            intervenciones_fecha_end: null,
        
            //--------------------------------------------------------------------
        
            //-----Busqueda Equipamiento -----------------------------------------
            equipamiento_seleccionado:"",
            equipamiento_choice:"",
            equipamiento_detalle:"",
        
            //--------------------------------------------------------------------
        
            //-----Busqueda Asignacion -----------------------------------------
            asignacion_tipo:"",
            asignacion_fecha_start: null,
            asignacion_fecha_end: null,
            asignacion_listPersonas:[],
        
            //--------------------------------------------------------------------
            
            //-----Datos especificos--------------------------------------------
            Datos_Extra:undefined
          },
      
        };
      }
    }
}