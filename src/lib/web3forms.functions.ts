import { createServerFn } from "@tanstack/react-start";

export const getWeb3FormsKey = createServerFn({ method: "GET" }).handler(async () => {
  return process.env["WEB3FORMS_ACCESS_KEY"] ?? "";
});
