export type I18N = {
    [key in keyof string]: string
}

export interface ProjectInfo {
    name: I18N,
    address: {
        province?: string;
        district?: string;
        subdistrict?: string;
        road?: string;
        no?: string;
        zipcode?: string;
    }
}