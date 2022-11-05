import axios from "axios";

const fetchData = async () => {
    const options = {
        headers: {
            Authorization:
                "Admin eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjcxMTE1MTIsImlkIjoibWJ6MzgzaW54bzk2YjZxIiwidHlwZSI6ImFkbWluIn0.bNUQUKgCZbltPBBq_9IW_6-zoSSuMBWeNjzd83M6jO4",
            "Content-Type": "application/json",
        },
    };

    let res = await Promise.all([axios.get(`${process.env.API}/api/collections/resource/records?perPage=${9999}`, options), axios.get(`${process.env.API}/api/collections/resource/records?perPage=${9999}&page=2`, options)]);
    let data1 = res[0].data;
    let data2 = res[1].data;

    data1.items = [...data1.items, ...data2.items]
    return data1
}
export default fetchData