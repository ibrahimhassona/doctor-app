import Image from "next/image";
const En = () => {

  return (
    <div className="flex items-center justify-center gap-2 ">
      <p>English</p>
      <Image
        className="rounded-sm bg-white"
        src="/en.png"
        alt="English"
        width={20}
        height={20}
      />
    </div>
  );
};

export default En;
