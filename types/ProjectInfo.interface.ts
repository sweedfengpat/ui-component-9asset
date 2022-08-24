export type I18N = {
    TH: string;
    EN: string;
}

export interface ProjectInfo {

    name: I18N;
    id?: number;
    alley?: I18N;
    road?: I18N;
    type: number;
    category?: {
        id: number;
        name: I18N;
    };

    developed?: I18N;
    lat?: string | number;
    lng?: string | number;
    location?: I18N;

    district?: {
        id: number;
        name: I18N;
    };
    subdistrict?: {
        id: number;
        name: I18N;
    };
    province?: {
        id: number;
        code?: string;
        name: I18N;
        lat?: string | number;
        lng?: string | number;
    };
    status?: number;
}