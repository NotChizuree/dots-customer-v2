import { ApiManager } from "./ApiManager";

export const findAllNotificationByToken = async (token) => {
    try {
        const result = await ApiManager("", {
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