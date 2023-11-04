export default function OutputAlgorithm({ console }) {
  const isWrong = console.userOutput !== console.solutionOutput;

  return (
    <>
      {isWrong ? (
        <section className="m-3">
          <h3 className="text-xl font-medium text-red-600 mb-2">
            Wrong Answer
          </h3>
          <div className="flex">
            <div className="mr-5">
              <h3>Your Output</h3>
              <pre className="text-center">{console.userOutput}</pre>
            </div>
            <div>
              <h3>Solution Output</h3>
              <pre className="text-center">{console.solutionOutput}</pre>
            </div>
          </div>
        </section>
      ) : (
        <section className="m-3">
          <h3 className="text-xl font-medium text-green-600">Successfull</h3>
          <pre>{console.userOutput}</pre>
        </section>
      )}
    </>
  );
}
