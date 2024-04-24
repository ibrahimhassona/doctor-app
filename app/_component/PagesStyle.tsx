const PagesStyle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-2 h-auto overflow-y-auto max-sm:overflow-y-visible ">
      {children}
    </div>
  );
};

export default PagesStyle;
