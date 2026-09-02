import { useEffect } from "react";
import { useNavigate } from "react-router";

import type { PresentationSection } from "../registry";

interface KeyboardNavigationOptions {
  readonly previous: PresentationSection | null;
  readonly next: PresentationSection | null;
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName) ||
    target.closest("[contenteditable='true']") !== null
  );
}

export function usePresentationKeyboardNavigation({
  previous,
  next,
}: KeyboardNavigationOptions) {
  const navigate = useNavigate();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        isEditableTarget(event.target)
      ) {
        return;
      }

      const destination =
        event.key === "ArrowLeft"
          ? previous
          : event.key === "ArrowRight"
            ? next
            : null;

      if (!destination) {
        return;
      }

      event.preventDefault();
      navigate(destination.path);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, next, previous]);
}
