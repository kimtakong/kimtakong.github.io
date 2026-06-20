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

    alert("playlist.json 파일이 다운로드 됩니다.\n이 파일을 c:\\project 폴더에 넣고,\n바탕화면의 [홈페이지 업데이트] 아이콘을 더블클릭하세요!");
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
