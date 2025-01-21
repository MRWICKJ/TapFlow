export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-bold">Loading...</h1>
            <div className="animate-spin w-12 h-12 border-t-2 border-b-2 border-gray-900 rounded-full"></div>
        </div>
        </div>
    );
}