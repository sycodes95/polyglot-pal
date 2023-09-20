/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.2.1.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as actions_getDetectedLanguage from "../actions/getDetectedLanguage";
import type * as actions_getGPTMessageResponse from "../actions/getGPTMessageResponse";
import type * as actions_getSpeechToText from "../actions/getSpeechToText";
import type * as actions_getTTSVoices from "../actions/getTTSVoices";
import type * as actions_getTextToSpeech from "../actions/getTextToSpeech";
import type * as actions_getTranslation from "../actions/getTranslation";
import type * as mutation_mutateNativeLanguage from "../mutation/mutateNativeLanguage";
import type * as query_getNativeLanguage from "../query/getNativeLanguage";
import type * as query_getTTSKey from "../query/getTTSKey";
import type * as types from "../types";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "actions/getDetectedLanguage": typeof actions_getDetectedLanguage;
  "actions/getGPTMessageResponse": typeof actions_getGPTMessageResponse;
  "actions/getSpeechToText": typeof actions_getSpeechToText;
  "actions/getTTSVoices": typeof actions_getTTSVoices;
  "actions/getTextToSpeech": typeof actions_getTextToSpeech;
  "actions/getTranslation": typeof actions_getTranslation;
  "mutation/mutateNativeLanguage": typeof mutation_mutateNativeLanguage;
  "query/getNativeLanguage": typeof query_getNativeLanguage;
  "query/getTTSKey": typeof query_getTTSKey;
  types: typeof types;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
