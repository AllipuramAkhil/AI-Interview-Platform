import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import toast from "react-hot-toast";

// ========================================
// CONFIG
// ========================================

const DEFAULT_CONFIG = {
  maxTabSwitches: 2,
  maxFullscreenExits: 1,
  maxViolations: 5,
  devtoolsCooldownMs: 5000,
  enableFullscreen: true,
  enableDevToolsDetection: true,
  enableCopyPasteProtection: true,
};

// ========================================
// VIOLATION EVENT
// ========================================

const createViolationEvent = (
  sessionId,
  type,
  details = {}
) => ({
  id: `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`,

  sessionId,

  type,

  details,

  timestamp:
    new Date().toISOString(),
});

// ========================================
// DEVTOOLS DETECTION
// ========================================

const detectDevToolsOpen =
  () => {
    if (
      typeof window ===
      "undefined"
    ) {
      return false;
    }

    const threshold =
      160;

    const widthOpen =
      window.outerWidth -
        window.innerWidth >
      threshold;

    const heightOpen =
      window.outerHeight -
        window.innerHeight >
      threshold;

    return (
      widthOpen ||
      heightOpen
    );
  };

// ========================================
// HOOK
// ========================================

export const useInterviewAntiCheat =
  ({
    sessionId,
    backendLogger,
    config = {},
  }) => {
    const settings =
      useMemo(
        () => ({
          ...DEFAULT_CONFIG,
          ...config,
        }),
        [config]
      );

    // ========================================
    // STATE
    // ========================================

    const [
      violationEvents,
      setViolationEvents,
    ] = useState([]);

    const [
      violationCounts,
      setViolationCounts,
    ] = useState({
      tabSwitch: 0,
      windowBlur: 0,
      devTools: 0,
      copyPaste: 0,
      fullscreenExit: 0,
      total: 0,
    });

    const [
      antiCheatStatus,
      setAntiCheatStatus,
    ] = useState(
      "Secure interview monitoring enabled"
    );

    const [
      isFullscreen,
      setIsFullscreen,
    ] = useState(
      Boolean(
        document?.fullscreenElement
      )
    );

    const [
      autoSubmitTriggered,
      setAutoSubmitTriggered,
    ] = useState(false);

    const devToolsCooldownRef =
      useRef(false);

    // ========================================
    // BACKEND LOGGER
    // ========================================

    const logToBackend =
      useCallback(
        async (event) => {
          if (
            !backendLogger
          ) {
            return;
          }

          try {
            await backendLogger(
              event
            );
          } catch (error) {
            console.warn(
              "Anti-cheat backend log failed:",
              error
            );
          }
        },
        [backendLogger]
      );

    // ========================================
    // REGISTER VIOLATION
    // ========================================

    const registerViolation =
      useCallback(
        async (
          type,
          details = {}
        ) => {
          const event =
            createViolationEvent(
              sessionId,
              type,
              {
                ...details,
                url: window.location.href,
                userAgent:
                  navigator.userAgent,
              }
            );

          // SAVE EVENT

          setViolationEvents(
            (current) => [
              event,
              ...current,
            ]
          );

          // UPDATE COUNTS

          setViolationCounts(
            (current) => {
              const next =
                {
                  ...current,
                  total:
                    current.total +
                    1,
                };

              switch (type) {
                case "TAB_SWITCH":
                  next.tabSwitch += 1;
                  break;

                case "WINDOW_BLUR":
                  next.windowBlur += 1;
                  break;

                case "COPY_PASTE":
                  next.copyPaste += 1;
                  break;

                case "FULLSCREEN_EXIT":
                  next.fullscreenExit += 1;
                  break;

                default:
                  if (
                    type.startsWith(
                      "DEVTOOLS"
                    )
                  ) {
                    next.devTools +=
                      1;
                  }
              }

              return next;
            }
          );

          // STATUS

          setAntiCheatStatus(
            `Violation detected: ${type}`
          );

          // TOAST

          toast.error(
            `${type.replaceAll(
              "_",
              " "
            )} detected`
          );

          // BACKEND LOG

          await logToBackend(
            event
          );

          return event;
        },
        [
          logToBackend,
          sessionId,
        ]
      );

    // ========================================
    // AUTO SUBMIT CHECK
    // ========================================

    useEffect(() => {
      const shouldAutoSubmit =
        violationCounts.total >=
          settings.maxViolations ||
        violationCounts.fullscreenExit >
          settings.maxFullscreenExits;

      if (
        shouldAutoSubmit &&
        !autoSubmitTriggered
      ) {
        setAutoSubmitTriggered(
          true
        );

        void registerViolation(
          "AUTO_SUBMIT",
          {
            reason:
              "Exceeded security threshold",

            counts: {
              ...violationCounts,
            },
          }
        );

        toast.error(
          "Interview auto-submitted due to violations"
        );
      }
    }, [
      violationCounts,
      settings.maxViolations,
      settings.maxFullscreenExits,
      autoSubmitTriggered,
      registerViolation,
    ]);

    // ========================================
    // MAIN EFFECTS
    // ========================================

    useEffect(() => {
      // ========================================
      // FULLSCREEN
      // ========================================

      const requestFullscreen =
        async () => {
          if (
            !settings.enableFullscreen
          ) {
            return;
          }

          if (
            !document.fullscreenElement
          ) {
            try {
              await document.documentElement.requestFullscreen();

              setIsFullscreen(
                true
              );

              setAntiCheatStatus(
                "Fullscreen security enabled"
              );
            } catch {
              setAntiCheatStatus(
                "Fullscreen blocked by browser"
              );
            }
          }
        };

      // ========================================
      // FULLSCREEN CHANGE
      // ========================================

      const handleFullscreenChange =
        () => {
          const full =
            Boolean(
              document.fullscreenElement
            );

          setIsFullscreen(
            full
          );

          if (!full) {
            void registerViolation(
              "FULLSCREEN_EXIT",
              {
                message:
                  "Interview exited fullscreen mode",
              }
            );
          }
        };

      // ========================================
      // TAB SWITCH
      // ========================================

      const handleVisibilityChange =
        () => {
          if (
            document.hidden
          ) {
            void registerViolation(
              "TAB_SWITCH",
              {
                message:
                  "User switched tabs",
              }
            );
          }
        };

      // ========================================
      // WINDOW BLUR
      // ========================================

      const handleWindowBlur =
        () => {
          void registerViolation(
            "WINDOW_BLUR",
            {
              message:
                "Window focus lost",
            }
          );
        };

      // ========================================
      // DEVTOOLS SHORTCUT
      // ========================================

      const handleDevToolsShortcut =
        (event) => {
          const key =
            event.key?.toUpperCase();

          const isShortcut =
            event.key ===
              "F12" ||
            ((event.ctrlKey ||
              event.metaKey) &&
              event.shiftKey &&
              [
                "I",
                "J",
                "C",
              ].includes(
                key
              ));

          if (
            isShortcut
          ) {
            event.preventDefault();

            void registerViolation(
              "DEVTOOLS_SHORTCUT",
              {
                key:
                  event.key,
              }
            );
          }
        };

      // ========================================
      // COPY PASTE
      // ========================================

      const handleCopyPaste =
        (event) => {
          if (
            !settings.enableCopyPasteProtection
          ) {
            return;
          }

          event.preventDefault();

          void registerViolation(
            "COPY_PASTE",
            {
              type:
                event.type,
            }
          );
        };

      // ========================================
      // RIGHT CLICK
      // ========================================

      const handleContextMenu =
        (event) => {
          if (
            !settings.enableCopyPasteProtection
          ) {
            return;
          }

          event.preventDefault();

          void registerViolation(
            "COPY_PASTE",
            {
              type:
                "CONTEXT_MENU",
            }
          );
        };

      // ========================================
      // PAGE EXIT
      // ========================================

      const handleBeforeUnload =
        (event) => {
          void registerViolation(
            "PAGE_UNLOAD",
            {
              reason:
                "Interview page closed/refreshed",
            }
          );

          event.preventDefault();

          event.returnValue =
            "";
        };

      // ========================================
      // DEVTOOLS WATCHER
      // ========================================

      let devtoolsWatcher;

      if (
        settings.enableDevToolsDetection
      ) {
        devtoolsWatcher =
          setInterval(
            () => {
              if (
                detectDevToolsOpen() &&
                !devToolsCooldownRef.current
              ) {
                devToolsCooldownRef.current =
                  true;

                void registerViolation(
                  "DEVTOOLS_OPEN",
                  {
                    message:
                      "Developer tools detected",
                  }
                );

                window.setTimeout(
                  () => {
                    devToolsCooldownRef.current =
                      false;
                  },
                  settings.devtoolsCooldownMs
                );
              }
            },
            2500
          );
      }

      // ========================================
      // EVENTS
      // ========================================

      document.addEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );

      document.addEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.addEventListener(
        "blur",
        handleWindowBlur
      );

      window.addEventListener(
        "keydown",
        handleDevToolsShortcut,
        true
      );

      document.addEventListener(
        "copy",
        handleCopyPaste,
        true
      );

      document.addEventListener(
        "cut",
        handleCopyPaste,
        true
      );

      document.addEventListener(
        "paste",
        handleCopyPaste,
        true
      );

      document.addEventListener(
        "contextmenu",
        handleContextMenu,
        true
      );

      window.addEventListener(
        "beforeunload",
        handleBeforeUnload
      );

      void requestFullscreen();

      // ========================================
      // CLEANUP
      // ========================================

      return () => {
        if (
          devtoolsWatcher
        ) {
          clearInterval(
            devtoolsWatcher
          );
        }

        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );

        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );

        window.removeEventListener(
          "blur",
          handleWindowBlur
        );

        window.removeEventListener(
          "keydown",
          handleDevToolsShortcut,
          true
        );

        document.removeEventListener(
          "copy",
          handleCopyPaste,
          true
        );

        document.removeEventListener(
          "cut",
          handleCopyPaste,
          true
        );

        document.removeEventListener(
          "paste",
          handleCopyPaste,
          true
        );

        document.removeEventListener(
          "contextmenu",
          handleContextMenu,
          true
        );

        window.removeEventListener(
          "beforeunload",
          handleBeforeUnload
        );
      };
    }, [
      registerViolation,
      settings,
    ]);

    // ========================================
    // FORCE FULLSCREEN
    // ========================================

    const enforceFullscreen =
      useCallback(
        async () => {
          if (
            !document.fullscreenElement
          ) {
            try {
              await document.documentElement.requestFullscreen();

              setIsFullscreen(
                true
              );

              toast.success(
                "Fullscreen restored"
              );
            } catch {
              setAntiCheatStatus(
                "Unable to enter fullscreen"
              );
            }
          }
        },
        []
      );

    // ========================================
    // RETURN
    // ========================================

    return {
      violationEvents,
      violationCounts,
      antiCheatStatus,
      isFullscreen,
      autoSubmitTriggered,
      enforceFullscreen,
      recordViolation:
        registerViolation,
    };
  };