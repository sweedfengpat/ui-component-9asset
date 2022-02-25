export interface Category {
    category_ID: number;
    category_Name_TH: string;
    category_Name_EN: string;
    category_Name_CN: string | null;
    category_Detail: string;
    category_Imagess: string;
    category_Sort: number;
    category_Status: number;
    parent_id: number;
    type: string;
}