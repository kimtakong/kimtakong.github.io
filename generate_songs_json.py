import os
import json

def generate_songs_json():
    # Paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    gui_dir = os.path.join(base_dir, "신청곡리스트")
    output_file = os.path.join(base_dir, "songs.json")
    
    if not os.path.exists(gui_dir):
        print(f"오류: '{gui_dir}' 폴더를 찾을 수 없습니다.")
        return

    songs = []
    try:
        for file in os.listdir(gui_dir):
            if file.lower().endswith(".pdf"):
                title = os.path.splitext(file)[0]
                songs.append({
                    "title": title,
                    "filename": file
                })
        
        # Sort alphabetically by title
        songs.sort(key=lambda s: s["title"].lower())
        
        # Write to songs.json
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(songs, f, ensure_ascii=False, indent=2)
            
        print(f"성공: 총 {len(songs)}곡의 신청곡 리스트가 '{output_file}'에 성공적으로 저장되었습니다!")
    except Exception as e:
        print(f"오류 발생: {str(e)}")

if __name__ == "__main__":
    generate_songs_json()
