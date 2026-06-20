import { checkAuthUser } from "../../../utils/auth";

const initPage = () => {
  const isAuthorized = checkAuthUser("USUARIO", "/login");
  if (isAuthorized) {
    const body = document.getElementById("content-body");
    if (body) body.style.display = "block";
  }
};
initPage();
 
  