let startTime = Date.now();
let hasSent = false;
let pageName = window.location.pathname;

function sendTimeSpent(eventName = "unknown") {
    if (hasSent) return;

    hasSent = true;
    const duration = Date.now() - startTime;

    if (navigator.sendBeacon) {
        const payload = JSON.stringify({
            page: pageName,
            duration
        });

        navigator.sendBeacon(
            "http://localhost:5501/api/time",
            new Blob([payload], { type: "application/json" })
        );
    }
}

function initTracker() {

    const flushOnce = () => sendTimeSpent("page-exit");

    window.addEventListener("pagehide", flushOnce, { once: true });
    window.addEventListener("beforeunload", flushOnce, { once: true });

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
            flushOnce();
        }
    }, { once: true });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTracker);
} else {
    initTracker();
}