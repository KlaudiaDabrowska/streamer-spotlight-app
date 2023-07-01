import { QueryClient, QueryClientProvider } from "react-query";
import { StreamersList } from "./StreamersList";
import { render } from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { rest } from "msw";
import { IStreamerObject } from "../../lib/types/Streamers";
import { Platform } from "../../lib/types/Platforms";
import { generateMockStreamersResponse } from "../../mock/streamerList";
import { MemoryRouter } from "react-router";

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
  });
});
