let form_index = 0;

let title_index = [
    "잠시만요!",
    "등록하기",
    "성공했어요!"
]

let subtitle_index = [
    "관심을 가져주셔서 감사드리지만..",
    "신청 대기열에 등록할게요!",
    "대기열에 등록했어요!"
]

let label_index = [
    "대기열 신청이 필요해요!",
    "",
    ""
]

let element_index = [

    `<p>현재 PLAYLABS 신청 기간이 지났지만,<br>추후에 더 많은 메이커를 모집할 수 있어요!<br><br><b style="font-weight: 600;">우선 대기열에 등록해보세요!</b><br>대기열 등록 시, (학급 번호, 이름, 전화번호)의<br>개인정보를 수집해요!<br><br>동의한다면, 대기열 신청을 시작할게요!`,
    `<input type="text" placeholder="학급 번호 4자리" id="school_number"><input type="text" placeholder="이름" id="name"><input type="tel" placeholder="전화번호" id="phone"><input type="text" placeholder="포부나 하고 싶은 말" id="aza">`,
    ``
]

let submit_label_index = [
    "동의하고 시작하기",
    "대기열 등록하기",
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
    const URL = 'aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTIxMzc1MDExOTQ4NTQxMTM0OC8yQXJ4d2pzZ0VnLUQ0QVNPNGg2X2VSZWdRY3JQdzdyMnctTTZWTlotMHVVaGhSWERiTEMzWEtLQVZqOFl6MXd1ZVJZNg==';
    const datas = {
        embeds: [
            {
                title: "대기",
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
