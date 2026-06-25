let posts = JSON.parse(localStorage.getItem("posts")) || [];

let notifications = JSON.parse(
    localStorage.getItem("notifications")
) || [];

const defaultProfile =
"https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg";

// ---------------------------------------------
// DEMO BACKEND DATA
// These represent "other users" on the platform.
// In a real app this would come from a database/API.
// ---------------------------------------------

const demoUsers = [
    { name: "Alex Sharma",  avatar: "https://i.pravatar.cc/150?img=12", verified: false },
    { name: "Priya Nair",   avatar: "https://i.pravatar.cc/150?img=47", verified: true  },
    { name: "John Mathew",  avatar: "https://i.pravatar.cc/150?img=33", verified: false },
    { name: "Emma Liu",     avatar: "https://i.pravatar.cc/150?img=5",  verified: false },
    { name: "Rahul Verma",  avatar: "https://i.pravatar.cc/150?img=51", verified: false },
    { name: "Sara Khan",    avatar: "https://i.pravatar.cc/150?img=29", verified: true  },
    { name: "Aditya Rao",   avatar: "https://i.pravatar.cc/150?img=14", verified: false },
    { name: "Lily Chen",    avatar: "https://i.pravatar.cc/150?img=23", verified: false }
];

function randomUser(){
    return demoUsers[Math.floor(Math.random() * demoUsers.length)];
}

function generateSeedPosts(){

    return [
        {
            id: 1001,
            user: "Priya Nair",
            profile: "https://i.pravatar.cc/150?img=47",
            verified: true,
            text: "Just shipped a new feature at work 🚀 Feels great to finally see it live!",
            image: "https://picsum.photos/600/400?random=11",
            likes: 34,
            comments: [
                { user: "Alex Sharma", avatar: "https://i.pravatar.cc/150?img=12", text: "Congrats! 🎉", time: "2h ago" },
                { user: "John Mathew", avatar: "https://i.pravatar.cc/150?img=33", text: "Well deserved 👏", time: "1h ago" }
            ],
            time: "Today at 9:15 AM"
        },
        {
            id: 1002,
            user: "Rahul Verma",
            profile: "https://i.pravatar.cc/150?img=51",
            verified: false,
            text: "Sunday morning trek with the squad 🏔️ Nothing beats this view.",
            image: "https://picsum.photos/600/400?random=22",
            likes: 58,
            comments: [
                { user: "Lily Chen", avatar: "https://i.pravatar.cc/150?img=23", text: "Stunning! Where is this?", time: "5h ago" }
            ],
            time: "Yesterday at 7:40 AM"
        },
        {
            id: 1003,
            user: "Sara Khan",
            profile: "https://i.pravatar.cc/150?img=29",
            verified: true,
            text: "Tried a new pasta recipe tonight 🍝 Turned out better than expected!",
            image: "https://picsum.photos/600/400?random=33",
            likes: 21,
            comments: [
                { user: "Emma Liu", avatar: "https://i.pravatar.cc/150?img=5", text: "Recipe please 😍", time: "3h ago" },
                { user: "Aditya Rao", avatar: "https://i.pravatar.cc/150?img=14", text: "Looks delicious", time: "2h ago" }
            ],
            time: "Yesterday at 8:05 PM"
        },
        {
            id: 1004,
            user: "John Mathew",
            profile: "https://i.pravatar.cc/150?img=33",
            verified: false,
            text: "Hot take: tabs vs spaces doesn't matter as much as consistent formatting. Fight me 😂",
            image: "",
            likes: 12,
            comments: [
                { user: "Alex Sharma", avatar: "https://i.pravatar.cc/150?img=12", text: "Tabs supremacy 💪", time: "1h ago" }
            ],
            time: "Today at 11:20 AM"
        },
        {
            id: 1005,
            user: "Emma Liu",
            profile: "https://i.pravatar.cc/150?img=5",
            verified: false,
            text: "My dog discovered the snow for the first time today ❄️🐶 Pure joy.",
            image: "https://picsum.photos/600/400?random=44",
            likes: 89,
            comments: [
                { user: "Priya Nair", avatar: "https://i.pravatar.cc/150?img=47", text: "This made my day 🥹", time: "30m ago" },
                { user: "Sara Khan", avatar: "https://i.pravatar.cc/150?img=29", text: "Adorable!!", time: "20m ago" }
            ],
            time: "Today at 1:10 PM"
        },
        {
            id: 1006,
            user: "Aditya Rao",
            profile: "https://i.pravatar.cc/150?img=14",
            verified: false,
            text: "Finished my first 10k run this morning 🏃 Slow but steady wins the race.",
            image: "",
            likes: 45,
            comments: [],
            time: "Today at 6:50 AM"
        },
        {
            id: 1007,
            user: "Lily Chen",
            profile: "https://i.pravatar.cc/150?img=23",
            verified: false,
            text: "Weekend market finds 🌸 Supporting local artists feels good.",
            image: "https://picsum.photos/600/400?random=55",
            likes: 27,
            comments: [
                { user: "Rahul Verma", avatar: "https://i.pravatar.cc/150?img=51", text: "Love this energy", time: "4h ago" }
            ],
            time: "Yesterday at 3:30 PM"
        }
    ];

}

function generateSeedNotifications(){

    return [
        { text: "Priya Nair liked your post ❤️", time: "9:20 AM" },
        { text: "John Mathew commented on your post 💬", time: "10:05 AM" },
        { text: "Sara Khan started following you 👤", time: "11:42 AM" },
        { text: "Rahul Verma liked your post ❤️", time: "1:15 PM" },
        { text: "Emma Liu mentioned you in a comment 📌", time: "2:30 PM" }
    ];

}

function login() {

    const username =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    if(username.trim() === ""){
        alert("Enter username");
        return;
    }

    if(password.trim() === ""){
        alert("Enter password");
        return;
    }

    document.getElementById("loginPage").style.display = "none";
    document.getElementById("app").style.display = "block";

    loadPosts();
    loadNotifications();
    startLiveSimulation();
}

function savePosts(){
    localStorage.setItem(
        "posts",
        JSON.stringify(posts)
    );
}

function saveNotifications(){
    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );
}

function createPost(){

    const text =
    document.getElementById("postText").value;

    const imageInput =
    document.getElementById("postImage");

    const file =
    imageInput.files[0];

    if(text.trim()==="" && !file){
        alert("Write something first");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e){

        const post = {

            id: Date.now(),

            user: "Manoj",

            profile: defaultProfile,

            verified: false,

            text: text,

            image: file ? e.target.result : "",

            likes: 0,

            comments: [],

            time:
            new Date().toLocaleString()

        };

        posts.unshift(post);

        savePosts();

        addNotification(
            "New post created"
        );

        loadPosts();

        document.getElementById("postText").value = "";
        imageInput.value = "";
    };

    if(file){
        reader.readAsDataURL(file);
    }
    else{
        reader.onload({
            target:{
                result:""
            }
        });
    }
}

function renderComment(comment){

    // Backwards-compatible with old plain-string comments
    if(typeof comment === "string"){
        return `<div class="comment">
            <div class="comment-body">
                <p class="comment-text">${comment}</p>
            </div>
        </div>`;
    }

    return `<div class="comment">
        <img src="${comment.avatar || defaultProfile}" class="comment-avatar">
        <div class="comment-body">
            <span class="comment-user">${comment.user}</span>
            <p class="comment-text">${comment.text}</p>
            <span class="comment-time">${comment.time || ""}</span>
        </div>
    </div>`;

}

function loadPosts(){

    const feed =
    document.getElementById("feed");

    feed.innerHTML = "";

    posts.forEach(post => {

        const div =
        document.createElement("div");

        div.className = "post";

        div.innerHTML = `

        <div class="post-header">

            <img
            src="${post.profile}">

            <div>

                <div class="post-user">
                    ${post.user}
                    ${post.verified ? '<i class="fa-solid fa-circle-check verified-badge"></i>' : ''}
                </div>

                <div class="post-time">
                    ${post.time}
                </div>

            </div>

        </div>

        <div class="post-content">

            <p>
                ${post.text}
            </p>

            ${
                post.image
                ?
                `<img
                src="${post.image}"
                class="post-image">`
                :
                ""
            }

        </div>

        <div class="post-actions">

            <button
            onclick="likePost(${post.id})">

                ❤️ ${post.likes}

            </button>

            <button
            onclick="deletePost(${post.id})">

                🗑 Delete

            </button>

        </div>

        <div class="comment-box">

            <input
            id="comment-${post.id}"
            placeholder="Write comment...">

            <br><br>

            <button
            onclick="addComment(${post.id})">

                Comment

            </button>

        </div>

        <div id="comments-${post.id}">

            ${
                post.comments.map(renderComment).join("")
            }

        </div>

        `;

        feed.appendChild(div);

    });

}

function likePost(id){

    const post =
    posts.find(
        p => p.id === id
    );

    if(post){

        post.likes++;

        savePosts();

        loadPosts();

    }

}

function deletePost(id){

    const confirmDelete =
    confirm(
        "Delete this post?"
    );

    if(!confirmDelete){
        return;
    }

    posts =
    posts.filter(
        p => p.id !== id
    );

    savePosts();

    addNotification(
        "Post deleted"
    );

    loadPosts();

}

function addComment(id){

    const input =
    document.getElementById(
        `comment-${id}`
    );

    const text =
    input.value;

    if(text.trim()===""){
        return;
    }

    const post =
    posts.find(
        p => p.id === id
    );

    if(post){

        post.comments.push({
            user: "Manoj",
            avatar: defaultProfile,
            text: text,
            time: "Just now"
        });

        savePosts();

        addNotification(
            "New comment added 💬"
        );

        loadPosts();

        input.value = "";

    }

}

const searchInput =
document.getElementById(
    "searchInput"
);

if(searchInput){

    searchInput.addEventListener(
        "keyup",
        function(){

            const value =
            this.value.toLowerCase();

            const allPosts =
            document.querySelectorAll(
                ".post"
            );

            allPosts.forEach(post=>{

                const text =
                post.innerText
                .toLowerCase();

                if(
                    text.includes(value)
                ){
                    post.style.display =
                    "block";
                }
                else{
                    post.style.display =
                    "none";
                }

            });

        }
    );

}

function addNotification(msg){

    notifications.unshift({

        text: msg,

        time:
        new Date()
        .toLocaleTimeString()

    });

    // keep the panel from growing forever
    notifications = notifications.slice(0, 30);

    saveNotifications();

    loadNotifications();

}

function loadNotifications(){

    const panel =
    document.getElementById(
        "notificationsPanel"
    );

    if(!panel){
        return;
    }

    panel.innerHTML =
    "<h3>Notifications</h3>";

    notifications.forEach(item=>{

        const div =
        document.createElement("div");

        div.className =
        "notification-item";

        div.innerHTML =

        `
        <strong>
        ${item.text}
        </strong>

        <br>

        <small>
        ${item.time}
        </small>
        `;

        panel.appendChild(div);

    });

}

const notificationBtn =
document.getElementById(
    "notificationBtn"
);

if(notificationBtn){

    notificationBtn.addEventListener(
        "click",
        ()=>{

            const panel =
            document.getElementById(
                "notificationsPanel"
            );

            if(
                panel.style.display ===
                "block"
            ){
                panel.style.display =
                "none";
            }
            else{
                panel.style.display =
                "block";
            }

        }
    );

}

const darkBtn =
document.getElementById(
    "darkModeBtn"
);

if(darkBtn){

    darkBtn.addEventListener(
        "click",
        ()=>{

            document.body
            .classList.toggle(
                "dark-mode"
            );

            const darkState =
            document.body
            .classList.contains(
                "dark-mode"
            );

            localStorage.setItem(
                "darkMode",
                darkState
            );

        }
    );

}

window.addEventListener(
    "load",
    ()=>{

        const darkMode =
        localStorage.getItem(
            "darkMode"
        );

        if(
            darkMode === "true"
        ){
            document.body
            .classList.add(
                "dark-mode"
            );
        }

    }
);

// ---------------------------------------------
// Seed demo backend data on first run only.
// (Clear localStorage to re-seed fresh demo data.)
// ---------------------------------------------
if(posts.length === 0){
    posts = generateSeedPosts();
    savePosts();
}

if(notifications.length === 0){
    notifications = generateSeedNotifications();
    saveNotifications();
}

// ---------------------------------------------
// Simulated real-time activity.
// Mimics a live backend pushing updates: random
// likes/comments from demo users every few seconds.
// ---------------------------------------------
let simulationStarted = false;

function startLiveSimulation(){

    if(simulationStarted) return;
    simulationStarted = true;

    const sampleComments = [
        "Nice!", "Love this 🔥", "So true", "Amazing 👏",
        "Totally agree", "This is great", "😍😍😍", "Wow!"
    ];

    setInterval(()=>{

        if(posts.length === 0) return;

        const post = posts[Math.floor(Math.random() * posts.length)];
        const user = randomUser();
        const willComment = Math.random() < 0.35;

        if(willComment){

            post.comments.push({
                user: user.name,
                avatar: user.avatar,
                text: sampleComments[Math.floor(Math.random() * sampleComments.length)],
                time: "Just now"
            });

            addNotification(`${user.name} commented on your post 💬`);

        }
        else{

            post.likes++;
            addNotification(`${user.name} liked your post ❤️`);

        }

        savePosts();
        loadPosts();

    }, 12000);

}

window.onload = function(){

    loadPosts();

    loadNotifications();

};
