/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// to declare jquery like global
//declare var jQuery:any; // jQuery definition
//declare var $:any; // jQuery definition

declare module 'perfect-scrollbar'; // perfect-scrollbar to side-navbar
