import instance from "@/utils/axiosCustomize"

export const getMedia = (mediaId: string) => {
    return instance.get(`media/${mediaId}`)
}

export const getStream = (streamId: string) => {
    return instance.get(`media/stream/${streamId}`)
}

export const uploadMedia = (file: File) => {
    instance.defaults.headers.common = {
        "Content-Type": "multipart/form-data"
    }
    return instance.post("media", file)
}