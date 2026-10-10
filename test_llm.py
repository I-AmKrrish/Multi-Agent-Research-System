# test_llm.py
from agents import llm

response = llm.invoke("Say hello in one word.")
print(response.content)