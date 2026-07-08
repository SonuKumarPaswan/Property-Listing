import axios from "axios";

    const api = axios.create({
     //   baseURL: "https://mishti-backend-3.onrender.com/api",
        baseURL: "https://mishti-backend-2.onrender.com/api",
        // baseURL: "http://localhost:8085/api", 
    }); 

    export  default api;
    
    
        
