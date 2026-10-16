from agents import build_reader_agent, build_search_agent, writer_chain, critic_chain
import time


def extract_text(content):
    if isinstance(content, str):
        return content
    return "".join(
        block.get("text", "") for block in content if block.get("type") == "text"
    )


def extract_tool_outputs(messages):
    """Pull raw ToolMessage contents (the actual web_search return values),
    so URLs survive instead of being paraphrased away by the agent's summary."""
    return "\n----\n".join(
        m.content for m in messages if m.__class__.__name__ == "ToolMessage"
    )


def run_research_pipeline(topic: str)-> dict:
    state= {}
    #search_agent working
    print("\n"+ "="*50)
    print("Step 1- LAUNCHING multi-agent research pipeline")
    print("="*50)

    search_agent = build_search_agent()
    search_results = search_agent.invoke({
        "messages": [("user", f"Research recent information on: {topic}")]
    })
    
    state["search_results"] = extract_tool_outputs(search_results["messages"])
    print("Search Results: ", state["search_results"])
    time.sleep(3)


    #Step 2- Reader Agent
    print("\n" + "="*50)
    print("Step 2- LAUNCHING multi-agent reader agent")
    print("="*50)

    reader_agent = build_reader_agent()
    reader_result = reader_agent.invoke({
        "messages": [("user", 
            f"Based ont he following search results about '{topic}',"
            f"pick the most relevant URL and scrape it for deeper content. \n\n"
            f"Search Results: \n{state['search_results'][:800]}"
        )]
    })
    state["scraped_content"] = extract_text(reader_result["messages"][-1].content)
    print("Scraped Content: ", state["scraped_content"])
    time.sleep(3)



    #step 3- writer is drafting the report
    print("\n" + "="*50)
    print("Step 3- Writer is drafting the report")
    print("="*50)
    
    research_combined = (
        f"Search Results: \n{state['search_results'][:1500]}"  
        f"Scraped Content: \n{state['scraped_content'][:1500]}"
    )
    state["report"] = writer_chain.invoke({
        "topic": topic,
        "research": research_combined
    })
    print("\n Final Report: \n", state["report"])
    time.sleep(3)


    #Critic Report
    print("\n" + "="*50)
    print("Step 4- Critic is reviewing the report")
    print("="*50)

    state["critic_feedback"] = critic_chain.invoke({
        "report": state["report"]
    })
    print("Critic Feedback: ", state["critic_feedback"])


    return state



if __name__ == "__main__":
    topic  = input ("Enter a research topic: ")
    run_research_pipeline(topic)