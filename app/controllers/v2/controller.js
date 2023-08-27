export const FOOD_URL = "https://64d6fb672a017531bc12e8b5.mockapi.io/food"
let FOOD_LIST_RAW = []
const MAX_ITEM = 10
let CURRENT_PAGE = 0

/**
 * Rendering functions
 */

let renderTable = (list) => {
    let DEFAULT_MON_CHAY = true
    let DEFAULT_TINH_TRANG = true
    let contentHtml = ""
    list.forEach(food => {
        contentHtml += /*html*/`
            <tr>
                <td>${food.ma}</td>
                <td>${food.ten}</td>
                <td>${food.loai == DEFAULT_MON_CHAY ? "Chay" : "Mặn"}</td>
                <td>${food.gia}</td>
                <td>${food.khuyenMai}</td>
                <td>0</td>
                <td>${food.tinhTrang == DEFAULT_TINH_TRANG ? "Còn" : "Hết"}</td>
                <td>
                    <button class="btn btn-warning" onclick="editFood('${food.ma}')">Sửa</button>
                    <button class="btn btn-danger" onclick="deleteFood('${food.ma}')">Xóa</button>
                </td>
            </tr>
        `
    })
    $("#tbodyFood")[0].innerHTML = contentHtml
}

window.renderPagination = (page = 0) => {
    let list = FOOD_LIST_RAW
    // Split array
    let FOOD_LIST_SPLIT = []
    let i = 0
    while (i < list.length) {
        let pageArr = []
        let j = i
        while (j < MAX_ITEM + i && list[j] !== undefined) {
            pageArr.push(list[j])
            j++
        }
        i = i + pageArr.length
        FOOD_LIST_SPLIT.push(pageArr)
    }

    // Update current page
    // FOOD_LIST_SPLIT[page] === undefined khi xóa hết item của trang hiện tại => Render list của trang trước
    CURRENT_PAGE = (FOOD_LIST_SPLIT[page] !== undefined) ? page : page - 1

    // Render pagination
    let pages = Math.ceil(list.length / MAX_ITEM)
    let paginationHtml = ``
    for (let i = 1; i <= pages; i++) {
        let active = (i - 1) == CURRENT_PAGE ? " active" : ""
        paginationHtml += `
            <li class="page-item ${active}"><a class="page-link" href="#" onclick="renderPagination(${i - 1})">${i}</a></li>
        `
    }
    $("#renderPages")[0].innerHTML = paginationHtml

    // Render table
    renderTable(FOOD_LIST_SPLIT[CURRENT_PAGE])
}

export const prev = () => {
    if (CURRENT_PAGE > 0) {
        CURRENT_PAGE--
        renderPagination(CURRENT_PAGE)
    }
}
export const next = () => {
    if (CURRENT_PAGE < MAX_ITEM) {
        CURRENT_PAGE++
        renderPagination(CURRENT_PAGE)
    }
}

export const fetchFoodList = () => {
    toggleSpinner()
    axios.get(FOOD_URL)
        .then((res) => {
            let list = res.data
            FOOD_LIST_RAW = list
            renderPagination(CURRENT_PAGE)
            toggleSpinner()
        })
        .catch((err) => {
            console.log(err);
            toggleSpinner()
        });
}

/**
 * Input form functions
 */
export const getDataForm = () => {
    return {
        ma: document.getElementById("foodID").value,
        ten: document.getElementById("tenMon").value,
        loai: document.getElementById("loai").value == "loai1",
        gia: document.getElementById("giaMon").value,
        khuyenMai: document.getElementById("khuyenMai").value,
        tinhTrang: document.getElementById("tinhTrang").value == "1",
        hinhAnh: document.getElementById("hinhMon").value,
        moTa: document.getElementById("moTa").value,
    }
}

export const pushDataForm = (food) => {
    let { ma, ten, loai, gia, khuyenMai, tinhTrang, hinhAnh, moTa } = food
    document.getElementById("foodID").value = ma
    document.getElementById("tenMon").value = ten
    document.getElementById("loai").value = loai ? "loai1" : "loai2"
    document.getElementById("giaMon").value = gia
    document.getElementById("khuyenMai").value = khuyenMai
    document.getElementById("tinhTrang").value = tinhTrang ? "1" : "0"
    document.getElementById("hinhMon").value = hinhAnh
    document.getElementById("moTa").value = moTa
}

export const resetForm = () => {
    document.getElementById("foodID").value = ""
    document.getElementById("tenMon").value = ""
    document.getElementById("loai").value = ""
    document.getElementById("giaMon").value = ""
    document.getElementById("khuyenMai").value = ""
    document.getElementById("tinhTrang").value = ""
    document.getElementById("hinhMon").value = ""
    document.getElementById("moTa").value = ""
    $("#foodID")[0].disabled = false
}

/**
 * Extension functions
 */
// MODAL
export const openModal = (mode = true) => {
    $("#exampleModal").modal(mode ? "show" : "hide")
}

// SPINNER
export const toggleSpinner = () => {
    $(".loading")[0].classList.toggle("d-flex")
}

// Toast
export const showMessage = (mess) => {
    Toastify({
        text: mess,
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}