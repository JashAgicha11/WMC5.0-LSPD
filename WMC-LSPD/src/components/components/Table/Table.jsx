import { useState } from "react";
import Row from "./Row";

export default function Table({ list, header }) {
    const [len, setLen] = useState(50);
    const [currentPage, setCurrentPage] = useState(1);
    const [search,setSearch] = useState('');
    const handleSelectChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setLen(value);
        setCurrentPage(1);
    };
    const totalPages = Math.ceil(list.length / len);
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * len;
    const displayedList = list.filter((user)=> {
        if(search==="") {
            return user;
        } else if(user.username.toLowerCase().includes(search.toLowerCase())){
            return user;
        }
    }).slice(startIndex, startIndex + len);

    return (
        <div className="w-full h-full border-2 border-black rounded-lg overflow-auto">
            <div className="w-full px-4 py-2 flex justify-between overflow-hidden">
                <div className="flex gap-x-4">
                    <input
                        className="border-2 border-black rounded-md w-40 text-center py-0.5 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-blue-500"
                        type="text"
                        onChange={(ev) => {
                            setSearch(ev.target.value)
                        }}
                        placeholder="search.."
                    />
                </div>
                <select 
                    className="border-2 border-black rounded-md w-40 text-center py-0.5 focus:outline-none" 
                    onChange={handleSelectChange}
                    defaultValue="50"
                >
                    <option value="10">10 rows per page</option>
                    <option value="50">50 rows per page</option>
                    <option value="100">100 rows per page</option>
                    <option value={list.length}>All</option>
                </select>
            </div>
            <div className="w-full px-4 flex divide-x divide-purple-500 font-bold">
                <div className="flex w-full bg-rose-300 border-2 divide-x divide-purple-500 p-1.5 rounded-lg">
                    <p className="w-[40%] pl-2 text-center">Username</p>
                    <p className="w-[40%] text-center pl-2">Email</p>
                    <p className="w-[20%] text-center">Edit</p>
                </div>
            </div>
            <div className="w-full px-4 my-2 flex flex-col">
                {
                    displayedList.map((user, index) => (
                        <Row key={index} index={startIndex + index + 1} username={user.username} email={user.email} role={user.role} />
                    ))
                }
            </div>

            {
                totalPages !== 1 &&
                (
                    <div className="w-full flex justify-between px-4 py-2">
                        <button 
                            onClick={handlePrevPage} 
                            disabled={currentPage === 1} 
                            className="border-2 border-black rounded-md px-4 py-1"
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button 
                            onClick={handleNextPage} 
                            disabled={currentPage === totalPages} 
                            className="border-2 border-black rounded-md px-4 py-1"
                        >
                            Next
                        </button>
                    </div>
                )
            }
        </div>
    );
}
