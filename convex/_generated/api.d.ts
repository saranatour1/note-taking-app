/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as authentication_ResendOTPPasswordReset from "../authentication/ResendOTPPasswordReset.js";
import type * as http from "../http.js";
import type * as notes_index from "../notes/index.js";
import type * as notes_tables from "../notes/tables.js";
import type * as notes_tags from "../notes/tags.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  "authentication/ResendOTPPasswordReset": typeof authentication_ResendOTPPasswordReset;
  http: typeof http;
  "notes/index": typeof notes_index;
  "notes/tables": typeof notes_tables;
  "notes/tags": typeof notes_tags;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
