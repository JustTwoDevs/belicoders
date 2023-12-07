"use client";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { useEffect, useState } from "react";
import ProfileC from "@/components/ProfileC";
import RivalsTable from "@/components/RivalsTable";
import ContestsTable from "@/components/ContestsTable";
import DropdownButton from "@/components/DropdownButton";
import { useRouter } from "next/navigation";

async function getContests() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myContests`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else alert(data.message);
  } catch (error) {
    console.log(`Error al obtener contests: ${error.message}`);
  }
}

async function getRivals() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myRivals`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else alert(data.message);
  } catch (error) {
    console.log(`Error in rivals : ${error.message}`);
  }
}

async function getMyProfile() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myProfile`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await response.json();
    if (response.ok) return data;
    else console.log(data.message);
  } catch (error) {
    console.log(`Error in user profile: ${error.message}`);
  }
}

export default function Profile() {
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [rivals, setRivals] = useState(null);
  const [contests, setContests] = useState(null);
  const [age, setAge] = useState(0);
  const [editing, setEditing] = useState(false);
  const [isOpenS, setIsOpenS] = useState(false);
  const [show, setShow] = useState("rivals");
  const [isOpenC, setIsOpenC] = useState(false);

  const handleCreate = (value) => {
    if (value === "rivals") {
      router.push("/createRival");
    } else {
      router.push("/createContest");
    }
  };

  const handleShow = (value) => {
    setShow(value);
  };

  useEffect(() => {
    async function fetchRivals() {
      try {
        if (show === "rivals") {
          const data = await getRivals();
          setRivals(data);
        } else {
          const data = await getContests();
          setContests(data);
        }
      } catch (error) {
        console.log(`Error in rivals: ${error.message}`);
      }
    }

    fetchRivals();
  }, [show]);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const data = await getMyProfile();
        setProfileData(data);
        console.log(data);
        const currentYear = new Date().getFullYear();
        const birthYear = new Date(data.birthDate).getFullYear();
        const age = currentYear - birthYear;

        setAge(age);
      } catch (error) {
        console.log(`Error in profile: ${error.message}`);
      }
    }

    fetchProfileData();
  }, [editing]);

  return (
    <div>
      <Splitter style={{ height: "300px" }}>
        <SplitterPanel className="flex align-items-center  bg-black">
          {profileData && rivals && (
            <div className=" bg-white h-full w-full">
              <div className="pl-8 bg-white  mt-24">
                <ProfileC
                  profileData={profileData}
                  rivals={rivals}
                  age={age}
                  editing={editing}
                  own={true}
                ></ProfileC>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setEditing(!editing)}
                  className="text-white  py-2 px-2 rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  {editing ? "Go To Profile" : "Edit Profile"}
                </button>
                <DropdownButton
                  id="show"
                  name="Show"
                  list={["rivals", "contests"]}
                  handleChange={handleShow}
                  isOpen={isOpenS}
                  open={() => {
                    setIsOpenS(true);
                  }}
                  close={() => setIsOpenS(false)}
                />
                <DropdownButton
                  id="create"
                  name="Create"
                  list={["rivals", "contests"]}
                  handleChange={handleCreate}
                  isOpen={isOpenC}
                  open={() => {
                    setIsOpenC(true);
                  }}
                  close={() => setIsOpenC(false)}
                />
              </div>
            </div>
          )}
        </SplitterPanel>
        <SplitterPanel className="flex align-items-center justify-content-center">
          <div className="p-10">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Your problems
            </h1>

            {show === "rivals" && rivals && (
              <RivalsTable value={rivals} columns={["state"]} own={true} />
            )}
            {show === "contests" && contests && (
              <ContestsTable value={contests} />
            )}
          </div>
        </SplitterPanel>
      </Splitter>
    </div>
  );
}
