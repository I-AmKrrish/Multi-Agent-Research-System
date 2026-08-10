import asyncio
import chainlit as cl

from agents import build_search_agent, build_reader_agent, writer_chain, critic_chain
from pipeline import extract_text, extract_tool_outputs


@cl.step(name="Search Agent", type="tool")
async def run_search_agent(topic: str) -> str:
    agent = build_search_agent()
    result = await asyncio.to_thread(
        agent.invoke,
        {"messages": [("user", f"Research recent information on: {topic}")]},
    )
    search_results = extract_tool_outputs(result["messages"])
    cl.context.current_step.output = search_results
    return search_results


@cl.step(name="Reader Agent", type="tool")
async def run_reader_agent(topic: str, search_results: str) -> str:
    agent = build_reader_agent()
    result = await asyncio.to_thread(
        agent.invoke,
        {
            "messages": [
                (
                    "user",
                    f"Based on the following search results about '{topic}', "
                    f"pick the most relevant URL and scrape it for deeper content.\n\n"
                    f"Search Results: \n{search_results[:800]}",
                )
            ]
        },
    )
    scraped_content = extract_text(result["messages"][-1].content)
    cl.context.current_step.output = scraped_content
    return scraped_content


@cl.step(name="Writer Chain", type="llm")
async def run_writer_chain(topic: str, research_combined: str) -> str:
    report = await asyncio.to_thread(
        writer_chain.invoke, {"topic": topic, "research": research_combined}
    )
    cl.context.current_step.output = report
    return report


@cl.step(name="Critic Chain", type="llm")
async def run_critic_chain(report: str) -> str:
    feedback = await asyncio.to_thread(critic_chain.invoke, {"report": report})
    cl.context.current_step.output = feedback
    return feedback


@cl.on_chat_start
async def start():
    await cl.Message(
        content="👋 **Multi-Agent Research System**\n\n"
        "Send me a topic and I'll run it through the search agent, "
        "reader agent, writer, and critic — step by step."
    ).send()


@cl.on_message
async def main(message: cl.Message):
    topic = message.content.strip()

    search_results = await run_search_agent(topic)
    scraped_content = await run_reader_agent(topic, search_results)

    research_combined = (
        f"Search Results: \n{search_results}"
        f"Scraped Content: \n{scraped_content}"
    )

    report = await run_writer_chain(topic, research_combined)
    critic_feedback = await run_critic_chain(report)

    await cl.Message(content=report, author="Writer Agent").send()
    await cl.Message(
        content=f"**Critic Feedback**\n\n{critic_feedback}", author="Critic Agent"
    ).send()