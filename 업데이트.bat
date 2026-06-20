@echo off
chcp 65001 > nul
echo ==================================================
echo         김타콩의 심야식당 홈페이지 업데이트
echo ==================================================
echo.
echo 1. 신청곡 목록 (songs.json) 자동 갱신 중...
python generate_songs_json.py
echo.
echo 2. 변경사항 GitHub에 업로드 중...
git add songs.json playlist.json "신청곡리스트/"
git commit -m "홈페이지 자동 업데이트 (플레이리스트 / 악보)"
git push origin main
echo.
echo ==================================================
echo         업데이트가 완료되었습니다! (창을 닫으셔도 됩니다)
echo ==================================================
pause
