import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "go8ylj51", // find this at manage.sanity.io or in your sanity.config.ts
  dataset: "production", // this is from the questions during 'sanity init'
  apiVersion: "2023-01-01", // or whichever version you're using
  useCdn: true, // `false` if you want fresh data, `true` for cached data
});

export default client;
