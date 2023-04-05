import { toast } from "react-toastify";
import { auth, db } from "../../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from "./userSlice";

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      // check with auth service
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);

      if (user?.uid) {
        // if auth service is true then get user from store service
        const userResp = await getDoc(doc(db, "users", "user?.uid"));
        const userInfo = { ...userResp.data(), uid: user?.uid };

        dispatch(setUser(userInfo));
        // mount user to the redux
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
