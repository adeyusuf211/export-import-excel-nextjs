export default async function handler(req, res) {
    const api = await fetch("https://dummyjson.com/products");
    const data = await api.json();

    if(data) return res.status(200).json(data);
    return res.status(404).json({ error: "Data not found" })
}