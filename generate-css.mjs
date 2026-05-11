import fs from "node:fs";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const inputCss = fs.readFileSync("./src/input.css", "utf8");
const result = await postcss([
  tailwindcss,
]).process(inputCss, {
  from: "./src/input.css",
  to: "./src/output.css",
});

fs.writeFileSync("./src/output.css", result.css, "utf8");
console.log("Wrote ./src/output.css");


