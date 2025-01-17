import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id,
}: BlogCardProps) => {
    // Utility function to strip HTML tags from content for the preview
    const stripHtmlTags = (html: string) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    // Strip HTML from content before truncating
    const previewContent = stripHtmlTags(content).substring(0, 100);

    return (
        <Link to={`/blog/${id}`}>
            <div className="border-b-[1px] border-slate-200 p-4 pb-4 w-screen max-w-screen-sm cursor-pointer">
                <div className="flex">
                    <div>
                        <Avatar name={authorName} />
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
                <div className="text-xl font-bold pt-2">{title}</div>
                <div className="text-md">
                    {previewContent.length >= 100 ? previewContent + "..." : previewContent}
                </div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                    {`${Math.ceil(previewContent.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    );
};

export function Avatar({ name, size = "sm", textSize = "sm" }: { name: string; size?: string; textSize?: string }) {
    const sizeClasses = size === "lg" ? "w-10 h-10" : "w-6 h-6";
    const textSizeClasses = textSize === "lg" ? "text-lg" : "text-sm";

    return (
        <div>
            <div className={`relative inline-flex items-center justify-center ${sizeClasses} overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600`}>
                <span className={`font-medium ${textSizeClasses} text-gray-600 dark:text-gray-300`}>
                    {name[0]}
                </span>
            </div>
        </div>
    );
}
