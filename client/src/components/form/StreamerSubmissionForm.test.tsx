// import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
// import { StreamerSubmissionForm } from "./StreamerSubmissionForm";
// import { QueryClient, QueryClientProvider } from "react-query";

// describe("Streamer submission form ", () => {
//   const queryClient = new QueryClient();

//   const setup = () => {
//     const utils = render(
//       <QueryClientProvider client={queryClient}>
//         <StreamerSubmissionForm />
//       </QueryClientProvider>
//     );
//     const streamerNameInput = screen.getByTestId("streamerNameInput");
//     const platformSelect = screen.getByTestId("platformSelect");
//     const streamerDescriptionInput = screen.getByTestId(
//       "streamerDescriptionInput"
//     );
//     const submitBtn = screen.getByTestId("submitBtn");

//     return {
//       streamerNameInput,
//       platformSelect,
//       streamerDescriptionInput,
//       submitBtn,
//       ...utils,
//     };
//   };

//   it("should display the component correctly", () => {
//     const {
//       streamerNameInput,
//       platformSelect,
//       streamerDescriptionInput,
//       submitBtn,
//     } = setup();

//     expect(streamerNameInput).toBeInTheDocument();
//     expect(platformSelect).toBeInTheDocument();
//     expect(streamerDescriptionInput).toBeInTheDocument();
//     expect(submitBtn).toBeInTheDocument();
//   });

//   // it("should display validation errors", () => {
//   //   const {
//   //     streamerNameInput,
//   //     platformSelect,
//   //     streamerDescriptionInput,
//   //     submitBtn,
//   //   } = setup();

//   //   fireEvent.change(streamerNameInput, { target: { value: "Aa" } });
//   //   fireEvent.click(submitBtn);
//   //   // const validationError = screen.getByTestId("validationError");
//   //   const validationError = screen.getByText("Must be at least 3 characters");

//   //   expect(validationError).toBeInTheDocument();
//   // });

//   it("should display success alert", () => {
//     const {
//       streamerNameInput,
//       platformSelect,
//       streamerDescriptionInput,
//       submitBtn,
//     } = setup();

//     fireEvent.change(streamerNameInput, { target: { value: "Streamer nr.1" } });
//     fireEvent.change(platformSelect, { target: { value: "Kick" } });
//     fireEvent.change(streamerDescriptionInput, {
//       target: { value: "This streamer is super duper cool" },
//     });
//     fireEvent.submit(submitBtn);
//     // const validationError = screen.getByTestId("validationError");
//     const successAlert = screen.getByText(
//       "Congratulations! You have successfully added a new streamer."
//     );

//     expect(successAlert).toBeInTheDocument();
//   });
// });
