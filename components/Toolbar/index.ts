export interface MenuItem {
    key: string;
    text: string;
    link?: string;
    items?: MenuItem[];
}