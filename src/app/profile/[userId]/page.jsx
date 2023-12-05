"use client";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { useEffect, useState } from "react";
import ProfileC from "@/components/ProfileC";
import RivalsTable from "@/components/RivalsTable";
import ContestsTable from "@/components/ContestsTable";

async function getRivals(userId) {
  console.log(userId);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/rivals`;
  //  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${user}/rivals`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else alert(data.message);
  } catch (error) {
    console.log(`Error in rivals : ${error.message}`);
  }
}

async function getContests(userId) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}/contests`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else alert(data.message);
  } catch (error) {
    console.log(`Error al obtener contests: ${error.message}`);
  }
}

async function getProfile(userId) {
  try {
    console.log(userId);

    const response = await fetch(
      // `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}`,
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (response.ok) return data;
    else console.log(data.message);
  } catch (error) {
    console.log(`Error in profile user : ${error.message}`);
  }
}

export default function Profile(userId) {
  const [profileData, setProfileData] = useState(null);
  const [rivals, setRivals] = useState(null);
  const [contests, setContests] = useState(null);

  const [show, setShow] = useState("rivals");

  useEffect(() => {
    async function fetchRivals() {
      try {
        if (show === "rivals") {
          const data = await getRivals(userId.params.userId);
          setRivals(data);
        } else {
          const data = await getContests(userId.params.userId);
          setContests(data);
        }
      } catch (error) {
        console.log(`Error in rivals: ${error.message}`);
      }
    }

    fetchRivals();
  }, [show, userId]);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const data = await getProfile(userId.params.userId);
        setProfileData(data);
      } catch (error) {
        console.log(`Error in profile: ${error.message}`);
      }
    }

    fetchProfileData();
  });

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
                  own={false}
                ></ProfileC>
              </div>
              <button
                onClick={() => setShow("rivals")}
                className="text-white  mt-10 mr-20 ml-20 py-2 px-4 rounded bg-green-400 hover:bg-green-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                Rivals
              </button>
              <button
                onClick={() => setShow("contests")}
                className="text-white  py-2 px-4 rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                Contests
              </button>
            </div>
          )}
        </SplitterPanel>
        <SplitterPanel className="flex align-items-center justify-content-center">
          <div className="p-10">
            <h1 className="text-2xl font-bold mb-4 text-center">Problems</h1>

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
