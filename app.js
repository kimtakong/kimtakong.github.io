// Global variables
let allSongs = [];
let playlist = [];
let tempPlaylist = []; // Playlist state while editing in admin mode
let adminAuthenticated = false;
let currentPasscode = "";

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
    fetchSongs();
    fetchPlaylist();
    fetchRecommendations();
});

// Tab switching logic
function switchTab(tabName) {
    // Update active tab buttons
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById(`tab-btn-${tabName}`).classList.add("active");

    // Update active sections
    document.querySelectorAll(".content-section").forEach(sec => sec.classList.remove("active"));
    document.getElementById(`section-${tabName}`).classList.add("active");
}

// ----------------------------------------------------
// Section 1: Songs List (from static songs.json)
// ----------------------------------------------------
async function fetchSongs() {
    const container = document.getElementById("songs-grid-container");
    try {
        const response = await fetch("./songs.json");
        if (!response.ok) throw new Error("Failed to fetch songs");
        allSongs = await response.json();
        
        document.getElementById("total-songs-count").textContent = allSongs.length;
        renderSongs(allSongs);
    } catch (error) {
        console.error(error);
        container.innerHTML = `
            <div class="no-songs-found" style="color: var(--accent-coral);">
                <i class="fa-solid fa-circle-exclamation"></i> 곡 목록을 불러오는 중 오류가 발생했습니다.
            </div>
        `;
    }
}

function renderSongs(songs) {
    const container = document.getElementById("songs-grid-container");
    if (songs.length === 0) {
        container.innerHTML = `
            <div class="no-songs-found">
                <i class="fa-solid fa-magnifying-glass"></i> 검색 결과에 부합하는 신청곡이 없습니다.
            </div>
        `;
        return;
    }

    container.innerHTML = songs.map(song => {
        // Beautify display title: remove capos from the title itself, but list as meta info if present
        let titleClean = song.title;
        let capos = "";
        const capoRegex = /(\d+capo|\d+카포|capo\d+)/gi;
        const match = titleClean.match(capoRegex);
        if (match) {
            capos = match[0];
            titleClean = titleClean.replace(capoRegex, "").trim();
        }

        // Strip trailing dashes or spaces
        titleClean = titleClean.replace(/\s*-\s*$/, "").trim();

        return `
            <div class="song-card">
                <div class="song-icon">
                    <i class="fa-solid fa-music"></i>
                </div>
                <div class="song-info">
                    <div class="song-title" title="${titleClean}">${titleClean}</div>
                    <div class="song-meta">
                        ${capos ? `<span style="background: rgba(255,140,66,0.15); color: var(--accent-orange); padding: 1px 6px; border-radius: 4px; font-size: 11px; margin-right: 6px;">${capos}</span>` : ""}
                        <span>신청 가능</span>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

function filterSongs() {
    const query = document.getElementById("songs-search-input").value.toLowerCase().trim();
    if (!query) {
        renderSongs(allSongs);
        return;
    }

    const filtered = allSongs.filter(song => 
        song.title.toLowerCase().includes(query) || 
        song.filename.toLowerCase().includes(query)
    );
    renderSongs(filtered);
}

// ----------------------------------------------------
// Section 2: Playlist (김타콩 플레이리스트)
// ----------------------------------------------------
async function fetchPlaylist() {
    try {
        const response = await fetch("./playlist.json");
        if (!response.ok) throw new Error("Failed to fetch playlist");
        playlist = await response.json();
        tempPlaylist = JSON.parse(JSON.stringify(playlist)); // Copy state
        renderPlaylist();
    } catch (error) {
        console.error(error);
        document.getElementById("playlist-container").innerHTML = `
            <div class="no-songs-found" style="color: var(--accent-coral);">
                <i class="fa-solid fa-circle-exclamation"></i> 플레이리스트를 불러오는 중 오류가 발생했습니다.
            </div>
        `;
    }
}

function renderPlaylist() {
    const container = document.getElementById("playlist-container");
    
    // Check if currently editing in admin mode
    const isEditMode = adminAuthenticated;
    const listToRender = isEditMode ? tempPlaylist : playlist;

    if (listToRender.length === 0) {
        container.innerHTML = `
            <div class="no-songs-found">
                <i class="fa-solid fa-compact-disc"></i> 등록된 플레이리스트 곡이 없습니다.
            </div>
        `;
        return;
    }

    container.innerHTML = listToRender.map((song, index) => {
        if (isEditMode) {
            return `
                <div class="playlist-item edit-mode-item">
                    <div class="playlist-item-left">
                        <span class="playlist-num">${index + 1}</span>
                        <div class="playlist-song-details">
                            <h4>${escapeHtml(song.title)}</h4>
                            <p>${escapeHtml(song.artist)}</p>
                        </div>
                    </div>
                    <div class="admin-actions-col">
                        <button class="action-icon-btn move-btn" onclick="movePlaylistItem(${index}, -1)" title="위로 이동">
                            <i class="fa-solid fa-arrow-up"></i>
                        </button>
                        <button class="action-icon-btn move-btn" onclick="movePlaylistItem(${index}, 1)" title="아래로 이동">
                            <i class="fa-solid fa-arrow-down"></i>
                        </button>
                        <button class="action-icon-btn delete-btn" onclick="deletePlaylistItem(${index})" title="삭제">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="playlist-item">
                    <div class="playlist-item-left">
                        <span class="playlist-num">${index + 1}</span>
                        <div class="playlist-song-details">
                            <h4>${escapeHtml(song.title)}</h4>
                            <p>${escapeHtml(song.artist)}</p>
                        </div>
                    </div>
                    ${index === 0 ? `<span class="playlist-playing-badge"><i class="fa-solid fa-headphones"></i> Now Playing</span>` : ""}
                </div>
            `;
        }
    }).join("");
}

// Toggle admin panel
function toggleAdminMode() {
    const authPanel = document.getElementById("admin-auth-panel");

    if (adminAuthenticated) {
        exitAdminMode();
    } else {
        if (authPanel.style.display === "none") {
            authPanel.style.display = "block";
            // Switch to playlist tab so they can see the editor
            switchTab('playlist');
            document.getElementById("admin-passcode-input").focus();
        } else {
            authPanel.style.display = "none";
        }
    }
}

// Authenticate Admin Passcode
function authenticateAdmin() {
    const code = document.getElementById("admin-passcode-input").value;
    if (code === "7673") {
        adminAuthenticated = true;
        currentPasscode = code;
        document.getElementById("admin-auth-panel").style.display = "none";
        document.getElementById("admin-editor-panel").style.display = "block";
        document.getElementById("btn-admin-toggle").innerHTML = `<i class="fa-solid fa-unlock"></i> 일반인 모드`;
        tempPlaylist = JSON.parse(JSON.stringify(playlist)); // Initialize temp editor state
        renderPlaylist();
        renderSongs(allSongs); // Refresh songs display
    } else {
        alert("비밀번호가 올바르지 않습니다.");
    }
}

function exitAdminMode() {
    adminAuthenticated = false;
    currentPasscode = "";
    document.getElementById("admin-editor-panel").style.display = "none";
    document.getElementById("admin-auth-panel").style.display = "none";
    document.getElementById("btn-admin-toggle").innerHTML = `<i class="fa-solid fa-lock"></i> 관리자 모드`;
    document.getElementById("admin-passcode-input").value = "";
    renderPlaylist();
    renderSongs(allSongs);
}

// Edit actions
function addPlaylistItem() {
    const titleInput = document.getElementById("new-play-title");
    const artistInput = document.getElementById("new-play-artist");
    const title = titleInput.value.trim();
    const artist = artistInput.value.trim();

    if (!title || !artist) {
        alert("제목과 가수를 모두 입력해주세요.");
        return;
    }

    tempPlaylist.push({ title, artist });
    titleInput.value = "";
    artistInput.value = "";
    renderPlaylist();
}

function deletePlaylistItem(index) {
    tempPlaylist.splice(index, 1);
    renderPlaylist();
}

function movePlaylistItem(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= tempPlaylist.length) return;

    // Swap elements
    const temp = tempPlaylist[index];
    tempPlaylist[index] = tempPlaylist[newIndex];
    tempPlaylist[newIndex] = temp;
    
    renderPlaylist();
}

// Save playlist - download as JSON file for user to commit
function savePlaylistChanges() {
    playlist = JSON.parse(JSON.stringify(tempPlaylist));

    // Generate downloadable JSON file
    const dataStr = JSON.stringify(playlist, null, 2);
    const blob = new Blob([dataStr], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "playlist.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert("playlist.json 파일이 다운로드 됩니다.\n이 파일을 C:\\project\\project\\ 폴더에 덮어씌운 뒤,\n폴더 안의 [업데이트.bat] 파일을 더블클릭하여 최신화하세요!");
    exitAdminMode();
}

// Helpers
function escapeHtml(str) {
    if (!str) return "";
    return str.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ----------------------------------------------------
// Section 4: Google Sheets Recommendation Integration
// ----------------------------------------------------
// 구글 앱스 스크립트 웹 앱 URL을 여기에 붙여넣으세요.
const APPS_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

// Fetch recommendations from Google Sheets
async function fetchRecommendations() {
    const container = document.getElementById("recommendations-container");
    if (!container) return;

    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL")) {
        container.innerHTML = `
            <div class="no-recommendations">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 40px; color: var(--accent-orange); margin-bottom: 15px; display: block;"></i>
                구글 스프레드시트 연동 설정이 필요합니다.<br>
                <span style="font-size: 13px; color: var(--text-muted); display: block; margin-top: 8px;">
                    <code>app.js</code> 파일의 <code>APPS_SCRIPT_URL</code> 변수에 웹 앱 주소를 설정해주세요!
                </span>
            </div>
        `;
        return;
    }

    try {
        const response = await fetch(APPS_SCRIPT_URL);
        if (!response.ok) throw new Error("Failed to fetch recommendations");
        const recommendations = await response.json();
        renderRecommendations(recommendations);
    } catch (error) {
        console.error(error);
        container.innerHTML = `
            <div class="no-recommendations" style="color: var(--accent-coral);">
                <i class="fa-solid fa-circle-exclamation"></i> 추천 목록을 불러오는 중 오류가 발생했습니다.
            </div>
        `;
    }
}

function renderRecommendations(recommendations) {
    const container = document.getElementById("recommendations-container");
    if (!container) return;
    
    if (recommendations.length === 0) {
        container.innerHTML = `
            <div class="no-recommendations">
                <i class="fa-solid fa-music"></i> 아직 등록된 추천곡이 없습니다. 첫 번째 추천곡을 남겨보세요!
            </div>
        `;
        return;
    }

    container.innerHTML = recommendations.map(rec => {
        let dateStr = "";
        if (rec.timestamp) {
            try {
                const date = new Date(rec.timestamp);
                dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            } catch (e) {
                dateStr = rec.timestamp;
            }
        }

        return `
            <div class="recommend-card" style="margin-bottom: 15px;">
                <div class="recommend-card-header">
                    <div class="recommend-song-info">
                        <h4>${escapeHtml(rec.title)}</h4>
                        <p>${escapeHtml(rec.artist)}</p>
                    </div>
                    ${dateStr ? `<span style="font-size: 11px; color: var(--text-muted);">${dateStr}</span>` : ""}
                </div>
                <div class="recommend-reason" style="margin-top: 10px;">
                    ${escapeHtml(rec.reason)}
                </div>
            </div>
        `;
    }).join("");
}

// Submit recommendation to Google Sheets
async function submitRecommendation(event) {
    event.preventDefault();

    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL")) {
        alert("구글 스프레드시트 연동 주소(APPS_SCRIPT_URL)가 설정되지 않았습니다.\napp.js 파일을 열고 주소를 설정해 주세요!");
        return;
    }

    const titleInput = document.getElementById("rec-title");
    const artistInput = document.getElementById("rec-artist");
    const reasonInput = document.getElementById("rec-reason");
    const submitBtn = document.getElementById("btn-submit-rec");

    const title = titleInput.value.trim();
    const artist = artistInput.value.trim();
    const reason = reasonInput.value.trim();

    if (!title || !artist || !reason) {
        alert("모든 필드를 입력해주세요.");
        return;
    }

    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> 등록 중...`;

    try {
        await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, artist, reason })
        });

        alert("추천곡이 성공적으로 등록되었습니다!");
        
        titleInput.value = "";
        artistInput.value = "";
        reasonInput.value = "";

        setTimeout(() => {
            fetchRecommendations();
        }, 1500);

    } catch (error) {
        console.error(error);
        alert("등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
    }
}
