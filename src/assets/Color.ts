
export class MyColores{

    //estos son los mismos colores que en my-theme.scss 
    //si los cambia tambien cambie los colores de archivo 


    //Variables de colores a usar
    //--- Estados
    //------ cerrado
    private static _cerrado_theme:string =  "#0066cc";
    public static cerrado_theme ():string{
        return this._cerrado_theme;
    } 

    private static _cerrado_theme_lighter:string = "#0787d1";
    public static cerrado_theme_lighter ():string{
        return this._cerrado_theme_lighter;
    }

    private static _cerrado_theme_darker:string = "#0053be";
    public static cerrado_theme_darker ():string{
        return this._cerrado_theme_darker;
    }

    //------ Resuelto
    private static _resuelto_theme:string = "#0dc1e0";
    public static resuelto_theme ():string{
        return this._resuelto_theme;
    }
    private static _resuelto_theme_lighter:string ="#25dae7";
    public static resuelto_theme_lighter ():string{
        return this._resuelto_theme_lighter;
    }
    private static _resuelto_theme_darker:string ="#0a8bc7";
    public static resuelto_theme_darker ():string{
        return this._resuelto_theme_darker;
    }

    //------ En curso
    private static _encurso_theme:string = "#3bdb98";
    public static encurso_theme ():string{
        return this._encurso_theme;
    }
    private static _encurso_theme_lighter:string ="#5cee9e";
    public static encurso_theme_lighter ():string{
        return this._encurso_theme_lighter;
    }
    private static _encurso_theme_darker:string ="#2ab9ad";
    public static encurso_theme_darker ():string{
        return this._encurso_theme_darker;
    }

    //------ Pendiente
    private static _pendiente_theme:string ="#616161";
    public static pendiente_theme ():string{
        return this._pendiente_theme;
    }
    private static _pendiente_theme_lighter:string ="#adadad";
    public static pendiente_theme_lighter ():string{
        return this._pendiente_theme_lighter;
    }
    private static _pendiente_theme_darker:string = "#3a3a3a";
    public static pendiente_theme_darker ():string{
        return this._pendiente_theme_darker;
    }

    //--- Alertas

    //------ Leve
    private static _leve_theme:string ="#e4bb36";
    public static leve_theme ():string{
        return this._leve_theme;
    }
    private static _leve_theme_lighter:string = "#f0d24e";
    public static leve_theme_lighter ():string{
        return this._leve_theme_lighter;
    }
    private static _leve_theme_darker:string = "#d1972b";
    public static leve_theme_darker ():string{
        return this._leve_theme_darker;
    }

    //------ Mediano
    private static _medio_theme:string ="#87488d";
    public static medio_theme ():string{
        return this._medio_theme;
    }
    private static _medio_theme_lighter:string ="#9c5a99";
    public static medio_theme_lighter ():string{
        return this._medio_theme_lighter;
    }
    private static _medio_theme_darker:string = "#653670";
    public static medio_theme_darker ():string{
        return this._medio_theme_darker;
    }

    //------ Grave
    private static _grave_theme:string ="#b42e39";
    public static grave_theme ():string{
        return this._grave_theme;
    }
    private static _grave_theme_lighter:string = "#c24d3e";
    public static grave_theme_lighter ():string{
        return this._grave_theme_lighter;
    }
    private static _grave_theme_darker:string = "#94233f";
    public static grave_theme_darker ():string{
        return this._grave_theme_darker;
    }



    //color blanco 
    private static _white_theme:string = "#ffffff";
    public static white_theme ():string{
        return this._white_theme;
    }
    private static _white_theme_lighter:string ="#eeeeee"; 
    public static white_theme_lighter ():string{
        return this._white_theme_lighter;
    }
    private static _white_theme_darker:string = "#d1d1d1";
    public static white_theme_darker ():string{
        return this._white_theme_darker;
    }

    //si es necesario agregar mas colores agregelos aqui abajo

}