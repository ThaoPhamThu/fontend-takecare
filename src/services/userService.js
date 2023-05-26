import axios from "../axios"
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {email: userEmail, password: userPassword});
};

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createANewUser = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUser = (idUser) => {
    return axios.delete('/api/delete-user', {
        data: {id: idUser}
    })
}

const editUserService = (data) => {
    return axios.put('/api/edit-user', data)
}
export { handleLoginApi, getAllUsers, createANewUser, deleteUser, editUserService}