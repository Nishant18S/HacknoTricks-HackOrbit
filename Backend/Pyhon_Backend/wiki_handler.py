# services/wiki_handler.py

import wikipedia
import logging

# Configure logger
logger = logging.getLogger(__name__)

def handle_wikipedia_query(query):
    """Handle Wikipedia queries with improved parsing and fallback."""
    try:
        # Try to fetch the Wikipedia page directly
        page = wikipedia.page(query, auto_suggest=False)
        summary = page.summary[:500] + "..." if len(page.summary) > 500 else page.summary
        return (
            f"According to Wikipedia:\n\n**{page.title}**\n\n"
            f"{summary}\n[Read more]({page.url})"
        )

    except wikipedia.DisambiguationError as e:
        try:
            # Fallback to first suggestion
            page = wikipedia.page(e.options[0])
            summary = page.summary[:500] + "..." if len(page.summary) > 500 else page.summary
            return (
                f"According to Wikipedia:\n\n**{page.title}**\n\n"
                f"{summary}\n[Read more]({page.url})"
            )
        except Exception as inner_error:
            logger.warning(f"Disambiguation fallback failed: {inner_error}")
            return None

    except wikipedia.PageError:
        return None

    except Exception as e:
        logger.error(f"Wikipedia handler error: {str(e)}")
        return None
