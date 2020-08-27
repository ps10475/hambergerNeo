import Axios from 'axios';

const instance = Axios.create({
    baseURL : 'https://hamburger-neo.firebaseio.com/'
})

export default instance;
