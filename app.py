import streamlit as st
from pipeline import run_research_pipeline

st.set_page_config(page_title="Multi-Agent Research System", page_icon="🔎", layout="wide")

st.title("🔎 Multi-Agent Research System")
st.caption("Search agent → Reader agent → Writer chain → Critic chain, powered by Mistral + Tavily")

topic = st.text_input("Enter a research topic", placeholder="e.g. impact of war on Indian NSE stocks and commodities")
run_button = st.button("Run Research Pipeline", type="primary", disabled=not topic)

if run_button and topic:
    with st.status("Running multi-agent research pipeline...", expanded=True) as status:
        st.write("Step 1 — Search agent gathering sources...")
        print(topic)
        state = run_research_pipeline(topic)
        status.update(label="Pipeline complete ✅", state="complete", expanded=False)

    st.session_state["result"] = state
    st.session_state["topic"] = topic

if "result" in st.session_state:
    state = st.session_state["result"]
    topic = st.session_state["topic"]

    st.subheader(f"Report: {topic}")

    tab_report, tab_critic, tab_search, tab_scraped = st.tabs(
        ["📄 Final Report", "🧐 Critic Feedback", "🔍 Search Results", "📰 Scraped Content"]
    )

    with tab_report:
        st.markdown(state.get("report", "No report generated."))

    with tab_critic:
        st.markdown(state.get("critic_feedback", "No critic feedback generated."))

    with tab_search:
        st.text(state.get("search_results", "No search results."))

    with tab_scraped:
        st.markdown(state.get("scraped_content", "No scraped content."))

    st.download_button(
        "Download Report as Markdown",
        data=state.get("report", ""),
        file_name=f"{topic.replace(' ', '_')}_report.md",
        mime="text/markdown",
    )
else:
    st.info("Enter a topic above and click **Run Research Pipeline** to get started.")