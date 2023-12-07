export default function Footer() {
  return (
    <footer className="p-4 flex bg-white justify-around border-[1.5px] text-[#8a8787] font-thin">
      <p className="">Copyright © 2023 J2Devs</p>
      <ul className="flex justify-between gap-4">
        <li className="cursor-pointer hover:underline">
          <a href="https://www.facebook.com/J2Devs-100232632425425">Facebook</a>
        </li>
        |
        <li className="cursor-pointer hover:underline">
          <a href="https://www.instagram.com/j2devs/">Instagram</a>
        </li>
        |
        <li className="cursor-pointer hover:underline">
          <a href="https://www.linkedin.com/company/j2devs">LinkedIn</a>
        </li>
        |
      </ul>
    </footer>
  );
}
