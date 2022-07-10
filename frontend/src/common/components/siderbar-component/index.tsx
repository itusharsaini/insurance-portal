import React, { FC, memo, useEffect, useState } from 'react';
import routes from "../../routes";
import { Link } from "react-router-dom";

const Index: FC = memo(() => {
  const [activeRoute, setActiveRoute] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveRoute(window.location.pathname);
    }
  }, []);

  return (
    <aside>
      {routes?.map((route) => {
          if (route.key !== "edit") {
            return <Link
              className={activeRoute === route.path ? "link link-active" : "link"}
              onClick={() => setActiveRoute(route.path)}
              to={route.path}
              key={route.key}>
              {route.label}
            </Link>;
          } else {
            return null;
          }
        }
      )}
    </aside>
  );
});

export default Index;
