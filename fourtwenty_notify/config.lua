Config = {}

Config.Position = {
    x = "left",    -- Möglichkeiten: "left", "center", "right"
    y = "middle"   -- Möglichkeiten: "top", "middle", "bottom"
}

Config.Offset = {
    x = 20,
    y = 0
}

Config.Types = {
    success = {
        label = "Erfolg",
        colors = {
            from = "#22c55e",
            via = "#16a34a",
            to = "#22c55e"
        }
    },
    error = {
        label = "Fehler",
        colors = {
            from = "#ef4444",
            via = "#dc2626",
            to = "#ef4444"
        }
    },
    info = {
        label = "Info",
        colors = {
            from = "#3b82f6",
            via = "#2563eb",
            to = "#3b82f6"
        }
    },
    warning = {
        label = "Warnung",
        colors = {
            from = "#eab308",
            via = "#ca8a04",
            to = "#eab308"
        }
    },

    primary = {
        label = "Wichtig",
        colors = {
            from = "#8b5cf6",
            via = "#7c3aed",
            to = "#8b5cf6"
        }
    },
    secondary = {
        label = "Nebensächlich",
        colors = {
            from = "#6b7280",
            via = "#4b5563",
            to = "#6b7280"
        }
    }
}