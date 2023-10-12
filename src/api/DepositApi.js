import { ApiManager } from "./ApiManager";

export const createDeposit = async (token,data) => {
    try {
        const result = ApiManager(``, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data: data
        })

        return result
    } catch (error) {
        console.log(error)
    }
}

export const findAllDeposit = async (token) => {
    try {
        const result = ApiManager(``,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}
export const findDepositById = async (token,id) => {
    try {
        const result = ApiManager(``,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(result)
        return result
    } catch (error) {
        console.log(error)
    }
}