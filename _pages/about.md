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

<!-- TODO: CV link. Put the PDF at files/cv.pdf and uncomment:
[Curriculum Vitae (PDF)](files/cv.pdf)
-->

# 📌 Research Interests
- **Container Terminal Operations**: stacking of import containers in the yard, rehandling reduction
- **Survival Analysis**: discrete-time survival models, conditional residual survival curves for container dwell time
- **Port Logistics Data**: covariate modeling based on EDI messages
- **Reinforcement Learning**: learning-based container stacking policies

# 🔥 News
- *2026.08*: &nbsp;🎉 Our paper on container dwell time prediction is published in *Transportation Research Part E*. <!-- date from the Crossref online record (2026-08-20); adjust if needed -->
<!-- TODO: add more news. Format (newest first):
- *YYYY.MM*: &nbsp;🎉🎉 One-line description with an optional [link](https://...).
-->

# 📝 Publications 

- [Generative AI and Machine learning collaboration for container dwell time prediction via data standardization](https://www.sciencedirect.com/science/article/pii/S1366554526005090), Minseop Kim\*, **Takhyeong Kim**, Taekhyun Park, Hanbyeol Park, Hyerim Bae, **Transportation Research Part E: Logistics and Transportation Review**, vol. 216, 105171, 2026. [[DOI]](https://doi.org/10.1016/j.tre.2026.105171)

\* First author

<!-- TODO: add more publications.
Text-only format:
- [Paper Title](https://...), Author A\*, **Takhyeong Kim**, Author C, **Journal / Conference**, year. [[DOI]](https://doi.org/...)

paper-box format with thumbnail (image: images/pub_YYYY_venue_keyword.png, 500x300 px):
<div class='paper-box'><div class='paper-box-image'><div><div class="badge">VENUE YEAR</div><img src='images/pub_YYYY_venue_keyword.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Paper Title](https://...)

Author A\*, **Takhyeong Kim**, Author C

**Journal / Conference**, year. [[DOI]](https://doi.org/...) [[Code]](https://github.com/...)
<strong><span class='show_paper_citations' data='fn1WtU4AAAAJ:XXXX'></span></strong>  (XXXX = citation_for_view id from Google Scholar; optional)
</div>
</div>
-->

# 🎖 Honors and Awards
- *2025.12* [작물 유용 물질 생산성 예측 모델](https://aida.kisti.re.kr/data/afabd0ff-d22b-4ced-9dee-93094fb5276b), 2025 KISTI AI·DATA 경진대회, 최우수상 (국가과학기술연구회 이사장상), [[Link]](https://aida.kisti.re.kr/data/afabd0ff-d22b-4ced-9dee-93094fb5276b)
<!-- TODO: add more awards. Format:
- *YYYY.MM* Title, Competition / Organization, Award name, [[Link]](https://...)
-->

# 📖 Educations
- **M.S. in Data Science**, Graduate School of Data Science, Pusan National University, Busan, Korea <!-- TODO: period, e.g. (2025.03 ~ ) -->
  - Advisor: [Prof. Hyerim Bae](https://pnubaelab.github.io/), BAELAB
<!-- TODO: B.S. entry. Format:
- **B.S. in <Major>**, <University>, <City>, Korea (YYYY.MM - YYYY.MM)
-->

# 💻 Internships
<!-- TODO: add internships. Format:
- *YYYY.MM - YYYY.MM*, [Organization](https://...), City, Country.
-->
