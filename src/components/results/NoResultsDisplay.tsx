function NoResultsDisplay() {
  return (
    <div className="text-center">
      <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        No Games Found
      </h3>
      <p className="mt-3 text-base leading-7 text-gray-600 sm:text-lg">
        Sorry, we could not find any games that fit your search criteria
      </p>
    </div>
  );
}

export default NoResultsDisplay;
