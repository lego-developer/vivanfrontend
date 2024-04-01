import axios from "axios"

const upload = async (file) => {
    const preset_key = "vivanstore"
    const cloud_name = "vivanlegos"

    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", preset_key)
    data.append("cloud_name",cloud_name)

   // console.log(data)

    try {
       const res =  await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, data)
            
            const {url} = res.data
            return url
        
        // console.log(res.data.url) // Log the URL of the uploaded image
    } catch (error) {
        console.log(error)
    }
}

export default upload

