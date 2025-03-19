import os
import re
import json
from notion_client import Client  # 🔹 Ensure Notion Client is imported
from dotenv import load_dotenv

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path=dotenv_path)

# Fetch API keys from the environment
NOTION_API_KEY = os.getenv("NOTION_API_KEY")
BOOKS_DB_ID = os.getenv("BOOKS_DATABASE_ID")
CHAPTERS_DB_ID = os.getenv("CHAPTERS_DATABASE_ID")
CONCEPTS_DB_ID = os.getenv("CONCEPTS_DATABASE_ID")

# Debugging - Check if variables are loaded
print(f"🔹 NOTION_API_KEY: {NOTION_API_KEY}")
print(f"🔹 BOOKS_DB_ID: {BOOKS_DB_ID}")
print(f"🔹 CHAPTERS_DB_ID: {CHAPTERS_DB_ID}")
print(f"🔹 CONCEPTS_DB_ID: {CONCEPTS_DB_ID}")

# Ensure None values are not passed
if None in (NOTION_API_KEY, BOOKS_DB_ID, CHAPTERS_DB_ID, CONCEPTS_DB_ID):
    raise ValueError("❌ ERROR: Missing required environment variables. Check .env file!")

# Initialize Notion client
notion = Client(auth=NOTION_API_KEY)

DOCS_DIR = "docs/resources"  # Where markdown files are stored
SIDEBARS_FILE = "sidebars.ts"  # Path to auto-generated sidebar file


def sanitize_filename(name):
    """Convert names into safe filenames and IDs for Docusaurus."""
    return re.sub(r"[^a-zA-Z0-9_-]", "-", name.strip().lower())


def fetch_database_items(database_id):
    """Fetch all pages from a Notion database."""
    results = []
    response = notion.databases.query(database_id=database_id)
    results.extend(response["results"])
    return results


def create_markdown_file(filepath, title, content=""):
    """Create a markdown file."""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w") as f:
        f.write(f"# {title}\n\n{content}")


def build_sidebar_structure():
    """Build sidebar dynamically from Notion structure."""
    sidebar_items = []

    books = fetch_database_items(BOOKS_DB_ID)
    book_dict = {book["id"]: sanitize_filename(book["properties"]["Name"]["title"][0]["plain_text"]) for book in books}

    chapter_dict = {}
    chapters = sorted(
    fetch_database_items(CHAPTERS_DB_ID),
    key=lambda chapter: chapter["properties"].get("Order", {}).get("number", float("inf"))
)
    for chapter in chapters:
        chapter_id = chapter["id"]
        chapter_name = sanitize_filename(chapter["properties"]["Name"]["title"][0]["plain_text"])
        book_id = chapter["properties"]["📖 Books"]["relation"][0]["id"] if chapter["properties"]["📖 Books"]["relation"] else None

        if book_id:
            if book_id not in chapter_dict:
                chapter_dict[book_id] = {}
            chapter_dict[book_id][chapter_id] = {"title": chapter_name, "concepts": []}

            # Create markdown file
            chapter_path = os.path.join(DOCS_DIR, book_dict[book_id], f"{chapter_name}.md")
            create_markdown_file(chapter_path, chapter_name)

    concepts = fetch_database_items(CONCEPTS_DB_ID)
    for concept in concepts:
        concept_name = sanitize_filename(concept["properties"]["Name"]["title"][0]["plain_text"])
        chapter_id = concept["properties"]["📂 Chapters"]["relation"][0]["id"] if concept["properties"]["📂 Chapters"]["relation"] else None

        if chapter_id:
            for book_id, chapters in chapter_dict.items():
                if chapter_id in chapters:
                    concept_path = os.path.join(DOCS_DIR, book_dict[book_id], chapters[chapter_id]["title"], f"{concept_name}.md")
                    create_markdown_file(concept_path, concept_name, "## Content goes here...")

                    chapters[chapter_id]["concepts"].append({
                        "type": "doc",
                        "id": f"resources/{book_dict[book_id]}/{chapters[chapter_id]['title']}/{concept_name}",
                        "label": concept_name
                    })

    for book_id, book_title in book_dict.items():
        book_item = {
            "type": "category",
            "label": book_title,
            "collapsible": True,
            "collapsed": False,
            "items": []
        }

        if book_id in chapter_dict:
            for chapter_id, chapter_data in chapter_dict[book_id].items():
                chapter_item = {
                    "type": "category",
                    "label": chapter_data["title"],
                    "items": chapter_data["concepts"]
                }
                book_item["items"].append(chapter_item)

        sidebar_items.append(book_item)

    return sidebar_items


def generate_sidebar():
    """Generate the sidebars.ts file automatically."""
    sidebar_structure = build_sidebar_structure()

    sidebar_template = f"""
const sidebars = {{
  tutorialSidebar: [
    {{ type: 'doc', id: 'intro/intro', label: 'Introduction' }},
    {{
      type: 'category',
      label: 'Documentation',
      collapsible: true,
      collapsed: false,
      items: [{{ type: 'autogenerated', dirName: 'topics' }}],
    }},
    {{
      type: 'category',
      label: 'Resources',
      collapsible: true,
      collapsed: false,
      items: {json.dumps(sidebar_structure, indent=2)}
    }},
  ],
}};

export default sidebars;
"""

    with open(SIDEBARS_FILE, "w") as f:
        f.write(sidebar_template)

    print("✅ Sidebar generated successfully!")


if __name__ == "__main__":
    generate_sidebar()
