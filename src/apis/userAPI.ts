import instance from "@/utils/axiosCustomize";

export const callFetchUser = () => {
    return instance.get("/user");
}