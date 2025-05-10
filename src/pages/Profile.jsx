import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import ProfileUserCard from "../components/ProfileUserCard";
import Sidebar from "../components/Sidebar";
import { Boxes } from "lucide-react";

function Profile() {
  const { user } = useAuthStore();

  return (
    <div className="flex">
      <Sidebar username={user.username} />


      <div className="ml-14 md:ml-52 flex-1 p-3 flex flex-col lg:flex-row gap-4 overflow-y-auto h-screen">
        <ProfileUserCard username={user.username} email={user.email} />

        <div className="flex-1 w-full h-auto bg-gray-100 rounded-md shadow lg:h-[450px] p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow w-full md:w-[250px] lg:w-full h-[150px] transition-transform hover:scale-105 duration-200 ease-in-out cursor-pointer">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium text-gray-700">Stashs</h1>
                <div className="p-2 bg-rose-100 text-rose-500 rounded-full">
                  <Boxes size={20} />
                </div>
              </div>
              <h2 className="text-5xl font-bold mt-3 text-gray-800 font-oswald">15</h2>
              <p className="text-xs text-gray-500 mt-1">Total stash items saved</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow w-full md:w-[250px] lg:w-full h-[150px] transition-transform hover:scale-105 duration-200 ease-in-out cursor-pointer">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium text-gray-700">Outlooks</h1>
                <div className="p-2 bg-rose-100 text-rose-500 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
              </div>
              <h2 className="text-5xl font-bold mt-3 text-gray-800 font-oswald">22</h2>
              <p className="text-xs text-gray-500 mt-1">User feedback entries</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow w-full md:w-[250px] lg:w-full h-[150px] transition-transform hover:scale-105 duration-200 ease-in-out cursor-pointer">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium text-gray-700">Refinements</h1>
                <div className="p-2 bg-rose-100 text-rose-500 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-5xl font-bold mt-3 text-gray-800 font-oswald">8</h2>
              <p className="text-xs text-gray-500 mt-1">Pending refinement requests</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow w-full md:w-[250px] lg:w-full h-[150px] transition-transform hover:scale-105 duration-200 ease-in-out cursor-pointer">
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-medium text-gray-700">Creations</h1>
                <div className="p-2 bg-rose-100 text-rose-500 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 7v13h18V7H3z" />
                    <path d="M16 3H8v4h8V3z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-5xl font-bold mt-3 text-gray-800 font-oswald">12</h2>
              <p className="text-xs text-gray-500 mt-1">Designs published</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
