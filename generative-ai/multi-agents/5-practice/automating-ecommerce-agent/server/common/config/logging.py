import os
from logging.config import dictConfig

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,  # Keeps built-in logs working
    "formatters": {
        "standard": {"format": "[%(asctime)s] %(levelname)s in %(name)s: %(message)s"}
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "standard",
        },
        "file": {
            "class": "logging.handlers.RotatingFileHandler",
            "formatter": "standard",
            "filename": "logs/app.log",
            "maxBytes": 1024 * 1024,  # 1 MB
            "backupCount": 3,
        },
    },
    "root": {
        "handlers": ["console", "file"],
        "level": LOG_LEVEL,
    },
}


def setup_logging():
    """Set up logging configuration."""
    dictConfig(LOGGING_CONFIG)
