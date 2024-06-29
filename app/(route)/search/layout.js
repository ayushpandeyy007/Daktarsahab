import React from "react";
import CategoryList from "./_component/CategoryList";

const Layout = ({ children }) => {
  return (
    <div className="  container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="hidden md:block md:col-span-1">
          <div className="sticky top-8">
            <CategoryList />
          </div>
        </div>
        <div className="col-span-1 md:col-span-3">
          <main className="bg-white rounded-lg shadow-md p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
