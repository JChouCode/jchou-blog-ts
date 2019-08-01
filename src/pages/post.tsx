import React from "react";
import { useRouteData } from "react-static";

export default () => {
  const { post }: { post: any } = useRouteData();
  return (
    <div>
      {JSON.stringify(post)}
    </div>
  )
}