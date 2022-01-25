import { AiOutlineArrowRight } from "react-icons/ai";

const Cart: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div
      style={{
        width: isOpen ? "30vw" : "0px",
      }}
      className="fixed overflow-y-scroll duration-300 h-screen overflow-x-hidden z-50 right-0 top-0 bg-secondary"
    >
      <div className="flex w-full h-full flex-col">
        <div className="flex w-full mt-3 px-2 items-center">
          <h2 className="text-3xl w-full justify-center flex font-semibold">
            Cart Items
          </h2>
          <button
            className="text-2xl rounded-full h-10 w-10 flex justify-center items-center duration-200 hover:bg-gray-600"
            onClick={onClose}
          >
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
