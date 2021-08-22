import { pipeToWritable } from "solid-js/web";
import { MetaProvider } from "solid-meta";
import { RouteDataFunc, Router } from "solid-app-router";
import Root from "~/root";
import { StartProvider } from "../../components";
import renderActions from "../actionsServer";
import { Component } from "solid-js";

export function render({ url, writable, manifest }) {
  const context = { tags: [] };
  const Start: Component<{ data?: RouteDataFunc }> = props => (
    <StartProvider context={context} manifest={manifest}>
      <MetaProvider tags={context.tags}>
        <Router url={url} out={context} data={props.data}>
          {props.children}
        </Router>
      </MetaProvider>
    </StartProvider>
  );
  pipeToWritable(() => <Root Start={Start} />, writable, {
    onReady({ write, startWriting }) {
      write("<!DOCTYPE html>");
      startWriting();
    }
  });
}

export { renderActions };