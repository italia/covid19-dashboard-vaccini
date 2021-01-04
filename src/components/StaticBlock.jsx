import { React } from "react";

export const StaticBlock = (props) => {
  return (
    <div className={"d-flex m-2 p-2 w-100 h-75 justify-content-center text-center " + props.classes}>
      {props.text}
    </div>
  )
}