export type I18N = {
    TH: string;
    EN: string;
    CN: string;
}

export interface Position {
    lat?: number;
    lng?: number;
    zoom?: number;
}

export interface Location {
    name?: I18N;

    no?: string;
    addressText?: I18N;
    alley?: I18N;
    road?: I18N;

    district?: {
        id?: number;
        code?: string;
        name?: I18N;
    };
    subdistrict?: {
        id?: number;
        code?: string;
        name?: I18N;
    };

    province?: {
        id?: number;
        code?: string;
        name?: I18N;
        lat?: number;
        lng?: number;
    };
    
    position?: Position;
}
  
export interface ProjectInfo {

    id?: number;
    name?: I18N;
    location?: Location;

    facilities?: { id: number }[];
    provisions?: { id: number }[];

    type?: number;
    category?: {
        id: number;
        name?: I18N;
    };
    features?: {
       th?: string,
       en?: string
    },
    image?: string;
    developer?: I18N;
    status?: number;
}