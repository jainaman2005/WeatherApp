export const ErrorComponent = (props:  {error: string ,setErr: React.Dispatch<React.SetStateAction<string>>}) => {
  const handleReload = () => {
    window.location.reload(); // refresh the page
  };

  return (
    <div className="mx-2 max-h-screen h-full flex flex-col items-center justify-center bg-transparent text-shadow-2xs text-shadow-[#921818] text-red-800 p-6">
      <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-lg mb-6">{`${props.error}.`}</p>
      <button
        onClick={handleReload}
        className="px-6 py-3 bg-red-800 hover:bg-red-700 text-white rounded-lg shadow-md transition duration-200"
      >
        Reload Page
      </button>
    </div>
  );
};