# from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# # Load the model
# model_name = "google/flan-t5-small"
# tokenizer = AutoTokenizer.from_pretrained(model_name)
# model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

# # Test query
# query = "Tell me a fun fact about space."

# # Tokenize input
# inputs = tokenizer(query, return_tensors="pt")

# # Generate output
# outputs = model.generate(**inputs, max_new_tokens=50)

# # Decode and print
# response_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
# print("Flan-T5 Response:", response_text)


import json
import os
import torch
from llama_index.core import VectorStoreIndex, Document
from llama_index.llms.huggingface import HuggingFaceLLM
from llama_index.core.settings import Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core import StorageContext, load_index_from_storage
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Load Flan-T5 model and tokenizer
model_name = "google/flan-t5-small"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

# Initialize the HuggingFaceLLM with Flan-T5
llm = HuggingFaceLLM(
    model_name=model_name,  
    model=model,  
    tokenizer=tokenizer,  
    context_window=512,  
    device_map="cpu",  
    model_kwargs={"torch_dtype": torch.float32},  
    generate_kwargs={"temperature": 0.7, "do_sample": True}
)

# Load your JSON file
json_file_path = 'chatbot/data.JSON'
try:
    with open(json_file_path) as f:
        data = json.load(f)
except FileNotFoundError:
    print(f"Error: The file at {json_file_path} does not exist.")
    exit(1)
except json.JSONDecodeError:
    print(f"Error: The file at {json_file_path} is not a valid JSON file.")
    exit(1)

# Access specific sections and create document content
biography = data.get('biography', {})
education = biography.get('education', {})
background = biography.get('background', {})

documents = [
    Document(
        text=f"Education: {education.get('degree', 'N/A')} from {education.get('university', 'N/A')}, expected graduation in {education.get('graduation_date', 'N/A')}",
        doc_id="education"
    ),
    Document(
        text=f"Background: Born in {background.get('birthplace', 'N/A')}, with Lebanese heritage. Studying at Monash University.",
        doc_id="background"
    ),
    Document(
        text=f"Academic performance: WAM: {biography.get('academic_performance', {}).get('WAM', 'N/A')}, GPA: {biography.get('academic_performance', {}).get('GPA', 'N/A')} as of {biography.get('academic_performance', {}).get('date', 'N/A')}",
        doc_id="academic_performance"
    ),
]

# Print the documents to make sure they're correct
for doc in documents:
    print(f"Document ID: {doc.doc_id}, Content: {doc.text}")

# Set the HuggingFace LLM
Settings.llm = llm  # Remove custom LLM

# Set the embedding model to use a free open-source model (HuggingFace model)
Settings.embed_model = HuggingFaceEmbedding(model_name='sentence-transformers/all-MiniLM-L6-v2')

# Ensure the directory exists before saving
persist_dir = "C:/Jason/Monash/jabichebli/chatbot"
if not os.path.exists(persist_dir):
    os.makedirs(persist_dir)

# Create the VectorStoreIndex directly from the documents
index = VectorStoreIndex.from_documents(documents)

# Save the index for future queries
index.storage_context.persist(persist_dir=persist_dir)

# --------- Loading the Index ---------
# Rebuild the storage context
storage_context = StorageContext.from_defaults(persist_dir=persist_dir)

# Load the index from storage
try:
    loaded_index = load_index_from_storage(storage_context)
except Exception as e:
    print(f"Error loading the index: {e}")
    exit(1)

# Create a query engine from the loaded index
query_engine = loaded_index.as_query_engine()


# Query the index directly using HuggingFaceLLM
query = "Based on the provided documents, what is my background?"

# Tokenize input
inputs = tokenizer(query, return_tensors="pt")

# Generate output from Flan-T5 model
outputs = model.generate(**inputs, max_new_tokens=50)

# Decode the response
response_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

print(f"Flan-T5 Response: {response_text}")