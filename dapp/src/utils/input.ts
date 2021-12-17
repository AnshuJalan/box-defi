import React from "react";

export const blockInvalidChars =
  (list: string[]) =>
  (e: React.KeyboardEvent<HTMLElement>): false | void =>
    list.includes(e.key) && e.preventDefault();
