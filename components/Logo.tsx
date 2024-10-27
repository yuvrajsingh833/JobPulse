import Image from "next/image";
import logo from "@assets/plain_logo_white.png";

export default function Logo(props: { width?: number }) {
  return (
    <div className="flex items-center gap-2 md:gap-3 md:pl-2">
      <Image src={logo} alt="logo" width={props?.width ?? 50}></Image>
      <p className="text-3xl text-white font-semibold">JobPulse</p>
    </div>
  );
}
