export default function MainComponent() {
  return (
    <div className="w-full h-[calc(100vh-theme('spacing.6'))] rounded-lg mt-4 text-white bg-gradient-to-b from-gray-900 to-slate-900 border border-gray-700/20 p-3">
      <div className="pb-4 border-b border-gray-600/50 space-y-4">
        <div>
          <p className="text-gray-400 mb-1 text-sm">Festivals</p>
          <h1 className="text-3xl font-bold">
            🥳 Explore new{" "}
            <span className="bg-gradient-to-r from-yellow-500 via-red-500 via-pink-500 to-blue-500 text-transparent bg-clip-text">
              festivals
            </span>{" "}
            here!
          </h1>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Upcoming festivals</h2>
          <p className="text-sm text-gray-400">
            Festivals will appear below once the official lineup is released.
            Artists by day and set times are added as they become available.
          </p>
          <p className="text-sm text-gray-400">
            Don't see a festival here?
            <span className="text-blue-500 cursor-pointer ml-1 hover:underline">
              Let me know!
            </span>
          </p>
        </div>
        <input
          type="search"
          placeholder="Search events.."
          className="border border-gray-600 rounded-md min-w-1/4 max-w-1/2 h-1/2 p-2 bg-gray-800/50 text-gray-400 text-sm placeholder-gray-400"
          name="eventSearch"
        />
      </div>
    </div>
  );
}
