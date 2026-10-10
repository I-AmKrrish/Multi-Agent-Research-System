
from langchain.agents import create_agent
# from langchain_mistralai import ChatMistralAI
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from tools import scrape_url, web_search
# from langchain_core.rate_limiters import InMemoryRateLimiter

import os

from dotenv import load_dotenv
load_dotenv()




# rate_limiter = InMemoryRateLimiter(
#     requests_per_second=0.1,   # 1 request every 10 seconds — safely under your 1.00 RPS cap
#     check_every_n_seconds=0.1,
#     max_bucket_size=1
# )


# llm = ChatMistralAI(
#     model="mistral-small-2603",
#     max_retries=5,
#     rate_limiter=rate_limiter,
# )


llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0,
)



#1st agent
def build_search_agent():
    return create_agent(
        model=llm,
        tools=[web_search],
        system_prompt=(
            "You are a research assistant. Use the web_search tool to find "
            "recent, reliable information on the given topic. When presenting "
            "findings, always preserve and include the exact source URLs "
            "returned by the tool — never omit or paraphrase them away."
            "Only use the tools provided to you (web_search). Never call any other tool."
        ),
    )



#2nd agent
def build_reader_agent():
    return create_agent(
        model = llm,
        tools = [scrape_url],
        system_prompt=(
            "Use only the scrape_url tool to read the most relevant URL and "
            "return its key content. Never call any other tool."),
    )



#writer_chain
writer_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a precise news writer. Write a short, factual report based on the context."),
    ("human", """Write a news report about:\n\n
    Topic: {topic}\n\n
    Research Gathered: {research}\n\n
    Structure the report as :\n\n
    - Introduction\n\n
    - Key Findings (minimum 3 well-explained points)\n\n
    - Conclusion
    - Sources (list all urls found in the research.)
    Be detailed, factual and professional.
    """),
])

writer_chain = writer_prompt | llm | StrOutputParser()


#critic_chain
critic_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a sharp and constructive research critic and senior editor. Be honest and specific"),
    ("human", """Review this report below for accuracy, clarity, and tone. Suggest specific improvements.
    Report: {report}
    Respond in this exact format:
    Score: x/10
    
    Strength:
    - .....
    - .....
    
    Areas to improve:
    - ......
    - ......

    One line verdict:
    ......
    """),
])
critic_chain = critic_prompt | llm | StrOutputParser()
