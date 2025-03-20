export const CONFIG = {
    SERVER_HOST: process.env.SERVER_HOST || "192.168.101.3",
    SERVER_PORT: process.env.PORT || 3000,
    CLIENT_ORIGINS: [
        process.env.CLIENT_ORIGIN || "http://192.168.101.3:4200",
        "http://localhost:4200",
    ],
    CORS_METHODS: ["GET", "POST"],
};

export const SOCKET_EVENTS = {
    SLIDE_CHANGE: "slideChange",
    UPDATE_SLIDE: "updateSlide",
};
