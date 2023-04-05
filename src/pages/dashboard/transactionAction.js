import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { setTrans } from "./transactionSlice";

// pull data from firebaseDB and add to redux store for specific user based on uid
export const getTransaction = (userId) => async (dispatch) => {
  try {
    const q = query(
      collection(db, "transaction"),
      where("userId", "==", userId)
    );

    const { docs } = await getDocs(q);

    console.log(docs);
    const trans = [];

    docs.forEach((item) => {
      trans.push({ ...item.data(), id: item.id });
    });
    dispatch(setTrans(trans));
  } catch (error) {}
};

// add data to firerbaseDB
export const addTransactionAction = (data) => async (dispatch) => {
  try {
    const respPending = addDoc(collection(db, "transaction"), data);
    toast.promise(respPending, {
      pending: "please wait",
    });
    const result = await respPending;
    if (result?.id) {
      toast.success("new transaction added");
      //   get all transaction
      dispatch(getTransaction(data.userId));
    }
  } catch (error) {
    toast.error(error.message);
  }
};

// delete transaction based on given id

export const deleteTransaction = (id) => async (dispatch) => {
  try {
    const resultPending = deleteDoc(doc(db, "transaction", id));
    toast.promise(resultPending, {
      pending: "please wait",
    });
  } catch (error) {
    toast.error(error.message);
  }
};
