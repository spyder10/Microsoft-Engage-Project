import React from "react";

export default function CustomOptions(props) {
  return <option value={props.value}>{props.text}</option>;
}
