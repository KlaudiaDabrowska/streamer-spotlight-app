import { fireEvent, render, screen } from "@testing-library/react";
import { StreamerSubmissionForm } from "./StreamerSubmissionForm";
import { QueryClient, QueryClientProvider } from "react-query";
import { rest } from "msw";
import { setupServer } from "msw/lib/node";
import { IStreamerObject } from "../../lib/types/Streamers";
import { Platform } from "../../lib/types/Platforms";

const server = setupServer(
  rest.post<IStreamerObject>(
    `http://localhost:1234/streamers`,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          id: "09a7734b-a3ea-4ca3-b8d1-817798119708",
          streamerName: "ninja",
          platform: Platform.Twitch,
          description: "ninja streamer",
          image: "http://ninja-image.img",
          upvotes: 99,
          downvotes: 3,
        })
      );
    }
  )
);
const queryClient = new QueryClient();

describe("Streamer submission form ", () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });
  afterAll(() => server.close());

  const setup = () => {
    const utils = render(
      <QueryClientProvider client={queryClient}>
        <StreamerSubmissionForm />
      </QueryClientProvider>
    );
    const streamerNameInput = screen.getByTestId("streamerNameInput");
    const platformSelect = screen.getByTestId("platformSelect");
    const streamerDescriptionInput = screen.getByTestId(
      "streamerDescriptionInput"
    );
    const submitBtn = screen.getByTestId("submitBtn");

    return {
      streamerNameInput,
      platformSelect,
      streamerDescriptionInput,
      submitBtn,
      ...utils,
    };
  };

  it("should display the component correctly", () => {
    const {
      streamerNameInput,
      platformSelect,
      streamerDescriptionInput,
      submitBtn,
    } = setup();
    expect(streamerNameInput).toBeInTheDocument();
    expect(platformSelect).toBeInTheDocument();
    expect(streamerDescriptionInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  it("should display success alert", async () => {
    const {
      streamerNameInput,
      platformSelect,
      streamerDescriptionInput,
      submitBtn,
    } = setup();

    fireEvent.change(streamerNameInput, { target: { value: "Streamer nr.1" } });
    fireEvent.change(platformSelect, { target: { value: "Kick" } });
    fireEvent.change(streamerDescriptionInput, {
      target: { value: "This streamer is super cool" },
    });
    fireEvent.submit(submitBtn);
    const successAlert = await screen.findByText(
      "Congratulations! You have successfully added a new streamer."
    );

    expect(successAlert).toBeInTheDocument();
  });
});
