import React from "react";
import { withKnobs, text, object } from "@storybook/addon-knobs/react";
import { default as SearchableList } from "./SearchableList";
import { useState } from "react";

export default {
  title: "Components/SearchableList",
  parameters: {
    component: SearchableList,
    componentSubtitle: "Component for rendering a searchable list.",
  },
  decorators: [
    // (storyFn) => <Paper style={{ padding: 20 }}>{storyFn()}</Paper>,
    withKnobs,
  ],
};

export const Default = () => {
  const [activeUser, setActiveUser] = useState({});
  const Users = [
    { ndx: 1, username: "ben.tyler@lrewater.com" },
    { ndx: 2, username: "savannah.tjaden@lrewater.com" },
  ];

  const handleClick = (user) => {
    setActiveUser(user);
    alert(`${user.username} selected!`);
  };

  return (
    <div>
      <SearchableList
        title="Users List"
        data={Users}
        valueField="ndx"
        displayField="username"
        active={activeUser}
        onClick={handleClick}
      />
    </div>
  );
};
