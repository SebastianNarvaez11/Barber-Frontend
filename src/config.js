export const getConfig = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return {
            "apiURL": "http://127.0.0.1:8000",
            "staticURL": "http://127.0.0.1:8000/static"
        }
    } else {
        return {
            "apiURL": "",
            "staticURL": "https://storage.googleapis.com/barbershop-uv"
        }
    }
}