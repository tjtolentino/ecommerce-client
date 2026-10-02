function LoadingMessage({ message = "Loading products..." }) {
  return (
    <div className="py-16 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
      <div className="relative mb-4">
        <div className="w-10 h-10 rounded-full border-2 border-neutral-800 border-t-amber-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
        </div>
      </div>
      <p className="text-sm font-medium text-neutral-400 tracking-wide">{message}</p>
    </div>
  );
}

export default LoadingMessage;
