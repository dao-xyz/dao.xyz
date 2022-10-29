import { Routes, Route } from "react-router";
import { Navigate } from 'react-router';
import { ProfileUser, USERNAME_PATH_PARAM } from "../pages/user/ProfileUser";
import Landing from "../pages/landing/Landing";
import { NewUser } from "../pages/user/NewUser";
import { SettingsUser } from "../pages/user/SettingsUser";
import { Chat } from "../components/channel/post/Chat";
export const USER_NEW = "user/new";
export const USER_SETTINGS = "settings";
export const USER_PROFILE = "user/:" + USERNAME_PATH_PARAM;
export const getUserProfilePath = (user: string) => "user/" + user;
export const HOME = "";
export const EXPLORE = "explore";
export const DEPOSIT = "deposit";
export const WITHDRAW = "withdraw";
export const SETTINGS = "/settings";
export const SETTINGS_BURNER = "/settings/burner";
export const ABOUT = "about";


export function BaseRoutes() {
  return (
    <Routes>
      <Route path={USER_NEW} element={<NewUser />} />
      <Route path={USER_SETTINGS} element={<SettingsUser />} />
      <Route path={USER_PROFILE} element={<ProfileUser />} />
      <Route path={SETTINGS} element={<SettingsUser />} />
      <Route path={ABOUT} element={<Landing />} />
      <Route path={"/:key"} element={<Chat />} />
      <Route path={"/"} element={<Chat />} />
    </Routes>
  );
}
