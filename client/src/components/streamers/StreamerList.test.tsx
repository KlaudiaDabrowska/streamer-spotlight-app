import { QueryClient, QueryClientProvider } from "react-query";
import { StreamersList } from "./StreamersList";
import { act, render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import { generateMockStreamersResponse } from "../../lib/mocks/streamerList";
import { sources } from "eventsourcemock";

const queryClient = new QueryClient();

const server = setupServer();

describe("StreamerList", () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });

  afterAll(() => server.close());

  it("should render streamer list", () => {
    const streamersResponse = generateMockStreamersResponse();
    server.use(
      rest.get("http://localhost:1234/streamers", (req, res, ctx) => {
        return res(ctx.json(streamersResponse));
      })
    );

    render(
      <MemoryRouter initialEntries={[{ pathname: "/streamers" }]}>
        <QueryClientProvider client={queryClient}>
          <StreamersList />
        </QueryClientProvider>
      </MemoryRouter>
    );

    streamersResponse.data.forEach(async (streamer) => {
      expect(
        await screen.findByText(streamer.streamerName)
      ).toBeInTheDocument();
    });
  });

  //todo
  it.skip("should append new row when streamerUpdatedEvent received", async () => {
    const messageEvent = new MessageEvent("message", {
      data: {
        id: "c0cbbdae-26e4-4015-8887-20ec673f0d9f",
        streamerName: "new-streamer",
        platform: "YouTube",
        description: "new-streamer description",
        image: "http://images/streamer1.png",
        upvotes: 2,
        downvotes: 1,
      },
    });
    const streamersResponse = generateMockStreamersResponse();
    server.use(
      rest.get("http://localhost/streamers", (req, res, ctx) => {
        return res(ctx.json(streamersResponse));
      })
    );

    render(
      <MemoryRouter initialEntries={[{ pathname: "/streamers" }]}>
        <QueryClientProvider client={queryClient}>
          <StreamersList />
        </QueryClientProvider>
      </MemoryRouter>
    );
    act(async () => {
      await sources[
        "http://localhost:1234/streamers/streamer-events"
      ].emitOpen();

      await sources["http://localhost:1234/streamers/streamer-events"].emit(
        "message",
        messageEvent.data
      );
    });

    const newStreamerRecord = await waitFor(
      () => screen.findByText(messageEvent.data.streamerName),
      {
        timeout: 4000,
      }
    );

    expect(newStreamerRecord).toBeInTheDocument();
  });
});
