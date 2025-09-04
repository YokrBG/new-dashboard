export const notifications = [
  {
    id: 1,
    title: "New Conversion",
    desc: "A new conversion has been recorded.",
    avatar: "01.png",
    unread_message: true,
    type: "text",
    date: "Just now",
  },
  {
    id: 2,
    title: "Lead Needs Attention",
    desc: "A lead requires your attention.",
    avatar: "02.png",
    unread_message: true,
    type: "confirm",
    date: "5m ago",
}
];

export type Notification = (typeof notifications)[number];