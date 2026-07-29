import { Toaster as HotToaster } from "react-hot-toast";

const Toaster = ({
  ...props
}) => {

  return (
    <HotToaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
      }}
      {...props}
    />
  );
};

export { Toaster };