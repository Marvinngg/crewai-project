from crewai_tools import WebsiteSearchTool
from crewai_tools import FileReadTool
from tools.browser_tools import BrowserTools
from tools.search_tools import SearchTools
from crewai import Agent
from tools.search_one_website import SearchWebsiteTools
from database_model import Agent as DBAgent
class CompanyAnalysisAgents:


    def company_information_collector(self):
      agent_info = DBAgent.query.filter_by(name='company_information_collector').first()
      role = agent_info.role
      goal = agent_info.goal
      backstory = agent_info.backstory
      return Agent(
        role=role,
        goal=goal,
        backstory=backstory,
        tools=[
            SearchTools.search_internet,
            BrowserTools.scrape_and_summarize_website,
            # WebsiteSearchTool()
        ],
        verbose=True)

    def company_analyst(self):
      agent_info = DBAgent.query.filter_by(name='company_analyst').first()
      role = agent_info.role
      goal = agent_info.goal
      backstory = agent_info.backstory
      return Agent(
        role=role,
        goal=goal,
        backstory=backstory,
        tools=[
            SearchTools.search_internet,
            BrowserTools.scrape_and_summarize_website,
            # WebsiteSearchTool()
        ],
        verbose=True)
