// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import EventSource from "eventsourcemock";

Object.defineProperty(window, "EventSource", {
  value: EventSource,
});

process.env.REACT_APP_BASE_API_URL = "http://localhost:1234";
