import Image from "next/image";
const Ar = () => {
  return (
    <div className="flex items-center justify-center gap-2 ">
      <p>العربيه</p>
      <Image
        className="rounded-sm"
        src="/ar.png"
        alt="Arabic"
        width={20}
        height={20}
      />
    </div>
  );
};

export default Ar;
