interface LoaderProps {
  className?: string;
}

export default function Loader(props: LoaderProps) {
  return (
    <div
      className={`flex items-center justify-center h-screen ${props.className}`}
    >
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
