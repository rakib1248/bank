import { useState } from "react";
import Swal from "sweetalert2";
import { Bounce, ToastContainer, toast } from "react-toastify";

const Bank = () => {
  const [currentBlc, setcurrentBlc] = useState(0);
  const [addInput, setaddInput] = useState("");
  const [withdInput, setwithdInput] = useState("");
  const [transec, settransec] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handlechanghAddInput = (e) => {
    setaddInput(e.target.value);
  };
  const handlechanghwithdInput = (e) => {
    setwithdInput(e.target.value);
  };

  const handleAddmoney = () => {
    const inpuAmount = Number(addInput);
    if (inpuAmount >= 50) {
      setcurrentBlc((prevstate) => prevstate + inpuAmount);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfully added amount",
        showConfirmButton: false,
        timer: 2000,
      });
      settransec((prevTrans) => [
        ...prevTrans,
        { type: "Deposit", amount: inpuAmount, date: new Date() },
      ]);
      setaddInput("");
    } else {
      toast.error("Minimum amount to add is 50!", {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handlewithmoney = () => {
    const inpuAmount = Number(withdInput);
    if (inpuAmount < 50) {
      toast.error("Minimum withdrawal amount is 50!", {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } else if (inpuAmount > currentBlc) {
      toast.warn("Insufficient balance!", {
        position: "top-center",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } else {
      setcurrentBlc((prevstate) => prevstate - inpuAmount);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfully withdrew amount",
        showConfirmButton: false,
        timer: 2000,
      });
      settransec((prevTrans) => [
        ...prevTrans,
        { type: "Withdrawal", amount: inpuAmount, date: new Date() },
      ]);
      setwithdInput("");
    }
  };

  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  return (
    <>
      <ToastContainer />
      <div className="h-screen flex justify-center items-center bg-[#f3f4f6]">
        <div className="bg-white p-5 shadow-lg">
          <h1 className="font-bold text-2xl text-center pt-3">Flower Bank</h1>
          <p className="text-[#000] text-lg text-center">
            Current Balance: ${currentBlc}
          </p>

          {/* Add Money */}
          <div className="w-96 mb-7">
            <h4>Add Money</h4>
            <input
              className="w-full border px-2 py-1 rounded mt-2"
              type="number"
              onChange={handlechanghAddInput}
              value={addInput}
              placeholder="Enter Your Amount"
            />
            <button
              onClick={handleAddmoney}
              className="w-full bg-[#10b981] rounded text-lg text-white mt-2 py-1"
            >
              Add Money
            </button>
          </div>

          {/* Withdraw Money */}
          <div className="w-96 mb-7">
            <h4>Withdraw Money</h4>
            <input
              className="w-full border px-2 py-1 rounded mt-2"
              type="number"
              onChange={handlechanghwithdInput}
              value={withdInput}
              placeholder="Enter Your Amount"
            />
            <button
              onClick={handlewithmoney}
              className="w-full bg-[#ef4444] rounded text-lg text-white mt-2 py-1"
            >
              Withdraw Money
            </button>
          </div>

          {/* View Transaction History */}
          <div className="text-center">
            <button
              onClick={toggleHistory}
              className="bg-[#3b82f6] text-white w-auto py-2 px-4 rounded"
            >
              {showHistory ? "Hide" : "View"} Transaction History
            </button>
          </div>

          {/* Transaction History */}
          {showHistory && (
            <div className="mt-5">
              <p className="font-bold text-center mb-6 text-2xl">
                Your Transaction History
              </p>
              <ul>
  {transec.reverse().reduce((acc, item, index) => {
    // Calculate the new balance after the current transaction
    const newBalance = item.type === "Deposit"
      ? acc.balance + item.amount
      : acc.balance - item.amount;

    // Create a new list item for the transaction with the updated balance
    const listItem = (
      <li key={index}>
        {item.date.getDate()}/{item.date.getMonth() + 1}/
        {item.date.getFullYear()} - {item.type}: ${item.amount} Balance: $
        {newBalance}
      </li>
    );

    // Return the accumulated list of items and the updated balance
    return { items: [...acc.items, listItem], balance: newBalance };
  }, { items: [], balance: 0 }).items}
</ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Bank;
