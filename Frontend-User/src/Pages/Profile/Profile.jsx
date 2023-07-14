import { useLocation } from "react-router-dom";
import { redirect } from "react-router-dom";
import Student_profile from "./components/Student_profile";

function Profile() {
  const location = useLocation();
  const user = location?.state?.user;
  const isAuthenticated = Boolean(location?.state?.user);
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    // return <Redirect to="/" />;
    return redirect("/login");
  }

  return (
    <div>
      <Student_profile user={user} />
    </div>
  );
}

export default Profile;
