import { map } from "rxjs";
import { z } from "zod";

export function parseResponse<T extends z.ZodTypeAny>(scheme: T) {
    return map<unknown, z.infer<typeof scheme>>((data) => scheme.parse(data));
}