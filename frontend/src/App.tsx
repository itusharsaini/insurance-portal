import React, { FC } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./common/layouts/user-layout";
import routes from "./common/routes";

const App: FC = () => {
  return (
    <BrowserRouter>
      <UserLayout>
        <Routes>
          {routes?.map((route) =>
            <Route key={route.key} index={route.isIndex} path={route.path} element={<route.page/>}/>
          )}
        </Routes>
      </UserLayout>
    </BrowserRouter>
  );
};

export default App;
