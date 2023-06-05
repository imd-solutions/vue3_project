import { resolve } from "path";

const r = (p: string) => resolve(__dirname + "/src", p);

export const alias: Record<string, string> = {
  "~~": r("."),
  "~~/": r("./"),
  "@": r("."),
  "@@": r("."),
  "@@/": r("./"),
  "@/": r("./"),
  "@data": r("./__data__"),
  "@components": r("./components"),
  "@application": r("./app/application"),
  "@auth": r("./app/auth"),
  "@site": r("./app/site"),
  "@stores": r("./stores"),
  "@utils": r("./utils"),
  assets: r("./assets"),
  public: r("./public"),
  "public/": r("./public/"),
};
