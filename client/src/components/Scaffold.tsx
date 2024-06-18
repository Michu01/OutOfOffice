function Scaffold({
  children,
  showFloatingAction = false,
  floatingAction = <></>
}: {
  children: JSX.Element | JSX.Element[],
  showFloatingAction?: boolean,
  floatingAction?: JSX.Element
}) {
  return (
    <>
      <div className="d-flex flex-column flex-grow-1 container-fluid container-xl justify-content-center p-3">
        {children}
      </div>
      {
        showFloatingAction &&
        <div className="floating-action p-3">
          {floatingAction}
        </div>
      }
    </>
  );
}

export default Scaffold;