import React from "react";

export default function MySingleSelect({ onChange, value }) {
  return (
    <select onChange={onChange} value={value}>
      <option value="low">low</option>
      <option value="mid">mid</option>
      <option value="high">high</option>
    </select>
  );
}
