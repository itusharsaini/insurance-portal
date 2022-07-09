import React, { useEffect } from "react";

interface Props {
  Component: any;
  title: string;
}

const index = ({Component, title}: Props) => (props: JSX.IntrinsicAttributes) => {

  useEffect(() => {
    document.title = title;
  }, []);

  return <Component {...props}/>;
};

export default index;
