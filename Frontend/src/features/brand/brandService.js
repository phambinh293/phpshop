import axios from 'axios'

const getBrand = async (id) => {
    const response = await axios.get(`https://localhost:7056/api/Brands`)

    if (response.data) {
        return response.data;
    }
}
const brandService = {
    getBrand,
}

export default brandService
