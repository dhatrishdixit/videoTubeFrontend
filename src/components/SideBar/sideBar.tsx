import { Button } from "../ui/button";

// in place of this have user info
type btnTypes = {
  name: string;
  clickHandler: () => void;
  variant:
    | "outline"
    | "secondary"
    | "destructive"
    | "link"
    | "default"
    | "ghost"
    | null
    | undefined;
};
const arr: btnTypes[] = [
  {
    name: "Home",
    clickHandler: function () {
      // navigate to home page
    },
    variant: "outline",
  },
  {
    name: "Subscriptions",
    clickHandler: function () {
      // direct to subscription page
    },
    variant: "outline",
  },
  {
    name: "History",
    clickHandler: function () {
      //direct to watch history page
    },
    variant: "outline",
  },
  {
    name: "Playlists",
    clickHandler: function () {
      // direct to all the playlists
    },
    variant: "outline",
  },
  {
    name: "Liked Video",
    clickHandler: function () {
      //direct to all the liked videos
    },
    variant: "outline",
  },
  {
    name: "Logout",
    clickHandler: function () {
      // call logout route
    },
    variant: "secondary",
  },
  {
    name: "Delete account",
    clickHandler: function () {
      // firstgive out a pop up window to confirm and once confirmed delete the account of the user
    },
    variant: "destructive",
  },
];

export function SideBar() {
  return (
    <div
      className=" h-screen overflow-x-hidden
        dark:scrollbar-track-[#09090b] scrollbar-thumb-red-600 scrollbar-track-white scrollbar-thin mt-10"
    >
      {arr.map((curr) => (
        <Button
          variant={curr.variant}
          className="w-full mt-2  hover:bg-red-600  "
          onClick={curr.clickHandler}
        >
          {curr.name}
        </Button>
      ))}
    </div>
  );
}
