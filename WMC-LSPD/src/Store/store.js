// import { create } from "zustand";
// import { devtools } from "zustand/middleware";

// const Store = (set) => ({
//   loader: false,
//   isLoggedIn: false,
//   isWantedBoxOpen: false,
//   isCriminalBoxOpen: false,

//   setWantedOpen: (state) =>
//     set(
//       {
//         isWantedBoxOpen: state,
//       },
//       false,
//       "Wanted Modal"
//     ),
//   setCriminalOpen: () =>
//     set(
//       {
//         isCriminalBoxOpen:true
//         // isWantedBoxOpen: isOpen
//       },
//       false,
//       "Criminal Modal"
//     ),
//     closeModals: () => set({
//         isCriminalBoxOpen: false,
//         isWantedBoxOpen: false
//       }, false, "Close Modals")
// });

// const useStore = create(devtools(Store));
// export default useStore;

import { create } from "zustand";
import { devtools } from "zustand/middleware";

const Store = (set) => ({
  loader: false,
  isLoggedIn: false,
  isWantedBoxOpen: false,
  isCriminalBoxOpen: false,
  selectedCriminal: null,
  toastrMsg: "",
  isCareerModalOpen: false,
  isCareerBoxOpen: false,
  selectedJob: null,
  setToastr: (toastrMsg) => set({ toastrMsg }, false, "setToastr"),
  setCareerOpen: (jobName) =>
    set({ isCareerBoxOpen: true, selectedJob: jobName }),
  setCriminalOpen: (criminalName) =>
    set({ isCriminalBoxOpen: true, selectedCriminal: criminalName }),
  closeModals: () => set({ isCriminalBoxOpen: false, selectedCriminal: null }),

  setWantedOpen: (state) =>
    set(
      {
        isWantedBoxOpen: state,
      },
      false,
      "Wanted Modal"
    ),
  setCriminalBoxOpen: (is) =>
    set(
      {
        isCriminalBoxOpen: is,
        // isWantedBoxOpen: trues
      },
      false,
      "Criminal Modal"
    ),
  setCareerModalOpen: (state) =>
    set(
      {
        isCareerModalOpen: state,
      },
      false,
      "Career Modal"
    ),
  setCareerBoxOpen: (is) =>
    set(
      {
        isCareerBoxOpen: is,
        // isWantedBoxOpen: trues
      },
      false,
      "Career Box modal"
    ),
  // closeModals: () =>
  //   set(
  //     {
  //       isCriminalBoxOpen: false,
  //       isWantedBoxOpen: false,
  //     },
  //     false,
  //     "Close Modals"
  //   ),
});

const useStore = create(devtools(Store));
export default useStore;