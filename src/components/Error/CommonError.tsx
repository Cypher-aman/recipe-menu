const CommonError = ({ message = 'Something went wrong' }) => {
  return (
    <div className="w-screen h-full flex justify-center items-center">
      <h1 className="text-3xl">{message}</h1>
    </div>
  );
};

export default CommonError;
