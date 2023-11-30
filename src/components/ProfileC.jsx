import Flag from "react-flagkit";
import PatchProfileForm from "./PatchProfileForm";

export default function ProfileC({ profileData, rivals, age, editing, own=false }) {
  return (
    <>
      {editing ? (
        <div>
          <PatchProfileForm 
          profileData={profileData}/>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2  ml-9 flex items-center">
              <p className="font-bold  text-gray-700 text-xl mr-2">
                {rivals.length}{" "}
              </p>
              <p className="text-gray-400">Rivals</p>
            </div>
            <div className="md:col-span-1 flex items-center justify-end mr-10">
              <div className="w-37 h-37 bg-indigo-100 mx-auto rounded-full shadow-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-20 w-20 ${
                    profileData.genre === "M"
                      ? "text-blue-400"
                      : profileData.genre === "F"
                      ? "text-purple-400"
                      : profileData.genre === "O"
                      ? "text-gray-400"
                      : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-4  mr-10 text-center pb-8 ">
            <h1 className="text-4xl font-medium text-gray-700">
              {profileData.name} {profileData.lastname}
              <span className="ml-4 inline-block">
                <Flag country={profileData.nationality} size={40}></Flag>
              </span>
            </h1>
            <p className="font-roboto text-gray-600 mt-3">
              {profileData.username}
            </p>
            {own && (
  <>
    <p className="mt-2 text-gray-500">{profileData.email}</p>
    <p className="mt-2 text-gray-500">{age} Años</p>
    <p className="mt-2 text-gray-500">{profileData.number}</p>
  </>
)}
          </div>
        </div>
      )}
    </>
  );
}
