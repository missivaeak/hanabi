import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";
import { type HelloApiResponse } from "@repo/shared";

const hej: HelloApiResponse = {};

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
