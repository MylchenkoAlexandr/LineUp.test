class Logger {

    static colors = {
        error: "#ff2754",
        warn: "#ff9a00",
        success: "#2aff00",
        info: "#00ecff",
        log: "#ffffff",
        saga: "#ff00bb",
        reducer: "#da4fff"
    }

    clear = console.clear;

    constructor() {
        this._enabled = Boolean(`${process.env.NODE_ENV || ""}`.trim().toLowerCase() === "development");
    }

    output = (level = "log", text, color, ...variables) => {
        this._enabled && console.log("%c" + text, `color: ${color};`, ...variables);
    }
    error = (name, text, ...variables) => {
        const color = Logger.colors.error;
        this.output("log", `${name || ""} ${text || ""}`, color, ...variables);
    }
    warn = (name, text, ...variables) => {
        const color = Logger.colors.warn;
        this.output("log", `${name || ""} ${text || ""}`, color, ...variables);
    }
    info = (name, text, ...variables) => {
        const color = Logger.colors.info;
        this.output("log", `${name || ""} ${text || ""}`, color, ...variables);
    }
    log = (name, text, ...variables) => {
        const color = Logger.colors.log;
        this.output("log", `${name || ""} ${text || ""}`, color, ...variables);
    }
    success = (name, text, ...variables) => {
        const color = Logger.colors.success;
        this.output("log", `${name || ""} ${text || ""}`, color, ...variables);
    }
    action = (name, text, ...variables) => {
        const color = Logger.colors.saga;
        this.output("log", `[saga] ${name || ""} ${text || ""}`, color, ...variables);
    }
    reducer = (name, text, ...variables) => {
        const color = Logger.colors.reducer;
        this.output("log", `[reducer] ${name || ""} ${text || ""}`, color, ...variables);
    }
}

export default new Logger();
