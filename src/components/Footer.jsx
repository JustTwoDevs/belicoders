export default function Footer() {
  return (
    <footer className="p-8 flex bg-white justify-around">
      <p className="text-black">
        © J2Devs 2023 - Todos los derechos reservados
      </p>
      <ul className="flex justify-between gap-8 text-black">
        <li className="cursor-pointer">
          <a href="https://www.facebook.com/J2Devs-100232632425425">Facebook</a>
        </li>
        <li className="cursor-pointer">
          <a href="https://www.instagram.com/j2devs/">Instagram</a>
        </li>
        <li className="cursor-pointer">
          <a href="https://www.linkedin.com/company/j2devs">LinkedIn</a>
        </li>
      </ul>
    </footer>
  );
}
