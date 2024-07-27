import { Link } from "react-router-dom";



interface BlogCardProps{
    authorName : string;
    title : string;
    content : string;
    publishedDate : string;
    id : number
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps ) => {
    return <Link to={`/blog/${id}`}>
            <div className="border-b-[1px] border-slate-200 p-4 pb-4 w-screen max-w-screen-sm cursor-pointer">
                    <div className="flex">
                        <div className="">
                            <Avatar name = { authorName } />
                        </div>
                        <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                            {authorName} 
                        </div>
                        <div className="flex justify-center flex-col text-slate-500 pl-2 text-[8px]">
                            &#9679;
                        </div>
                    <div className="font-thin pl-2 text-slate-500 text-sm flex justify-center flex-col">
                            {publishedDate}
                    </div>
                    </div>
                    <div className="text-xl font-bold pt-2">
                        {title}
                    </div>
                    <div className="text-md">
                        {content.length >= 100 ? content.substring(0,100) + "..." : content}
                    </div>
                    <div className="text-slate-500 text-sm font-thin pt-4">
                        {`${Math.ceil(content.length / 100)} minute(s) read`}
                    </div>
                    
            </div>
    </Link>
}


export function Avatar({ name, size = 6, textSize = "sm" }: { name : string, size? : number, textSize? : string }){
    return <div>
        <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600`}>
            <span className={`font-medium text-${textSize} text-gray-600 dark:text-gray-300`}>{ name[0] }</span>
        </div>
    </div>
}