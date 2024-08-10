import { useEffect, useState } from "react"
import Loader from "../components/Loader";
import Table from "../components/Table/Table";
import { useNavigate } from "react-router-dom";

export default function AdminControl(){
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [data, setData] = useState([]);
    const [role, setRole] = useState('admin');
    const header = ['Sr.', 'Name', 'Email ID', 'Role'];
    const navigate = useNavigate();
    const fetchUsers = async () => {
        setFetching(true);
        const response = await fetch('https://lspd-project.onrender.com/list', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({role}),
            credentials: "include",
        });
        const data = await response.json();
        setData(data);
        setFetching(false);
    }


    useEffect(() => {
        setLoading(true);
        setFetching(true);
        authenticated().catch(console.error);
        setLoading(false);
        fetchUsers();
    },[role]);

    if(loading){
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <Loader/>
            </div>
        )
    }
    
    return (
        <div className="w-screen h-screen flex flex-col p-2 bg-yellow-200">
            <p className="text-3xl font-mono font-bold text-center">Admin Control</p>
            <div className="flex gap-x-2 mb-1">
                <p 
                    className=
                    {
                        `text-2xl cursor-pointer rounded-lg p-1 transition-all duration-300 ${role==='admin'?"bg-blue-500 text-white":""}`
                    }
                    onClick={() => {setRole('admin')}}>Admins
                </p>
                <p className=
                    {
                        `text-2xl cursor-pointer rounded-lg p-1 transition-all duration-300 ${role==='user'?"bg-blue-500 text-white":""}`
                    }
                    onClick={() => {setRole('user')}}>Users</p>
            </div>
            <div className="w-full h-full flex justify-center items-center overflow-hidden bg-gray-100">
                {
                    fetching ? (<Loader/>) : (<Table list={data} header={header}/>)
                }
            </div>
        </div>
    )
}