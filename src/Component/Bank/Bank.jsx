import { useState } from "react";
import Swal from "sweetalert2";
import { Bounce, ToastContainer, toast } from "react-toastify";

const Bank = () => {
  const [currentBlc, setcurrentBlc] = useState(0);
  const [addInput, setaddInput] = useState("");
  const [withdInput, setwithdInput] = useState("");

  const handlechanghAddInput = (e) => {
    setaddInput(e.target.value);
  };
  const handlechanghwithdInput = (e) => {
    setwithdInput(e.target.value);
  };
  const handleAddmoney = () => {
    const inpuAmount = Number(addInput);
    if (addInput >= 50) {
      setcurrentBlc((prevstate) => {
        return prevstate + inpuAmount;
      });
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "successfully amound added",
        showConfirmButton: false,
        timer: 2000,
      });

      setaddInput("");
    } else {
      toast.error("Minimum amount to add is 50 !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // alert("Minimum amount to add is 50!");
    }
  };
  const handlewithmoney = () => {
    const inpuAmount = Number(withdInput);

    if (inpuAmount < 50) {
      toast.error("Minimum withdrawal amount is 50 !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else if (inpuAmount > currentBlc) {
      toast.warn("Insufficient balance !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      setcurrentBlc((prevstate) => {
        return prevstate - inpuAmount;
      });
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "successfully amount Withdraw",
        showConfirmButton: false,
        timer: 2000,
      });
      setwithdInput("");
    }
  };

  const handletransection = ()=>{
    Swal.fire({
      title: "Developers are working on transaction history and will see you soon",
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    });
  }

  return (
    <>
      <ToastContainer />
      <div className="h-screen flex justify-center items-center bg[#f3f4f6]">
        <div className="bg-white p-5 shadow-lg">
          <h1 className="font-bold text-2xl text-center pt-3">Flower Bank</h1>
          <p className="text[#e9e9e9] text-lg text-center">
            Current Balance: ${currentBlc}
          </p>

          {/* add money */}
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
          {/* add money */}
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
          {/* chack history */}
          <div className="text-center">
            <button onClick={handletransection} className="bg-[#3b82f6] text-white w-auto py-2 px-4 rounded ">
              View Transaction History
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bank;
