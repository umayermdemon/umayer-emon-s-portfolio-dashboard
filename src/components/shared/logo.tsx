import Image from "next/image";
import logo from "@/assets/logo.png";
const Logo = () => {
  return (
    <div>
      <Image src={logo} alt="Umayer's logo" width={35} height={35} />
    </div>
  );
};

export default Logo;
