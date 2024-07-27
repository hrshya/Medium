import axios from "axios"
import { AppBar } from "../components/AppBar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



export const Publish = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate();

    return <div>
                <AppBar />
                <div className="flex justify-center pt-8">
                    <div className="max-w-screen-lg w-full relative">
                        <input onChange={(e) => {
                        setTitle(e.target.value)
                    }} type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300  focus:outline-none peer" placeholder="Title" />

                        <textarea onChange={(e) => {
                            setDescription(e.target.value)
                        }} rows={4} className="mt-8 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none" placeholder="Your message..."></textarea>

                        <button onClick={async() => {
                            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                                title,
                                content : description
                            }, {
                                headers : {
                                    Authorization : localStorage.getItem("token")
                                }
                            });
                            navigate(`/blog/${response.data.id}`)
                        }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-4 right-0 absolute mb-2">Publish</button>

                    </div>
                </div>
    </div>
}