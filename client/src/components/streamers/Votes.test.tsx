import { render, screen } from "@testing-library/react";
import { Platform } from "../../lib/types/Platforms";
import { QueryClient, QueryClientProvider } from "react-query";
import { Votes } from "./Votes";

describe("Votes", () => {
  const queryClient = new QueryClient();

  it("should display appropriate votes", () => {
    const streamer = {
      id: "3593af78-a0b0-4b78-bfda-a367f3ae7638",
      streamerName: "Streamer 1",
      platform: Platform.TikTok,
      description: "This streamer is awesome",
      image:
        "https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png",
      upvotes: 10,
      downvotes: 8,
    };

    render(
      <QueryClientProvider client={queryClient}>
        <Votes streamer={streamer} />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("upvotes")).toHaveTextContent(
      streamer.upvotes.toString()
    );

    expect(screen.getByTestId("downvotes")).toHaveTextContent(
      streamer.downvotes.toString()
    );
  });
});
