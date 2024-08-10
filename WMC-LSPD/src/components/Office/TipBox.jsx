const TipBox = ({ by, against, tip, tipHeader }) => {
  return (
    <div className="lg:min-w-[30%] lg:max-w-[30%] md:min-w-[45%] md:max-w-[45%] sm:min-w-[90%] sm:max-w-[90%]   h-[45%] max-h-[45%] sm:my-3 my-3 lg:my-0 md:my-0 w-[100%] sm:mr-0 md:mr-0 lg:mr-0 mr-2">
      <div className="size-full  bg-white rounded-2xl flex justify-center py-1 shadow-[1px_2px_3px_1px_rgba(0,0,0,0.4)] shadow-light-gray ">
        <div className="w-[95%] h-full bg-white rounded-3xl px-2 flex flex-col">
          <p className="h-[20%] items-center flex  w-full font-poppins font-semibold text-base pl-4">
            {tipHeader}
          </p>
          <p className="w-full h-[60%] py-1 font-poppins text-sm text-light-gray overflow-hidden overflow-y-auto pr-2">
            {tip}
          </p>
          <div className="h-[20%] w-full text-nowrap flex flex-col sm:flex-row md:flex-col items-center justify-around lg:text-[0.85rem] text-sm">
            <div className=" font-poppins">
              <strong>Against</strong> :- {against}
            </div>

            <div className=" font-poppins">
              <strong>Tip By </strong>:- {by}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipBox;