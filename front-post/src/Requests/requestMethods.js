import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
//const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzE4MDVkY2FkOGIwMjk0MWU1YjY4NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTc3Mjk0MiwiZXhwIjoxNjU0MzY0OTQyfQ.nIJV0fb3rIhT3geLNz4ug2rHiMCr4WFIq7r3cj-5_b8"
//  JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//  .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
const username=currentUser?.username;

console.log("actual user ",username)
console.log("actual Token ",TOKEN)

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});
