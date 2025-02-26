# -------- THE FOLLOWING IS TO CLEAN UP THE JSON FILES TO BE USED FOR ML --------- #

# Import statements
import json
import os
from bs4 import BeautifulSoup
import pprint

# Folder containing JSON files (Global Variable)
json_folder = "JSON"

# Function to load JSON data safely
def load_json_data(filename):
    filepath = os.path.join(json_folder, filename)
    
    if not os.path.exists(filepath):
        print(f"Error: File {filename} not found in {json_folder}")
        return {}

    with open(filepath, "r", encoding="utf-8") as file:
        return json.load(file)

# Function to clean HTML content safely
def clean_html(text):
    if text:
        return BeautifulSoup(text, "html.parser").get_text().strip()
    return ""

# Function to process the projects 
def process_projects(data):
    extracted_projects = []

    for project in data.get("projects", []):
        project_entry = {
            "title": project.get("title", "Unknown Project"),
            "skills": [skill["name"] for dropdown in project.get("dropdowns", []) if dropdown["title"] == "Skills" for skill in dropdown.get("items", [])],
            "content": [],
            "links": {} 
        }

        for dropdown in project.get("dropdowns", []):
            if "items" in dropdown:
                for item in dropdown["items"]:
                    if "text" in item:
                        text = clean_html(item["text"])
                        project_entry["content"].append(text)

                        # Extract links separately
                        soup = BeautifulSoup(item["text"], "html.parser")
                        for a_tag in soup.find_all("a", href=True):
                            link_text = a_tag.get_text(strip=True)
                            link_url = a_tag["href"] 
                            project_entry["links"][link_text] = link_url

        # Clean content (remove \n and extra spaces)
        project_entry["content"] = " ".join(project_entry["content"]).replace("\n", " ").strip()

        extracted_projects.append(project_entry)

    return extracted_projects


# Load mechanical JSON
data = load_json_data("business.JSON")

# Process the loaded data
projects = process_projects(data)

# Print structured output
# pprint.pprint(projects)

# Define output filename
output_filename = "processed_business.json"

# Write structured data to file
with open(output_filename, "w", encoding="utf-8") as file:
    json.dump(projects, file, indent=4, ensure_ascii=False)

print(f"Processed data saved to {output_filename}")


# -------- THE FOLLOWING IS TO CLEAN UP THE ABOUT HTML PAGE TO BE USED FOR ML --------- #
