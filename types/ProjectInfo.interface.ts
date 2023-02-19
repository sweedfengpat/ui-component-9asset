export type I18N = {
    TH: string;
    EN: string;
    CN: string;
}

export interface ProjectInfo {

    id?: number;
    name: I18N;
    location?: {
        name?: I18N;

        no?: string;
        alley?: I18N;
        road?: I18N;

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
        
        position?: {
            lat?: string | number;
            lng?: string | number;
        }
    }

    type: number;
    category?: {
        id: number;
        name: I18N;
    };
    image?: string;
    developer?: I18N;
    status?: number;
}