const FetuerWraping = ({ children }: { children: React.ReactNode }) => {
  // ----------------- CONTAINER FOR THE SMALL FETURE THAT IN HOME PAGE -----------------
  return (
    <div className="w-[200px] h-[140px]   feature-wraping">
      {children}
    </div>
  );
};

export default FetuerWraping;
