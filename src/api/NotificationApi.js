import { ApiManager } from "./ApiManager";

export const findAllNotificationByToken = async (token) => {
    try {
        const result = await ApiManager("/notification", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log("haloooooooo", result.data)
        return result
    } catch (error) {
        console.log(error)
    }
}
export const NotificationStatus = async (token,id) => {
    console.log("token : ",token);
    console.log("id : ",id);
    try {
        const result = await ApiManager(`/notification/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return result
    } catch (error) {
        console.log(error)
    }
}