# DocPad Configuration
docpadConfig = {


  # Environments
  # Allows us to set custom configuration for specific environments
  environments:  # default
    development:  # default

      # Listen to port 9009 on the development environment
      port: 9009  # example
  watchOptions:
    preferredMethods: ['watchFile','watch']
  plugins:
    # uglify:
    #     # Disable UglifyJS on the development environment.
    #     environments:
    #         development:
    #             enabled: true

    #     # Pass false to skip compressing entirely. Pass an object to specify custom
    #     # compressor options: http://lisperator.net/uglifyjs/compress .
    #     compress: {}

    #     # Pass false to skip mangling names.
    #     mangle: {}

    #enabled livereload
    livereload:
      enabled: true

  templateData:

    site:

      executive_team:

        ryan_terpstra:
          job_name:"Ryan Terpstra"
          job_title:"Founder & CEO"
          job_desc:"Ryan Terpstra is a technology entrepreneur working at the intersection of artificial intelligence, unstructured content, and enterprise software. Before Selerity, Terpstra was the Director of Quantitative News at Thomson Reuters, where he led the design, build, and launch of Thomson Quantitative News (TQN), a machine-readable news offering for investment managers. Prior to TQN, he worked as Senior Strategist in the Corporate Strategy group developing growth strategies for Thomson Financial across quantitative trading, data analytics and financial news. Terpstra also worked for the World Economic Forum in the Center for Global Industries, working on projects for the Forum’s financial services and alternative investment members. He was responsible for the design and presentation of the Forum’s “M&A Heat Map” session at their Annual Meeting in Davos, Switzerland. Terpstra was a New York Power 30 Under 30 and holds a B.A. in Finance, graduating with honors from Miami University (Ohio)."
          job_img:"/img/team/ryan-terpstra.png"
          twitter_link:"https://twitter.com/ryanterpstra"
          linkedin_link:"http://www.linkedin.com/in/ryanterpstra"

        andrew_brook:
          job_name:"Andrew Brook"
          job_title:"CTO"
          job_desc:"Prior to Selerity, Andrew was the Executive Director responsible for Morgan Stanley’s foreign exchange (FX) e-commerce platform, providing low-latency pricing and execution services to the firm's clients. Previous to Morgan Stanley, Andrew managed technology for the FX Prime Brokerage, FX Electronic Trading, and Market Risk teams at Bank of America. Andrew was also the co-founder of an early stage venture that delivered innovative scheduling software to the agile manufacturing sector. Andrew holds a B.S. in Computer Science from the University of Illinois at Urbana-Champaign."
          job_img:"/img/team/andew-brook.png"
          twitter_link:""
          linkedin_link:"http://www.linkedin.com/in/andrewbrook"

        brendan_gilmartin:
          job_name:"Brendan Gilmartin"
          job_title:"EVP, Content and Client Services"
          job_desc:"Most recently, Brendan was Senior Equity Market Analyst for Thomson Reuters. Brendan's responsibilities included generating proprietary equity commentary covering corporate earnings, M&A, FDA announcements, SEC filings, IPO/ syndicate, and a range of other event-driven news items covering all market sectors. Prior to Thomson Reuters, he was Senior Managing Editor and Content Manager and co-founding member at Wall Street Source Inc., an online financial news and commentary service. Brendan holds a B.A. in English and Minor in Business Studies from Providence College in Rhode Island."
          job_img:"/img/team/brendan-gilmartin.png"
          twitter_link:""
          linkedin_link:"http://www.linkedin.com/pub/brendan-gilmartin/1b/853/548"

        ashfaq_rahman:
          job_name:"Ashfaq Rahman"
          job_title:"Chief Scientist"
          job_desc_1: "Ashfaq is a serial entrepreneur and research technologist.  At Microsoft, he built server side algorithms, systems and tools. He authored and managed the social graph, lead generation, and recommendation engine services for "
          job_desc_2: " Prior to this, Ashfaq served as computational linguist for Vantage Laboratories, building the "
          job_desc_3: " search engine and algorithms. As a founding member of LocalBlox, he worked on big data initiatives for the targeting of neighborhoods and syndication of businesses.  Previously, his role as founding CTO at LoopAnalytics involved architecting their recommendation-driven mobile ad platform. Ashfaq has a M.S. in Computer Science from the University of Pennsylvania and holds numerous software patents."
          job_img:"/img/team/ashfaq-rahman.png"
          twitter_link:""
          linkedin_link:"http://www.linkedin.com/pub/ashfaq-rahman/0/aa3/5"

        yordanka_ilieva:
          job_name:"Yordanka Ilieva"
          job_title:"Director of Finance & Operations"
          job_desc:"Before Selerity, Yordanka held roles in corporate and business development at Copal Partners/Moody’s Corporation and higher education consulting under the leadership of Stephen Friedman, former SEC Commissioner of the United States. Prior to that, she was an investment banker at Credit Suisse and Lazard Frères with a focus on M&A and restructuring transactions in technology, media and telecommunications.  Yordanka holds a B.S. with distinction in Economics and Business from Universitet van Amsterdam and Leonard Stern School of Business (IBEX), and an M.S. with distinction in Finance from Universiteit van Amsterdam."
          job_img:"/img/team/yordanka-ilieva.png"
          twitter_link:""
          linkedin_link:"http://www.linkedin.com/pub/yordanka-ilieva/5/863/35b"

      board_directors:

        eric_frank:
          job_name:"Eric Frank"
          job_title:"Chairman"
          job_desc:"Eric Frank was most recently the President of Thomson Reuters’ $2.3B Investment & Advisory (I&A) Division, where he led the growth and post-merger integration of the following units: Investment Management & Sell-SideResearch, Investment Banking, Wealth Management, and Corporate Services. Prior to this, he led Thomson’s $500M Investment Management business unit. Earlier in his career, he spent 10 years at JP Morgan and helped build its ADR Americas division, and spearheading their Product Development efforts into Digital andOnline. He is a Board Member of AGDATA, an AgKnowledge Company, the leading provider of strategic data and analytical solutions to the world’s largest agricultural crop protection and animal health manufacturers. He is a graduate of the University of Michigan."

        doug_atkin:
          job_name:"Doug Atkin"
          job_title:""
          job_desc:"Mr. Atkin has been an investor, founder, and senior executive in the financial technology industry for over 25 years.  Since 2011, he has run Venture Investing at Guggenheim Partners, a privately held global financial services firm with more than $180 billion in assets under management.  Mr. Atkin began his career at Instinet where he rose to become the company’s CEO, leading its successful $435 million IPO in 2001. Most recently, Mr. Atkin was the CEO of Majestic Research (acquired by ITG (NYSE:ITG)).  Mr. Atkin was selected as one of the Top New Yorkers by New York Magazine for his leading role in redefining the financial marketplace, and Institutional Investor profiled him as one of the top 30 individuals making the greatest impact on e-finance.  He was educated at Tufts University."

        matthew_burkley:
          job_name:"Matthew Burkley"
          job_title:""
          job_desc:"Matthew Burkley is the CEO of Genscape since 2011. Before Genscape, Matthew was CFO and acting President of the Sales & Trading group at Thomson Reuters building on previous leadership positions he held at the firm since 2006. Prior to joining Thomson Reuters, Mr. Burkley was Co-founder and Managing Director at ZEFER, a technology and strategy consulting firm. Matthew was educated at Colorado College and Harvard Business School."

        donal_smith:
          job_name:"Donal Smith"
          job_title:""
          job_desc_1:"Donal is currently a co-founder at Credit Benchmark. Prior to Credit Benchmark, Donal was CEO of Data Explorers (acquired by Markit April 2012). Previously he held roles at Thomson Reuters including CEO of Thomson Financial’s businesses in Europe and Asia. He has also served as CEO of eCountries, CEO of "
          job_desc_2:" and Director of Electronic Publishing for the FT Group. He is currently a non-executive director of Trinity Mirror plc, Commodity Vectors Ltd, and BI-SAM Technologies S.A."

      advisors:

        roger_ehrenberg:
          job_name:"Roger Ehrenberg"
          job_desc:"Roger Ehrenberg is Managing Partner of IA Ventures, a seed stage venture fund focused on companies managing and extracting value from Big Data. Prior to IA Ventures, Roger was an active seed-stage angel investor in over 40 companies. Earlier in his career, Roger served as president and CEO of DB Advisors, Deutsche Bank's internal hedge fund trading platform. Before DB Advisors, he was global co-head of Deutsche Bank’s Strategic Equity Transactions Group. Previously, he worked as an investment banker and managing director at Citibank, where he held a variety of roles in the Global Derivatives, Capital Markets, Mergers & Acquisitions and Capital Structuring groups."

        ian_koenig:
          job_name:"Ian Koenig"
          job_desc:"Ian Koenig is the Chief Architect for LexisNexis with global responsibility for Enterprise Architecture, Architecture Governance, Technology Strategy and New Technology Research. Prior to Joining LexisNexis, Ian was an Independent Consultant, specializing in helping companies create Enterprise Architecture practice. At Thomson Financial, Ian was Chief Architect responsible for Enterprise Architecture, Technology Strategy and Architecture Governance. Prior to joining Thomson, Ian was the Chief Architect for Products and Platforms at Reuters, where he worked for 19 years. Koenig began a 30+ year career in technology as a software developer at Reveal Software."

        emanuel_mond:
          job_name:"Emanuel Mond"
          job_desc:"Emanuel is a serial entrepreneur who has helped start and scale a number of businesses in the fintech arena. In the 90's he started Monis which he later sold to SunGard in 2002. He then spent 8 years at SunGard as President at first of the Trading Software group and then of the Alternative Investments segment. He was a founding shareholder in Cadis and became their chairman in 2011. The business was sold to Markit in June 2012."

      investors:

        investors_main:
          job_desc:"Selerity is backed by some of financial technology's most successful executives, entrepreneurs, and investors including Donal Smith, Roger Ehrenberg, Mark Faulkner, Tom Glocer, Emanuel Mond, Lee Olesky, and Sharon Rowlands."

        investors_1:
          job_name:"Investors 1"
          job_desc:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."

        investors_2:
          job_name:"Investors 2"
          job_desc:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat."

        extraordinary:
          job_title:"<span class='bold'>Extraordinary</span> results require <span class='bold'>extraordinary</span> people doing <span class='bold'>extraordinary</span> things."

        global_impact:
          job_title:"GLOBAL IMPACT"
          job_desc:"Build and support products that move world financial markets independent of location or language."

        big_home:
          job_title:"GO BIG OR GO HOME"
          job_desc:"Tackle big problems involving blazing speed, pinpoint accuracy and white glove service."

        creative_solutions:
          job_title:"CREATIVE SOLUTIONS"
          job_desc:"We value pushing the envelope by challenging convention, taking risks, and pushing boundaries.<br>Smart. Resourceful. Fun."

        embrace:
          job_title:"We are looking for people who embrace our values:"
          job_desc_1:"High caliber, hardworking, team oriented"
          job_desc_2:"Goal oriented with a direct impact on success"
          job_desc_3:"Self-motivated individuals that thrive in agile, fast-moving environments"
          job_desc_4:"Passionate problem solvers that like challenges"
          job_desc_5:"Customer centric and professional"
          job_desc_6:"“Good people” who are respectful of diverse backgrounds and experiences"

        recruiters:
          job_header:"Instructions for Recruiters"
          job_title:"We have a rich history of success working with recruiters and look forward to working with more in the future.  However, before you contact us or submit resumes, please do the following:"
          job_desc_1:"Request, read, and sign a copy of our recruiter agreement by contacting <a href='mailto:careers@seleritycorp.com'>careers@seleritycorp.com</a> with the subject “Recruiter Agreement”. <span class='bold'> We will not accept any resumes or discuss any open positions until this step has been completed.</span>"
          job_desc_2:"Please read the job descriptions including both the required and optional qualifications. This should answer most questions regarding what we are looking for in a candidate."
          job_desc_3:"Finally, <span class='bold'>please do not submit candidates who do not match the required qualifications.</span> We are very selective and closely track the quality and quantity of submissions by recruiters."

        insurance:
          job_name:"Medical, Dental, Vision, and Life InsuranceBenfits"
          job_desc:"Generous health benefits from a nationally recognized provider."
          job_img:"/img/radius-11.png"

        commuter:
          job_name:"Pre-tax Transit Benefits"
          job_desc:"Pre-tax commuter benefits."
          job_img:"/img/radius-12.png"

        vacation:
          job_name:"Self-managed Vacation Time"
          job_desc:"We’re all professionals.  As long as you’re productive we allow people to manage their own paid-time-off."
          job_img:"/img/radius-13.png"

        bonus:
          job_name:"Referral Bonus"
          job_desc:"Generous referral bonus for all employees that refer candidates the company ends up hiring."
          job_img:"/img/radius-14.png"

        equity_options:
          job_name:"Employee Stock Options"
          job_desc:"We believe everyone should have a piece of the pie.  We’re all working towards making Selerity a great company."
          job_img:"/img/radius-15.png"

        events:
          job_name:"Multiple Screen Workstations"
          job_desc:"Quantity often has a quality all its own, especially for screens and productivity."
          job_img:"/img/radius-16.png"

        systems_engineer:
          job_name:"Systems Engineer Intern - Technical Operations"
          job_desc:"Intern on the Technical Operations team who will gain real-world experience in engineering and operations tasks at all levels of technology stack from hardware up to applications. Significant exposure to cloud computing and datacenter operations."
          job_link:"careers/job.html"

      careers:
        sse:
          job_name:"SELERITY CAREERS"
          job_title:"Senior Software Engineer - Real-time Analytics"
          job_type:"Employment Type"
          employment_cont:"Full-time"
          location:"Location"
          location_cont:"New York City"
          job_description:"Job Description"
          job_description_cont:"Selerity is looking for an exceptional senior developer who masters new technologies effortlessly, understands how to build systems that run 24/7 at scale, and is looking for a new challenge with real world impact.<br><br>The ideal candidate will combine rock-solid Java programing skills with experience engineering systems for high volumes of real-time, unstructured data. Experience with natural language processing and machine learning algorithms is a strong plus.  Programming experience in other languages (especially C++) is helpful.  The challenges of this project require deep, hands-on technical knowledge at all layers of the stack (from hardware to browser) combined with creative problem solving ability and outstanding interpersonal skills.<br><br>This position offers a great opportunity to work with advanced technologies, collaborate with a top-notch, global team and disrupt a multi-billion-dollar market."
          required_qualifications:"Required Qualifications: (candidate must possess all of these)"
          required_qualifications_cont_1:"BS in Computer Science (or closely related 4-year degree)."
          required_qualifications_cont_2:"At least 5 years commercial development experience and a track record for delivering systems at scale."
          required_qualifications_cont_3:"Advanced understanding of Java and at least one other programming language."
          required_qualifications_cont_4:"Demonstrated ability to deliver high-quality code in an agile environment."
          required_qualifications_cont_5:"Effective communication skills with both technical and non-technical peers."
          required_qualifications_cont_6:"Self-starter capable of working effectively with minimal supervision."
          required_qualifications_cont_7:"Authorization to work in the United States. Sponsorship will be considered for exceptional candidates."
          desired_qualifications:"Desired Qualifications: (candidate should possess some of these)"
          desired_qualifications_cont_1:"Real-world experience applying machine learning, NLP or other algorithms to large (TB scale) data sets."
          desired_qualifications_cont_2:"C++ programming in large-scale, distributed environments."
          desired_qualifications_cont_3:"Experience developing asynchronous apps in JavaScript on both server-side and browser, familiarity with Node, Websocket, Backbone, jQuery, etc."
          desired_qualifications_cont_4:"Detailed understanding of common Internet protocols (TCP, HTTP, DNS, etc.) applied to large scale distributed systems."
          desired_qualifications_cont_5:"Experience applying Apache Solr, Hadoop or other open-source frameworks to large-scale search and analysis problems."
          desired_qualifications_cont_6:"Familiarity with internationalization, multi-byte character sets and different languages."
          desired_qualifications_cont_7:"Experience developing, deploying and managing applications on open source stacks in the data center or on the cloud."
          desired_qualifications_cont_8:"Understanding of performance optimization, especially in latency-sensitive (millisecond scale) environments."
          desired_qualifications_cont_9:"Experience working with image or video data, especially in a social media context."
          desired_qualifications_cont_10:"Solid understanding of both relational (e.g. MySQL, PostgreSQL) and non-relational databases (e.g. MongoDB, HBase, Cassandra, etc.)."
          job_candidates_cont:"Interested candidates should send their resume to"
          job_candidates_email:"careers@seleritycorp.com"
        sfe:
          job_name:"SELERITY CAREERS"
          job_title:"Senior Financial Editor"
          job_type:"Employment Type"
          employment_cont:"Full-time"
          location:"Location"
          location_cont:"New York City"
          job_description:"Job Description"
          job_description_cont:"Selerity is seeking an experienced business journalist and editor with a passion for technology, the emerging markets, and the currency markets.  We are looking for someone to manage and grow Selerity’s analyst team responsible for sourcing and publishing differentiated real-time intelligence.  The ideal candidate must have deep interest in product development as they will be working hand-and-hand with Selerity’s engineering and product team to build new products, set content strategy, and develop the framework for Selerity’s real-time distribution and publishing process.  Furthermore, the right person must realize the importance of understanding the end-customer and their specific needs, and not have a traditional “we tell the customer what’s important” mentality.<br/>The ideal candidate has real experience covering and working as a financial news reporter and editor, and understand the full news lifecycle and how it differs in these regions.<br/>This position offers a great opportunity to work on cutting edge news technologies and business models that will disrupt a multi-billion-dollar market.</span><br/><br/>Selerity is seeking an experienced financial editor with a passion for technology and the emerging markets.  We are looking for someone to manage and grow Selerity’s analyst team responsible for sourcing and publishing differentiated real-time intelligence.  The ideal candidate must have deep interest in product development as they will be working hand-and-hand with Selerity’s engineering and product team to build new products, set content strategy, and develop the framework for Selerity’s real-time distribution and publishing process.  Furthermore, the right person must realize the importance of understanding the end-customer and their specific needs, and not have a traditional “we tell the customer what’s important” mentality.<br><br>The ideal candidate has real experience covering and working in the emerging markets, and understand the full news lifecycle and how it differs in these regions.<br><br>This position offers a great opportunity to work on cutting edge news technologies and business models that will disrupt a multi-billion-dollar market."
          required_qualifications:"Required Qualifications (candidate must possess all of these)"
          required_qualifications_cont_1:"Bachelor’s Degree (or closely related 4-year degree)."
          required_qualifications_cont_2:"At least 5 years commercial experience as a business journalist."
          required_qualifications_cont_3:"At least 3 years commercial experience as a business news editor."
          required_qualifications_cont_4:"Experience working on a breaking news flash desk."
          required_qualifications_cont_5:"Experience building and managing teams of business journalists and analysts."
          required_qualifications_cont_6:"Demonstrated ability to shape news product and content strategy."
          required_qualifications_cont_7:"Experience working with product managers and technologists on news product development."
          required_qualifications_cont_8:"Real-world experience using web and social media technologies as part of their workflow."
          required_qualifications_cont_9:"Excellent English writing and communication skills."
          required_qualifications_cont_10:"Deep understanding of the entire news lifecycle from sources to publication."
          required_qualifications_cont_11:"Self-starter capable of working effectively with minimal supervision."
          required_qualifications_cont_12:"Authorization to work in the United States. Sponsorship will be considered for exceptional candidates."
          desired_qualifications:"Desired Qualifications (candidate should possess some of these)"
          desired_qualifications_cont_1:"Experience building a digital news product from the ground up."
          desired_qualifications_cont_2:"Work experience in either China or Brazil."
          desired_qualifications_cont_3:"Proficient speaking and writing Chinese or Portuguese."
          job_candidates_cont:"Interested candidates should send their resume to"
          job_candidates_email:"careers@seleritycorp.com"
        acm:
          job_name:"SELERITY CAREERS"
          job_title:"Account Manager – Real-time Event Data"
          job_type:"Employment Type"
          employment_cont:"Full-time"
          location:"Location"
          location_cont:"New York City"
          job_description:"Job Description"
          job_description_cont:"Selerity is looking for an experienced account manager to help retain and grow Selerity’s real-time event data business.<br/><br/>The ideal candidate will combine a passion for sales, marketing, and customer service.  Selerity’s real-time event data clients are sophisticated institutional investors who expect white glove service.  The Account Manager will be responsible for retaining and growing Selerity’s current business by developing strong relationships with our clients and seeking out new business by up-selling these clients with additional Selerity product offerings.  This person will also assist with various marketing aspects including community engagement on LinkedIn, product case studies, and email marketing campaigns.<br/></br>This position offers a great opportunity to accelerate the growth of an existing business in the hedge fund and institutional investor market and work directly with Selerity’s executive team."
          required_qualifications:"Required Qualifications (candidate must possess all of these)"
          required_qualifications_cont_1:"4 Year Bachelor’s Degree"
          required_qualifications_cont_2:"At least 2 years in a sales, marketing or account management position at a technology or information services company."
          required_qualifications_cont_3:"Understanding of the full sales life cycle."
          required_qualifications_cont_4:"Demonstrated ability to retain and close new business."
          required_qualifications_cont_5:"Extreme attention to detail and effective communication skills."
          required_qualifications_cont_6:"Self-starter capable of working effectively with minimal supervision."
          required_qualifications_cont_7:"Authorization to work in the United States."
          desired_qualifications:"Desired Qualifications (candidate should possess some of these)"
          desired_qualifications_cont_1:"2 year experience selling financial information products, specifically financial news."
          desired_qualifications_cont_2:"Experience selling machine-readable news."
          desired_qualifications_cont_3:"Design and marketing experience."
          desired_qualifications_cont_4:"Experience working with sales and marketing tools (Salesforce, GetResponse, MailChimp, etc.)."
          desired_qualifications_cont_5:"Demonstrated ability to effectively use social and professional media."
          job_candidates_cont:"Interested candidates should send their resume to"
          job_candidates_email:"careers@seleritycorp.com"
        sose:
          job_name:"SELERITY CAREERS"
          job_title:"Software or Systems Engineer - DevOps"
          job_type:"Employment Type"
          employment_cont:"Full-time"
          location:"Location"
          location_cont:"New York City"
          job_description:"Job Description"
          job_description_cont:"Selerity is looking for an exceptional engineer who can support and automate a complex and growing infrastructure.  The ideal candidate will have significant experience managing large numbers of Linux servers in both data centers and the cloud combined with programming skills necessary to automate the build / test / deploy process as well as routine systems maintenance and monitoring tasks.  The stack is open source and most of the automation code is in Java but knowledge of other languages (C++, Perl, Python, Bash) is helpful.  Understanding of networking protocols and cloud technologies is also a plus.<br/><br/>This position offers a great opportunity to work with advanced technologies, collaborate with a top-notch, global team and disrupt a multi-billion-dollar market."
          required_qualifications:"Required Qualifications (candidate must possess all of these)"
          required_qualifications_cont_1:"BS in Computer Science (or closely related 4-year degree)."
          required_qualifications_cont_2:"At least 5 years System Administration and/or DevOps experience and a track record for delivering complex systems at scale."
          required_qualifications_cont_3:"Detailed understanding of common Internet protocols (TCP, HTTP, DNS, etc.) applied to large scale distributed systems."
          required_qualifications_cont_4:"Experience developing, deploying and managing applications on open source stacks in the data center and/or on the cloud."
          required_qualifications_cont_5:"Effective communication skills with both technical and non-technical peers."
          required_qualifications_cont_6:"Self-starter capable of working effectively with minimal supervision."
          required_qualifications_cont_7:"Demonstrated ability to deliver high-quality solutions in an agile environment."
          required_qualifications_cont_8:"Authorization to work in the United States. Sponsorship will be considered for exceptional candidates."
          desired_qualifications:"Desired Qualifications (candidate should possess some of these)"
          desired_qualifications_cont_1:"Understanding of system performance considerations, including network and disk I/O, computer architecture, and application design, especially in latency-sensitive (millisecond scale) environments."
          desired_qualifications_cont_2:"Experience building and tuning the Linux Kernel and 3rd-party device drivers."
          desired_qualifications_cont_3:"Ability to quickly build and integrate open-source tools for immediate use."
          desired_qualifications_cont_4:"Experience with configuration management tools such as Puppet, Chef, or Ansible."
          desired_qualifications_cont_5:"Familiarity with monitoring tools such as Nagios, and SNMP management systems such as OpenNMS and Observium."
          desired_qualifications_cont_6:"Familiarity with routing protocols (BGP, OSPF) multicast protocols (IGMP, PIM), or audio protocols."
          desired_qualifications_cont_7:"Solid understanding of network security, including policy and implementation."
          desired_qualifications_cont_8:"Advanced understanding of Java or C++, and at least one other high-level programming language."
          desired_qualifications_cont_9:"Solid understanding of both relational (e.g. MySQL, PostgreSQL) and non-relational databases (e.g. MongoDB, HBase, Cassandra, etc.)."
          job_candidates_cont:"Interested candidates should send their resume to"
          job_candidates_email:"careers@seleritycorp.com"
        tam:
          job_name:"SELERITY CAREERS"
          job_title:"Technical Account Manager"
          job_type:"Employment Type"
          employment_cont:"Full-time"
          location:"Location"
          location_cont:"New York City (main office)"
          job_description:"Job Description"
          job_description_cont1:"Do you want to work with some of the most sophisticated electronic trading firms on the planet? <br><br>Selerity has dominated ultra-low-latency data science in finance for several years, and we need someone to help us manage the operations and key clients of our real-time event data business. "
          job_description_cont2:"We’re looking for an experienced technical operations and account manager that enjoys broad responsibility working in a fast-paced environment.  This person will work on everything from product operations to key client account management. "
          job_description_cont3:"This position offers a great opportunity to work with algorithmic trading firms that use news and events as a key input into trading and risk management strategies.  If you love working at the convergence of finance, news, and technology, this is a great role for you."
          required_qualifications:"You:"
          required_qualifications_cont_1:"Possess at least 3 years of rock-solid experience in technical operations and dealing with sophisticated clients in an account or product management role."
          required_qualifications_cont_2:"Conversant in financial news, capital markets structure, and have a general understanding of how the securities industry works."
          required_qualifications_cont_3:"Are the type of person that’s willing to roll up their sleeves and do whatever it takes to make our customers successful."
          required_qualifications_cont_4:"Experience working in financial technology, information technology, or the capital markets industry."
          required_qualifications_cont_5:"Demonstrated experience working with engineers – big bonus points if you were once an engineer or have some type of engineering related degree including computer science, network engineering, or management information systems."
          required_qualifications_cont_6:"Extremely organized, have great attention to detail, and hate getting emails with spelling errors and grammatical mistakes."
          required_qualifications_cont_7:"Want to work in an environment that despises micromanagement."
          desired_qualifications:" combines leading commercial and open source technologies with numerous home-grown innovations, including:"
          desired_qualifications_cont_1:"Java (1.8), C++ (gcc 4.9.2/5.1), Python (2.6-3.3), Lua (5.2-5.3) and JavaScript/ECMAscript/HHVM + Node, Angular, RequireJS, Emscripten, etc."
          desired_qualifications_cont_2:"Hybrid of AWS (EC2, S3, RDS, R53) + dedicated datacenter network, server and GPU/coprocessor infrastructure."
          desired_qualifications_cont_3:"Cassandra, VoltDB, ElasticSearch plus in-house analytics pipeline (similar to Apache Spark)."
          desired_qualifications_cont_4:"In-house messaging frameworks for low-latency multicast and global-scale TCP (similar to protobufs/FixFast/zeromq)."
          desired_qualifications_cont_5:"PagerDuty, Nagios, Observium, Jenkins, Maven, Purify, VisualVM, Wireshark, Eclipse, Intellij."
          job_compensation:"Compensation:"
          job_compensation_cont:"We understand how to attract and retain the best talent and offer a very competitive mix of salary, benefits and equity. We also understand how important it is for you to feel challenged, to have opportunities to learn new things, to have the flexibility to balance your work and personal life and to know that your work has impact in the real world. If you join our NYC office be sure to bring your Nerf toys, your drones and your maker gear - we’re into that stuff, too."
          job_candidates: "Interview Process:"
          job_candidates_cont_1:"If you can see yourself at Selerity, send your resume and/or online profile (e.g. LinkedIn) to "
          job_candidates_cont_2:".  We’ll arrange a short introductory phone call and if it sounds like there’s a match you’ll come to meet the team in New York for a full interview."
          job_candidates_cont_3:" We value different perspectives and have built a team that reflects that diversity while maintaining the highest standards of excellence. You can rest assured that we welcome talented individuals regardless of their age, gender, sexual orientation, religion, ethnicity or national origin."
          job_candidates_email:"careers@seleritycorp.com"
          job_recuiter: "Recruiters:"
          job_recuiter_cont: "Please note that we are not currently accepting referrals from recruiters for this position."

      jobs: [
        {
          name: "Technical Account Manager"
          desc: "Selerity is looking for an experienced technical operations and account manager that enjoys broad responsibility working in a fast-paced environment. This person will work on everything from product operations to key client account management."
          url: "tam.html"
        }
      ]
}

# Export the DocPad Configuration
module.exports = docpadConfig
