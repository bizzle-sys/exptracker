import React from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../../pages/dashboard/transactionAction";
import { useEffect } from "react";
import { getTransaction } from "../../pages/dashboard/transactionAction";

//1. fetch all transaction from the database
//2. put all the trans to the redux store
//3. get all the trans from the redux store into the table and display

export const TransTable = () => {
  const dispatch = useDispatch();
  const { trans } = useSelector((state) => state.transactions);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    !trans.length && dispatch(getTransaction(user.uid));
  }, []);

  const handleOnDelete = (id) => {
    if (window.confirm("delete?")) dispatch(deleteTransaction(id));
    alert(id);
  };
  return (
    <div className="mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Deleted</th>
          </tr>
        </thead>

        <tbody>
          {trans.map((item, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.amount}</td>
              <td>{item.date}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleOnDelete(item.id)}>
                  <i className="fa-sharp fa-solid fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
