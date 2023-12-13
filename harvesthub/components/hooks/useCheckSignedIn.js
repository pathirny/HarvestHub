export default function useCheckSignedIn() {
  const [signedIn, setSignedIn] = useState();
async function apiCall(){
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    console.log(user, "logged in");
    setSignedIn(true);
  } else {
    console.log("user not logged in");
    setSignedIn(false);
  } }

  apiCall()

  return {signedIn};
}
