import React from "react";
import CategoryList from "./_component/CategoryList";

const layout = ({ children }) => {
  return (
    <div className="grid grid-cols-4 ">
      <div className="hidden md:block">
        {/* category */}
        <CategoryList />
      </div>
      <div className="md:col-span-3 col-span-3">{children}</div>
    </div>
  );
};

export default layout;
