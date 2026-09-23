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

My research focuses on data-driven decision making for container terminal operations, in particular reducing rehandling in import container yards through survival analysis of container dwell time and learning-based stacking policies.

Citations: <a href='https://scholar.google.com/citations?user=fn1WtU4AAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>

Email: [glorytak74@pusan.ac.kr](mailto:glorytak74@pusan.ac.kr) / [glorytak74@naver.com](mailto:glorytak74@naver.com)

{% comment %}
TODO: CV link. Put the PDF at files/cv.pdf and add this line below:
[Curriculum Vitae (PDF)](files/cv.pdf)
{% endcomment %}

# 📌 Research Interests
- **Container Terminal Operations**: stacking of import containers in the yard, rehandling reduction
- **Survival Analysis**: discrete-time survival models, conditional residual survival curves for container dwell time
- **Port Logistics Data**: covariate modeling based on EDI messages
- **Reinforcement Learning**: learning-based container stacking policies

# 🔥 News
- *2026.08*: &nbsp;🎉 Our paper on container dwell time prediction is published in *Transportation Research Part E*.

{% comment %}
TODO: the 2026.08 date above comes from the Crossref online record (2026-08-20); adjust if needed.
TODO: add more news (newest first). Format:
- *YYYY.MM*: &nbsp;🎉🎉 One-line description with an optional [link](https://...).
{% endcomment %}

# 📝 Publications 

- [Generative AI and Machine learning collaboration for container dwell time prediction via data standardization](https://www.sciencedirect.com/science/article/pii/S1366554526005090), Minseop Kim<sup>*</sup>, **Takhyeong Kim**, Taekhyun Park, Hanbyeol Park, Hyerim Bae, **Transportation Research Part E: Logistics and Transportation Review**, vol. 216, 105171, 2026. [[DOI]](https://doi.org/10.1016/j.tre.2026.105171)

<small><sup>*</sup> indicates first author.</small>

{% comment %}
TODO: add more publications.

Text-only format:
- [Paper Title](https://...), Author A<sup>*</sup>, **Takhyeong Kim**, Author C, **Journal / Conference**, year. [[DOI]](https://doi.org/...)

paper-box format with thumbnail (image: images/pub_YYYY_venue_keyword.png, 500x300 px):
<div class='paper-box'><div class='paper-box-image'><div><div class="badge">VENUE YEAR</div><img src='images/pub_YYYY_venue_keyword.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Paper Title](https://...)

Author A<sup>*</sup>, **Takhyeong Kim**, Author C

**Journal / Conference**, year. [[DOI]](https://doi.org/...) [[Code]](https://github.com/...)
<strong><span class='show_paper_citations' data='fn1WtU4AAAAJ:XXXX'></span></strong>  (XXXX = citation_for_view id from Google Scholar; optional)
</div>
</div>
{% endcomment %}

# 💬 Conference Presentations
- *2025.11* [작업 부하 기반 동적 충전 최적화 전략을 통한 AGV 운영 효율 개선](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE12484293), **김탁형**, 서준혁, 김도희, 이호인, 배혜림, 2025년 대한산업공학회 추계학술대회, pp. 1845-1856 (oral presentation). [[PDF]](files/2025_kiie_agv_charging.pdf)

{% comment %}
TODO: if you prefer romanized author names here, replace them with
**Takhyeong Kim**, Junhyeok Seo, Dohee Kim, ... (check each spelling first).
TODO: add the slide deck too, if you want it public:
put the PPT exported as PDF at files/2025_kiie_agv_charging_slides.pdf -> [[Slides]](files/2025_kiie_agv_charging_slides.pdf)
TODO: add more presentations. Format:
- *YYYY.MM* [Title](https://...), **김탁형**, Co-authors, Conference, pp. x-y (oral presentation / poster). [[PDF]](files/...)
{% endcomment %}

# 🎖 Honors and Awards
- *2025.12* [작물 유용 물질 생산성 예측 모델](https://aida.kisti.re.kr/data/afabd0ff-d22b-4ced-9dee-93094fb5276b), 2025 KISTI AI·DATA 경진대회, 최우수상 (국가과학기술연구회 이사장상), [[Link]](https://aida.kisti.re.kr/data/afabd0ff-d22b-4ced-9dee-93094fb5276b)

{% comment %}
TODO: add more awards. Format:
- *YYYY.MM* Title, Competition / Organization, Award name, [[Link]](https://...)
{% endcomment %}

# 📖 Educations
- **M.S. in Data Science**, Graduate School of Data Science, Pusan National University, Busan, Korea
  - Advisor: [Prof. Hyerim Bae](https://pnubaelab.github.io/), BAELAB
- **B.S. in Technology Data Engineering**, Division of Systems Management and Engineering (Industrial Engineering), Pukyong National University, Busan, Korea (2018.03 - 2024.02)

{% comment %}
TODO: add the M.S. period after "Korea" above, e.g. (2025.03 ~ ).
TODO: confirm the official English name of the B.S. department.
{% endcomment %}

# 💻 Work Experience
- *2024.10 - 2025.01*, Contract Researcher (Data Scientist), [Korea Institute of Ocean Science & Technology (KIOST)](https://www.kiost.ac.kr/eng.do), Busan, Korea.

{% comment %}
TODO: add more entries. Format:
- *YYYY.MM - YYYY.MM*, Role, [Organization](https://...), City, Country.
{% endcomment %}
