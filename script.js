let form_index = 0;

let title_index = [
    "반가워요!",
    "등록하기",
    "성공했어요!"
]

let subtitle_index = [
    "관심을 가져주셔서 감사드려요!",
    "동아리에 신청할게요!",
    "동아리에 신청했어요!"
]

let label_index = [
    "새로운 메이커를 모집해요!",
    "",
    ""
]

let element_index = [

    `<p>25년도에 같이할 메이커를 모집하고 있어요!<br><br><b style="font-weight: 600;">지금 PLAYLABS 동아리를 신청해보세요!</b><br>신청 시, (학급 번호, 이름, 전화번호)의<br>개인정보를 수집해요!<br><br>동의한다면, 동아리 신청을 시작할게요!`,
    `<input type="text" placeholder="학급 번호 4자리" id="school_number"><input type="text" placeholder="이름" id="name"><input type="tel" placeholder="전화번호" id="phone"><input type="text" placeholder="포부나 하고 싶은 말" id="aza">`,
    ``
]

let submit_label_index = [
    "동의하고 시작하기",
    "동아리 신청하기",
    "종료하기"
]

let form;

let title;
let subtitle;

let label;
let element;

let submit_button;
let submit_label;

window.onload = () => {
    register_element();
    update();
}

function register_element() {
    form = document.querySelector("form");
    title = document.querySelector("form-title");
    subtitle = document.querySelector("form-subtitle");
    label = document.querySelector("form-label");
    element = document.querySelector("form-element");
    submit_button = document.querySelector("form-button");
    submit_label = document.querySelector("form-button-label");
    console.log("element registered");
}

function play_animation() {
    form.classList.add("form_change");
    setTimeout(() => {
        update();
    }, 350);
    setTimeout(() => {
        form.classList.remove("form_change");
    }, 1000);
}

function send(data) {
    const URL = 'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTI5OTAwMDUzOTY1MjAzMDQ2NC85SklPZnFWZHNwSlpkTXhyWW40UWhrUXJGOG16Z0Y2WENXallTTlZMRXJ6aGRsdHdROEpqVjA3M1M3bzRNWS1lcmZiZA==';
    const datas = {
        embeds: [
            {
                title: "PLAYLABS 신청 : 25학년도",
                color: 0x44ffd2,
                fields: [
                    {
                        name: "학급 번호",
                        value: data[0],
                        inline: true
                    },
                    {
                        name: "이름",
                        value: data[1],
                        inline: true
                    },
                    {
                        name: "전화번호",
                        value: data[2],
                        inline: false
                    },
                    {
                        name: "포부",
                        value: data[3],
                        inline: true
                    }
                ]
            }
        ]
    };
    
    fetch(atob(URL), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datas),
    })
}

function check_send() {
    school_number = document.getElementById("school_number").value;
    names = document.getElementById("name").value;
    phone = document.getElementById("phone").value;
    aza = document.getElementById("aza").value;

    if (school_number.length == 4 && names.length >= 2 && phone.length >= 11 && aza.length > 1 ) {
        send([school_number, names, phone, aza])
        return true;
    }
    return false;
}

function next() {
    if (!form.classList.contains("form_change")) {
        if (form_index == 0) {
            form_index++;
            play_animation();
        } else if (form_index == 1) {
            if (check_send()) {
                form_index++;
                play_animation();
            } else {
                alert("양식과 일치하지 않아요!");
            }
        } else {
            location.href = "javascript:window.close();"
        }
    }
}

function update() {
    title.innerHTML = title_index[form_index];
    subtitle.innerHTML = subtitle_index[form_index];
    label.innerHTML = label_index[form_index];
    element.innerHTML = element_index[form_index];
    submit_label.innerHTML = submit_label_index[form_index];
}
