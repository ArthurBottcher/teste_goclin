import axios from 'axios'

const http = axios.create({
    baseURL:'https:/stage-api.goclin.com/v1/',
    headers: {
        'api-key': '9q3llb2umtpoyqdpmwvfx0daxnl0ctv4i7oldawk7693k84yapik0vatw6i2d81j',
        'content-type': 'application/json'
    }
})

http.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response) {
        console.log(error.response.data.message)
        return {
            hasError: true,
            error: error.response.data.message
        }

    }
})

export async function login(user) {
    const response = await http.post('/auth/token/',user)
    return response
}

export async function register(user)  {
    const response= await http.post('/auth/account', user)
    return response
}