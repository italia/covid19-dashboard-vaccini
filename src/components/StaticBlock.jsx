import { React } from "react";

export const StaticBlock = (props) => {
  return (
    <div className={"d-flex mt-2 p-4 w-100 justify-content-center text-center " + props.classes}>
      {props.text}
    </div>
  )
}