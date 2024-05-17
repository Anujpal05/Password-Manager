import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Manager() {
    const ref = useRef();
    const passwordref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        const passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords));
        }
    }, [])


    const handlevalue = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    const showPassword = () => {
        if (ref.current.innerHTML === '<i class="fa-solid fa-eye"></i>') {
            ref.current.innerHTML = '<i className="fa-solid fa-eye-slash"></i>'
            passwordref.current.type = "text";
        } else {
            ref.current.innerHTML = '<i className="fa-solid fa-eye"></i>'
            passwordref.current.type = "password";
        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            console.log([...passwordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            setform({ site: "", username: "", password: "" })
            toast("Your Password is saved");
        }
    }

    const deletePassword = (id) => {
        let c = confirm("You are really want to delete your Password!");
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id));
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
        }
    }

    const editPassword = (id) => {
        let c = confirm("Do You want to edit Your Password!");
        if(c){
            setform(passwordArray.filter(item => item.id === id)[0]);
            setpasswordArray(passwordArray.filter(item => item.id !== id));
        }
    }

    const copyPassword = (data) => {
        navigator.clipboard.writeText(data);
        toast(`Your text ${data} is copied`);
    }

    return (
        <>
            <ToastContainer />
            <div className="container  md:w-[70vw] md:m-auto p-10">
                <div className=' text-3xl font-bold text-center'>
                    <span className='text-green-600'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-600'>OP/&gt;</span>
                </div>
                <p className='text-center'>Your own Password Manager</p>
                <div className='flex flex-col gap-5 m-5'>
                    <input className="w-full rounded-full outline-none px-3 py-1 border border-green-600" value={form.site} onChange={handlevalue} placeholder='Enter website URL' type="text" name="site" />
                    <div className='flex gap-5'>
                        <input className=" rounded-full outline-none w-9/12 px-3 py-1 border border-green-600" value={form.username} onChange={handlevalue} placeholder='Enter Username' type="text" name="username" />
                        <div className=' rounded-full flex px-3 py-1 border border-green-600 w-3/12'>
                            <input ref={passwordref} className="w-5/6 outline-none" value={form.password} onChange={handlevalue} placeholder='Enter Password' type="password" name="password" />
                            <span ref={ref} className='cursor-pointer' onClick={showPassword}><i className="fa-solid fa-eye"></i></span>
                        </div>

                    </div>
                </div>
                <div className='flex'>
                    <button className='bg-green-600 hover:bg-green-500 p-2 rounded-full m-auto' onClick={savePassword}><i className="fa-solid fa-plus mx-2"></i>Add Password</button>
                </div>
                <div className="passwords">
                    <h2 className=' font-bold text-xl'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 && <table className="table-auto my-1">
                        <thead >
                            <tr className=' bg-green-700 text-white'>
                                <th className=' w-6/12  px-4 text-center'>Site</th>
                                <th className=' w-4/12 px-4 text-center'>Username</th>
                                <th className=' w-4/12 px-4 text-center'>Password</th>
                                <th className=' w-4/12 px-4 text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100 '>
                            {passwordArray.map((item, index) => {
                                return <tr className=' border-separate border border-white px-1 ' key={index}>
                                    <td className='border-separate border border-white px-1'><a href={item.site} target='_blank '>{item.site} </a><span className='mx-2' onClick={() => copyPassword(item.site)}><i className="fa-solid fa-clone"></i></span></td>
                                    <td className='border-separate border border-white px-1'>{item.username} <span className='mx-2' onClick={() => copyPassword(item.username)}><i className="fa-solid fa-clone"></i></span></td>
                                    <td className='border-separate border border-white px-1'>{item.password} <span className='mx-2' onClick={() => copyPassword(item.password)}><i className="fa-solid fa-clone"></i></span></td>
                                    <td className='border-separate border border-white px-1'><span className='cursor-pointer' onClick={() => editPassword(item.id)}><i className="fa-solid fa-pen px-2"></i></span><span className='cursor-pointer' onClick={() => deletePassword(item.id)}><i className="px-2 fa-solid fa-trash"></i></span></td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>

            </div>


        </>
    )
}
