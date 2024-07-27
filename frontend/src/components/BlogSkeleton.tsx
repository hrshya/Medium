


export const BlogSkeleton = () => {
    return <div className="border-b-[1px] border-slate-200 p-4 pb-4 w-screen max-w-screen-sm cursor-pointer">
        <div className="flex">
            <div className="">
            <div className="h-4 bg-gray-200 rounded-full  w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
        <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
            <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>
        <div className="flex justify-center flex-col text-slate-500 pl-2 text-[8px]">
            &#9679;
        </div>
    <div className="font-thin pl-2 text-slate-500 text-sm flex justify-center flex-col">
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
    </div>
    </div>
    <div className="text-xl font-bold pt-2">
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
    </div>
    <div className="text-md">
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
    </div>
    <div className="text-slate-500 text-sm font-thin pt-4">
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
    </div>
    
    <div role="status" className="max-w-sm animate-pulse">
    </div> 
    <span className="sr-only">Loading...</span>
</div>
}