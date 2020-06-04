export const MenuItems = [
  { id: 1, title: "Home", path: "/database-management", exact: true },
  {
    id: 99,
    title: "Tables",
    path: "/database-management",
    exact: false,
    children: [
      {
        id: 2,
        title: "Structures",
        path: "/database-management/structures",
        exact: true,
      },
      {
        id: 5,
        title: "Structure Types",
        path: "/database-management/structure-types",
        exact: true,
      },
      {
        id: 8,
        title: "Measurements",
        path: "/database-management/measurements",
        exact: true,
      },
      {
        id: 9,
        title: "Measurement Types",
        path: "/database-management/measurement-types",
        exact: true,
      },
      {
        id: 10,
        title: "Structures to Measurements",
        path: "/database-management/structures/measurements",
        exact: true,
      },
      {
        id: 6,
        title: "Units",
        path: "/database-management/units",
        exact: true,
      },
      {
        id: 7,
        title: "Sources",
        path: "/database-management/sources",
        exact: true,
      },
      {
        id: 11,
        title: "Reaches",
        path: "/database-management/reaches",
        exact: true,
      },
      {
        id: 3,
        title: "Recharge Projects",
        path: "/database-management/recharge-projects",
        exact: true,
      },
      {
        id: 4,
        title: "Recharge Decrees",
        path: "/database-management/recharge-decrees",
        exact: true,
      },
      {
        id: 12,
        title: "Recharge Pivot Groups",
        path: "/database-management/recharge-pivot-groups",
        exact: true,
      },
      {
        id: 13,
        title: "Recharge Slices",
        path: "/recharge-accounting/water-slices",
        exact: true,
      },
      {
        id: 14,
        title: "Alerts",
        path: "/database-management/alerts",
        exact: true,
      },
    ],
  },
];
