export interface SolicitudModel {
  id:                number;
  date_reg:          Date;
  date_upd:          Date;
  code:              string;
  description:       string;
  type_expert:       string;
  icon_expert?:       string;
  vehicle_model:     VehicleModel;
  vehicle_condition: string;
  status:            string;
  maps:              Maps;
  pictures:          Picture[];
}

export interface Maps {
  duration: string;
  distance: string;
}

export interface Picture {
  id:      number;
  picture: string;
}

export interface VehicleModel {
  brand: string;
  model: string;
}
