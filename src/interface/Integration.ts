
export interface Integration {     
    id?:string; 
    token: string;
    cod_agent: string | null;
    country: string | null,
    region: string | null,
    city: string | null,
    latitude: string | null,
    longitude: string | null,
    dateTime: Date,
    type:string,
    status:string
}

  