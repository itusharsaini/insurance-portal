import React, { FC, memo } from 'react';
import Header from "../../components/header-component";
import Sidebar from "../../components/siderbar-component";
import "../../styles/user-layout.css";

interface Props {
  children: React.ReactNode;
}

const UserLayout: FC<Props> = memo(({children}) => {
  return (
    <div className={'container-custom'}>
      <Header/>
      <Sidebar/>
      <div className={'content'}>
        {children}
      </div>
    </div>
  );
}, (p, n) => p.children !== n.children);

export default UserLayout;
