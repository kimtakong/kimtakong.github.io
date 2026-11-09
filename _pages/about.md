---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

I am a Master's student at the Graduate School of Data Science, Pusan National University, Korea, and a member of [BAELAB](https://pnubaelab.github.io/) advised by Prof. Hyerim Bae.

My research focuses on data-driven decision making for container terminal operations. I study how the timing and form of a prediction affect the decision it feeds, in particular reducing rehandling in import container yards by re-querying a conditional residual survival function of container dwell time at every stacking decision.

Citations: <a href='https://scholar.google.com/citations?user=fn1WtU4AAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>
&nbsp;·&nbsp; Email: [glorytak74@pusan.ac.kr](mailto:glorytak74@pusan.ac.kr) / [glorytak74@naver.com](mailto:glorytak74@naver.com)

{% comment %}
TODO: CV link. Put the PDF at files/cv.pdf and add this line below:
[Curriculum Vitae (PDF)](files/cv.pdf)
{% endcomment %}

# Research Interests
- **Container Terminal Operations**: import container stacking, rehandling reduction, yard simulation
- **Survival Analysis**: discrete-time hazard models, conditional residual survival functions for dwell time
- **Prediction for Decision Making**: linking predictions to operational rules (stacking, charging, routing)
- **Logistics Optimization**: vehicle routing with three-dimensional loading, AGV charging

# News
- *2026.12*: Oral presentation at APIEMS 2026 (scheduled, Dec. 1).
- *2026.10*: Presented and demonstrated our research at the Promising Technology Exchange Meeting of the SCSC Research Center. [[Video]](https://www.youtube.com/watch?v=RadiuDs2zOs)
- *2026.08*: Our paper on container dwell time prediction was published in *Transportation Research Part E*.
- *2026.04*: Filed a Korean patent application on container stacking with generative AI and machine learning.
- *2026.01*: Attended AAAI 2026 in Singapore.
- *2025.12*: Received 최우수상 (국가과학기술연구회 이사장상) at the 2025 KISTI AI·DATA Competition.
- *2025.11*: Oral presentation at the 2025 Fall Conference of the Korean Institute of Industrial Engineers (KIIE).
- *2025.08*: Attended the Oxford Machine Learning Summer School (OxML), MLx Representation Learning & GenAI.

{% comment %}
TODO: the 2026.08 publication date comes from the Crossref online record (2026-08-20); adjust if needed.
TODO: add more news (newest first). Format:
- *YYYY.MM*: One-line description with an optional [link](https://...).
{% endcomment %}

# Publications

## Journal Articles
- **[Generative AI and Machine learning collaboration for container dwell time prediction via data standardization](https://www.sciencedirect.com/science/article/pii/S1366554526005090)**<br>
  Minseop Kim, **Takhyeong Kim**, Taekhyun Park, Hanbyeol Park, Hyerim Bae<br>
  *Transportation Research Part E: Logistics and Transportation Review*, vol. 216, 105171, 2026. [[DOI]](https://doi.org/10.1016/j.tre.2026.105171)<br>
  <small>JCR 2025 Q1 · top 2% in Economics (12/626) · JIF 9.3</small>
- **Soft-LIFO Constraint-Based Optimization for Combined Vehicle Routing and Three-Dimensional Loading in Last-Mile Logistics**<br>
  *Transportation Research Part E: Logistics and Transportation Review*, under review.

{% comment %}
TODO: add the author line to the Soft-LIFO paper (4 authors, Takhyeong Kim third), e.g.
  Author A, Author B, **Takhyeong Kim**, Author D<br>
Format for a new entry:
- **[Paper Title](https://...)**<br>
  Author A, **Takhyeong Kim**, Author C<br>
  *Journal*, vol. x, no., year. [[DOI]](https://doi.org/...)
{% endcomment %}

## Conference Presentations
- **Decision-Time Conditional Residual Survival Function for Import Container Stacking**<br>
  **Takhyeong Kim**, Minseop Kim, Hanbyeol Park, Hyerim Bae<br>
  *Asia Pacific Industrial Engineering and Management Systems Conference (APIEMS 2026)*, Dec. 2026 (oral presentation, scheduled).<br>
  <small>Re-querying the CRSF at every decision reduced rehandles by 17.4% against re-queried point predictions and by 12.2–23.8% against static distribution predictions.</small>
- **[작업 부하 기반 동적 충전 최적화 전략을 통한 AGV 운영 효율 개선](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12484293)** (Improving AGV operational efficiency through a workload-based dynamic charging strategy)<br>
  **김탁형**, 서준혁, 김도희, 이호인, 배혜림<br>
  *2025 Fall Conference of the Korean Institute of Industrial Engineers (KIIE)*, pp. 1845–1856, Nov. 2025 (oral presentation). [[PDF]](files/2025_kiie_agv_charging.pdf)

{% comment %}
TODO: add the KIIE slide deck too, if you want it public:
put the PPT exported as PDF at files/2025_kiie_agv_charging_slides.pdf -> [[Slides]](files/2025_kiie_agv_charging_slides.pdf)
{% endcomment %}

## Thesis
- **Yard Stacking Decisions for Import Containers Based on Conditional Residual Survival Functions: Effects of Prediction Representation and Re-querying on Rehandling**<br>
  M.S. Thesis, Graduate School of Data Science, Pusan National University, Feb. 2027 (expected).<br>
  <small>Built on 392,475 containers (about 1.4 million EDI records) from a terminal in Busan. In a 49-day stacking simulation, re-querying reduced rehandles by 5.0–42.8% across all nine stacking rules from prior studies and by 4.2–25.3% against event-time updating.</small>

# Patents
- 생성형 인공지능과 머신러닝의 협업에 기반한 컨테이너 체류 시간 및 적재 전략 결정을 위한 컨테이너 적재 방법 및 컴퓨팅 장치 (Container stacking method and computing device for determining container dwell time and stacking strategy based on collaboration between generative AI and machine learning)<br>
  Hyerim Bae, Minseop Kim, **Takhyeong Kim**, Taekhyun Park. Korean Patent Application No. 10-2026-0066639, filed Apr. 13, 2026.

# Talks and Demonstrations
- *2026.10* **[Container Dwell Time Prediction and Stacking Location Decision Based on Conditional Residual Survival Functions](https://www.youtube.com/watch?v=RadiuDs2zOs)**, 4th-Year Promising Technology Exchange Meeting (유망기술교류회), Human-Centered Carbon-Neutral Global Supply Chain Research Center (SCSC). Presented the research and a live demonstration of the program to about 70 companies, including terminal operators. [[Video]](https://www.youtube.com/watch?v=RadiuDs2zOs)

# Research Projects
- *2025.09 – 2027.02* Human-Centered Carbon-Neutral Global Supply Chain Research Center (SCSC), Engineering Research Center program.<br>
  Import container dwell time prediction and yard stacking decisions using EDI logs from the Port of Busan: data processing, unstructured-information standardization with generative AI, machine learning and survival models, and validation through stacking simulation.

# Software
- **Stacking Simulator**: replays 49 days of EDI event logs in time order, decides stacking positions under nine stacking rules from prior studies, and counts rehandles. Prediction modes (static, event-time update, decision-time re-query) and rules can be swapped to test whether a prediction improves operations.
- **Yard Simulator**: browser-based 3D visualization of container terminal yard operations built with [three.js](https://threejs.org/). It replays yard activity (vessel calls, quay cranes, stacking and retrieval) with colour modes for container flow, tier and predicted dwell time; clicking a container opens its EDI event timeline with the survival-model estimate of its remaining dwell time. [[Screenshot]](images/proj_yard_simulator_full.jpg) [[Demo video]](files/yard_simulator_demo.mp4)

<details style="margin: 0.3em 0 0.8em 1.5em;">
  <summary>Yard Simulator demo (30 s)</summary>
  <video controls muted playsinline preload="none" width="100%" poster="images/proj_yard_simulator_full.jpg">
    <source src="files/yard_simulator_demo.mp4" type="video/mp4">
    Your browser cannot play this video. <a href="files/yard_simulator_demo.mp4">Download it instead.</a>
  </video>
</details>

{% comment %}
The interactive Yard Simulator build is not published here because its data files are ~58 MB and contain
operational records; the 30-second capture above stands in for it. To publish the viewer itself
later, push it to its own repo (e.g. kimtakong/yard-simulator) and link the GitHub Pages URL.
{% endcomment %}

# Honors and Awards
- *2025.12* [작물 유용 물질 생산성 예측 모델](https://aida.kisti.re.kr/data/afabd0ff-d22b-4ced-9dee-93094fb5276b), 2025 KISTI AI·DATA 경진대회, 최우수상 (국가과학기술연구회 이사장상). [[Link]](https://aida.kisti.re.kr/data/afabd0ff-d22b-4ced-9dee-93094fb5276b)

# Education
- **M.S. in Data Science**, Graduate School of Data Science, Pusan National University, Busan, Korea (2025.03 – 2027.02, expected)
  - Advisor: [Prof. Hyerim Bae](https://pnubaelab.github.io/), BAELAB
- **B.S. in Technology Data Engineering**, Division of Systems Management and Engineering (Industrial Engineering), Pukyong National University, Busan, Korea (2018.03 – 2024.02)
- **[Oxford Machine Learning Summer School (OxML)](https://www.oxfordml.school/)**, MLx Representation Learning & GenAI track, University of Oxford, UK (2025.08)

{% comment %}
TODO: confirm the official English name of the B.S. department.
{% endcomment %}

# Work Experience
- *2024.10 – 2025.01* Contract Researcher (Data Scientist), [Korea Institute of Ocean Science & Technology (KIOST)](https://www.kiost.ac.kr/eng.do), Busan, Korea. Preprocessing and machine learning analysis of climate, port and geological data.
- *2023.07 – 2023.08* Intern, Hyperlogic Co., Ltd., Korea. Web crawling and loading data into MongoDB.

# Skills and Certifications
- **Programming and Modeling**: Python (survival analysis: discrete-time and AFT models, XGBoost, simulation), SQL, three.js
- **Certification**: Advanced Data Analytics Semi-Professional (ADsP), Korea Data Agency, 2023.03
