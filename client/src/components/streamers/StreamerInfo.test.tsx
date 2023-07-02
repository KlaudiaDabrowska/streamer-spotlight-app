import { render, screen } from "@testing-library/react";
import { StreamerInfo } from "./StreamerInfo";
import { Platform } from "../../lib/types/Platforms";
import { QueryClient, QueryClientProvider } from "react-query";

describe("Streamer Info", () => {
  it("should display information about streamer", () => {
    const queryClient = new QueryClient();

    const streamer = {
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
        <StreamerInfo streamer={streamer} />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("streamerName")).toHaveTextContent(
      streamer.streamerName
    );
    expect(screen.getByTestId("platform")).toHaveTextContent(streamer.platform);
    expect(screen.getByTestId("image")).toHaveAttribute("src", streamer.image);
    expect(screen.getByTestId("description")).toHaveTextContent(
      streamer.description
    );
    expect(screen.getByTestId("upvotes")).toHaveTextContent(
      streamer.upvotes.toString()
    );
    expect(screen.getByTestId("downvotes")).toHaveTextContent(
      streamer.downvotes.toString()
    );
  });
});
