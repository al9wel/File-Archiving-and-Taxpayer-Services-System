export interface District {
    id: number | string;
    name: string;
    regionID?: number | string;
    region_id?: number | string;
    region?: {
        id: number | string;
        name: string;
    };
}
