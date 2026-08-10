# Multi-Agent Research System

A multi-agent AI pipeline that researches a topic end-to-end — searching the web, scraping the most relevant source, writing a structured report, and critiquing its own output. Built with **LangChain**, **LangGraph**, and **Mistral AI**, with two interchangeable UIs: **Streamlit** and **Chainlit**.

## How it works

The pipeline runs four stages in sequence:

1. **Search Agent** — a LangGraph ReAct agent (`create_agent`) equipped with a Tavily web search tool. Finds recent, relevant sources on the topic and returns titles, URLs, and snippets.
2. **Reader Agent** — a second ReAct agent equipped with a BeautifulSoup-based scraping tool. Picks the most relevant URL from the search results and scrapes it for deeper context.
3. **Writer Chain** — an LCEL (`Runnable`) pipeline that combines the search results and scraped content into a structured news-style report (Introduction, Key Findings, Conclusion, Sources).
4. **Critic Chain** — a second LCEL chain that reviews the report and returns a score and feedback.

Each agent runs on **Mistral AI** chat models via `langchain-mistralai`.

## Project structure

```
.
├── agents.py          # Agent + chain definitions (search, reader, writer, critic)
├── tools.py           # Tavily search tool and BeautifulSoup scrape tool
├── pipeline.py         # Orchestrates the 4-stage pipeline, run via terminal
├── app.py             # Streamlit UI
├── chainlit_app.py    # Chainlit UI (step-by-step agent view)
├── requirements.txt
└── .gitignore
```

## Setup

1. Clone the repo and create a virtual environment:
   ```bash
   git clone https://github.com/I-AmKrrish/Multi-Agent-Research-System.git
   cd Multi-Agent-Research-System
   uv venv
   .venv\Scripts\Activate.ps1   # Windows PowerShell
   ```

2. Install dependencies:
   ```bash
   uv pip install -r requirements.txt
   ```

3. Create a `.env` file in the project root with your API keys:
   ```
   TAVILY_API_KEY=your_tavily_key_here
   MISTRAL_API_KEY=your_mistral_key_here
   ```

## Running it

**Terminal (no UI):**
```bash
python pipeline.py
```

**Streamlit UI:**
```bash
python -m streamlit run app.py
```

**Chainlit UI** (shows each agent's step as a collapsible card):
```bash
python -m chainlit run chainlit_app.py -w
```

## Tech stack

- LangChain / LangGraph (`create_agent`, LCEL `Runnable` pipelines)
- Mistral AI (`langchain-mistralai`)
- Tavily (web search tool)
- BeautifulSoup (web scraping tool)
- Streamlit & Chainlit (UI)

## Notes

This project was built as hands-on practice in agentic AI system design — combining tool-using agents with LCEL chains in a single pipeline, rather than relying on a single monolithic agent.