import { fetchClient } from "@/lib/fetchClient";

export const basicInfoApi={
    getBasicInfoStats:async()=>{
        return fetchClient("/statistics",{
            method:"GET",
        });
    }
}