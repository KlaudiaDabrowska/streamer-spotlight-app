import { fireEvent, render, screen } from "@testing-library/react";
import { Platform } from "../../lib/types/Platforms";
import { QueryClient, QueryClientProvider } from "react-query";
import { Votes } from "./Votes";
import { useMutation } from "react-query";
import { setupServer } from "msw/node";
import { IStreamerObject } from "../../lib/types/Streamers";
import { rest } from "msw";

const postData = {
  id: "3593af78-a0b0-4b78-bfda-a367f3ae7638",
  streamerName: "Streamer 1",
  platform: Platform.TikTok,
  description: "This streamer is awesome",
  image:
    "https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png",
  upvotes: 11,
  downvotes: 0,
};

const server = setupServer(
  rest.put<IStreamerObject>(
    `${process.env.REACT_APP_BASE_API_URL}/streamers/3593af78-a0b0-4b78-bfda-a367f3ae7638/vote`,
    (_req, res, ctx) => {
      return res(
        ctx.json({
          type: "upvote",
        })
      );
    }
  )
);

const queryClient = new QueryClient();

describe("Streamer Info", () => {
  it.only("should add upvote", () => {
    server.listen();

    const mockedStreamer = {
      id: "3593af78-a0b0-4b78-bfda-a367f3ae7638",
      streamerName: "Streamer 1",
      platform: Platform.TikTok,
      description: "This streamer is awesome",
      image:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png",
      upvotes: 10,
      downvotes: 0,
    };
    const mockedStreamer1 = {
      id: "3593af78-a0b0-4b78-bfda-a367f3ae7638",
      streamerName: "Streamer 1",
      platform: Platform.TikTok,
      description: "This streamer is awesome",
      image:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png",
      upvotes: 10,
      downvotes: 0,
    };

    render(
      <QueryClientProvider client={queryClient}>
        <Votes streamer={mockedStreamer} />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByTestId("upvoteBtn"));

    (useMutation as jest.Mock).mockReturnValueOnce(mockedStreamer1);

    const upvoteAfterVote = mockedStreamer.upvotes + 1;
    expect(screen.getByTestId("upvotes")).toHaveTextContent(
      upvoteAfterVote.toString()
    );
  });
});
