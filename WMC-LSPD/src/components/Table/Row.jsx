import { Avatar, Button } from "@nextui-org/react";

export default function Row({index, username, email, role}){
    return (
        <div 
            className="flex w-full border-2 border-gray-400 bg-gray-100 divide-x divide-purple-500 p-1.5 my-1 rounded-lg hover:shadow-md" 
            key={index}
        >
            <div className="w-[40%] pl-2 flex gap-x-2 items-center">
                <Avatar name={username.toUpperCase().charAt(0)} className="w-[5%] text-center bg-red-500 w-10 h-10 text-white"/>
                {username}
            </div>
            <p className="w-[40%] pverflow-x-scroll pl-2 flex items-center">{email}</p>
            <div className="w-[20%] flex items-center justify-center">
                <Button className="w-[50%] bg-blue-500 rounded-lg text-white flex items-center justify-center">Edit</Button>
            </div>            
        </div>
    )
}