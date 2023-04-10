import axios from "axios";

const get = async (url: string) => {
    return(await axios.get(url)).data
}

export default get;