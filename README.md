# Mechanic_AI
Virtual Car Mechanic Chatbot
Overview
This project aims to develop an intelligent chatbot that serves as a virtual car mechanic. The chatbot can diagnose and troubleshoot car issues by leveraging information from car manuals, service records, and maintenance guides. It provides accurate solutions and facilitates spare parts availability checks, even allowing users to order the necessary parts.

Key Features:
Data Collection: Gathering car manuals, service records, and related documents.
Data Processing: Using LlamaIndex to structure and parse the collected data for easier querying.
Model Training: Implementing the Retrieval-Augmented Generation (RAG) framework, fine-tuned with the LLaMA 3 language model, to provide detailed car diagnostics and troubleshooting tips.
Embeddings: Utilizes Hugging Face embeddings for better semantic understanding of car-related issues.
Spare Parts: Integrates spare parts availability check and ordering functionality.
Mobile Interface: The chatbot is designed for mobile use to make it easy for users to get assistance on the go.
Challenges:
Efficiently process large volumes of manuals and records.
Training a robust model for accurate diagnosis across a wide range of vehicles and problems.
Ensuring seamless integration with external spare part vendors.
Software Structure
1. Data Collection
2. Data Processing
3. Model Training
4. Evaluation
5. Spare Parts Integration
6. Mobile Interface
Frontend: A mobile-friendly interface developed for easy access to car troubleshooting advice and spare parts ordering.
