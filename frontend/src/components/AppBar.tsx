import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"



export const AppBar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={'/blogs'} className="flex justify-center flex-col text-3xl font-extrabold" >
                Medium
        </Link>
        <div className="flex">
            <Link to={'/publish'}>
                    <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-2 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>
            <Avatar name={"Harkirat"} size="lg" textSize={"md"} />
        </div>

    </div>
}