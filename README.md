# kimtakong.github.io

Academic homepage of Takhyeong Kim (Pusan National University, BAELAB).
Live at <https://kimtakong.github.io>.

Built with Jekyll on the [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io) template (MIT License, see `LICENSE`).

## Editing

- `_config.yml` — site title, author profile and links
- `_pages/about.md` — all page content (About, Research Interests, News, Publications, Honors, Educations, Internships)
- `images/` — profile photo and publication thumbnails (500x300 px, `pub_YYYY_venue_keyword.png`)
- `files/` — CV and other downloadable files (create the folder when needed)

## Local preview

```bash
bundle install
bundle exec jekyll serve   # http://localhost:4000
```

## Google Scholar citations

`.github/workflows/google_scholar_crawler.yaml` fetches citation counts daily into the `google-scholar-stats` branch.
It needs the repository secret `GOOGLE_SCHOLAR_ID`:

```bash
gh secret set GOOGLE_SCHOLAR_ID --repo kimtakong/kimtakong.github.io
```
