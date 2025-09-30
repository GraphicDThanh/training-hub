import Image from "next/image";
import { ReactNode } from "react";

const ProjectWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="-mt-[150px] sm:-mt-[100px]">
      <div className="relative overflow-hidden md:min-w-[320px] min-h-[300px] rounded-xl">
        <Image
          alt="All Projects"
          src={"/images/backgrounds/bg-profile.webp"}
          priority
          fill
          className="object-cover"
          sizes="(max-width: 400px) 33vw, 100vw"
        />
        <div className="absolute w-full h-full bg-project-layer rounded-xl" />
      </div>
      {children}
    </div>
  );
};

export default ProjectWrapper;
