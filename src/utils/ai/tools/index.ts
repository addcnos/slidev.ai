import { RunnableToolFunction } from "openai/lib/RunnableFunction";
import image from "./image";

export const tools: RunnableToolFunction<object>[] = [
  ...image
]
