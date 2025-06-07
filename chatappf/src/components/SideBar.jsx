import React, { useEffect, useRef, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast"
import OtherUsers from "./OtherUsers";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import useGetOtherUsers from '../hooks/useGetOtherUser'
function SideBar() {
  useGetOtherUsers()
  const [search, setSearch] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { otherUsers } = useSelector(store => store.user)

  const fullUserList = useRef(otherUsers)
  const [filteredOtherUsers, setFilteredOtherUsers] = useState(otherUsers);


  //ref to store the full list of user

  //updating fulluserlist whenever otheruser changes
  useEffect(() => {
    fullUserList.current = otherUsers;
    setFilteredOtherUsers(otherUsers);
  }, [otherUsers])
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/logout`)
      dispatch(setAuthUser(null))
      navigate("/Login")
      toast.success(res.data.message)

    } catch (error) {
      console.log(`error at logout ${error}`);

    }
  }
  const onSubmitHandler = (e) => {
    e.preventDefault()


    const finduser = fullUserList.current.filter((user) => user?.fullname.toLowerCase().includes(search.toLowerCase()))
    if (finduser.length > 0) {
      setFilteredOtherUsers(finduser);
    }
    else {
      toast.error("User not found")
    }
    setSearch('');
  }
  return (
    <div className=" border-r slate-500 p-4 flex flex-col ">
      <form onSubmit={onSubmitHandler} action="" className="flex items-center gap-1">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="input input-bordered h-8 rounded-full text-black"
          placeholder="Search..."
        />
        <button
          type="submit"
          className=" w-10 !h-9 bg-slate-500 flex items-center justify-center mr-1 rounded-full"
        >
          <BiSearchAlt2 size="15px" className="w-6 h-6 outline-none " />
        </button>
      </form>
      <div className="divider px-2"></div>
      <OtherUsers filteredUsers={filteredOtherUsers} />
      <div className="mt-2">
        <button
          onClick={logoutHandler} className="btn btn-sm">LogOut</button>
      </div>
    </div>
  );
}

export default SideBar;
