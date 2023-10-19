import { ApiManager } from "./ApiManager";

export const findAllNotificationByToken = async (token) => {
    try {
        const result = await ApiManager("/notification", {
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