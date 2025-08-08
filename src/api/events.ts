import axios from "axios";


export async function getAllEvents(){
    try{
        const response = await axios.get('http://localhost:8080/events?page=0&size=10')
        return response.data;
    }
    catch(err){
        console.error(err);
        return [];
    }
}